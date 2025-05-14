import {
  Children,
  Declaration as CoreDeclaration,
  moveTakenMembersTo,
  Name,
  Show,
} from "@alloy-js/core";
import { useTSNamePolicy } from "../name-policy.js";
import { TSOutputSymbol, TSSymbolFlags } from "../symbols/ts-output-symbol.js";
import { BaseDeclarationProps } from "./Declaration.js";
import { JSDoc } from "./JSDoc.jsx";
import { TypeRefContext } from "./TypeRefContext.jsx";

export interface VarDeclarationProps extends BaseDeclarationProps {
  const?: boolean;
  let?: boolean;
  var?: boolean;
  initializer?: Children;
  type?: Children;
  nullish?: boolean;
}

export function VarDeclaration(props: VarDeclarationProps) {
  const keyword =
    props.var ? "var"
    : props.let ? "let"
    : "const";
  const type =
    props.type ? <TypeRefContext>: {props.type}</TypeRefContext> : undefined;
  const name = useTSNamePolicy().getName(props.name, "variable");
  const sym = new TSOutputSymbol(name, {
    refkeys: props.refkey,
    default: props.default,
    export: props.export,
    metadata: props.metadata,
    tsFlags: props.nullish ? TSSymbolFlags.Nullish : TSSymbolFlags.None,
  });

  moveTakenMembersTo(sym);

  return (
    <>
      <Show when={Boolean(props.doc)}>
        <JSDoc children={props.doc} />
        <hbr />
      </Show>
      <CoreDeclaration symbol={sym}>
        {props.export ? "export " : ""}
        {props.default ? "default " : ""}
        {keyword} <Name />
        {type} = {props.initializer ?? props.children}
      </CoreDeclaration>
    </>
  );
}
