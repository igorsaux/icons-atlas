pub mod icons_data_base;

use std::{collections::BTreeMap, path::PathBuf};

pub type PackedFiles = BTreeMap<PathBuf, Vec<u8>>;
pub type PackedIcons = BTreeMap<String, BTreeMap<u8, String>>;
pub use icons_data_base::IconsDataBase;
