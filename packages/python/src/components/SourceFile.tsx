import {
  ComponentContext,
  SourceFile as CoreSourceFile,
  createNamedContext,
  Scope,
  Show,
  SourceDirectoryContext,
  useContext,
  type Children,
} from "@alloy-js/core";
import { join } from "pathe";
import { PythonModuleScope } from "../symbols/index.js";
import { ImportStatements } from "./ImportStatement.js";
import { Reference } from "./Reference.js";

export interface SourceFileContext {
  scope: PythonModuleScope;
  /** The module name for this file, e.g. 'test' for test.py */
  module: string;
}

export const SourceFileContext: ComponentContext<SourceFileContext> =
  createNamedContext("@alloy-js/python SourceFile");

export function useSourceFile() {
  return useContext(SourceFileContext)!;
}
export interface SourceFileProps {
  path: string;
  children?: Children;
  header?: Children;
  headerComment?: string;
  export?: boolean | string;
}

export function SourceFile(props: SourceFileProps) {
  const directoryContext = useContext(SourceDirectoryContext)!;
  const currentDir = directoryContext.path;
  // Name of the scope is derived from the file path, minus the .py extension, and with slashes replaced by dots
  const path: string = join(currentDir, props.path)
    .replace(/\.py$/, "")
    .replace(/\//g, ".");
  const scope = new PythonModuleScope(path);
  const sfContext: SourceFileContext = {
    scope: scope,
    module: path,
  };

  return (
    <CoreSourceFile path={props.path} filetype="py" reference={Reference}>
      <Show when={scope.importedModules.size > 0}>
        <ImportStatements records={scope.importedModules} />
        <hbr />
        <hbr />
      </Show>
      <SourceFileContext.Provider value={sfContext}>
        <Scope value={scope} kind="source-file">
          {props.children}
        </Scope>
      </SourceFileContext.Provider>
    </CoreSourceFile>
  );
}
