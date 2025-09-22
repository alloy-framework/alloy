import { createMethodSymbol } from "../symbols/factories.js";
import type { MethodDeclarationBaseProps } from "./MethodBase.js";
import { MethodDeclarationBase } from "./MethodBase.js";

/**
 * A Python instance method declaration component.
 *
 * @example
 * ```tsx
 * <py.MethodDeclaration name="do_work" parameters={[{ name: "value", type: "int" }]}>
 *   return value * 2
 * </py.MethodDeclaration>
 * ```
 * Generates:
 * ```python
 * def do_work(self, value: int) -> None:
 *     return value * 2
 * ```
 *
 * @remarks
 * Automatically injects the `self` parameter for instance methods and enforces
 * that the declaration appears within a class body.
 */
export function MethodDeclaration(props: MethodDeclarationBaseProps) {
  const sym = createMethodSymbol(props.name, { refkeys: props.refkey });
  return <MethodDeclarationBase functionType="instance" {...props} sym={sym} />;
}
