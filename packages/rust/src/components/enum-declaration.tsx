import {
  Children,
  Declaration as CoreDeclaration,
  For,
  Indent,
  Refkey,
  Scope,
  createScope,
} from "@alloy-js/core";
import { RustImplScope, useRustScope } from "../scopes/index.js";
import { createEnumSymbol, createVariantSymbol } from "../symbols/factories.js";
import { TypeParameterProp, TypeParameters } from "./type-parameters.js";

export interface EnumDeclarationProps {
  name: string;
  refkey?: Refkey;
  pub?: boolean;
  pub_crate?: boolean;
  derives?: (string | Refkey)[];
  attributes?: Children;
  doc?: string;
  typeParameters?: TypeParameterProp[];
  children?: Children;
}

export interface EnumVariantProps {
  name: string;
  refkey?: Refkey;
  doc?: string;
  fields?: Children[];
  children?: Children;
}

export function EnumDeclaration(props: EnumDeclarationProps) {
  const parentScope = useRustScope();
  const enumSymbol = createEnumSymbol(props.name, {
    refkeys: props.refkey ? [props.refkey] : [],
  });
  const enumScope = createScope(RustImplScope, enumSymbol, parentScope, {
    binder: parentScope.binder,
  });
  const visibilityPrefix =
    props.pub ? "pub "
    : props.pub_crate ? "pub(crate) "
    : "";

  return (
    <>
      {props.doc ? (
        <>
          {"/// "}
          {props.doc}
          <hbr />
        </>
      ) : null}
      {props.attributes ? (
        <>
          {props.attributes}
          <hbr />
        </>
      ) : null}
      {props.derives && props.derives.length > 0 ? (
        <>
          {"#[derive("}
          <For each={props.derives} joiner={", "}>{(derive) => derive}</For>
          {")]"}
          <hbr />
        </>
      ) : null}
      <CoreDeclaration symbol={enumSymbol}>
        {visibilityPrefix}
        {"enum "}
        {enumSymbol.name}
        <TypeParameters params={props.typeParameters} />
        {props.children ? (
          <>
            {" {"}
            <Scope value={enumScope}>
              <Indent>{props.children}</Indent>
            </Scope>
            <hbr />
            {"}"}
          </>
        ) : " {}"}
      </CoreDeclaration>
    </>
  );
}

export function EnumVariant(props: EnumVariantProps) {
  const variantSymbol = createVariantSymbol(props.name, {
    refkeys: props.refkey ? [props.refkey] : [],
  });

  return (
    <CoreDeclaration symbol={variantSymbol}>
      {props.doc ? (
        <>
          {"/// "}
          {props.doc}
          <hbr />
        </>
      ) : null}
      {variantSymbol.name}
      {props.fields && props.fields.length > 0 ? (
        <>
          {"("}
          <For each={props.fields} joiner={", "}>{(field) => field}</For>
          {"),"}
        </>
      ) : props.children ? (
        <>
          {" {"}
          <Indent>{props.children}</Indent>
          <hbr />
          {"},"}
        </>
      ) : (
        ","
      )}
    </CoreDeclaration>
  );
}
