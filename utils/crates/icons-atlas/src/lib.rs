#![allow(clippy::unused_unit)]
use std::cell::RefCell;

use serde::{Deserialize, Serialize};
use shared::{
    icons::IconId, IconsBundle, IconsDataBase, IconsDataBaseField, PackedFiles, Unpack,
    UnpackCompression,
};
use tantivy::{collector::TopDocs, query::QueryParser};
use virtual_fs::VirtualFS;
use wasm_bindgen::prelude::*;

mod virtual_fs;

thread_local! {
    pub static ICONS: RefCell<IconsBundle> = RefCell::new(IconsBundle::default());
    pub static FILES: RefCell<PackedFiles> = RefCell::new(PackedFiles::default());
    pub static DATABASE: RefCell<Option<IconsDataBase>> = RefCell::new(None);
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
    let data = data.as_slice();

    ICONS.with(|icons| {
        let mut icons = icons.borrow_mut();

        *icons = data.unpack(UnpackCompression::Brotli).unwrap();
        debug(&format!("Loaded icons: {}", icons.len()));
    });
}

#[wasm_bindgen]
pub fn load_database(data: JsValue) {
    let data: serde_bytes::ByteBuf = serde_wasm_bindgen::from_value(data).unwrap();
    let data = data.as_slice();

    FILES.with(|files| {
        let mut files = files.borrow_mut();

        *files = data.unpack(UnpackCompression::Brotli).unwrap();
        debug(&format!("Loaded files: {}", files.len()));
    });

    DATABASE.with(|database| {
        let mut database = database.borrow_mut();

        *database =
            Some(IconsDataBase::open(VirtualFS::default()).unwrap_or_else(|_| unreachable!()));
    });
}

#[wasm_bindgen]
#[must_use]
pub fn pick_icon(icon_id: String) -> JsValue {
    ICONS.with(|icons| {
        let icons = icons.borrow();
        let id = IconId::new(icon_id);
        let icon = icons.get(&id).unwrap();

        JsValue::from_serde(icon).unwrap()
    })
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SearchResult {
    pub score: f32,
    pub fields: String,
}

#[wasm_bindgen]
#[must_use]
pub fn query(message: &str, limit: usize) -> JsValue {
    DATABASE.with(|database| {
        let database = database.borrow();
        let database = database.as_ref().unwrap();
        let index = database.index();
        let schema = database.schema();

        let reader = index.reader().unwrap();
        let searcher = reader.searcher();

        let icon_state_name_field = database.get_field(&IconsDataBaseField::IconStateName);
        let icon_path_field = database.get_field(&IconsDataBaseField::IconPath);

        let query_parser =
            QueryParser::for_index(index, vec![icon_state_name_field, icon_path_field]);

        let query = query_parser.parse_query(message).unwrap();
        let search_results = searcher
            .search(&query, &TopDocs::with_limit(limit))
            .unwrap();

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
