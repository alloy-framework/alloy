import { useSourceFileScope } from "../../scopes/source-file.js";

export interface ImportStatementProps {
  /** The path to import (e.g. `"./models.tsp"` or `"@typespec/rest"`). */
  path: string;
}

/**
 * Registers an explicit `import` statement in the enclosing source file.
 *
 * The import is rendered at the top of the file by the `SourceFile` component
 * and is deduplicated with any auto-generated imports from cross-file
 * references.
 *
 * @example
 * ```tsx
 * <SourceFile path="main.tsp">
 *   <ImportStatement path="./models.tsp" />
 *   <ImportStatement path={"@typespec/rest"} />
 * </SourceFile>
 * ```
 *
 * This will produce:
 *
 * ```typespec
 * import "./models.tsp";
 * import "@typespec/rest";
 * ```
 */
export function ImportStatement(props: ImportStatementProps) {
  const scope = useSourceFileScope();
  if (!scope) {
    throw new Error("ImportStatement must be used within a SourceFile.");
  }
  scope.addImport(props.path);
  return false;
}
