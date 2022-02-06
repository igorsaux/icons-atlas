use std::{
    collections::BTreeMap,
    fs::File,
    path::{Path, PathBuf},
};

use anyhow::Result;
use brotli::{enc::BrotliEncoderParams, BrotliCompress};
use dmi::icon::Icon;
use glob::glob;

use icons_atlas_packer::IconRecord;
use shared::{
    icons_data_base::{ICON_HASHED_ID_FIELD, ICON_PATH_FIELD, ICON_STATE_NAME_FIELD},
    IconsDataBase, PackedFiles, PackedIcons,
};
use tantivy::{directory::MmapDirectory, Document};

const INDEX_FOLDER_PATH: &str = ".icons_atlas/";

fn get_icons_from_dmi(path: &Path) -> Result<Vec<IconRecord>> {
    let file = File::open(path)?;
    let icon = Icon::load(file)?;
    let mut images = Vec::new();

    for icon_state in icon.states {
        if icon_state.name.trim().is_empty() {
            continue;
        }

        images.push(IconRecord::from_state(path, &icon_state));
    }

    Ok(images)
}

fn pack_icon_records(icons: &[IconRecord]) -> PackedIcons {
    let mut packed_icons: PackedIcons = BTreeMap::new();

    for icon in icons {
        let mut image_by_dir: BTreeMap<u8, String> = BTreeMap::new();

        for dir in icon.images_by_dir.keys() {
            let image_base64 = base64::encode(icon.to_bytes(*dir));
            image_by_dir.insert(*dir, image_base64);
        }

        packed_icons.insert(icon.id().to_string(), image_by_dir);
    }

    packed_icons
}

fn populate_database(icons: &[IconRecord]) {
    let db_path = PathBuf::from(INDEX_FOLDER_PATH);
    std::fs::create_dir_all(&db_path).unwrap();
    let db = IconsDataBase::create(MmapDirectory::open(&db_path).unwrap());
    let mut writer = db.index.writer(10_000_000).unwrap();
    let icon_state_name_field = db.schema.get_field(ICON_STATE_NAME_FIELD).unwrap();
    let icon_path_field = db.schema.get_field(ICON_PATH_FIELD).unwrap();
    let icon_hashed_id_field = db.schema.get_field(ICON_HASHED_ID_FIELD).unwrap();

    for icon in icons {
        let mut icon_document = Document::default();

        icon_document.add_text(icon_state_name_field, icon.icon_state_name.clone());
        icon_document.add_text(
            icon_path_field,
            icon.icon_path.to_string_lossy().to_string(),
        );
        icon_document.add_text(icon_hashed_id_field, icon.id());

        writer.add_document(icon_document);
    }

    writer.commit().unwrap();
}

fn pack_database_files() -> PackedFiles {
    let mut files: PackedFiles = BTreeMap::new();
    let entries = std::fs::read_dir(INDEX_FOLDER_PATH).unwrap();

    for entry in entries {
        let path = entry.unwrap().path();

        if path.is_dir() {
            continue;
        }

        let content = std::fs::read(&path).unwrap();
        files.insert(
            path.strip_prefix(INDEX_FOLDER_PATH).unwrap().into(),
            content,
        );
    }

    files
}

fn save_packed_files(files: PackedFiles, path: &Path) {
    let serialized = bincode::serialize(&files).unwrap();
    let mut data = Vec::new();
    BrotliCompress(
        &mut serialized.as_slice(),
        &mut data,
        &BrotliEncoderParams::default(),
    )
    .unwrap();

    std::fs::write(path, &data).unwrap();
}

fn save_packed_icons(icons: PackedIcons, path: &Path) {
    let serialized = bincode::serialize(&icons).unwrap();
    let mut data = Vec::new();
    BrotliCompress(
        &mut serialized.as_slice(),
        &mut data,
        &BrotliEncoderParams::default(),
    )
    .unwrap();

    std::fs::write(path, data).unwrap();
}

fn clear_index_files() {
    std::fs::remove_dir_all(INDEX_FOLDER_PATH).unwrap();
}

fn main() {
    let cwd = std::env::current_dir().unwrap();
    let glob_pattern = format!("{}/**/*.dmi", cwd.to_str().unwrap());
    let cwd = std::env::current_dir().unwrap();

    println!("Parsing .dmi files...");
    let mut icons = Vec::new();
    for entry in glob(&glob_pattern).unwrap() {
        if entry.is_err() {
            continue;
        }

        let entry = entry.unwrap();
        let file_images = get_icons_from_dmi(entry.strip_prefix(&cwd).unwrap());

        if let Err(error) = file_images {
            println!("Error in {}: {}", entry.display(), error);
            continue;
        }

        let mut file_images = file_images.unwrap();

        icons.append(&mut file_images);
    }

    println!("Packing icons...");
    let packed_icons = pack_icon_records(&icons);

    println!("Saving to 'icons.bin'");
    save_packed_icons(packed_icons, Path::new("icons.bin"));

    println!("Creating database...");
    populate_database(&icons);
    println!("Stored icons: {}", icons.len());

    println!("Packing...");
    let packed_files = pack_database_files();

    println!("Saving to 'database.bin'");
    save_packed_files(packed_files, Path::new("database.bin"));

    println!("Cleaning up...");
    clear_index_files();
}
