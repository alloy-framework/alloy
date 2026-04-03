import {
  Children,
  Declaration as CoreDeclaration,
  For,
  Refkey,
} from "@alloy-js/core";
import { createConstSymbol } from "../symbols/factories.js";
import { toRustVisibility, toVisibilityPrefix } from "./visibility.js";

export interface ConstDeclarationProps {
  name: string;
  refkey?: Refkey;
  pub?: boolean;
  pub_crate?: boolean;
  pub_super?: boolean;
  attributes?: Children[];
  type: Children;
  children?: Children;
}

export function ConstDeclaration(props: ConstDeclarationProps) {
  const constSymbol = createConstSymbol(props.name, {
    refkeys: props.refkey ? [props.refkey] : [],
  });

  constSymbol.visibility = toRustVisibility(props);

  const visibilityPrefix = toVisibilityPrefix(props);

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
        {visibilityPrefix}
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
