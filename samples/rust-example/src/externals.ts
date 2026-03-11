import { createCrate } from "@alloy-js/rust";

export const serde = createCrate({
  name: "serde",
  version: "1.0",
  modules: {
    "": {
      Serialize: { kind: "trait" },
      Deserialize: { kind: "trait" },
    },
  },
});

export const tokio = createCrate({
  name: "tokio",
  version: "1",
  modules: {
    sync: {
      RwLock: { kind: "struct" },
    },
  },
});

export const std_fmt = createCrate({
  name: "std",
  builtin: true,
  modules: {
    fmt: {
      Display: { kind: "trait" },
      Formatter: { kind: "struct" },
      Result: { kind: "type-alias", name: "Result" },
    },
    collections: {
      HashMap: { kind: "struct" },
    },
    time: {
      Duration: { kind: "struct" },
      Instant: { kind: "struct" },
    },
  },
});
