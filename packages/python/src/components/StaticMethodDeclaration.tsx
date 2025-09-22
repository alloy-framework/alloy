import { MethodDeclarationBase } from "./MethodBase.js";
import { CommonFunctionProps } from "./FunctionBase.js";

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


