pub mod icons_data_base;

use std::{collections::HashMap, path::PathBuf};

pub type PackedFiles = HashMap<PathBuf, Vec<u8>>;
pub type PackedIcons = HashMap<String, HashMap<u8, String>>;
pub use icons_data_base::IconsDataBase;
