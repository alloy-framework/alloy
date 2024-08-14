import { Children } from "@alloy-js/core";
import { useTSNamePolicy } from "../name-policy.js";
import { Declaration, DeclarationProps } from "./Declaration.js";
import { Name } from "./Name.js";

export interface VarDeclarationProps extends Omit<DeclarationProps, "kind"> {
  const?: boolean;
  let?: boolean;
  var?: boolean;
  value?: Children;
  type?: Children;
}

export function VarDeclaration(props: VarDeclarationProps) {
  const keyword =
    props.var ? "var"
    : props.let ? "let"
    : "const";
  const type = props.type ? <>: {props.type}</> : undefined;
  const name = useTSNamePolicy().getName(props.name, "variable");
  return <Declaration {... props} name={name} kind="variable">
    {keyword} <Name />{type} = {props.value ?? props.children};
  </Declaration>;
}
