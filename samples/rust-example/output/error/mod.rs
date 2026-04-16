use std::fmt::{Display, Formatter};
/// Error types for the key-value store.
#[derive(Debug, Clone)]
pub enum StoreError {
  /// The requested key was not found.
  NotFound,
  /// The store has reached its maximum capacity.
  StorageFull,
  /// Failed to serialize or deserialize a value.
  SerializationError(String),
  /// Failed to acquire a lock on the store.
  LockError(String),
}
impl Display for StoreError {
  fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
    match self {
      Self::NotFound => write!(f, "key not found"),
      Self::StorageFull => write!(f, "storage is full"),
      Self::SerializationError(msg) => write!(
        f,
        "serialization error: {}",
        msg
      ),
      Self::LockError(msg) => write!(f, "lock error: {}", msg),
    }
  }
}
/// A specialized Result type for store operations.
pub type Result<T> = std::result::Result<T, StoreError>;
