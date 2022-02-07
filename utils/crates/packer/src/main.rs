use std::{io::Write, path::Path};

use anyhow::Context;
use brotli::enc::BrotliEncoderParams;
use glob::glob;

use packer::{Dmi, IconRecord};

use shared::{IconsBundle, IconsDataBase, Pack, PackCompression};
use tantivy::Document;

const INDEX_FOLDER_PATH: &str = ".icons_atlas/";

fn populate_database(
    icons: &[IconRecord],
    database_folder: impl AsRef<Path>,
) -> anyhow::Result<IconsDataBase> {
    std::fs::create_dir_all(&database_folder).context("Failed to create folders!")?;

    let database = IconsDataBase::create_in_folder(database_folder);
    let mut writer = database
        .index()
        .writer(10_000_000)
        .context("Failed to create a writer!")?;

    let icon_state_name_field = database.get_field(shared::IconsDataBaseField::IconStateName);
    let icon_path_field = database.get_field(shared::IconsDataBaseField::IconPath);
    let icon_hashed_id_field = database.get_field(shared::IconsDataBaseField::IconHashedId);

    for icon in icons {
        let mut icon_document = Document::default();

        icon_document.add_text(icon_state_name_field, &icon.icon_state_name);
        icon_document.add_text(icon_path_field, icon.icon_path.display());
        icon_document.add_text(icon_hashed_id_field, &icon.id);

        writer.add_document(icon_document);
    }

    writer
        .commit()
        .context("Failed to commit database changes!")?;

    Ok(database)
}

fn collect_icon_records() -> Vec<IconRecord> {
    let cwd = std::env::current_dir().unwrap();
    let glob_pattern = format!("{}/**/*.dmi", cwd.to_str().unwrap());
    let mut icons = Vec::new();

    println!("Parsing .dmi files...");
    for entry in glob(&glob_pattern).unwrap() {
        let entry = match entry {
            Err(_) => continue,
            Ok(value) => value,
        };

        let mut dmi = match Dmi::parse_file(entry.strip_prefix(&cwd).unwrap()) {
            Err(error) => {
                println!("Error while parsing '{}': {error}", entry.display());
                continue;
            }
            Ok(value) => value,
        };

        icons.append(dmi.records_mut());
    }

    icons
}

fn bundle_icon_records(records: Vec<IconRecord>) -> IconsBundle {
    let mut bundle = IconsBundle::new();

    records.into_iter().for_each(|record| {
        let IconRecord { id, icon, .. } = record;
        bundle.insert(id, icon.into());
    });

    bundle
}

fn save_database(database: &IconsDataBase, path: impl AsRef<Path>) -> anyhow::Result<()> {
    let files = database.files();
    let packed = files.pack(PackCompression::Brotli(BrotliEncoderParams::default()))?;
    let mut file = std::fs::File::create(&path).context("Failed to create a file!")?;

    println!("Saving database to '{}'", path.as_ref().display());
    file.write_all(&packed)
        .context("Failed to write to the file!")?;
    file.flush().context("Failed to flush the file's buffer!")?;

    Ok(())
}

fn save_icons_bundle(bundle: IconsBundle, path: impl AsRef<Path>) -> anyhow::Result<()> {
    println!("Compressing bundle...");
    let packed = bundle
        .pack(PackCompression::Brotli(BrotliEncoderParams::default()))
        .context("Failed to pack bundle!")?;

    let mut file = std::fs::File::create(&path).context("Failed to create a file!")?;

    println!("Saving a bundle to '{}'", path.as_ref().display());
    file.write_all(&packed)
        .context("Failed to write to the file!")?;
    file.flush().context("Failed to flush the file's buffer!")?;

    Ok(())
}

fn main() {
    println!("Parsing icons...");
    let icons = collect_icon_records();

    if icons.is_empty() {
        println!("No icons found!");

        std::process::exit(1);
    }

    println!("Parsed icons: {}", icons.len());

    println!("Creating database...");
    let database = populate_database(&icons, INDEX_FOLDER_PATH).expect("Can't create a database!");

    println!("Bundling icons...");
    let icons_bundle = bundle_icon_records(icons);

    save_icons_bundle(icons_bundle, "icons.bin").expect("Can't save the icons bundle!");
    save_database(&database, "database.bin").expect("Can't save the database!");

    println!("Cleaning up...");
    database.purge();
}
