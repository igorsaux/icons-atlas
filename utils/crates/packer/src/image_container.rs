use image::{DynamicImage, ImageOutputFormat};
use shared::icons::Base64Icon;

use crate::base64::Base64;

#[derive(Debug, Clone)]
pub struct ImagesContainer(Vec<DynamicImage>);

impl ImagesContainer {
    pub fn new(images: Vec<DynamicImage>) -> Self {
        Self(images)
    }

    pub fn images(&self) -> &[DynamicImage] {
        &self.0
    }

    pub fn images_mut(&mut self) -> &mut Vec<DynamicImage> {
        &mut self.0
    }

    pub fn is_gif(&self) -> bool {
        self.0.len() > 1
    }

    pub fn to_bytes(&self) -> Vec<u8> {
        let mut content = Vec::new();
        let is_gif = self.is_gif();

        match is_gif {
            false => {
                let image = &self.images()[0];
                image
                    .write_to(&mut content, ImageOutputFormat::Png)
                    .unwrap();
            }
            true => {
                let first_image = self.images()[0].to_rgba8();
                let width = first_image.width() as u16;
                let height = first_image.height() as u16;
                let mut encoder = gif::Encoder::new(&mut content, width, height, &[]).unwrap();
                encoder.set_repeat(gif::Repeat::Infinite).unwrap();

                for image in self.images() {
                    let mut frame =
                        gif::Frame::from_rgba(width, height, &mut image.to_rgba8().to_vec());
                    frame.dispose = gif::DisposalMethod::Background;

                    encoder.write_frame(&frame).unwrap();
                }
            }
        }

        content
    }
}

impl Base64 for ImagesContainer {
    fn encode(&self) -> String {
        let bytes = self.to_bytes();

        base64::encode(bytes)
    }
}

impl<T> From<T> for ImagesContainer
where
    T: AsRef<[DynamicImage]>,
{
    fn from(images: T) -> Self {
        Self(images.as_ref().to_vec())
    }
}

impl From<ImagesContainer> for Base64Icon {
    fn from(val: ImagesContainer) -> Self {
        Base64Icon::new(val.encode())
    }
}
