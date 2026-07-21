import { useSourceFileScope } from "../../scopes/source-file.js";

export interface UsingStatementProps {
  /** The namespace to use (e.g. `"TypeSpec.Http"`). */
  name: string;
}

/**
 * Registers an explicit `using` statement in the enclosing source file.
 *
 * The using statement is rendered at the top of the file by the `SourceFile`
 * component and is deduplicated with any auto-generated usings from cross-file
 * references.
 *
 * @example
 * ```tsx
 * <SourceFile path="main.tsp">
 *   <UsingStatement name="TypeSpec.Http" />
 *   <UsingStatement name="TypeSpec.Rest" />
 * </SourceFile>
 * ```
 *
 * This will produce:
 *
 * ```typespec
 * using TypeSpec.Http;
 * using TypeSpec.Rest;
 * ```
 */
export function UsingStatement(props: UsingStatementProps) {
  const scope = useSourceFileScope();
  if (!scope) {
    throw new Error("UsingStatement must be used within a SourceFile.");
  }
  scope.addUsing(props.name);
  return false;
}
