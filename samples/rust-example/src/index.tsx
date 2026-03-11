import { Output, render, writeOutput } from "@alloy-js/core";
import {
  CrateDirectory,
  ModuleDocComment,
  SourceFile,
  createRustNamePolicy,
} from "@alloy-js/rust";
import { std_fmt } from "./externals.js";
import { ErrorModule } from "./components/error-module.js";
import { TraitsModule } from "./components/traits-module.js";
import { StoreModule } from "./components/store-module.js";
import { ConfigFile } from "./components/config-file.js";

const output = render(
  <Output namePolicy={createRustNamePolicy()} externals={[std_fmt]}>
    <CrateDirectory
      name="kv_store"
      version="0.1.0"
      edition="2021"
      crateType="lib"
      dependencies={{
        serde: { version: "1.0", features: ["derive"] },
        tokio: { version: "1", features: ["full"] },
      }}
      includeCargoToml
    >
      <ErrorModule />
      <TraitsModule />
      <StoreModule />
      <ConfigFile />

      <SourceFile
        path="lib.rs"
        headerComment={
          <ModuleDocComment>
            {`A generic, thread-safe key-value store library.\n\nThis crate provides a configurable in-memory store\nwith support for TTL-based expiration, capacity limits,\nand trait-based extensibility.`}
          </ModuleDocComment>
        }
      />
    </CrateDirectory>
  </Output>,
);

await writeOutput(output, "./alloy-output");
