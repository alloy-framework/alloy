import { Scope, SourceDirectory, createScope, type Children } from "@alloy-js/core";
import { CrateContext, CrateContextValue } from "../context/crate-context.js";
import { RustCrateScope } from "../scopes/rust-crate-scope.js";

export interface CrateDirectoryProps {
  name: string;
  version?: string;
  edition?: string;
  children?: Children;
}

export function CrateDirectory(props: CrateDirectoryProps) {
  const scope = createScope(RustCrateScope, props.name);
  const context: CrateContextValue = {
    scope,
    name: props.name,
    version: props.version,
    edition: props.edition ?? "2021",
  };

  return (
    <SourceDirectory path=".">
      <Scope value={scope}>
        <CrateContext.Provider value={context}>{props.children}</CrateContext.Provider>
      </Scope>
    </SourceDirectory>
  );
}
