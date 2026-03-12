import { createCrate, type CrateRef, type ExternalCrate } from "@alloy-js/rust";
import type { SymbolCreator } from "@alloy-js/core";

const stdDescriptor = {
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

type StdCrate = CrateRef<typeof stdDescriptor> & SymbolCreator & ExternalCrate;
export const stdCrate: StdCrate = createCrate(stdDescriptor);
