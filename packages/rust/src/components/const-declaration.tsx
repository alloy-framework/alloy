import {
  Children,
  Declaration as CoreDeclaration,
  Namekey,
  Refkey,
} from "@alloy-js/core";
import { createConstSymbol } from "../symbols/factories.js";
import { toRustVisibility, toVisibilityPrefix } from "./visibility.js";

export interface ConstDeclarationProps {
  name: string | Namekey;
  refkey?: Refkey;
  pub?: boolean;
  pub_crate?: boolean;
  pub_super?: boolean;
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
  );
}
