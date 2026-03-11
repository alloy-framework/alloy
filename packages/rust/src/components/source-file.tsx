import {
  ComponentDefinition,
  Scope,
  SourceFile as CoreSourceFile,
  createScope,
  useScope,
  type Children,
  type Refkey,
} from "@alloy-js/core";
import { RustCrateScope } from "../scopes/rust-crate-scope.js";
import { RustModuleScope } from "../scopes/rust-module-scope.js";

export interface SourceFileProps {
  path: string;
  children?: Children;
  header?: Children;
  headerComment?: Children;
}

const RustReference: ComponentDefinition<{ refkey: Refkey }> = () => {
  return <></>;
};

function UseStatementsPlaceholder() {
  return <></>;
}

function ModuleDeclarationsPlaceholder() {
  return <></>;
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
      reference={RustReference}
      header={header}
    >
      <UseStatementsPlaceholder />
      <ModuleDeclarationsPlaceholder />
      <Scope value={scope}>{props.children}</Scope>
    </CoreSourceFile>
  );
}
