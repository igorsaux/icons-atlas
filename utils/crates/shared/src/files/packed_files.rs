use serde::{Deserialize, Serialize};
use shared_derive::{Pack, Unpack};
use std::{
    collections::BTreeMap,
    path::{Path, PathBuf},
};

#[derive(Debug, Default, Clone, Serialize, Deserialize, Pack, Unpack)]
pub struct PackedFiles(BTreeMap<PathBuf, Vec<u8>>);

impl PackedFiles {
    pub fn new() -> Self {
        Self(BTreeMap::new())
    }

    pub fn insert(&mut self, path: PathBuf, content: Vec<u8>) {
        self.0.insert(path, content);
    }

    pub fn get(&self, path: impl AsRef<Path>) -> Option<&Vec<u8>> {
        self.0.get(path.as_ref())
    }

    pub fn len(&self) -> usize {
        self.0.len()
    }

    pub fn is_empty(&self) -> bool {
        self.0.is_empty()
    }

    pub fn contains_key(&self, path: impl AsRef<Path>) -> bool {
        self.0.contains_key(path.as_ref())
    }

    pub fn remove(&mut self, path: impl AsRef<Path>) {
        self.0.remove(path.as_ref());
    }
}
