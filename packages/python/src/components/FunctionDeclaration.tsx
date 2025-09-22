import type { CommonFunctionProps } from "./FunctionBase.js";
import { BaseFunctionDeclaration } from "./FunctionBase.js";

// Types are sourced from FunctionBase to avoid duplicate exports

// Clean public interface extending common properties
export interface FunctionDeclarationProps extends CommonFunctionProps {}

/**
 * A Python function declaration.
 *
 * @example
 * ```tsx
 * <FunctionDeclaration
 *   name="my_function"
 *   returnType="int"
 *   parameters={[{ name: "a", type: { children: "int" } }, { name: "b", type: { children: "str" } }]}
 * >
 *   return a + b
 * </FunctionDeclaration>
 * ```
 * This will generate:
 * ```python
 * def my_function(a: int, b: str) -> int:
 *     return a + b
 * ```
 *
 * @remarks
 * This component creates a Python function declaration with optional type annotations,
 * parameters, and return types. It supports async functions and automatically
 * handles symbol creation and emission.
 */
export function FunctionDeclaration(props: FunctionDeclarationProps) {
  return <BaseFunctionDeclaration {...props} />;
}
