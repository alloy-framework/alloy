import {
  Children,
  code,
  Declaration as CoreDeclaration,
  createScope,
  For,
  Indent,
  Namekey,
  Refkey,
  Scope,
} from "@alloy-js/core";
import { RustTraitScope, useRustScope } from "../scopes/index.js";
import { createTraitSymbol } from "../symbols/factories.js";
import { DocComment } from "./doc-comment.js";
import {
  TypeParameterProp,
  TypeParameters,
  WhereClause,
} from "./type-parameters.js";
import {
  type RustVisibilityProps,
  toRustVisibility,
  VisibilityPrefix,
} from "./visibility.js";

export interface TraitDeclarationProps extends RustVisibilityProps {
  name: string | Namekey;
  refkey?: Refkey;
  typeParameters?: TypeParameterProp[];
  supertraits?: Children[];
  whereClause?: Children;
  attributes?: Children[];
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

  traitSymbol.visibility = toRustVisibility(props.pub);

  return (
    <>
      {props.doc ?
        <>
          <DocComment>{props.doc}</DocComment>
        </>
      : null}
      {props.attributes && props.attributes.length > 0 ?
        <>
          <For each={props.attributes} line>
            {(attr) => attr}
          </For>
          <hbr />
        </>
      : null}
      <CoreDeclaration symbol={traitSymbol}>
        <VisibilityPrefix pub={props.pub} />
        {code`trait `}
        {traitSymbol.name}
        <TypeParameters params={props.typeParameters} />
        {props.supertraits && props.supertraits.length > 0 ?
          <>
            {code`: `}
            <For each={props.supertraits} joiner={code` + `}>
              {(supertrait) => supertrait}
            </For>
          </>
        : null}
        {props.whereClause ?
          <>
            {" "}
            <WhereClause>{props.whereClause}</WhereClause>
          </>
        : null}
        {props.children ?
          <>
            {code` {`}
            <Scope value={traitScope}>
              <Indent>{props.children}</Indent>
            </Scope>
            <hbr />
            {code`}`}
          </>
        : code` {}`}
      </CoreDeclaration>
    </>
  );
}
