import { Children, Declaration as CoreDeclaration, Refkey } from "@alloy-js/core";
import { createStaticSymbol } from "../symbols/factories.js";

export interface StaticDeclarationProps {
  name: string;
  refkey?: Refkey;
  pub?: boolean;
  pub_crate?: boolean;
  mutable?: boolean;
  type: Children;
  children?: Children;
}

export function StaticDeclaration(props: StaticDeclarationProps) {
  const staticSymbol = createStaticSymbol(props.name, {
    refkeys: props.refkey ? [props.refkey] : [],
  });

  staticSymbol.visibility =
    props.pub ? "pub"
    : props.pub_crate ? "pub(crate)"
    : undefined;

  const visibilityPrefix =
    props.pub ? "pub "
    : props.pub_crate ? "pub(crate) "
    : "";

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
