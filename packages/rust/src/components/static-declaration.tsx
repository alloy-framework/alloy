import {
  Children,
  Declaration as CoreDeclaration,
  For,
  Namekey,
  Refkey,
} from "@alloy-js/core";
import { createStaticSymbol } from "../symbols/factories.js";
import {
  type RustVisibilityProps,
  toRustVisibility,
  VisibilityPrefix,
} from "./visibility.js";

export interface StaticDeclarationProps extends RustVisibilityProps {
  name: string | Namekey;
  refkey?: Refkey;
  mutable?: boolean;
  attributes?: Children[];
  type: Children;
  children?: Children;
}

export function StaticDeclaration(props: StaticDeclarationProps) {
  const staticSymbol = createStaticSymbol(props.name, {
    refkeys: props.refkey ? [props.refkey] : [],
  });

  staticSymbol.visibility = toRustVisibility(props.pub);

  const mutabilityPrefix = props.mutable ? "mut " : "";

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
      <CoreDeclaration symbol={staticSymbol}>
        <VisibilityPrefix pub={props.pub} />
        {"static "}
        {mutabilityPrefix}
        {staticSymbol.name}
        {": "}
        {props.type}
        {" = "}
        {props.children}
        {";"}
      </CoreDeclaration>
    </>
  );
}
