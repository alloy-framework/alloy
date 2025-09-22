import { CommonFunctionProps } from "./FunctionBase.js";
import { MethodDeclarationBase } from "./MethodBase.js";

export interface MethodDeclarationBaseProps extends CommonFunctionProps {
  abstract?: boolean;
}

export function MethodDeclaration(props: MethodDeclarationBaseProps) {
  return <MethodDeclarationBase functionType="instance" {...props} />;
}


