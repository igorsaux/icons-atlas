use serde::{Deserialize, Serialize};
use shared_derive::{Pack, Unpack};
use std::collections::BTreeMap;

use super::{BundledIcon, IconId};

#[derive(Debug, Serialize, Deserialize, Default, Pack, Unpack)]
pub struct IconsBundle {
    inner: BTreeMap<IconId, BundledIcon>,
}

impl IconsBundle {
    #[must_use]
    pub fn new() -> Self {
        Self {
            inner: BTreeMap::new(),
        }
    }

    pub fn insert(&mut self, id: IconId, icon: BundledIcon) {
        self.inner.insert(id, icon);
    }

    #[must_use]
    pub fn get(&self, id: &IconId) -> Option<&BundledIcon> {
        self.inner.get(id)
    }

    #[must_use]
    pub fn len(&self) -> usize {
        self.inner.len()
    }

    #[must_use]
    pub fn is_empty(&self) -> bool {
        self.inner.is_empty()
    }
}
