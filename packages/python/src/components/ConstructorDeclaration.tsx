import { namekey } from "@alloy-js/core";
import type { CommonFunctionProps } from "./FunctionBase.js";
import { MethodDeclarationBase } from "./MethodBase.js";

/**
 * A Python constructor declaration for `__new__`.
 *
 * @example
 * ```tsx
 * <py.ConstructorDeclaration parameters={[{ name: "value", type: "int" }]}>
 *   pass
 * </py.ConstructorDeclaration>
 * ```
 * Generates:
 * ```python
 * def __new__(cls, value: int):
 *     pass
 * ```
 */
export interface ConstructorDeclarationProps
  extends Omit<CommonFunctionProps, "name"> {
  abstract?: boolean;
}

export function ConstructorDeclaration(props: ConstructorDeclarationProps) {
  return (
    <MethodDeclarationBase
      {...props}
      name={namekey("__new__", { ignoreNamePolicy: true })}
      functionType="class"
    />
  );
}
