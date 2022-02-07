use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Copy, Serialize, Deserialize, PartialEq, Eq, PartialOrd, Ord)]
pub struct Dir(u8);

impl Dir {
    pub fn dir(&self) -> u8 {
        self.0
    }
}

impl From<u8> for Dir {
    fn from(dir: u8) -> Self {
        Self(dir)
    }
}
