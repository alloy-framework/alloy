import {
  Children,
  Refkey,
  Scope,
  code,
  createScope,
  createSymbol,
  isRefkey,
  unresolvedRefkey,
} from "@alloy-js/core";
import { RustImplScope, RustModuleScope, useRustScope } from "../scopes/index.js";
import { NamedTypeSymbol } from "../symbols/named-type-symbol.js";
import { RustOutputSymbol } from "../symbols/rust-output-symbol.js";
import { Indent } from "@alloy-js/core";
import { TypeParameterProp, TypeParameters, WhereClause } from "./type-parameters.js";

export type TypeParameterProps = TypeParameterProp;

export interface ImplBlockProps {
  type: Refkey | Children;
  trait?: Refkey | Children;
  typeParameters?: TypeParameterProps[];
  whereClause?: Children;
  children?: Children;
}

function resolveTypeSymbolFromRefkey(
  refkey: Refkey,
  scope: ReturnType<typeof useRustScope>,
): NamedTypeSymbol | undefined {
  const result = scope.binder?.resolveDeclarationByKey(scope, refkey).value;
  return result?.symbol instanceof NamedTypeSymbol ? result.symbol : undefined;
}

function resolveSymbolNameFromRefkey(
  refkey: Refkey,
  scope: ReturnType<typeof useRustScope>,
): string {
  const result = scope.binder?.resolveDeclarationByKey(scope, refkey).value;
  const symbol = result?.symbol as RustOutputSymbol | undefined;
  return symbol?.name ?? unresolvedRefkey(refkey);
}

function findTypeSymbolFromInline(
  value: Children,
  scope: ReturnType<typeof useRustScope>,
): NamedTypeSymbol | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  const moduleScope = scope.enclosingModule;
  if (!(moduleScope instanceof RustModuleScope)) {
    return undefined;
  }

  for (const symbol of moduleScope.types) {
    if (symbol instanceof NamedTypeSymbol && symbol.name === value) {
      return symbol;
    }
  }

  return undefined;
}

export function ImplBlock(props: ImplBlockProps) {
  const parentScope = useRustScope();

  const renderedType =
    isRefkey(props.type) ? resolveSymbolNameFromRefkey(props.type, parentScope) : props.type;
  const targetTypeSymbol =
    isRefkey(props.type) ?
      resolveTypeSymbolFromRefkey(props.type, parentScope)
    : findTypeSymbolFromInline(props.type, parentScope);

  const implTargetSymbol =
    targetTypeSymbol ??
    createSymbol(NamedTypeSymbol, "__impl_target__", undefined, "struct", {
      binder: parentScope.binder,
      symbolKind: "struct",
    });

  const renderedTrait =
    props.trait && isRefkey(props.trait) ?
      resolveSymbolNameFromRefkey(props.trait, parentScope)
    : props.trait;

  const implScope = createScope(RustImplScope, implTargetSymbol, parentScope, {
    binder: parentScope.binder,
  });

  return (
    <>
      {code`impl`}
      <TypeParameters params={props.typeParameters} />
      {" "}
      {renderedTrait ? (
        <>
          {renderedTrait}
          {code` for `}
        </>
      ) : null}
      {renderedType}
      {props.whereClause ? (
        <>
          {" "}
          <WhereClause>{props.whereClause}</WhereClause>
        </>
      ) : null}
      {props.children ? (
        <>
          {code` {`}
          <Scope value={implScope}>
            <Indent>{props.children}</Indent>
          </Scope>
          <hbr />
          {code`}`}
        </>
      ) : code` {}`}
    </>
  );
}
