use crate::error::Result;
/// Traits defining serialization and caching behavior.
/// A trait for types that can be serialized to and deserialized from bytes.
pub trait Serializable {
  fn to_bytes(&self) -> Result<Vec<u8>>;
  fn from_bytes(bytes: &[u8]) -> Result<Self> where Self: Sized;
}
/// A trait for types that support caching with expiration.
pub trait Cacheable<V: Clone + Send + Sync> {
  fn cache_key(&self) -> String;
  fn is_expired(&self) -> bool;
  fn cached_value(&self) -> Option<&V>;
}
