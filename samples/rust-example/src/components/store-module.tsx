import { code, Children, refkey } from "@alloy-js/core";
import {
  Attribute,
  DocComment,
  EnumDeclaration,
  EnumVariant,
  Field,
  FunctionDeclaration,
  ImplBlock,
  ModuleDirectory,
  SourceFile,
  StructDeclaration,
} from "@alloy-js/rust";
import { storeErrorKey } from "./error-module.js";
import { cacheableKey } from "./traits-module.js";

export const storeKey = refkey();
export const entryKey = refkey();
export const entryStatusKey = refkey();

export interface StoreModuleProps {
  children?: Children;
}

export function StoreModule(props: StoreModuleProps) {
  return (
    <ModuleDirectory path="store" pub>
      <SourceFile path="mod.rs">
        <DocComment>
          {`Core storage engine for the key-value store.\n\nProvides a generic, thread-safe store with support\nfor expiration and capacity limits.`}
        </DocComment>

        <EnumDeclaration
          name="EntryStatus"
          refkey={entryStatusKey}
          pub
          derives={["Debug", "Clone", "PartialEq"]}
          doc="Represents the current status of a cached entry."
        >
          <EnumVariant name="Active" doc="The entry is valid and accessible." />
          <EnumVariant name="Expired" doc="The entry has passed its time-to-live." />
          <EnumVariant name="Evicted" doc="The entry was removed to make room for new entries." />
        </EnumDeclaration>

        <hbr />

        <StructDeclaration
          name="Entry"
          refkey={entryKey}
          pub
          derives={["Debug", "Clone"]}
          typeParameters={[{ name: "V", constraint: "Clone" }]}
          doc="A single entry in the store, holding a value and metadata."
        >
          <Field name="value" pub type="V" />
          <Field name="created_at" pub type="std::time::Instant" />
          <Field name="ttl" pub type="Option<std::time::Duration>" />
          <Field name="status" pub type="EntryStatus" />
        </StructDeclaration>

        <hbr />

        <StructDeclaration
          name="Store"
          refkey={storeKey}
          pub
          typeParameters={[
            { name: "K", constraint: "Eq + std::hash::Hash + Clone" },
            { name: "V", constraint: "Clone + Send + Sync" },
          ]}
          doc="A generic key-value store with capacity limits and TTL support."
        >
          <Field name="data" type="std::collections::HashMap<K, Entry<V>>" />
          <Field name="max_capacity" type="usize" />
          <Field name="default_ttl" type="Option<std::time::Duration>" />
        </StructDeclaration>

        <hbr />

        <ImplBlock
          type={storeKey}
          typeParameters={[
            { name: "K", constraint: "Eq + std::hash::Hash + Clone" },
            { name: "V", constraint: "Clone + Send + Sync" },
          ]}
        >
          <DocComment>Creates a new store with the given maximum capacity.</DocComment>
          <FunctionDeclaration
            name="new"
            pub
            receiver="none"
            parameters={[{ name: "max_capacity", type: "usize" }]}
            returnType="Self"
          >
            {code`
              Self {
                  data: std::collections::HashMap::new(),
                  max_capacity,
                  default_ttl: None,
              }
            `}
          </FunctionDeclaration>

          <hbr />

          <DocComment>Sets a default time-to-live for new entries.</DocComment>
          <FunctionDeclaration
            name="with_default_ttl"
            pub
            receiver="self"
            parameters={[{ name: "ttl", type: "std::time::Duration" }]}
            returnType="Self"
          >
            {code`
              Self {
                  default_ttl: Some(ttl),
                  ..self
              }
            `}
          </FunctionDeclaration>

          <hbr />

          <DocComment>Inserts a value into the store, returning an error if full.</DocComment>
          <FunctionDeclaration
            name="insert"
            pub
            receiver="&mut self"
            parameters={[
              { name: "key", type: "K" },
              { name: "value", type: "V" },
            ]}
            returnType="crate::error::Result<()>"
          >
            {code`
              if self.data.len() >= self.max_capacity && !self.data.contains_key(&key) {
                  return Err(crate::error::StoreError::StorageFull);
              }

              let entry = Entry {
                  value,
                  created_at: std::time::Instant::now(),
                  ttl: self.default_ttl,
                  status: EntryStatus::Active,
              };

              self.data.insert(key, entry);
              Ok(())
            `}
          </FunctionDeclaration>

          <hbr />

          <DocComment>Retrieves a value by key, checking for expiration.</DocComment>
          <FunctionDeclaration
            name="get"
            pub
            receiver="&self"
            parameters={[{ name: "key", type: "&K" }]}
            returnType="crate::error::Result<&V>"
          >
            {code`
              match self.data.get(key) {
                  Some(entry) => {
                      if entry.status == EntryStatus::Expired {
                          return Err(crate::error::StoreError::NotFound);
                      }
                      if let Some(ttl) = entry.ttl {
                          if entry.created_at.elapsed() > ttl {
                              return Err(crate::error::StoreError::NotFound);
                          }
                      }
                      Ok(&entry.value)
                  }
                  None => Err(crate::error::StoreError::NotFound),
              }
            `}
          </FunctionDeclaration>

          <hbr />

          <DocComment>Removes an entry from the store.</DocComment>
          <FunctionDeclaration
            name="remove"
            pub
            receiver="&mut self"
            parameters={[{ name: "key", type: "&K" }]}
            returnType="crate::error::Result<V>"
          >
            {code`
              self.data
                  .remove(key)
                  .map(|entry| entry.value)
                  .ok_or(crate::error::StoreError::NotFound)
            `}
          </FunctionDeclaration>

          <hbr />

          <DocComment>Returns the number of entries in the store.</DocComment>
          <Attribute name="inline" />
          <FunctionDeclaration
            name="len"
            pub
            receiver="&self"
            returnType="usize"
          >
            {code`self.data.len()`}
          </FunctionDeclaration>

          <hbr />

          <DocComment>Returns true if the store is empty.</DocComment>
          <Attribute name="inline" />
          <FunctionDeclaration
            name="is_empty"
            pub
            receiver="&self"
            returnType="bool"
          >
            {code`self.data.is_empty()`}
          </FunctionDeclaration>

          <hbr />

          <DocComment>Evicts all expired entries from the store.</DocComment>
          <FunctionDeclaration
            name="evict_expired"
            pub
            receiver="&mut self"
            returnType="usize"
          >
            {code`
              let before = self.data.len();
              self.data.retain(|_, entry| {
                  if let Some(ttl) = entry.ttl {
                      entry.created_at.elapsed() <= ttl
                  } else {
                      true
                  }
              });
              before - self.data.len()
            `}
          </FunctionDeclaration>
        </ImplBlock>

        <hbr />

        <ImplBlock
          type={storeKey}
          trait={cacheableKey}
          typeParameters={[
            { name: "K", constraint: "Eq + std::hash::Hash + Clone" },
            { name: "V", constraint: "Clone + Send + Sync" },
          ]}
        >
          <FunctionDeclaration
            name="cache_key"
            receiver="&self"
            returnType="String"
          >
            {code`format!("store::{}", self.data.len())`}
          </FunctionDeclaration>

          <hbr />

          <FunctionDeclaration
            name="is_expired"
            receiver="&self"
            returnType="bool"
          >
            {code`self.data.is_empty()`}
          </FunctionDeclaration>

          <hbr />

          <FunctionDeclaration
            name="cached_value"
            receiver="&self"
            returnType={code`Option<&V>`}
          >
            {code`None`}
          </FunctionDeclaration>
        </ImplBlock>
      </SourceFile>
    </ModuleDirectory>
  );
}
