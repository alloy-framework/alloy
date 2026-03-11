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
import { DocComment } from "./doc-comment.js";
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
  const variants =
    props.children ?
      (Array.isArray(props.children) ? props.children : [props.children]).filter(
        (child) => !(typeof child === "string" && child.trim().length === 0),
      )
    : [];

  return (
    <>
      {props.doc ? (
        <>
          <DocComment>{props.doc}</DocComment>
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
        {variants.length > 0 ? (
          <>
            {" {"}
            <Scope value={enumScope}>
              <Indent>
                <For each={variants} joiner={<hbr />}>{(child) => child}</For>
              </Indent>
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

  const members =
    props.children ?
      (Array.isArray(props.children) ? props.children : [props.children]).filter(
        (child) => !(typeof child === "string" && child.trim().length === 0),
      )
    : [];

  return (
    <CoreDeclaration symbol={variantSymbol}>
      {props.doc ? (
        <>
          <DocComment>{props.doc}</DocComment>
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
      ) : members.length > 0 ? (
        <>
          {" {"}
          <Indent>
            <For each={members} joiner={<hbr />}>{(child) => child}</For>
          </Indent>
          <hbr />
          {"},"}
        </>
      ) : (
        ","
      )}
    </CoreDeclaration>
  );
}
