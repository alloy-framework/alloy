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
import { toRustVisibility, toVisibilityPrefix } from "./visibility.js";

export interface TraitDeclarationProps {
  name: string | Namekey;
  refkey?: Refkey;
  pub?: boolean;
  pub_crate?: boolean;
  pub_super?: boolean;
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

  traitSymbol.visibility = toRustVisibility(props);
  const visibilityPrefix = toVisibilityPrefix(props);

  return (
    <>
      {props.doc ?
        <>
          <DocComment>{props.doc}</DocComment>
        </>
      : null}
      <CoreDeclaration symbol={traitSymbol}>
        {visibilityPrefix}
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
