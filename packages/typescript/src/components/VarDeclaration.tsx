import {
  Children,
  Declaration as CoreDeclaration,
  createSymbolSlot,
  effect,
  Name,
  Show,
} from "@alloy-js/core";
import { useTSNamePolicy } from "../name-policy.js";
import { createValueSymbol } from "../symbols/index.js";
import { TSSymbolFlags } from "../symbols/ts-output-symbol.js";
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
  const TypeSymbolSlot = createSymbolSlot();
  const ValueTypeSymbolSlot = createSymbolSlot();

  effect(() => {
    if (TypeSymbolSlot.ref.value) {
      const takenSymbols = TypeSymbolSlot.ref.value;
      for (const symbol of takenSymbols) {
        symbol.instantiateTo(sym, "static", "instance");
      }
    } else if (ValueTypeSymbolSlot.ref.value) {
      const takenSymbols = ValueTypeSymbolSlot.ref.value;
      for (const symbol of takenSymbols) {
        // ignore non-transient symbols (likely not the result of an
        // expression).
        if (symbol.isTransient) {
          symbol.moveMembersTo(sym);
        }
      }
    }
  });

  const keyword =
    props.var ? "var"
    : props.let ? "let"
    : "const";
  const type =
    props.type ?
      <TypeRefContext>
        : <TypeSymbolSlot>{props.type}</TypeSymbolSlot>
      </TypeRefContext>
    : undefined;
  const name = useTSNamePolicy().getName(props.name, "variable");
  const sym = createValueSymbol(name, {
    refkeys: props.refkey,
    default: props.default,
    export: props.export,
    metadata: props.metadata,
    tsFlags: props.nullish ? TSSymbolFlags.Nullish : TSSymbolFlags.None,
  });

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
        {type} ={" "}
        <ValueTypeSymbolSlot>
          {props.initializer ?? props.children}
        </ValueTypeSymbolSlot>
      </CoreDeclaration>
    </>
  );
}
