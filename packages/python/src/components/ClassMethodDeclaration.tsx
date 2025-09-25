import { createMethodSymbol } from "../symbols/factories.js";
import type { CommonFunctionProps } from "./FunctionBase.js";
import { MethodDeclarationBase } from "./MethodBase.js";

/**
 * A Python class method declaration component.
 *
 * @example
 * ```tsx
 * <py.ClassMethodDeclaration name="create" parameters={[{ name: "value", type: "str" }]}>
 *   return cls(value)
 * </py.ClassMethodDeclaration>
 * ```
 * Generates:
 * ```python
 * @classmethod
 * def create(cls, value: str) -> None:
 *     return cls(value)
 * ```
 */
export interface ClassMethodDeclarationProps extends CommonFunctionProps {
  abstract?: boolean;
}

export function ClassMethodDeclaration(props: ClassMethodDeclarationProps) {
  const sym = createMethodSymbol(props.name, { refkeys: props.refkey });
  return (
    <>
      {"@classmethod"}
      <hbr />
      <MethodDeclarationBase functionType="class" {...props} sym={sym} />
    </>
  );
}
