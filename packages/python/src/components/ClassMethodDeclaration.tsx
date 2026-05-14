import { createMethodSymbol } from "../symbols/factories.js";
import { DecoratorList } from "./DecoratorList.jsx";
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
 *
 * @remarks
 * Use **`decorators`** for decorators that must appear above `@classmethod`
 * (for example Pydantic `@field_validator`).
 */
export interface ClassMethodDeclarationProps extends CommonFunctionProps {
  abstract?: boolean;
}

export function ClassMethodDeclaration(props: ClassMethodDeclarationProps) {
  const sym = createMethodSymbol(props.name, { refkeys: props.refkey });
  const { decorators, ...rest } = props;
  return (
    <>
      <DecoratorList decorators={decorators} />
      {"@classmethod"}
      <hbr />
      <MethodDeclarationBase functionType="class" {...rest} sym={sym} />
    </>
  );
}
