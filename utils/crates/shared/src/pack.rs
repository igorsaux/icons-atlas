use brotli::BrotliCompress;
use serde::Serialize;

use crate::{errors::PackError, PackCompression};

pub trait Pack
where
    Self: Serialize,
{
    fn pack(&self, compression: PackCompression) -> Result<Vec<u8>, PackError> {
        let serialized = match bincode::serialize(self) {
            Err(error) => return Err(PackError::SerializeError(error)),
            Ok(value) => value,
        };

        match compression {
            PackCompression::None => Ok(serialized),
            PackCompression::Brotli(params) => {
                let mut compressed = Vec::new();

                match BrotliCompress(&mut serialized.as_slice(), &mut compressed, &params) {
                    Err(error) => Err(PackError::Io(error)),
                    Ok(_) => Ok(compressed),
                }
            }
        }
    }
}
