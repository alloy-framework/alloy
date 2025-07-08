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
}

/**
 * A Python source file component that represents a Python file in the source directory.
 * It provides a scope for the file, which is a `PythonModuleScope` that contains
 * all the symbols defined in the file, such as functions, classes, and variables.
 *
 * @example
 * ```tsx
 * <SourceFile path="test.py">
 *   <FunctionDeclaration name="test" />
 * </SourceFile>
 * ```
 * renders to
 * ```py
 * def test():
 *   pass
 * ```
 *
 * @remarks
 *
 * The `path` prop is the path to the file relative to the source directory.
 * The `children` prop can be used to add content to the file, such as
 * function definitions, class definitions, and variable declarations.
 * The `header` prop can be used to add a header comment to the file, which will be rendered
 * at the top of the file.
 * The `headerComment` prop can be used to add a comment to the header,
 * which will be rendered as a comment in the file.
 */
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
