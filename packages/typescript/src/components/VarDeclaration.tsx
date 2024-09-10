import {
  Children,
  ComponentContext,
  Declaration as CoreDeclaration,
  createContext,
  refkey,
} from "@alloy-js/core";
import { useTSNamePolicy } from "../name-policy.js";
import { createTSSymbol, TSOutputSymbol } from "../symbols/index.js";
import { BaseDeclarationProps } from "./Declaration.js";
import { Name } from "./Name.js";

export interface VarDeclarationProps extends BaseDeclarationProps {
  const?: boolean;
  let?: boolean;
  var?: boolean;
  value?: Children;
  type?: Children;
}

export interface AssignmentContext {
  target: TSOutputSymbol;
}

/**
 * AssignmentContext tracks the target of an assignment. Value-producing
 * expressions that need symbol tracking should check to see if they are in
 * assignment context and if so handle it appropriately. Expressions which do
 * not need symbol tracking should unset assignment context so expressions
 * contained within them don't inadvertantly expose symbols.
 */
export const AssignmentContext: ComponentContext<AssignmentContext> =
  createContext();

export function VarDeclaration(props: VarDeclarationProps) {
  const keyword =
    props.var ? "var"
    : props.let ? "let"
    : "const";
  const type = props.type ? <>: {props.type}</> : undefined;
  const name = useTSNamePolicy().getName(props.name, "variable");
  const sym = createTSSymbol({
    name: name,
    refkey: props.refkey ?? refkey(name),
    default: props.default,
    export: props.export,
  });

  const assignmentContext: AssignmentContext = {
    target: sym,
  };

  return <CoreDeclaration symbol={sym}>
    {props.export ? "export " : ""}{props.default ? "default " : ""}{keyword} <Name />{type} = <AssignmentContext.Provider value={assignmentContext}>
      {props.value ?? props.children};
    </AssignmentContext.Provider>
  </CoreDeclaration>;
}
