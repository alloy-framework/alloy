import { Children, Declaration as CoreDeclaration, Refkey } from "@alloy-js/core";
import { createTypeAliasSymbol } from "../symbols/factories.js";
import { TypeParameterProp, TypeParameters } from "./type-parameters.js";

export interface TypeAliasProps {
  name: string;
  refkey?: Refkey;
  pub?: boolean;
  pub_crate?: boolean;
  typeParameters?: TypeParameterProp[];
  children?: Children;
}

export function TypeAlias(props: TypeAliasProps) {
  const typeAliasSymbol = createTypeAliasSymbol(props.name, {
    refkeys: props.refkey ? [props.refkey] : [],
  });

  typeAliasSymbol.visibility =
    props.pub ? "pub"
    : props.pub_crate ? "pub(crate)"
    : undefined;

  const visibilityPrefix =
    props.pub ? "pub "
    : props.pub_crate ? "pub(crate) "
    : "";

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
