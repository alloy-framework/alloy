import { Namekey, code } from "@alloy-js/core";
import { abcModule } from "../builtins/python.js";
import { usePythonScope } from "../symbols/scopes.js";
import { BaseFunctionDeclaration, BaseFunctionDeclarationProps, CommonFunctionProps } from "./FunctionBase.js";

export interface MethodDeclarationBaseProps extends CommonFunctionProps {
  /** Indicates that the method is abstract. */
  abstract?: boolean;
}

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

export function MethodDeclarationBase(
  props: MethodDeclarationBaseProps &
    Pick<BaseFunctionDeclarationProps, "functionType" | "sym">,
) {
  if (!props.sym) {
    validateMemberScope(props.name);
  }

  const abstractMethod =
    props.abstract ? (
      <>
        {code`@${abcModule["."].abstractmethod}`}
        <hbr />
      </>
    ) : undefined;

  return (
    <>
      {abstractMethod}
      <BaseFunctionDeclaration {...props} />
    </>
  );
}


