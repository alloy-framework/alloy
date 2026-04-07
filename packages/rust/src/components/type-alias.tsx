import {
  Children,
  Declaration as CoreDeclaration,
  For,
  Namekey,
  Refkey,
} from "@alloy-js/core";
import { createTypeAliasSymbol } from "../symbols/factories.js";
import { TypeParameterProp, TypeParameters } from "./type-parameters.js";
import {
  type RustVisibilityProps,
  toRustVisibility,
  VisibilityPrefix,
} from "./visibility.js";

export interface TypeAliasProps extends RustVisibilityProps {
  name: string | Namekey;
  refkey?: Refkey;
  attributes?: Children[];
  typeParameters?: TypeParameterProp[];
  children?: Children;
}

export function TypeAlias(props: TypeAliasProps) {
  const typeAliasSymbol = createTypeAliasSymbol(props.name, {
    refkeys: props.refkey ? [props.refkey] : [],
  });

  typeAliasSymbol.visibility = toRustVisibility(props.pub);

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
      <CoreDeclaration symbol={typeAliasSymbol}>
        <VisibilityPrefix pub={props.pub} />
        {"type "}
        {typeAliasSymbol.name}
        <TypeParameters params={props.typeParameters} />
        {" = "}
        {props.children}
        {";"}
      </CoreDeclaration>
    </>
  );
}
