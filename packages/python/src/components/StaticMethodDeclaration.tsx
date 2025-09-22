import type { CommonFunctionProps } from "./FunctionBase.js";
import { MethodDeclarationBase } from "./MethodBase.js";

/**
 * A Python static method declaration component.
 *
 * @example
 * ```tsx
 * <py.StaticMethodDeclaration name="identity" parameters={[{ name: "value", type: "int" }]}>
 *   return value
 * </py.StaticMethodDeclaration>
 * ```
 * Generates:
 * ```python
 * @staticmethod
 * def identity(value: int) -> None:
 *     return value
 * ```
 */
export interface StaticMethodDeclarationProps extends CommonFunctionProps {
  abstract?: boolean;
}

export function StaticMethodDeclaration(props: StaticMethodDeclarationProps) {
  return (
    <>
      {"@staticmethod"}
      <hbr />
      <MethodDeclarationBase functionType="static" {...props} />
    </>
  );
}
