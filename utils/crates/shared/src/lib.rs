pub mod errors;
pub mod files;
pub mod icons;
pub mod icons_data_base;
pub mod pack;
pub mod unpack;

pub enum PackCompression {
    Brotli(BrotliEncoderParams),
    None,
}

pub enum UnpackCompression {
    Brotli,
    None,
}

pub use crate::pack::Pack;
pub use crate::unpack::Unpack;
use brotli::enc::BrotliEncoderParams;
pub use files::PackedFiles;
pub use icons::IconsBundle;
pub use icons_data_base::{IconsDataBase, IconsDataBaseField};
