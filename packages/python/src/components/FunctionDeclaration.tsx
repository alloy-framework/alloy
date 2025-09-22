import { BaseFunctionDeclaration } from "./FunctionBase.js";
import type { CallSignatureProps } from "./CallSignature.jsx";
import type { BaseDeclarationProps } from "./Declaration.js";

/**
 * Shared base interface for common function properties.
 * Useful for creating custom function-like components.
 */
export interface CommonFunctionProps
  extends BaseDeclarationProps,
    CallSignatureProps {
  /**
   * Indicates that the function is async.
   */
  async?: boolean;
}

export type BaseFunctionDeclarationProps = import("./FunctionBase.js").BaseFunctionDeclarationProps;

// Clean public interface extending common properties
export interface FunctionDeclarationProps extends CommonFunctionProps {}

/**
 * Base props interface for all method declarations.
 */
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

