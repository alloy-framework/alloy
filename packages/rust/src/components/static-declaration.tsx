import {
  Children,
  Declaration as CoreDeclaration,
  Namekey,
  Refkey,
} from "@alloy-js/core";
import { createStaticSymbol } from "../symbols/factories.js";
import { toRustVisibility, toVisibilityPrefix } from "./visibility.js";

export interface StaticDeclarationProps {
  name: string | Namekey;
  refkey?: Refkey;
  pub?: boolean;
  pub_crate?: boolean;
  pub_super?: boolean;
  mutable?: boolean;
  type: Children;
  children?: Children;
}

export function StaticDeclaration(props: StaticDeclarationProps) {
  const staticSymbol = createStaticSymbol(props.name, {
    refkeys: props.refkey ? [props.refkey] : [],
  });

  staticSymbol.visibility = toRustVisibility(props);

  const visibilityPrefix = toVisibilityPrefix(props);

  const mutabilityPrefix = props.mutable ? "mut " : "";

  return (
    <CoreDeclaration symbol={staticSymbol}>
      {visibilityPrefix}
      {"static "}
      {mutabilityPrefix}
      {staticSymbol.name}
      {": "}
      {props.type}
      {" = "}
      {props.children}
      {";"}
    </CoreDeclaration>
  );
}
