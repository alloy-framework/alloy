import { isNamekey, namekey } from "@alloy-js/core";
import type { CommonFunctionProps } from "./FunctionBase.js";
import { MethodDeclaration } from "./MethodDeclaration.js";

/**
 * A Python dunder method declaration.
 *
 * @example
 * ```tsx
 * <py.DunderMethodDeclaration name="__repr__" returnType="str">
 *   return f"<MyType>"
 * </py.DunderMethodDeclaration>
 * ```
 * Generates:
 * ```python
 * def __repr__(self) -> str:
 *     return f"<MyType>"
 * ```
 */
export interface DunderMethodDeclarationProps extends CommonFunctionProps {
  abstract?: boolean;
}

export function DunderMethodDeclaration(props: DunderMethodDeclarationProps) {
  const finalName =
    isNamekey(props.name) ?
      props.name
    : namekey(props.name as string, { ignoreNamePolicy: true });
  return <MethodDeclaration {...props} name={finalName} />;
}
