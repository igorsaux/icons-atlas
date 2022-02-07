use std::collections::BTreeMap;

use serde::{Deserialize, Serialize};

use super::{Base64Icon, Dir};

#[derive(Debug, Serialize, Deserialize)]
pub struct BundledIcon(BTreeMap<Dir, Base64Icon>);

impl BundledIcon {
    pub fn new() -> Self {
        Self(BTreeMap::new())
    }

    pub fn insert(&mut self, dir: Dir, icon: Base64Icon) {
        self.0.insert(dir, icon);
    }

    pub fn get(&self, dir: impl AsRef<Dir>) -> Option<&Base64Icon> {
        self.0.get(dir.as_ref())
    }
}

impl Default for BundledIcon {
    fn default() -> Self {
        Self::new()
    }
}
