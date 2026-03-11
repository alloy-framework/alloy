import { Children, Declaration as CoreDeclaration, Refkey } from "@alloy-js/core";
import { createConstSymbol } from "../symbols/factories.js";

export interface ConstDeclarationProps {
  name: string;
  refkey?: Refkey;
  pub?: boolean;
  pub_crate?: boolean;
  type: Children;
  children?: Children;
}

export function ConstDeclaration(props: ConstDeclarationProps) {
  const constSymbol = createConstSymbol(props.name, {
    refkeys: props.refkey ? [props.refkey] : [],
  });

  constSymbol.visibility =
    props.pub ? "pub"
    : props.pub_crate ? "pub(crate)"
    : undefined;

  const visibilityPrefix =
    props.pub ? "pub "
    : props.pub_crate ? "pub(crate) "
    : "";

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
