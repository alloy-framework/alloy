import { type Children } from "@alloy-js/core";

export interface FutureStatementProps {
  /**
   * The name of the feature to import from __future__.
   */
  feature: string;
}

/**
 * A future statement that imports features from __future__.
 *
 * Future statements are directives to the compiler that a particular module
 * should be compiled using syntax or semantics from a future Python release.
 * They must appear near the top of the module, after the module docstring (if any).
 *
 * Use this in the `futureImports` prop of SourceFile to ensure proper placement.
 *
 * @example
 * ```tsx
 * <SourceFile path="models.py" futureImports={<FutureStatement feature="annotations" />}>
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
