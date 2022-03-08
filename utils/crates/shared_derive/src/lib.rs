#![warn(clippy::all, clippy::pedantic)]

use proc_macro::TokenStream;
use quote::quote;
use syn::{parse_macro_input, DeriveInput};

macro_rules! crate_normalized {
    ( $name:ident ) => {
        if std::env::var("CARGO_PKG_NAME").unwrap_or_else(|_| unreachable!()) == "shared" {
            quote! { crate }
        } else {
            quote! { $name }
        }
    };
}

#[proc_macro_derive(Pack)]
pub fn pack_derive(tokens: TokenStream) -> TokenStream {
    let input = parse_macro_input!(tokens as DeriveInput);
    let name = input.ident;
    let pkg = crate_normalized!(shared);

    TokenStream::from(quote! {
        impl #pkg::Pack for #name {}
    })
}

#[proc_macro_derive(Unpack)]
pub fn unpack_derive(tokens: TokenStream) -> TokenStream {
    let input = parse_macro_input!(tokens as DeriveInput);
    let name = input.ident;
    let pkg = crate_normalized!(shared);

    TokenStream::from(quote! {
        impl #pkg::Unpack<'_, #name> for &[u8] {
            fn unpack(&self, compression: #pkg::UnpackCompression) -> Result<#name, #pkg::errors::UnpackError> {

                match compression {
                    #pkg::UnpackCompression::None => match bincode::deserialize(self) {
                        Err(error) => Err(#pkg::errors::UnpackError::DeserializationError(error)),
                        Ok(value) => Ok(value),
                    },
                    #pkg::UnpackCompression::Brotli => {
                        let mut uncompressed = Vec::new();
                        let mut reader = std::io::BufReader::new(*self);

                        match brotli::BrotliDecompress(&mut reader, &mut uncompressed) {
                            Err(error) => Err(#pkg::errors::UnpackError::Io(error)),
                            Ok(_) => match bincode::deserialize(&uncompressed) {
                                Err(error) => Err(#pkg::errors::UnpackError::DeserializationError(error)),
                                Ok(value) => Ok(value),
                            },
                        }
                    }
                }
            }
        }
    })
}
