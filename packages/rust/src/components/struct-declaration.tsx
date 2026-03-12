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
import {
  createFieldSymbol,
  createStructSymbol,
  createTypeParameterSymbol,
} from "../symbols/factories.js";
import { DocComment } from "./doc-comment.js";
import { TypeParameterProp, TypeParameters, WhereClause } from "./type-parameters.js";
import { toRustVisibility, toVisibilityPrefix } from "./visibility.js";

export interface StructDeclarationProps {
  name: string;
  refkey?: Refkey;
  pub?: boolean;
  pub_crate?: boolean;
  pub_super?: boolean;
  derives?: (string | Refkey)[];
  attributes?: Children;
  doc?: string;
  typeParameters?: TypeParameterProp[];
  whereClause?: Children;
  tuple?: boolean;
  types?: Children[];
  unit?: boolean;
  children?: Children;
}

export interface FieldProps {
  name: string;
  type: Children;
  refkey?: Refkey;
  pub?: boolean;
  pub_crate?: boolean;
  pub_super?: boolean;
  doc?: string;
}

function DeclareNamedTypeTypeParameters(props: { typeParameters?: TypeParameterProp[] }) {
  const params = props.typeParameters ?? [];
  for (const param of params) {
    if (param.name) {
      createTypeParameterSymbol(param.name);
    }
  }

  return <></>;
}

export function StructDeclaration(props: StructDeclarationProps) {
  const parentScope = useRustScope();
  const structSymbol = createStructSymbol(props.name, {
    refkeys: props.refkey ? [props.refkey] : [],
  });
  const structScope = createScope(RustImplScope, structSymbol, parentScope, {
    binder: parentScope.binder,
  });

  structSymbol.visibility = toRustVisibility(props);
  const visibilityPrefix = toVisibilityPrefix(props);
  const members =
    props.children ?
      (Array.isArray(props.children) ? props.children : [props.children]).filter(
        (child) => !(typeof child === "string" && child.trim().length === 0),
      )
    : [];
  const tupleTypes = props.types ?? [];

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
        <Scope value={structScope}>
          <DeclareNamedTypeTypeParameters typeParameters={props.typeParameters} />
        </Scope>
        {visibilityPrefix}
        {"struct "}
        {structSymbol.name}
        <TypeParameters params={props.typeParameters} />
        {props.whereClause && !props.tuple ? (
          <>
            {" "}
            <WhereClause>{props.whereClause}</WhereClause>
          </>
        ) : null}
        {props.unit ? (
          ";"
        ) : props.tuple ? (
          <>
            {"("}
            <For each={tupleTypes} joiner={", "}>{(type) => type}</For>
            {")"}
            {props.whereClause ? (
              <>
                {" "}
                <WhereClause>{props.whereClause}</WhereClause>
              </>
            ) : null}
            {";"}
          </>
        ) : members.length > 0 ? (
          <>
            {" {"}
            <Scope value={structScope}>
              <Indent>
                <For each={members} joiner={<hbr />}>{(child) => child}</For>
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

export function Field(props: FieldProps) {
  const fieldSymbol = createFieldSymbol(props.name, {
    refkeys: props.refkey ? [props.refkey] : [],
  });
  fieldSymbol.visibility = toRustVisibility(props);
  const visibilityPrefix = toVisibilityPrefix(props);

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
