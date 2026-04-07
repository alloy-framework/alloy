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
import { ParameterDescriptor } from "../parameter-descriptor.js";
import {
  RustFunctionScope,
  RustImplScope,
  RustTraitScope,
  useRustScope,
} from "../scopes/index.js";
import {
  createFunctionSymbol,
  createMethodSymbol,
} from "../symbols/factories.js";
import { DocComment } from "./doc-comment.js";
import { Parameters } from "./parameters.js";
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

export interface FunctionDeclarationProps extends RustVisibilityProps {
  name: string | Namekey;
  refkey?: Refkey;
  async?: boolean;
  unsafe?: boolean;
  const?: boolean;
  parameters?: readonly ParameterDescriptor[];
  returnType?: Children;
  typeParameters?: TypeParameterProp[];
  whereClause?: Children;
  receiver?: "&self" | "&mut self" | "self" | "none";
  attributes?: Children[];
  doc?: string;
  children?: Children;
}

export function FunctionDeclaration(props: FunctionDeclarationProps) {
  const parentScope = useRustScope();
  const isMethod =
    parentScope instanceof RustImplScope ||
    parentScope instanceof RustTraitScope;
  const effectiveReceiver = isMethod ? (props.receiver ?? "&self") : "none";
  const functionSymbol =
    isMethod ?
      createMethodSymbol(props.name, {
        refkeys: props.refkey ? [props.refkey] : [],
      })
    : createFunctionSymbol(props.name, {
        refkeys: props.refkey ? [props.refkey] : [],
      });
  const functionScope = createScope(
    RustFunctionScope,
    functionSymbol.name,
    parentScope,
    {
      ownerSymbol: functionSymbol,
      binder: parentScope.binder,
    },
  );

  functionSymbol.visibility = toRustVisibility(props.pub);
  functionSymbol.isAsync = props.async ?? false;
  functionSymbol.isUnsafe = props.unsafe ?? false;
  functionSymbol.isConst = props.const ?? false;
  functionSymbol.receiverType =
    effectiveReceiver === "none" ? undefined : effectiveReceiver;

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
      <CoreDeclaration symbol={functionSymbol}>
        <VisibilityPrefix pub={props.pub} />
        {props.async ? "async " : ""}
        {props.unsafe ? "unsafe " : ""}
        {props.const ? "const " : ""}
        {"fn "}
        {functionSymbol.name}
        <Scope value={functionScope}>
          <TypeParameters params={props.typeParameters} />
          {"("}
          {effectiveReceiver !== "none" ?
            <>
              {effectiveReceiver}
              {props.parameters && props.parameters.length > 0 ? ", " : ""}
            </>
          : null}
          <Parameters parameters={props.parameters} wrap={false} />
          {")"}
          {props.returnType ?
            <>
              {" -> "}
              {props.returnType}
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
              {" {"}
              <Indent>{props.children}</Indent>
              <hbr />
              {"}"}
            </>
          : parentScope instanceof RustTraitScope ?
            ";"
          : " {}"}
        </Scope>
      </CoreDeclaration>
    </>
  );
}
