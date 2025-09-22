import { isNamekey, namekey } from "@alloy-js/core";
import { MethodDeclaration } from "./MethodDeclaration.js";
import { CommonFunctionProps } from "./FunctionBase.js";

export interface DunderMethodDeclarationProps extends CommonFunctionProps {
  abstract?: boolean;
}

export function DunderMethodDeclaration(props: DunderMethodDeclarationProps) {
  const finalName = isNamekey(props.name)
    ? props.name
    : namekey(props.name as string, { ignoreNamePolicy: true });
  return <MethodDeclaration {...props} name={finalName} />;
}


