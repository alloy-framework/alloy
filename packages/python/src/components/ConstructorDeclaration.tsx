import { namekey } from "@alloy-js/core";
import { MethodDeclarationBase } from "./MethodBase.js";
import { CommonFunctionProps } from "./FunctionBase.js";

export interface ConstructorDeclarationProps
  extends Omit<CommonFunctionProps, "name"> {
  abstract?: boolean;
}

export function ConstructorDeclaration(props: ConstructorDeclarationProps) {
  return (
    <MethodDeclarationBase
      {...props}
      name={namekey("__new__", { ignoreNamePolicy: true })}
      functionType="class"
    />
  );
}


