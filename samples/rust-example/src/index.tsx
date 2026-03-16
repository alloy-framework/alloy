import { Output, render, writeOutput } from "@alloy-js/core";
import {
  CrateDirectory,
  ModuleDocComment,
  SourceFile,
  createRustNamePolicy,
} from "@alloy-js/rust";
import { ConfigFile } from "./components/config-file.js";
import { ErrorModule } from "./components/error-module.js";
import { StoreModule } from "./components/store-module.js";
import { TraitsModule } from "./components/traits-module.js";
import { stdCrate } from "./externals.js";

const output = render(
  <Output namePolicy={createRustNamePolicy()} externals={[stdCrate]}>
    <CrateDirectory
      name="kv_store"
      version="0.1.0"
      edition="2021"
      crateType="lib"
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

await writeOutput(output, "./output");
