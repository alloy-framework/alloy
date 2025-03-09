import {
  AssignmentContext,
  Children,
  Declaration as CoreDeclaration,
  createAssignmentContext,
  Name,
} from "@alloy-js/core";
import { useTSNamePolicy } from "../name-policy.js";
import { createTSSymbol } from "../symbols/index.js";
import { BaseDeclarationProps } from "./Declaration.js";

export interface VarDeclarationProps extends BaseDeclarationProps {
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
  const sym = createTSSymbol({
    name: name,
    refkey: props.refkey,
    refkeys: props.refkeys,
    default: props.default,
    export: props.export,
  });

  const assignmentContext = createAssignmentContext(sym);

  return (
    <CoreDeclaration symbol={sym}>
      {props.export ? "export " : ""}
      {props.default ? "default " : ""}
      {keyword} <Name />
      {type} ={" "}
      <AssignmentContext.Provider value={assignmentContext}>
        {props.value ?? props.children}
      </AssignmentContext.Provider>
    </CoreDeclaration>
  );
}
