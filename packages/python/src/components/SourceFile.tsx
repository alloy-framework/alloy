import {
  childrenArray,
  ComponentContext,
  computed,
  SourceFile as CoreSourceFile,
  createNamedContext,
  createScope,
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
import {
  categorizeImportRecords,
  ImportStatements,
} from "./ImportStatement.js";
import { SimpleCommentBlock } from "./PyDoc.js";
import { PythonBlock } from "./PythonBlock.js";
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
 * Checks if the first child is a top-level definition (function or class).
 * PEP 8 requires 2 blank lines before top-level function and class definitions,
 * but not before other statements like variable assignments.
 *
 * Returns true only if there are children and the first child is a definition.
 */
function firstChildIsDefinition(children: Children | undefined): boolean {
  if (!children) return false;
  const arr = childrenArray(() => children);
  if (arr.length === 0) return false;
  const first = arr[0];

  // Non-component children (strings, numbers, refkeys, etc.) are not definitions
  if (!isComponentCreator(first)) {
    return false;
  }

  const name = first.component.name;
  if (NON_DEFINITION_NAMES.has(name)) {
    return false;
  }
  // Look inside wrapper components
  if (WRAPPER_COMPONENT_NAMES.has(name) && first.props?.children) {
    return firstChildIsDefinition(first.props.children as Children);
  }
  // If we get here, it's likely a definition (FunctionDeclaration, ClassDeclaration, etc.)
  return true;
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
   * Content to render at the very top of the file, before everything else.
   * Use this for shebang lines, encoding declarations, or license headers.
   */
  header?: Children;
  /**
   * Comment to add at the top of the file, rendered as a Python comment block.
   * This is a convenience prop for adding copyright notices or other comments.
   */
  headerComment?: string;
  /**
   * Documentation for this module, which will be rendered as a module-level docstring.
   */
  doc?: Children;
  /**
   * __future__ imports to render after the docstring but before regular imports.
   */
  futureImports?: Children[];
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
  const scope = createScope(PythonModuleScope, path, undefined);
  const sfContext: PythonSourceFileContext = {
    scope: scope,
    module: path,
  };

  // Check if there are any children
  const hasChildren =
    props.children !== undefined &&
    childrenArray(() => props.children).length > 0;

  // PEP 8 requires 2 blank lines before top-level function/class definitions
  const needsExtraSpacing = firstChildIsDefinition(props.children);

  // Check if there's any preamble content (header, doc, imports, etc.)
  const hasPreamble =
    props.header !== undefined ||
    props.headerComment !== undefined ||
    props.doc !== undefined ||
    props.futureImports !== undefined;

  const imports = computed(() => {
    // Quick scan for any type-only imports
    const hasTypeImports = [...scope.importedModules.values()].some(
      (props) =>
        props.symbols && [...props.symbols].some((s) => s.local.isTypeOnly),
    );

    // Add TYPE_CHECKING before categorizing so it's naturally included
    const typeImportSymbol = hasTypeImports ? scope.addTypeImport() : undefined;

    // Single categorize - TYPE_CHECKING is already in scope.importedModules
    const { valueImports, typeImports } = categorizeImportRecords(
      scope.importedModules,
    );

    return {
      valueImports,
      typeImports,
      typeImportSymbol,
    };
  });

  return (
    <CoreSourceFile
      path={props.path}
      filetype="py"
      reference={Reference}
      header={props.header}
    >
      {/* Extra blank line after header when followed by doc/futureImports/children (not headerComment) */}
      <Show
        when={
          props.header !== undefined &&
          props.headerComment === undefined &&
          (props.doc !== undefined ||
            props.futureImports !== undefined ||
            hasChildren)
        }
      >
        <hbr />
      </Show>
      <Show when={props.headerComment !== undefined}>
        <SimpleCommentBlock>{props.headerComment}</SimpleCommentBlock>
        {/* When followed by doc: just newline (no blank line) */}
        <Show when={props.doc !== undefined}>
          <hbr />
        </Show>
        {/* When followed by futureImports or children directly (no doc): blank line */}
        <Show
          when={
            props.doc === undefined &&
            (props.futureImports !== undefined || hasChildren)
          }
        >
          <hbr />
          <hbr />
        </Show>
      </Show>
      <Show when={props.doc !== undefined}>
        {props.doc}
        <Show when={props.futureImports !== undefined || hasChildren}>
          <hbr />
        </Show>
      </Show>
      <Show when={props.futureImports !== undefined}>
        {props.futureImports}
        <Show when={hasChildren}>
          <hbr />
          <hbr />
        </Show>
      </Show>
      {/* Regular (non-type-only) imports */}
      <Show when={imports.value.valueImports.size > 0}>
        <ImportStatements records={imports.value.valueImports} />
        <hbr />
      </Show>
      {/* TYPE_CHECKING block with type-only imports */}
      <Show when={imports.value.typeImports.size > 0}>
        <hbr />
        <PythonBlock opener={`if ${imports.value.typeImportSymbol!.name}:`}>
          <ImportStatements records={imports.value.typeImports} />
        </PythonBlock>
      </Show>
      {/* Spacing after imports */}
      <Show when={hasChildren && scope.importedModules.size > 0}>
        <hbr />
      </Show>
      {/* Extra blank line before top-level definitions */}
      <Show
        when={
          needsExtraSpacing && (hasPreamble || scope.importedModules.size > 0)
        }
      >
        <hbr />
      </Show>
      <PythonSourceFileContext.Provider value={sfContext}>
        <Scope value={scope}>
          <Show when={hasChildren}>
            <List doubleHardline>{props.children}</List>
          </Show>
        </Scope>
      </PythonSourceFileContext.Provider>
    </CoreSourceFile>
  );
}
