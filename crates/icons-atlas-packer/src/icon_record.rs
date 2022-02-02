use std::{
    collections::BTreeMap,
    path::{Path, PathBuf},
};

use dmi::icon::IconState;
use image::{DynamicImage, ImageOutputFormat};

#[derive(Clone)]
pub struct IconRecord {
    pub icon_path: PathBuf,
    pub icon_state_name: String,
    pub images_by_dir: BTreeMap<u8, Vec<DynamicImage>>,
    id: String,
}

impl IconRecord {
    pub fn get_icon_file_name(&self) -> String {
        self.icon_path
            .file_name()
            .unwrap()
            .to_string_lossy()
            .to_string()
    }

    pub fn get_icon_file_stem(&self) -> String {
        self.icon_path
            .file_stem()
            .unwrap()
            .to_string_lossy()
            .to_string()
    }

    pub fn get_id(&self) -> &str {
        &self.id
    }

    pub fn is_gif(&self) -> bool {
        self.images_by_dir.get(&0).unwrap().len() > 1
    }

    pub fn to_bytes(&self, dir: u8) -> Vec<u8> {
        let images = self.images_by_dir.get(&dir).unwrap();
        let mut content = Vec::new();
        let is_gif = self.is_gif();

        match is_gif {
            false => {
                let image = &images[0];
                image
                    .write_to(&mut content, ImageOutputFormat::Png)
                    .unwrap();
            }
            true => {
                let first_image = &images[0].to_rgba8();
                let width = first_image.width() as u16;
                let height = first_image.height() as u16;
                let mut encoder = gif::Encoder::new(&mut content, width, height, &[]).unwrap();
                encoder.set_repeat(gif::Repeat::Infinite).unwrap();

                for image in images {
                    let mut frame =
                        gif::Frame::from_rgba(width, height, &mut image.to_rgba8().to_vec());
                    frame.dispose = gif::DisposalMethod::Background;

                    encoder.write_frame(&frame).unwrap();
                }
            }
        }

        content
    }

    pub fn from_state(path: &Path, icon_state: &IconState) -> Self {
        let mut images_by_dir: BTreeMap<u8, Vec<DynamicImage>> = BTreeMap::default();
        let mut index = 0;

        for _ in 0..icon_state.frames {
            for dir in 0..icon_state.dirs {
                let image_to_insert = &icon_state.images[index];

                images_by_dir
                    .entry(dir)
                    .and_modify(|e| e.push(image_to_insert.clone()))
                    .or_insert_with(|| vec![image_to_insert.clone()]);

                index += 1;
            }
        }

        let id = uuid::Uuid::new_v4().to_string();

        Self {
            icon_path: path.into(),
            icon_state_name: icon_state.name.clone(),
            images_by_dir,
            id,
        }
    }
}
