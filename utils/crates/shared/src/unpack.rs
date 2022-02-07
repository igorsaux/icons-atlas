use serde::Deserialize;

use crate::{errors::UnpackError, UnpackCompression};

pub trait Unpack<'a, O>
where
    O: Deserialize<'a>,
{
    fn unpack(&self, compression: UnpackCompression) -> Result<O, UnpackError>;
}
