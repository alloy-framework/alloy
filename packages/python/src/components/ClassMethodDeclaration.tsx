import { MethodDeclarationBase } from "./MethodBase.js";
import { CommonFunctionProps } from "./FunctionBase.js";

export interface ClassMethodDeclarationProps extends CommonFunctionProps {
  abstract?: boolean;
}

export function ClassMethodDeclaration(props: ClassMethodDeclarationProps) {
  return (
    <>
      {"@classmethod"}
      <hbr />
      <MethodDeclarationBase functionType="class" {...props} />
    </>
  );
}


