import {
  Children,
  Declaration as CoreDeclaration,
  For,
  Namekey,
  Refkey,
} from "@alloy-js/core";
import { createConstSymbol } from "../symbols/factories.js";
import {
  type RustVisibilityProps,
  toRustVisibility,
  VisibilityPrefix,
} from "./visibility.js";

export interface ConstDeclarationProps extends RustVisibilityProps {
  name: string | Namekey;
  refkey?: Refkey;
  attributes?: Children[];
  type: Children;
  children?: Children;
}

export function ConstDeclaration(props: ConstDeclarationProps) {
  const constSymbol = createConstSymbol(props.name, {
    refkeys: props.refkey ? [props.refkey] : [],
  });

  constSymbol.visibility = toRustVisibility(props.pub);

  return (
    <>
      {props.attributes && props.attributes.length > 0 ?
        <>
          <For each={props.attributes} line>
            {(attr) => attr}
          </For>
          <hbr />
        </>
      : null}
      <CoreDeclaration symbol={constSymbol}>
        <VisibilityPrefix pub={props.pub} />
        {"const "}
        {constSymbol.name}
        {": "}
        {props.type}
        {" = "}
        {props.children}
        {";"}
      </CoreDeclaration>
    </>
  );
}
