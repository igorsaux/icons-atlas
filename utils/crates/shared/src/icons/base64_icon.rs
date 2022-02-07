use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, PartialEq, Eq, PartialOrd, Ord)]
pub struct Base64Icon(String);

impl Base64Icon {
    pub fn new(base64: String) -> Self {
        Self(base64)
    }

    pub fn base64(&self) -> &str {
        &self.0
    }
}
