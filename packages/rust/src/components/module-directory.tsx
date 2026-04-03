import {
  Scope,
  SourceDirectory,
  createScope,
  useScope,
  type Children,
} from "@alloy-js/core";
import { RustCrateScope } from "../scopes/rust-crate-scope.js";
import { RustModuleScope } from "../scopes/rust-module-scope.js";
import { toRustVisibility } from "./visibility.js";

export interface ModuleDirectoryProps {
  path: string;
  pub?: boolean;
  pub_crate?: boolean;
  pub_super?: boolean;
  attributes?: Children[];
  children?: Children;
}

function getModuleName(path: string): string {
  const segments = path.split("/").filter((segment) => segment.length > 0);
  return segments[segments.length - 1] ?? path;
}

export function ModuleDirectory(props: ModuleDirectoryProps) {
  const parentScope = useScope();
  const scopeParent =
    (
      parentScope instanceof RustCrateScope ||
      parentScope instanceof RustModuleScope
    ) ?
      parentScope
    : undefined;
  const moduleName = getModuleName(props.path);
  const visibility = toRustVisibility(props);

  if (scopeParent) {
    scopeParent.addChildModule(moduleName, visibility, props.attributes);
  }

  const scope = createScope(RustModuleScope, moduleName, scopeParent, {
    binder: scopeParent?.binder,
  });

  return (
    <SourceDirectory path={props.path}>
      <Scope value={scope}>{props.children}</Scope>
    </SourceDirectory>
  );
}
