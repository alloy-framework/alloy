import {
  Children,
  Declaration as CoreDeclaration,
  effect,
  mergeTakenSymbolsWith,
  OutputSymbolFlags,
  Show,
} from "@alloy-js/core";
import { useTSNamePolicy } from "../name-policy.js";
import { createTSSymbol, TSSymbolFlags } from "../symbols/index.js";
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
  const baseSym = createTSSymbol({
    flags: OutputSymbolFlags.Transient,
    name: name,
    refkey: props.refkey,
    default: props.default,
    export: props.export,
    metadata: props.metadata,
    tsFlags: props.nullish ? TSSymbolFlags.Nullish : TSSymbolFlags.None,
  });

  const sym = mergeTakenSymbolsWith(baseSym);

  effect(() => {
    console.log("Merged symbol");
    if (!sym.value) {
      console.log("Undef");
      return;
    }
    console.log(sym.value.name);
  });
  return (
    <>
      <Show when={Boolean(props.doc)}>
        <JSDoc children={props.doc} />
        <hbr />
      </Show>
      <CoreDeclaration symbol={sym.value}>
        {type} = {props.initializer ?? props.children}
      </CoreDeclaration>
    </>
  );
}
