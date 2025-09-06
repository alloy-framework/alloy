import { Children, Scope, SourceDirectory } from "@alloy-js/core";
import { createGoModuleScope } from "../scopes/module.js";

export interface ModuleDirectoryProps {
  children?: Children;
  name: string;
  path?: string;
}

export function ModuleDirectory(props: ModuleDirectoryProps) {
  const moduleScope = createGoModuleScope(props.name);

  return (
    <SourceDirectory path={props.path ?? "."}>
      <Scope value={moduleScope}>{props.children}</Scope>
    </SourceDirectory>
  );
}
