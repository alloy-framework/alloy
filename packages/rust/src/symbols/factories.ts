import { createSymbol, Namekey, NamePolicyGetter, useBinder } from "@alloy-js/core";
import { RustElements, useRustNamePolicy } from "../name-policy.js";
import { useRustScope } from "../scopes/contexts.js";
import { RustCrateScope } from "../scopes/rust-crate-scope.js";
import { RustFunctionScope } from "../scopes/rust-function-scope.js";
import { RustImplScope } from "../scopes/rust-impl-scope.js";
import { RustModuleScope } from "../scopes/rust-module-scope.js";
import { RustTraitScope } from "../scopes/rust-trait-scope.js";
import { FunctionSymbol, FunctionSymbolOptions } from "./function-symbol.js";
import { NamedTypeSymbol, NamedTypeSymbolOptions } from "./named-type-symbol.js";
import { RustOutputSymbol, RustOutputSymbolOptions } from "./rust-output-symbol.js";

export function createStructSymbol(
  originalName: string | Namekey,
  options: NamedTypeSymbolOptions = {},
) {
  const scope = useTypeValueScope("struct");
  const binder = options.binder ?? scope.binder ?? useBinder();
  return createSymbol(NamedTypeSymbol, originalName, scope.types, "struct", {
    ...withNamePolicy(options, "struct"),
    binder,
    symbolKind: "struct",
  });
}

export function createEnumSymbol(
  originalName: string | Namekey,
  options: NamedTypeSymbolOptions = {},
) {
  const scope = useTypeValueScope("enum");
  const binder = options.binder ?? scope.binder ?? useBinder();
  return createSymbol(NamedTypeSymbol, originalName, scope.types, "enum", {
    ...withNamePolicy(options, "enum"),
    binder,
    symbolKind: "enum",
  });
}

export function createTraitSymbol(
  originalName: string | Namekey,
  options: NamedTypeSymbolOptions = {},
) {
  const scope = useTypeValueScope("trait");
  const binder = options.binder ?? scope.binder ?? useBinder();
  return createSymbol(NamedTypeSymbol, originalName, scope.types, "trait", {
    ...withNamePolicy(options, "trait"),
    binder,
    symbolKind: "trait",
  });
}

export function createFunctionSymbol(
  originalName: string | Namekey,
  options: FunctionSymbolOptions = {},
) {
  const scope = useTypeValueScope("function");
  const binder = options.binder ?? scope.binder ?? useBinder();
  return createSymbol(FunctionSymbol, originalName, scope.values, {
    ...withNamePolicy(options, "function"),
    binder,
    symbolKind: "function",
  });
}

export function createMethodSymbol(
  originalName: string | Namekey,
  options: FunctionSymbolOptions = {},
) {
  const scope = useRustScope();
  if (!(scope instanceof RustImplScope) && !(scope instanceof RustTraitScope)) {
    throw new Error("Can't create method symbol outside of an impl or trait scope.");
  }

  const binder = options.binder ?? scope.binder ?? useBinder();
  return createSymbol(FunctionSymbol, originalName, scope.members, {
    ...withNamePolicy(options, "method"),
    binder,
    symbolKind: "method",
  });
}

export function createTypeAliasSymbol(
  originalName: string | Namekey,
  options: NamedTypeSymbolOptions = {},
) {
  const scope = useTypeValueScope("type alias");
  const binder = options.binder ?? scope.binder ?? useBinder();
  return createSymbol(
    NamedTypeSymbol,
    originalName,
    scope.types,
    "type-alias",
    {
      ...withNamePolicy(options, "type-alias"),
      binder,
      symbolKind: "type-alias",
    },
  );
}

export function createConstSymbol(
  originalName: string | Namekey,
  options: RustOutputSymbolOptions = {},
) {
  const scope = useTypeValueScope("const");
  const binder = options.binder ?? scope.binder ?? useBinder();
  return createSymbol(RustOutputSymbol, originalName, scope.values, {
    ...withNamePolicy(options, "constant"),
    binder,
      symbolKind: "const",
  });
}

export function createStaticSymbol(
  originalName: string | Namekey,
  options: RustOutputSymbolOptions = {},
) {
  const scope = useTypeValueScope("static");
  const binder = options.binder ?? scope.binder ?? useBinder();
  return createSymbol(RustOutputSymbol, originalName, scope.values, {
    ...withNamePolicy(options, "constant"),
    binder,
    symbolKind: "static",
  });
}

export function createFieldSymbol(
  originalName: string | Namekey,
  options: RustOutputSymbolOptions = {},
) {
  const scope = useRustScope();
  if (!(scope.ownerSymbol instanceof NamedTypeSymbol)) {
    throw new Error("Can't create field symbol outside of a named type member scope.");
  }
  if (scope.ownerSymbol.typeKind !== "struct") {
    throw new Error(
      `Can't create field symbol for non-struct type ${scope.ownerSymbol.typeKind}.`,
    );
  }

  const binder = options.binder ?? scope.binder ?? useBinder();
  return createSymbol(RustOutputSymbol, originalName, scope.ownerSymbol.members, {
    ...withNamePolicy(options, "field"),
    binder,
    symbolKind: "field",
  });
}

export function createVariantSymbol(
  originalName: string | Namekey,
  options: RustOutputSymbolOptions = {},
) {
  const scope = useRustScope();
  if (!(scope.ownerSymbol instanceof NamedTypeSymbol)) {
    throw new Error(
      "Can't create variant symbol outside of a named type member scope.",
    );
  }
  if (scope.ownerSymbol.typeKind !== "enum") {
    throw new Error(
      `Can't create variant symbol for non-enum type ${scope.ownerSymbol.typeKind}.`,
    );
  }

  const binder = options.binder ?? scope.binder ?? useBinder();
  return createSymbol(RustOutputSymbol, originalName, scope.ownerSymbol.members, {
    ...withNamePolicy(options, "enum-variant"),
    binder,
    symbolKind: "variant",
  });
}

export function createParameterSymbol(
  originalName: string | Namekey,
  options: RustOutputSymbolOptions = {},
) {
  const scope = useRustScope();
  if (!(scope instanceof RustFunctionScope)) {
    throw new Error("Can't create parameter symbol outside of a function scope.");
  }

  const binder = options.binder ?? scope.binder ?? useBinder();
  return createSymbol(RustOutputSymbol, originalName, scope.parameters, {
    ...withNamePolicy(options, "parameter"),
    binder,
    symbolKind: "parameter",
  });
}

export function createTypeParameterSymbol(
  originalName: string | Namekey,
  options: RustOutputSymbolOptions = {},
) {
  const scope = useRustScope();
  const typeParameterSpace =
    scope instanceof RustFunctionScope ?
      scope.typeParameters
    : scope.ownerSymbol instanceof NamedTypeSymbol ?
      scope.ownerSymbol.typeParameters
    : undefined;

  if (!typeParameterSpace) {
    throw new Error(
      "Can't create type parameter symbol outside of a function or named type scope.",
    );
  }

  const binder = options.binder ?? scope.binder ?? useBinder();
  return createSymbol(RustOutputSymbol, originalName, typeParameterSpace, {
    ...withNamePolicy(options, "type-parameter"),
    binder,
    symbolKind: "type-parameter",
  });
}

function useTypeValueScope(kind: string): RustCrateScope | RustModuleScope {
  const scope = useRustScope();
  if (scope instanceof RustCrateScope || scope instanceof RustModuleScope) {
    return scope;
  }

  throw new Error(`Can't create ${kind} symbol outside of a crate or module scope.`);
}

function withNamePolicy<T extends { namePolicy?: NamePolicyGetter }>(
  options: T,
  elementType: RustElements,
) {
  return {
    ...options,
    namePolicy: options.namePolicy ?? useRustNamePolicy().for(elementType),
  };
}
