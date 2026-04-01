import {
  Children,
  Declaration as CoreDeclaration,
  For,
  Indent,
  Namekey,
  Refkey,
  Scope,
  createScope,
} from "@alloy-js/core";
import { RustImplScope, useRustScope } from "../scopes/index.js";
import {
  createEnumSymbol,
  createTypeParameterSymbol,
  createVariantSymbol,
} from "../symbols/factories.js";
import { DocComment } from "./doc-comment.js";
import { TypeParameterProp, TypeParameters } from "./type-parameters.js";
import { toRustVisibility, toVisibilityPrefix } from "./visibility.js";

export interface EnumDeclarationProps {
  name: string | Namekey;
  refkey?: Refkey;
  pub?: boolean;
  pub_crate?: boolean;
  pub_super?: boolean;
  derives?: (string | Refkey)[];
  attributes?: Children;
  doc?: string;
  typeParameters?: TypeParameterProp[];
  children?: Children;
}

export interface EnumVariantProps {
  name: string | Namekey;
  refkey?: Refkey;
  doc?: string;
  kind?: "unit" | "tuple" | "struct";
  fields?: Children[];
  children?: Children;
}

function DeclareNamedTypeTypeParameters(props: {
  typeParameters?: TypeParameterProp[];
}) {
  const params = props.typeParameters ?? [];
  for (const param of params) {
    if (param.name) {
      createTypeParameterSymbol(param.name);
    }
  }

  return <></>;
}

export function EnumDeclaration(props: EnumDeclarationProps) {
  const parentScope = useRustScope();
  const enumSymbol = createEnumSymbol(props.name, {
    refkeys: props.refkey ? [props.refkey] : [],
  });
  const enumScope = createScope(RustImplScope, enumSymbol, parentScope, {
    binder: parentScope.binder,
  });
  enumSymbol.visibility = toRustVisibility(props);
  const visibilityPrefix = toVisibilityPrefix(props);
  const variants =
    props.children ?
      (Array.isArray(props.children) ?
        props.children
      : [props.children]
      ).filter(
        (child) => !(typeof child === "string" && child.trim().length === 0),
      )
    : [];

  return (
    <>
      {props.doc ?
        <>
          <DocComment>{props.doc}</DocComment>
        </>
      : null}
      {props.attributes ?
        <>
          {props.attributes}
          <hbr />
        </>
      : null}
      {props.derives && props.derives.length > 0 ?
        <>
          {"#[derive("}
          <For each={props.derives} joiner={", "}>
            {(derive) => derive}
          </For>
          {")]"}
          <hbr />
        </>
      : null}
      <CoreDeclaration symbol={enumSymbol}>
        <Scope value={enumScope}>
          <DeclareNamedTypeTypeParameters
            typeParameters={props.typeParameters}
          />
        </Scope>
        {visibilityPrefix}
        {"enum "}
        {enumSymbol.name}
        <TypeParameters params={props.typeParameters} />
        {variants.length > 0 ?
          <>
            {" {"}
            <Scope value={enumScope}>
              <Indent>
                <For each={variants} joiner={<hbr />}>
                  {(child) => child}
                </For>
              </Indent>
            </Scope>
            <hbr />
            {"}"}
          </>
        : " {}"}
      </CoreDeclaration>
    </>
  );
}

export function EnumVariant(props: EnumVariantProps) {
  const variantSymbol = createVariantSymbol(props.name, {
    refkeys: props.refkey ? [props.refkey] : [],
  });

  const tupleFields = (props.fields ?? []).filter(
    (field) => !(typeof field === "string" && field.trim().length === 0),
  );
  const members =
    props.children ?
      (Array.isArray(props.children) ?
        props.children
      : [props.children]
      ).filter(
        (child) => !(typeof child === "string" && child.trim().length === 0),
      )
    : [];
  const variantKind =
    props.kind ??
    (tupleFields.length > 0 ? "tuple"
    : members.length > 0 ? "struct"
    : "unit");
  const tupleValues = tupleFields.length > 0 ? tupleFields : members;

  return (
    <CoreDeclaration symbol={variantSymbol}>
      {props.doc ?
        <>
          <DocComment>{props.doc}</DocComment>
        </>
      : null}
      {variantSymbol.name}
      {variantKind === "tuple" && tupleValues.length > 0 ?
        <>
          {"("}
          <For each={tupleValues} joiner={", "}>
            {(field) => field}
          </For>
          {"),"}
        </>
      : variantKind === "struct" ?
        <>
          {" {"}
          <Indent>
            <For each={members} joiner={<hbr />}>
              {(child) => child}
            </For>
          </Indent>
          <hbr />
          {"},"}
        </>
      : ","}
    </CoreDeclaration>
  );
}
