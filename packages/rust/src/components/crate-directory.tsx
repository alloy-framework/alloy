import {
  Scope,
  SourceDirectory,
  createScope,
  type Children,
} from "@alloy-js/core";
import { CrateContext, CrateContextValue } from "../context/crate-context.js";
import {
  RustCrateScope,
  type CrateDependency,
} from "../scopes/rust-crate-scope.js";
import { CargoTomlFile } from "./cargo-toml-file.js";

export interface CrateDirectoryProps {
  name: string;
  version?: string;
  edition?: string;
  crateType?: "lib" | "bin";
  dependencies?: Record<string, CrateDependency>;
  includeCargoToml?: boolean;
  children?: Children;
}

export function CrateDirectory(props: CrateDirectoryProps) {
  const scope = createScope(RustCrateScope, props.name, props.version);
  const context: CrateContextValue = {
    scope,
    name: props.name,
    version: props.version,
    edition: props.edition ?? "2021",
    crateType: props.crateType ?? "lib",
  };

  return (
    <SourceDirectory path=".">
      <Scope value={scope}>
        <CrateContext.Provider value={context}>
          {props.children}
          {props.includeCargoToml ?
            <CargoTomlFile
              name={props.name}
              version={props.version}
              edition={props.edition}
              dependencies={props.dependencies}
            />
          : null}
        </CrateContext.Provider>
      </Scope>
    </SourceDirectory>
  );
}
