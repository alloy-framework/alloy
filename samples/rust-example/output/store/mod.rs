use std::collections::HashMap;
use std::time::{Duration, Instant};

use crate::error::{Result, StoreError};
use crate::traits::Cacheable;
/// Core storage engine for the key-value store.
///
/// Provides a generic, thread-safe store with support
/// for expiration and capacity limits.
/// Represents the current status of a cached entry.
#[derive(Debug, Clone, PartialEq)]
pub enum EntryStatus {
  /// The entry is valid and accessible.
  Active,
  /// The entry has passed its time-to-live.
  Expired,
  /// The entry was removed to make room for new entries.
  Evicted,
}
/// A single entry in the store, holding a value and metadata.
#[derive(Debug, Clone)]
pub struct Entry<V: Clone> {
  pub value: V,
  pub created_at: Instant,
  pub ttl: Option<Duration>,
  pub status: EntryStatus,
}
/// A generic key-value store with capacity limits and TTL support.
pub struct Store<K: Eq + std::hash::Hash + Clone, V: Clone + Send + Sync> {
  data: HashMap<K, Entry<V>>,
  max_capacity: usize,
  default_ttl: Option<Duration>,
}
impl<K: Eq + std::hash::Hash + Clone, V: Clone + Send + Sync> Store<K, V> {
  /// Creates a new store with the given maximum capacity.
  pub fn new(max_capacity: usize) -> Self {
    Self {
      data: HashMap::new(),
      max_capacity,
      default_ttl: None,
    }
  }
  /// Sets a default time-to-live for new entries.
  pub fn with_default_ttl(self, ttl: Duration) -> Self {
    Self {
      default_ttl: Some(ttl),
      ..self
    }
  }
  /// Inserts a value into the store, returning an error if full.
  pub fn insert(&mut self, key: K, value: V) -> Result<()> {
    if self.data.len() >= self.max_capacity && !self.data.contains_key(&key) {
      return Err(StoreError::StorageFull)
      ;
    }let entry = Entry {
      value,
      created_at: Instant::now(),
      ttl: self.default_ttl,
      status: EntryStatus::Active,
    };self.data.insert(key, entry); Ok(())
  }
  /// Retrieves a value by key, checking for expiration.
  pub fn get(&self, key: &K) -> Result<&V> {
    match self.data.get(key) {
      Some(entry) => {
        if entry.status == EntryStatus::Expired {
          return Err(StoreError::NotFound)
          ;
        }
        if let Some(ttl) = entry.ttl {
          if entry.created_at.elapsed() > ttl {
            return Err(StoreError::NotFound)
            ;
          }
        }
        Ok(&entry.value)
      },
      None => Err(StoreError::NotFound),
    }
  }
  /// Removes an entry from the store.
  pub fn remove(&mut self, key: &K) -> Result<V> {
    self.data.remove(key).map(|entry| entry.value).ok_or(StoreError::NotFound)
  }
  /// Returns the number of entries in the store.
  #[inline]pub fn len(&self) -> usize {
    self.data.len()
  }
  /// Returns true if the store is empty.
  #[inline]pub fn is_empty(&self) -> bool {
    self.data.is_empty()
  }
  /// Evicts all expired entries from the store.
  pub fn evict_expired(&mut self) -> usize {
    let before = self.data.len();self.data.retain(|_, entry| {
    if let Some(ttl) = entry.ttl {
      entry.created_at.elapsed() <= ttl
    } else {
      true
    }
    });before - self.data.len()
  }
}
impl<K: Eq + std::hash::Hash + Clone, V: Clone + Send + Sync> Cacheable<V> for Store<K, V> {
  fn cache_key(&self) -> String {
    format!("store::{}", self.data.len())
  }
  fn is_expired(&self) -> bool {
    self.data.is_empty()
  }
  fn cached_value(&self) -> Option<&V> {
    None
  }
}
