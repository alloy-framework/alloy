import {
  Show,
  Scope,
  SourceFile as CoreSourceFile,
  createScope,
  useScope,
  type Children,
} from "@alloy-js/core";
import { ModDeclarations } from "./mod-declarations.js";
import { Reference } from "./reference.js";
import { UseStatements } from "./use-statement.js";
import { RustCrateScope } from "../scopes/rust-crate-scope.js";
import { RustModuleScope } from "../scopes/rust-module-scope.js";

export interface SourceFileProps {
  path: string;
  children?: Children;
  header?: Children;
  headerComment?: Children;
}

function isModuleRootPath(path: string): boolean {
  const fileName = path.split("/").pop() ?? path;
  return fileName === "lib.rs" || fileName === "main.rs" || fileName === "mod.rs";
}

function getDeclarationScope(
  path: string,
  parent: RustCrateScope | RustModuleScope | undefined,
  scope: RustModuleScope,
) {
  if (!isModuleRootPath(path)) {
    return undefined;
  }

  if (path.endsWith("mod.rs") && parent instanceof RustModuleScope) {
    return parent;
  }

  if ((path.endsWith("lib.rs") || path.endsWith("main.rs")) && parent instanceof RustCrateScope) {
    return parent;
  }

  return scope;
}

export function SourceFile(props: SourceFileProps) {
  const parentScope = useScope();
  const scopeParent =
    parentScope instanceof RustCrateScope || parentScope instanceof RustModuleScope ?
      parentScope
    : undefined;
  const scope = createScope(RustModuleScope, props.path, scopeParent, {
    binder: scopeParent?.binder,
  });
  const declarationScope = getDeclarationScope(props.path, scopeParent, scope);

  const header =
    props.headerComment !== undefined || props.header !== undefined ?
      <>
        {props.headerComment}
        {props.header}
      </>
    : undefined;

  return (
    <CoreSourceFile
      path={props.path}
      filetype="rust"
      reference={Reference}
      header={header}
    >
      <Scope value={scope}>
        {declarationScope ? <ModDeclarations scope={declarationScope} /> : null}
        {declarationScope &&
        declarationScope.childModules.size > 0 &&
        (scope.imports.size > 0 || props.children !== undefined) ?
          <hbr />
        : null}
        <UseStatements />
        <Show when={scope.imports.size > 0}>
          <hbr />
        </Show>
        {props.children}
      </Scope>
    </CoreSourceFile>
  );
}
