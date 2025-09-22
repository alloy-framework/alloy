import { Namekey, code } from "@alloy-js/core";
import { abcModule } from "../builtins/python.js";
import { usePythonScope } from "../symbols/scopes.js";
import {
  BaseFunctionDeclaration,
  BaseFunctionDeclarationProps,
  CommonFunctionProps,
} from "./FunctionBase.js";

/**
 * Shared base props for all method-like declarations.
 */
export interface MethodDeclarationBaseProps extends CommonFunctionProps {
  /** Indicates that the method is abstract. */
  abstract?: boolean;
}

/**
 * Validates that the current scope is a member scope (inside a class).
 * Throws an error if used outside of a class body.
 */
export function validateMemberScope(
  name: string | Namekey,
  type: string = "Method",
) {
  const currentScope = usePythonScope();
  if (!currentScope?.isMemberScope) {
    const displayName = typeof name === "string" ? name : name.name;
    throw new Error(
      `${type} "${displayName}" must be declared inside a class (member scope)`,
    );
  }
}

/**
 * Internal base for method-like components.
 *
 * @remarks
 * Applies `@abstractmethod` when requested and delegates to
 * `BaseFunctionDeclaration` for the function/method body.
 *
 * @example
 * ```tsx
 * <MethodDeclarationBase name="do_work" functionType="instance">
 *   return 1
 * </MethodDeclarationBase>
 * ```
 * Generates:
 * ```python
 * def do_work(self):
 *     return 1
 * ```
 */
export function MethodDeclarationBase(
  props: MethodDeclarationBaseProps &
    Pick<BaseFunctionDeclarationProps, "functionType" | "sym">,
) {
  if (!props.sym) {
    validateMemberScope(props.name);
  }

  const abstractMethod =
    props.abstract ?
      <>
        {code`@${abcModule["."].abstractmethod}`}
        <hbr />
      </>
    : undefined;

  return (
    <>
      {abstractMethod}
      <BaseFunctionDeclaration {...props} />
    </>
  );
}
