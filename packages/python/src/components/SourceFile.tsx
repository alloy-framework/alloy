import {
  childrenArray,
  ComponentContext,
  SourceFile as CoreSourceFile,
  createNamedContext,
  isComponentCreator,
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

// Non top-level definitions
const NON_DEFINITION_NAMES = new Set([
  "VariableDeclaration",
  "MemberExpression",
  "FunctionCallExpression",
  "ClassInstantiation",
  "Reference",
]);

// Wrapper components that we should look inside to find the actual first child
const WRAPPER_COMPONENT_NAMES = new Set(["StatementList"]);

/**
 * Checks if the first child is not a top-level definition.
 * PEP 8 requires 2 blank lines before top-level function and class definitions,
 * but not before other statements like variable assignments.
 *
 * Returns true if we're certain the first child is a non-definition.
 */
function firstChildIsNonDefinition(children: Children | undefined): boolean {
  if (!children) return false;
  const arr = childrenArray(() => children);
  if (arr.length === 0) return false;
  const first = arr[0];

  // Non-component children (strings, numbers, refkeys, etc.) are not definitions
  if (!isComponentCreator(first)) {
    return true;
  }

  const name = first.component.name;
  if (NON_DEFINITION_NAMES.has(name)) {
    return true;
  }
  // Look inside wrapper components
  if (WRAPPER_COMPONENT_NAMES.has(name) && first.props?.children) {
    return firstChildIsNonDefinition(first.props.children as Children);
  }
  return false;
}

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
   * Content to render at the very top of the file, before docstrings and auto-imports.
   * Use this for `from __future__ import annotations` or other imports that must come first.
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

  // Check once whether first child needs 2 blank lines
  const needsExtraBlankLine = !firstChildIsNonDefinition(props.children);

  return (
    <CoreSourceFile path={props.path} filetype="py" reference={Reference}>
      <Show when={props.doc !== undefined}>
        {props.doc}
        <hbr />
      </Show>
      <Show when={props.header !== undefined}>
        {props.header}
        <hbr />
        <hbr />
        {/* Add extra blank line when no imports but has header */}
        <Show
          when={
            scope.importedModules.size === 0 &&
            props.header !== undefined &&
            needsExtraBlankLine
          }
        >
          <hbr />
        </Show>
      </Show>
      <Show when={scope.importedModules.size > 0}>
        <ImportStatements records={scope.importedModules} />
        <hbr />
        <hbr />
        {/* Add extra blank line unless first child is definitely a non-definition */}
        <Show when={needsExtraBlankLine}>
          <hbr />
        </Show>
      </Show>
      <PythonSourceFileContext.Provider value={sfContext}>
        <Scope value={scope}>
          <List doubleHardline>{props.children}</List>
        </Scope>
      </PythonSourceFileContext.Provider>
    </CoreSourceFile>
  );
}
