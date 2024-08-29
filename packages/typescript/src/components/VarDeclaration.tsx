import {
  Children,
  createContext,
  refkey,
  Declaration as CoreDeclaration,
} from "@alloy-js/core";
import { useTSNamePolicy } from "../name-policy.js";
import { Declaration, DeclarationProps } from "./Declaration.js";
import { Name } from "./Name.js";
import {
  createTSSymbol,
  TSOutputSymbol,
  TSSymbolFlags,
} from "../symbols/index.js";

export interface VarDeclarationProps
  extends Omit<DeclarationProps, "nameKind"> {
  const?: boolean;
  let?: boolean;
  var?: boolean;
  value?: Children;
  type?: Children;
}

/**
 * AssignmentContext tracks the target of an assignment. Value-producing
 * expressions that need symbol tracking should check to see if they are in
 * assignment context and if so handle it appropriately. Expressions which do
 * not need symbol tracking should unset assignment context so expressions
 * contained within them don't inadvertantly expose symbols.
 */
export interface AssignmentContext {
  target: TSOutputSymbol;
}

export const AssignmentContext = createContext<AssignmentContext>();

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
