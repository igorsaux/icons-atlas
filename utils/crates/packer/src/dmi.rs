use std::{fs::File, path::Path};

use thiserror::Error;

use crate::IconRecord;

#[derive(Debug, Error)]
pub enum ParsingError {
    #[error("{0}")]
    Io(#[from] std::io::Error),
    #[error("{0}")]
    Dmi(#[from] dmi::dmi::error::DmiError),
}

#[derive(Debug, Clone)]
pub struct Dmi {
    records: Vec<IconRecord>,
}

impl Dmi {
    pub fn parse_file(path: impl AsRef<Path>) -> Result<Dmi, ParsingError> {
        let path = path.as_ref();
        let file = match File::open(path) {
            Err(error) => return Err(ParsingError::Io(error)),
            Ok(value) => value,
        };

        let dmi = match dmi::icon::Icon::load(file) {
            Err(error) => return Err(ParsingError::Dmi(error)),
            Ok(value) => value,
        };

        let records = dmi
            .states
            .iter()
            .filter(|state| !state.name.trim().is_empty())
            .map(|state| IconRecord::from_state(path, state))
            .collect();

        Ok(Self { records })
    }

    pub fn records_mut(&mut self) -> &mut Vec<IconRecord> {
        &mut self.records
    }
}
