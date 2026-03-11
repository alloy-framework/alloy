import {
  Children,
  code,
  Declaration as CoreDeclaration,
  For,
  Indent,
  Refkey,
  Scope,
  createScope,
} from "@alloy-js/core";
import { RustTraitScope, useRustScope } from "../scopes/index.js";
import { createTraitSymbol } from "../symbols/factories.js";
import { DocComment } from "./doc-comment.js";
import { TypeParameterProp, TypeParameters, WhereClause } from "./type-parameters.js";

export interface TraitDeclarationProps {
  name: string;
  refkey?: Refkey;
  pub?: boolean;
  typeParameters?: TypeParameterProp[];
  supertraits?: Children[];
  whereClause?: Children;
  doc?: Children;
  children?: Children;
}

export function TraitDeclaration(props: TraitDeclarationProps) {
  const parentScope = useRustScope();
  const traitSymbol = createTraitSymbol(props.name, {
    refkeys: props.refkey ? [props.refkey] : [],
  });
  const traitScope = createScope(RustTraitScope, traitSymbol, parentScope, {
    binder: parentScope.binder,
  });

  traitSymbol.visibility = props.pub ? "pub" : undefined;

  return (
    <>
      {props.doc ? (
        <>
          <DocComment>{props.doc}</DocComment>
          <hbr />
        </>
      ) : null}
      <CoreDeclaration symbol={traitSymbol}>
        {props.pub ? code`pub ` : null}
        {code`trait `}
        {traitSymbol.name}
        <TypeParameters params={props.typeParameters} />
        {props.supertraits && props.supertraits.length > 0 ? (
          <>
            {code`: `}
            <For each={props.supertraits} joiner={code` + `}>
              {(supertrait) => supertrait}
            </For>
          </>
        ) : null}
        {props.whereClause ? (
          <>
            {" "}
            <WhereClause>{props.whereClause}</WhereClause>
          </>
        ) : null}
        {props.children ? (
          <>
            {code` {`}
            <Scope value={traitScope}>
              <Indent>{props.children}</Indent>
            </Scope>
            <hbr />
            {code`}`}
          </>
        ) : code` {}`}
      </CoreDeclaration>
    </>
  );
}
