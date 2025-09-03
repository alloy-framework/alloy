import { OutputSymbolOptions } from "@alloy-js/core";
import { join } from "pathe";
import { useGoNamePolicy } from "../name-policy.js";
import { useGoScope, useNamedTypeScope } from "../scopes/contexts.js";
import { GoFunctionScope } from "../scopes/function.js";
import { GoLexicalScope } from "../scopes/lexical.js";
import { useModule } from "../scopes/module.js";
import { GoNamedTypeScope } from "../scopes/named-type.js";
import { useEnclosingPackageScope } from "../scopes/package.js";
import { FunctionSymbol } from "./function.js";
import { GoSymbol, GoSymbolOptions } from "./go.js";
import { NamedTypeSymbol, NamedTypeTypeKind } from "./named-type.js";
import { PackageSymbol } from "./package.js";

/**
 * Create a symbol for a parameter in the current func scope.
 */
export function createParameterSymbol(
  originalName: string,
  options: GoSymbolOptions = {},
) {
  const policy = useGoNamePolicy();
  const name = policy.getName(originalName, "parameter");
  const scope = useGoScope();
  if (!(scope instanceof GoFunctionScope)) {
    throw new Error(
      `Can't create parameter ${name} symbol outside of a func scope.`,
    );
  }
  return new GoSymbol(name, scope.parameters, options);
}

export interface CreateTypeParameterSymbolOptions extends GoSymbolOptions {
  scope?: GoFunctionScope | GoNamedTypeScope;
}
export function createTypeParameterSymbol(
  originalName: string,
  options: CreateTypeParameterSymbolOptions = {},
) {
  const policy = useGoNamePolicy();
  const name = policy.getName(originalName, "type-parameter");
  const scope = options.scope ?? useGoScope();
  if (
    !(scope instanceof GoFunctionScope) &&
    !(scope instanceof GoNamedTypeScope)
  ) {
    throw new Error(
      "Can't create a type parameter symbol outside of a func or named type scope.",
    );
  }

  return new GoSymbol(name, scope.typeParameters, options);
}

export function createStructMemberSymbol(
  originalName: string,
  options: GoSymbolOptions = {},
) {
  const policy = useGoNamePolicy();
  const name = policy.getName(originalName, "struct-member");
  const scope = useNamedTypeScope();

  if (
    scope.ownerSymbol.typeKind !== "struct" &&
    scope.ownerSymbol.typeKind !== "struct-member"
  ) {
    throw new Error(
      `Can't define a field outside of a struct, kind ${scope.ownerSymbol.typeKind}.`,
    );
  }

  return new NamedTypeSymbol(name, scope.members, "struct-member", options);
}

export function createInterfaceMemberSymbol(
  originalName: string,
  options: GoSymbolOptions = {},
) {
  const policy = useGoNamePolicy();
  const name = policy.getName(originalName, "interface-member");
  const scope = useNamedTypeScope();

  if (scope.ownerSymbol.typeKind !== "interface") {
    throw new Error(
      `Can't define a field outside of an interface, kind ${scope.ownerSymbol.typeKind}.`,
    );
  }

  return new NamedTypeSymbol(name, scope.members, "interface-member", options);
}

export function createNamedTypeSymbol(
  name: string,
  kind: NamedTypeTypeKind,
  options?: OutputSymbolOptions,
) {
  const scope = useNamedTypeScope();
  return new NamedTypeSymbol(name, scope.ownerSymbol.members, kind, options);
}

export function createPackageSymbol(name: string, path?: string) {
  const scope = useEnclosingPackageScope();
  const pkgSymbol = scope?.ownerSymbol;
  if (!pkgSymbol) {
    const mod = useModule();
    const modName = mod.name;
    const builtin = mod.builtin;
    const pkgPath = path ? join(modName, path) : modName;
    return new PackageSymbol(name, undefined, { path: pkgPath, builtin });
  }
  if (pkgSymbol.members.symbolNames.has(name)) {
    return pkgSymbol.members.symbolNames.get(name)! as PackageSymbol;
  }
  return new PackageSymbol(name, pkgSymbol, { path });
}

export function createFunctionSymbol(
  originalName: string,
  isMethod: boolean,
  options: GoSymbolOptions = {},
) {
  const policy = useGoNamePolicy();
  const name = policy.getName(originalName, "function");
  const scope = useGoScope();
  if (!isMethod && scope instanceof GoLexicalScope) {
    return new FunctionSymbol(name, scope.types, options);
  }
  return new FunctionSymbol(name, undefined, options);
}

export function createPropertySymbol(
  originalName: string,
  options: GoSymbolOptions,
) {
  const policy = useGoNamePolicy();
  const name = policy.getName(originalName, "struct-member");
  const scope = useNamedTypeScope();
  return new GoSymbol(name, scope.members, options);
}

export function createVariableSymbol(
  originalName: string,
  options: GoSymbolOptions = {},
) {
  const policy = useGoNamePolicy();
  const name = policy.getName(originalName, "variable");
  const scope = useGoScope();
  if (!(scope instanceof GoLexicalScope)) {
    throw new Error(
      `Can't create variable ${name} symbol outside of a lexical scope, got a ${scope.constructor.name}.`,
    );
  }
  return new GoSymbol(name, scope.values, options);
}

export function createTypeSymbol(
  originalName: string,
  kind: NamedTypeTypeKind,
  options: GoSymbolOptions = {},
) {
  const policy = useGoNamePolicy();
  const name = policy.getName(originalName, "type");
  const scope = useGoScope();
  if (scope instanceof GoLexicalScope) {
    return new NamedTypeSymbol(name, scope.types, kind, options);
  }
  throw new Error(
    `Can't create type ${name} symbol outside of a lexical scope, got a ${scope.constructor.name}.`,
  );
}

export function createNestedStructSymbol(
  name: string,
  kind: NamedTypeTypeKind,
  options: GoSymbolOptions = {},
) {
  const scope = useGoScope();
  if (scope instanceof GoNamedTypeScope) {
    return new NamedTypeSymbol(name, scope.ownerSymbol.members, kind, {
      ...options,
    });
  }
  throw new Error(
    `Can't create named anonymous type symbol outside of a NamedType scope, got a ${scope.constructor.name}.`,
  );
}

let anonymousTypeID = 0;

export function createAnonymousTypeSymbol(
  kind: NamedTypeTypeKind,
  options: GoSymbolOptions = {},
) {
  const name =
    "anonymous_" + anonymousTypeID++ + "_this_should_not_appear_in_output";
  const scope = useGoScope();
  if (scope instanceof GoLexicalScope) {
    return new NamedTypeSymbol(name, scope.types, kind, {
      ...options,
    });
  } else if (scope instanceof GoNamedTypeScope) {
    return new NamedTypeSymbol(name, scope.ownerSymbol.members, kind, {
      ...options,
    });
  }
  throw new Error(
    `Can't create anonymous type symbol outside of a lexical or NamedType scope, got a ${scope.constructor.name}.`,
  );
}
