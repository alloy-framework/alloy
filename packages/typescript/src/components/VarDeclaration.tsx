import { Children } from "@alloy-js/core";
import { Declaration, DeclarationProps } from "./Declaration.js";
import { useTSNamePolicy } from "../name-policy.js";

export interface VarDeclarationProps extends DeclarationProps {
  const?: boolean;
  let?: boolean;
  var?: boolean;
  value?: Children;
  type?: Children;
}

export function VarDeclaration(props: VarDeclarationProps) {
  const keyword = props.var ? "var" :
                  props.let ? "let" :
                  "const";
  const type = props.type ? <>: {props.type}</>: undefined;
  const name = useTSNamePolicy().getName(props.name, "variable");
  return <Declaration {... props} name={name}>
    {keyword} {name}{type} = {props.value ?? props.children};
  </Declaration>
}