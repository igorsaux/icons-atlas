use crate::icon::Icon;
use shared::icons::IconId;
use std::path::{Path, PathBuf};

#[derive(Debug, Clone)]
pub struct IconRecord {
    pub icon_path: PathBuf,
    pub icon_state_name: String,
    pub icon: Icon,
    pub id: IconId,
}

impl IconRecord {
    pub fn from_state(path: impl AsRef<Path>, icon_state: &dmi::icon::IconState) -> Self {
        let path = path.as_ref();
        let icon = Icon::from(icon_state);
        let id = IconId::new(format!("{}|{}", path.display(), icon_state.name));

        Self {
            icon_path: path.into(),
            icon_state_name: icon_state.name.clone(),
            icon,
            id,
        }
    }
}
