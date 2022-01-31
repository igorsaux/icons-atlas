use std::cell::RefCell;

use brotli::BrotliDecompress;
use serde::{Deserialize, Serialize};
use shared::{
    icons_data_base::{ICON_PATH_FIELD, ICON_STATE_NAME_FIELD},
    PackedFiles, PackedIcons,
};
use tantivy::{collector::TopDocs, query::QueryParser, Index};
use virtual_fs::VirtualFS;
use wasm_bindgen::prelude::*;

mod virtual_fs;

thread_local! {
    pub static ICONS: RefCell<PackedIcons> = RefCell::new(PackedIcons::default());
    pub static DATABASE: RefCell<PackedFiles> = RefCell::new(PackedFiles::default());
    pub static INDEX: RefCell<Option<Index>> = RefCell::new(None);
}

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(message: &str);

    #[wasm_bindgen(js_namespace = console)]
    fn debug(message: &str);
}

#[wasm_bindgen]
pub fn setup_hook() {
    std::panic::set_hook(Box::new(console_error_panic_hook::hook));
}

#[wasm_bindgen]
pub fn load_icons(data: JsValue) {
    let data: serde_bytes::ByteBuf = serde_wasm_bindgen::from_value(data).unwrap();
    let mut data = data.as_slice();

    ICONS.with(|icons| {
        let mut icons = icons.borrow_mut();
        let mut decompressed = Vec::new();
        BrotliDecompress(&mut data, &mut decompressed).unwrap();

        *icons = bincode::deserialize(&decompressed).unwrap();
    });
}

#[wasm_bindgen]
pub fn load_database(data: JsValue) {
    let data: serde_bytes::ByteBuf = serde_wasm_bindgen::from_value(data).unwrap();
    let mut data = data.as_slice();

    DATABASE.with(|database| {
        let mut database = database.borrow_mut();
        let mut decompressed = Vec::new();
        BrotliDecompress(&mut data, &mut decompressed).unwrap();

        *database = bincode::deserialize(&decompressed).unwrap();
    });

    INDEX.with(|index| {
        let mut index = index.borrow_mut();

        *index = Some(Index::open(VirtualFS::default()).unwrap());
    });
}

#[wasm_bindgen]
pub fn pick_icon(icon_id: String) -> JsValue {
    ICONS.with(|icons| {
        let icons = icons.borrow();
        let icon = icons.get(&icon_id).unwrap();

        JsValue::from_serde(icon).unwrap()
    })
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SearchResult {
    pub score: f32,
    pub fields: String,
}

#[wasm_bindgen]
pub fn query(message: String) -> JsValue {
    INDEX.with(|index| {
        let index = index.borrow();
        let index = index.as_ref().unwrap();

        let reader = index.reader().unwrap();
        let searcher = reader.searcher();

        let schema = index.schema();
        let icon_state_name_field = schema.get_field(ICON_STATE_NAME_FIELD).unwrap();
        let icon_path_field = schema.get_field(ICON_PATH_FIELD).unwrap();

        let query_parser =
            QueryParser::for_index(index, vec![icon_state_name_field, icon_path_field]);

        let query = query_parser.parse_query(&message).unwrap();
        let search_results = searcher.search(&query, &TopDocs::with_limit(25)).unwrap();

        let mut results = Vec::new();

        for (score, address) in search_results {
            let document = searcher.doc(address).unwrap();
            results.push(SearchResult {
                score,
                fields: schema.to_json(&document),
            });
        }

        JsValue::from_serde(&results).unwrap()
    })
}
