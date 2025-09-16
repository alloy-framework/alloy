import {
  ComponentContext,
  SourceFile as CoreSourceFile,
  createNamedContext,
  List,
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

export interface PythonSourceFileContext {
  scope: PythonModuleScope;
  /** The module name for this file, e.g. 'test' for test.py */
  module: string;
}

export const PythonSourceFileContext: ComponentContext<PythonSourceFileContext> =
  createNamedContext("@alloy-js/python SourceFile");

export function useSourceFile() {
  return useContext(PythonSourceFileContext)!;
}

export interface SourceFileProps {
  /**
   * The path to the file relative to the source directory.
   */
  path: string;
  /**
   * Content to add to the file, such as function definitions, class definitions, and variable declarations.
   */
  children?: Children;
  /**
   * Header comment to add to the file, which will be rendered at the top of the file.
   */
  header?: Children;
  /**
   * Comment to add to the header, which will be rendered as a comment in the file.
   */
  headerComment?: string;
  /**
   * Documentation for this module, which will be rendered as a module-level docstring.
   */
  doc?: Children;
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
 * @example
 * With module documentation:
 * ```tsx
 * <SourceFile
 *   path="utils.py"
 *   doc={<ModuleDoc description={[<Prose>Utility functions for data processing.</Prose>]} />}
 * >
 *   <FunctionDeclaration name="process_data" />
 * </SourceFile>
 * ```
 * renders to
 * ```py
 * """
 * Utility functions for data processing.
 * """
 *
 * def process_data():
 *   pass
 * ```
 */
export function SourceFile(props: SourceFileProps) {
  const directoryContext = useContext(SourceDirectoryContext)!;
  const currentDir = directoryContext.path;
  // Name of the scope is derived from the file path, minus the .py extension, and with slashes replaced by dots
  const path: string = join(currentDir, props.path)
    .replace(/\.py$/, "")
    .replace(/\//g, ".");
  const scope = new PythonModuleScope(path, undefined);
  const sfContext: PythonSourceFileContext = {
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
      <Show when={props.doc !== undefined}>
        {props.doc}
        <hbr />
        <hbr />
      </Show>
      <PythonSourceFileContext.Provider value={sfContext}>
        <Scope value={scope}>
          <List doubleHardline>{props.children}</List>
        </Scope>
      </PythonSourceFileContext.Provider>
    </CoreSourceFile>
  );
}
