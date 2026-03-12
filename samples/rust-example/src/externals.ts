import { createCrate, type CrateRef, type ExternalCrate } from "@alloy-js/rust";
import type { SymbolCreator } from "@alloy-js/core";

const serdeDescriptor = {
  name: "serde",
  version: "1.0",
  modules: {
    "": {
      Serialize: { kind: "trait" },
      Deserialize: { kind: "trait" },
    },
  },
} as const;

type SerdeCrate = CrateRef<typeof serdeDescriptor> & SymbolCreator & ExternalCrate;
export const serde: SerdeCrate = createCrate(serdeDescriptor);

const tokioDescriptor = {
  name: "tokio",
  version: "1",
  modules: {
    sync: {
      RwLock: { kind: "struct" },
    },
  },
} as const;

type TokioCrate = CrateRef<typeof tokioDescriptor> & SymbolCreator & ExternalCrate;
export const tokio: TokioCrate = createCrate(tokioDescriptor);

const stdFmtDescriptor = {
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
} as const;

type StdFmtCrate = CrateRef<typeof stdFmtDescriptor> & SymbolCreator & ExternalCrate;
export const std_fmt: StdFmtCrate = createCrate(stdFmtDescriptor);
