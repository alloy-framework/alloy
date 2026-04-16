use std::time::Duration;
/// Configuration for the key-value store.
pub const MAX_ENTRIES: usize = 10_000;
pub const DEFAULT_TTL_SECS: u64 = 3600;
/// Configuration options for initializing a Store.
///
/// Use the builder methods to customize behavior.
#[derive(Debug, Clone)]
pub struct Config {
  pub max_capacity: usize,
  pub default_ttl: Option<Duration>,
  pub enable_eviction: bool,
  pub name: String,
}
impl Config {
  /// Creates a new Config with sensible defaults.
  pub fn new() -> Self {
    Self {
      max_capacity: MAX_ENTRIES,
      default_ttl: Some(Duration::from_secs(DEFAULT_TTL_SECS)),
      enable_eviction: true,
      name: String::from("default"),
    }
  }
  /// Sets the maximum number of entries.
  #[must_use]pub fn with_max_capacity(self, capacity: usize) -> Self {
    Self {
      max_capacity: capacity,
      ..self
    }
  }
  /// Sets the default TTL for entries.
  #[must_use]pub fn with_ttl(self, ttl: Duration) -> Self {
    Self {
      default_ttl: Some(ttl),
      ..self
    }
  }
  /// Disables automatic eviction of expired entries.
  #[must_use]pub fn disable_eviction(self) -> Self {
    Self {
      enable_eviction: false,
      ..self
    }
  }
  /// Sets the name of this store instance.
  #[must_use]pub fn with_name(self, name: &str) -> Self {
    Self {
      name: name.to_owned(),
      ..self
    }
  }
}
