import {
  Scope,
  SourceDirectory,
  createScope,
  useScope,
  type Children,
} from "@alloy-js/core";
import { RustCrateScope } from "../scopes/rust-crate-scope.js";
import { RustModuleScope } from "../scopes/rust-module-scope.js";
import { type RustVisibilityProps } from "./visibility.js";

export interface ModuleDirectoryProps extends RustVisibilityProps {
  path: string;
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

  if (scopeParent) {
    scopeParent.addChildModule({ name: moduleName, pub: props.pub, attributes: props.attributes });
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
