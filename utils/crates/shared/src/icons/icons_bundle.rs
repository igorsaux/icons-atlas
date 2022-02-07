use serde::{Deserialize, Serialize};
use shared_derive::{Pack, Unpack};
use std::collections::BTreeMap;

use super::{BundledIcon, IconId};

#[derive(Debug, Serialize, Deserialize, Default, Pack, Unpack)]
pub struct IconsBundle {
    inner: BTreeMap<IconId, BundledIcon>,
}

impl IconsBundle {
    pub fn new() -> Self {
        Self {
            inner: BTreeMap::new(),
        }
    }

    pub fn insert(&mut self, id: IconId, icon: BundledIcon) {
        self.inner.insert(id, icon);
    }

    pub fn get(&self, id: &IconId) -> Option<&BundledIcon> {
        self.inner.get(id)
    }

    pub fn len(&self) -> usize {
        self.inner.len()
    }

    pub fn is_empty(&self) -> bool {
        self.inner.is_empty()
    }
}
