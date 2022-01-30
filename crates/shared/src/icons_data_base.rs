use tantivy::{
    schema::{Schema, SchemaBuilder, STORED, STRING, TEXT},
    Directory, Index, IndexSettings,
};

pub const ICON_STATE_NAME_FIELD: &str = "icon_state_name";
pub const ICON_PATH_FIELD: &str = "icon_path";
pub const ICON_HASHED_ID_FIELD: &str = "icon_hashed_id";

pub fn get_data_base_schema() -> Schema {
    let mut schema_builder = SchemaBuilder::new();

    schema_builder.add_text_field(ICON_STATE_NAME_FIELD, TEXT | STORED);
    schema_builder.add_text_field(ICON_PATH_FIELD, TEXT | STORED);
    schema_builder.add_text_field(ICON_HASHED_ID_FIELD, STRING | STORED);

    schema_builder.build()
}

pub struct IconsDataBase {
    pub index: Index,
    pub schema: Schema,
}

impl IconsDataBase {
    pub fn open(directory: impl Directory) -> Self {
        let index = Index::open(directory).unwrap();
        let schema = get_data_base_schema();

        Self { index, schema }
    }

    pub fn create(directory: impl Directory) -> Self {
        let schema = get_data_base_schema();
        let index = Index::create(directory, schema.clone(), IndexSettings::default()).unwrap();

        Self { index, schema }
    }
}
