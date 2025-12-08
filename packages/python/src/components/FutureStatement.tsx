import { type Children } from "@alloy-js/core";

/**
 * Valid features for future statements.
 */
export type FutureFeature =
  | "annotations"
  | "absolute_import"
  | "division"
  | "generators"
  | "generator_stop"
  | "unicode_literals"
  | "print_function"
  | "nested_scopes"
  | "with_statement";

export interface FutureStatementProps {
  /**
   * The feature to import from __future__.
   */
  feature: FutureFeature;
}

/**
 * A future statement that imports features from __future__.
 *
 * Future statements are directives to the compiler that a particular module
 * should be compiled using syntax or semantics from a future Python release.
 * They must appear near the top of the module, after the module docstring (if any).
 *
 * Use this in the `header` prop of SourceFile to ensure proper placement.
 *
 * @example
 * ```tsx
 * <SourceFile path="models.py" header={<FutureStatement feature="annotations" />}>
 *   <ClassDeclaration name="User">
 *     <PropertyDeclaration name="manager" type="User" />
 *   </ClassDeclaration>
 * </SourceFile>
 * ```
 * renders to
 * ```py
 * from __future__ import annotations
 *
 *
 * class User:
 *     manager: User
 * ```
 */
export function FutureStatement(props: FutureStatementProps): Children {
  return <>from __future__ import {props.feature}</>;
}
