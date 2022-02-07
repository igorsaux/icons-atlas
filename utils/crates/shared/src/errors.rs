use std::io;

use thiserror::Error;

#[derive(Error, Debug)]
pub enum PackError {
    #[error("Failed to serialize: {0}")]
    SerializeError(#[from] bincode::Error),
    #[error("IO error: {0}")]
    Io(#[from] io::Error),
    #[error(transparent)]
    Generic(#[from] anyhow::Error),
}

#[derive(Error, Debug)]
pub enum UnpackError {
    #[error("{0}")]
    DeserializationError(#[from] bincode::Error),
    #[error("{0}")]
    Io(#[from] io::Error),
    #[error(transparent)]
    Generic(#[from] anyhow::Error),
}
