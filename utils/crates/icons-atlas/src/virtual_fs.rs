use crate::FILES;
use tantivy::{directory::RamDirectory, Directory};

#[derive(Debug, Clone, Default)]
pub struct VirtualFS {
    inner: RamDirectory,
}

macro_rules! add_if_not_exists {
    (  $self:ident, $path:ident ) => {
        FILES.with(|files| {
            let files = files.borrow();
            let exists_in_files = files.contains_key($path);

            if exists_in_files {
                if !$self.inner.exists($path).unwrap() {
                    $self
                        .inner
                        .atomic_write($path, files.get($path).unwrap())
                        .unwrap()
                }
            }
        })
    };
}

impl Directory for VirtualFS {
    fn get_file_handle(
        &self,
        path: &std::path::Path,
    ) -> Result<Box<dyn tantivy::directory::FileHandle>, tantivy::directory::error::OpenReadError>
    {
        add_if_not_exists!(self, path);
        self.inner.get_file_handle(path)
    }

    fn delete(&self, path: &std::path::Path) -> Result<(), tantivy::directory::error::DeleteError> {
        FILES.with(|database| {
            let mut database = database.borrow_mut();
            database.remove(path);
        });

        self.inner.delete(path)
    }

    fn exists(
        &self,
        path: &std::path::Path,
    ) -> Result<bool, tantivy::directory::error::OpenReadError> {
        FILES.with(|database| {
            let database = database.borrow();
            let exists_in_database = database.contains_key(path);

            if exists_in_database {
                if !self.inner.exists(path).unwrap() {
                    self.inner
                        .atomic_write(path, database.get(path).unwrap())
                        .unwrap()
                }

                return Ok(true);
            }

            Ok(false)
        })
    }

    fn open_write(
        &self,
        path: &std::path::Path,
    ) -> Result<tantivy::directory::WritePtr, tantivy::directory::error::OpenWriteError> {
        self.inner.open_write(path)
    }

    fn atomic_read(
        &self,
        path: &std::path::Path,
    ) -> Result<Vec<u8>, tantivy::directory::error::OpenReadError> {
        add_if_not_exists!(self, path);

        self.inner.atomic_read(path)
    }

    fn atomic_write(&self, path: &std::path::Path, data: &[u8]) -> std::io::Result<()> {
        self.inner.atomic_write(path, data)
    }

    fn watch(
        &self,
        watch_callback: tantivy::directory::WatchCallback,
    ) -> tantivy::Result<tantivy::directory::WatchHandle> {
        self.inner.watch(watch_callback)
    }
}
