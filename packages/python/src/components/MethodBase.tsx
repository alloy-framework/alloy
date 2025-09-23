import { abcModule } from "../builtins/python.js";
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
  const abstractMethod =
    props.abstract ?
      <>
        @{abcModule["."].abstractmethod}
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
