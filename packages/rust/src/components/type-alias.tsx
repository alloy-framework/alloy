import {
  Children,
  Declaration as CoreDeclaration,
  Namekey,
  Refkey,
} from "@alloy-js/core";
import { createTypeAliasSymbol } from "../symbols/factories.js";
import { TypeParameterProp, TypeParameters } from "./type-parameters.js";
import { toRustVisibility, toVisibilityPrefix } from "./visibility.js";

export interface TypeAliasProps {
  name: string | Namekey;
  refkey?: Refkey;
  pub?: boolean;
  pub_crate?: boolean;
  pub_super?: boolean;
  typeParameters?: TypeParameterProp[];
  children?: Children;
}

export function TypeAlias(props: TypeAliasProps) {
  const typeAliasSymbol = createTypeAliasSymbol(props.name, {
    refkeys: props.refkey ? [props.refkey] : [],
  });

  typeAliasSymbol.visibility = toRustVisibility(props);

  const visibilityPrefix = toVisibilityPrefix(props);

  return (
    <CoreDeclaration symbol={typeAliasSymbol}>
      {visibilityPrefix}
      {"type "}
      {typeAliasSymbol.name}
      <TypeParameters params={props.typeParameters} />
      {" = "}
      {props.children}
      {";"}
    </CoreDeclaration>
  );
}
