#[cfg(not(target_family = "wasm"))]
use tantivy::directory::MmapDirectory;

#[cfg(not(target_family = "wasm"))]
use std::path::{Path, PathBuf};

#[cfg(not(target_family = "wasm"))]
use tantivy::IndexSettings;

use tantivy::{
    schema::{Field, Schema, SchemaBuilder, STORED, STRING, TEXT},
    Directory, Index,
};

use crate::PackedFiles;

const ICON_STATE_NAME_FIELD: &str = "icon_state_name";
const ICON_PATH_FIELD: &str = "icon_path";
const ICON_HASHED_ID_FIELD: &str = "icon_hashed_id";

fn create_database_schema() -> Schema {
    let mut schema_builder = SchemaBuilder::new();

    schema_builder.add_text_field(ICON_STATE_NAME_FIELD, TEXT | STORED);
    schema_builder.add_text_field(ICON_PATH_FIELD, TEXT | STORED);
    schema_builder.add_text_field(ICON_HASHED_ID_FIELD, STRING | STORED);

    schema_builder.build()
}

pub enum IconsDataBaseField {
    IconStateName,
    IconPath,
    IconHashedId,
}

pub struct IconsDataBase {
    index: Index,
    schema: Schema,
    #[cfg(not(target_family = "wasm"))]
    folder: Option<PathBuf>,
}

impl IconsDataBase {
    #[cfg(not(target_family = "wasm"))]
    pub fn create_in_folder(folder: impl AsRef<Path>) -> Self {
        let schema = create_database_schema();
        let directory = MmapDirectory::open(&folder).unwrap();
        let index = Index::create(directory, schema.clone(), IndexSettings::default()).unwrap();

        Self {
            index,
            schema,
            folder: Some(folder.as_ref().to_owned()),
        }
    }

    pub fn open(directory: impl Directory) -> Self {
        let schema = create_database_schema();
        let index = Index::open(directory).unwrap();

        Self {
            index,
            schema,
            #[cfg(not(target_family = "wasm"))]
            folder: None,
        }
    }

    pub fn index(&self) -> &Index {
        &self.index
    }

    pub fn schema(&self) -> &Schema {
        &self.schema
    }

    pub fn get_field(&self, field: IconsDataBaseField) -> Field {
        let field = match field {
            IconsDataBaseField::IconStateName => self.schema.get_field(ICON_STATE_NAME_FIELD),
            IconsDataBaseField::IconPath => self.schema.get_field(ICON_PATH_FIELD),
            IconsDataBaseField::IconHashedId => self.schema.get_field(ICON_HASHED_ID_FIELD),
        };

        field.unwrap()
    }

    #[cfg(not(target_family = "wasm"))]
    pub fn purge(self) {
        let directory = self.index.directory();
        let files = directory.list_managed_files();
        drop(self.index);

        for file in files {
            let file = match &self.folder {
                None => file,
                Some(base_folder) => base_folder.join(file),
            };

            if file.is_dir() {
                std::fs::remove_dir_all(file).ok();
            } else {
                std::fs::remove_file(file).ok();
            }
        }

        if let Some(base_folder) = self.folder {
            std::fs::remove_dir_all(base_folder).ok();
        };
    }

    pub fn files(&self) -> PackedFiles {
        let directory = self.index.directory();
        let files = directory.list_managed_files();
        let mut packed_files = PackedFiles::new();

        for file in files {
            if file.is_dir() {
                continue;
            }

            let content = match directory.atomic_read(&file) {
                Err(_) => continue,
                Ok(value) => value,
            };

            packed_files.insert(file, content);
        }

        packed_files
    }
}
