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
import { createFieldSymbol, createStructSymbol } from "../symbols/factories.js";
import { DocComment } from "./doc-comment.js";
import { TypeParameterProp, TypeParameters, WhereClause } from "./type-parameters.js";

export interface StructDeclarationProps {
  name: string;
  refkey?: Refkey;
  pub?: boolean;
  pub_crate?: boolean;
  derives?: (string | Refkey)[];
  attributes?: Children;
  doc?: string;
  typeParameters?: TypeParameterProp[];
  whereClause?: Children;
  children?: Children;
}

export interface FieldProps {
  name: string;
  type: Children;
  refkey?: Refkey;
  pub?: boolean;
  pub_crate?: boolean;
  doc?: string;
}

export function StructDeclaration(props: StructDeclarationProps) {
  const parentScope = useRustScope();
  const structSymbol = createStructSymbol(props.name, {
    refkeys: props.refkey ? [props.refkey] : [],
  });
  const structScope = createScope(RustImplScope, structSymbol, parentScope, {
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
      <CoreDeclaration symbol={structSymbol}>
        {visibilityPrefix}
        {"struct "}
        {structSymbol.name}
        <TypeParameters params={props.typeParameters} />
        {props.whereClause ? (
          <>
            {" "}
            <WhereClause>{props.whereClause}</WhereClause>
          </>
        ) : null}
        {props.children ? (
          <>
            {" {"}
            <Scope value={structScope}>
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

export function Field(props: FieldProps) {
  const fieldSymbol = createFieldSymbol(props.name, {
    refkeys: props.refkey ? [props.refkey] : [],
  });
  const visibilityPrefix =
    props.pub ? "pub "
    : props.pub_crate ? "pub(crate) "
    : "";

  return (
    <CoreDeclaration symbol={fieldSymbol}>
      {props.doc ? (
        <>
          <DocComment>{props.doc}</DocComment>
          <hbr />
        </>
      ) : null}
      {visibilityPrefix}
      {fieldSymbol.name}
      {": "}
      {props.type}
      {","}
    </CoreDeclaration>
  );
}
