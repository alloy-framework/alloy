import {
  Children,
  Declaration as CoreDeclaration,
  Indent,
  Refkey,
  Scope,
  createScope,
} from "@alloy-js/core";
import { ParameterDescriptor } from "../parameter-descriptor.js";
import { RustFunctionScope, RustImplScope, RustTraitScope, useRustScope } from "../scopes/index.js";
import { createFunctionSymbol, createMethodSymbol } from "../symbols/factories.js";
import { DocComment } from "./doc-comment.js";
import { TypeParameterProp, TypeParameters, WhereClause } from "./type-parameters.js";
import { Parameters } from "./parameters.js";

export interface FunctionDeclarationProps {
  name: string;
  refkey?: Refkey;
  pub?: boolean;
  pub_crate?: boolean;
  async?: boolean;
  unsafe?: boolean;
  const?: boolean;
  parameters?: readonly ParameterDescriptor[];
  returnType?: Children;
  typeParameters?: TypeParameterProp[];
  whereClause?: Children;
  receiver?: "&self" | "&mut self" | "self" | "none";
  doc?: string;
  children?: Children;
}

export function FunctionDeclaration(props: FunctionDeclarationProps) {
  const parentScope = useRustScope();
  const isMethod = parentScope instanceof RustImplScope || parentScope instanceof RustTraitScope;
  const effectiveReceiver = isMethod ? (props.receiver ?? "&self") : "none";
  const functionSymbol =
    isMethod ?
      createMethodSymbol(props.name, {
        refkeys: props.refkey ? [props.refkey] : [],
      })
    : createFunctionSymbol(props.name, {
        refkeys: props.refkey ? [props.refkey] : [],
      });
  const functionScope = createScope(RustFunctionScope, functionSymbol.name, parentScope, {
    ownerSymbol: functionSymbol,
    binder: parentScope.binder,
  });

  functionSymbol.visibility =
    props.pub ? "pub"
    : props.pub_crate ? "pub(crate)"
    : undefined;
  functionSymbol.isAsync = props.async ?? false;
  functionSymbol.isUnsafe = props.unsafe ?? false;
  functionSymbol.isConst = props.const ?? false;
  functionSymbol.receiverType = effectiveReceiver === "none" ? undefined : effectiveReceiver;

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
      <CoreDeclaration symbol={functionSymbol}>
        {visibilityPrefix}
        {props.async ? "async " : ""}
        {props.unsafe ? "unsafe " : ""}
        {props.const ? "const " : ""}
        {"fn "}
        {functionSymbol.name}
        <Scope value={functionScope}>
          <TypeParameters params={props.typeParameters} />
          {"("}
          {effectiveReceiver !== "none" ? (
            <>
              {effectiveReceiver}
              {props.parameters && props.parameters.length > 0 ? ", " : ""}
            </>
          ) : null}
          <Parameters parameters={props.parameters} wrap={false} />
          {")"}
          {props.returnType ? (
            <>
              {" -> "}
              {props.returnType}
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
              {" {"}
              <Indent>{props.children}</Indent>
              <hbr />
              {"}"}
            </>
          ) : parentScope instanceof RustTraitScope ? ";" : " {}"}
        </Scope>
      </CoreDeclaration>
    </>
  );
}
