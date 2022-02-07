use crate::image_container::ImagesContainer;
use shared::icons::{BundledIcon, Dir};
use std::collections::BTreeMap;

#[derive(Debug, Clone)]
pub struct Icon(BTreeMap<Dir, ImagesContainer>);

impl From<&dmi::icon::IconState> for Icon {
    fn from(state: &dmi::icon::IconState) -> Self {
        let mut images_by_dir: BTreeMap<Dir, ImagesContainer> = BTreeMap::new();
        let mut index = 0;

        for _ in 0..state.frames {
            for dir in 0..state.dirs {
                let dir: Dir = dir.into();
                let image_to_insert = &state.images[index];

                images_by_dir
                    .entry(dir)
                    .and_modify(|e| e.images_mut().push(image_to_insert.clone()))
                    .or_insert_with(|| vec![image_to_insert.clone()].into());

                index += 1;
            }
        }

        Self(images_by_dir)
    }
}

impl From<Icon> for BundledIcon {
    fn from(val: Icon) -> Self {
        let mut bundle = BundledIcon::new();

        for (dir, image) in val.0 {
            let icon = image.into();
            bundle.insert(dir, icon);
        }

        bundle
    }
}
