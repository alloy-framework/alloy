import { createSymbol, Namekey, NamePolicyGetter } from "@alloy-js/core";
import { join } from "pathe";
import { GoElements, useGoNamePolicy } from "../name-policy.js";
import { useGoScope, useNamedTypeScope } from "../scopes/contexts.js";
import { GoFunctionScope } from "../scopes/function.js";
import { GoLexicalScope } from "../scopes/lexical.js";
import { useModule } from "../scopes/module.js";
import { GoNamedTypeScope } from "../scopes/named-type.js";
import { useEnclosingPackageScope } from "../scopes/package.js";
import { FunctionSymbol } from "./function.js";
import { GoSymbol, GoSymbolOptions } from "./go.js";
import {
  NamedTypeSymbol,
  NamedTypeSymbolOptions,
  NamedTypeTypeKind,
} from "./named-type.js";
import { PackageSymbol } from "./package.js";

/**
 * Create a symbol for a parameter in the current func scope.
 */
export function createParameterSymbol(
  originalName: string | Namekey,
  options: GoSymbolOptions = {},
) {
  const scope = useGoScope();
  if (!(scope instanceof GoFunctionScope)) {
    throw new Error(`Can't create parameter symbol outside of a func scope.`);
  }
  const binder = options.binder ?? scope.binder;
  return createSymbol(GoSymbol, originalName, scope.parameters, {
    ...withNamePolicy(options, "parameter"),
    binder,
  });
}

export interface CreateTypeParameterSymbolOptions extends GoSymbolOptions {
  scope?: GoFunctionScope | GoNamedTypeScope;
}
export function createTypeParameterSymbol(
  originalName: string | Namekey,
  options: CreateTypeParameterSymbolOptions = {},
) {
  const scope = options.scope ?? useGoScope();
  if (
    !(scope instanceof GoFunctionScope) &&
    !(scope instanceof GoNamedTypeScope)
  ) {
    throw new Error(
      "Can't create a type parameter symbol outside of a func or named type scope.",
    );
  }

  const binder = options.binder ?? scope.binder;
  return createSymbol(GoSymbol, originalName, scope.typeParameters, {
    ...withNamePolicy(options, "type-parameter"),
    binder,
  });
}

export function createStructMemberSymbol(
  originalName: string | Namekey,
  options: NamedTypeSymbolOptions = {},
) {
  const scope = useNamedTypeScope();

  if (
    scope.ownerSymbol.typeKind !== "struct" &&
    scope.ownerSymbol.typeKind !== "struct-member"
  ) {
    throw new Error(
      `Can't define a field outside of a struct, kind ${scope.ownerSymbol.typeKind}.`,
    );
  }

  const binder = options.binder ?? scope.ownerSymbol.binder;
  return createSymbol(
    NamedTypeSymbol,
    originalName,
    scope.members,
    "struct-member",
    {
      ...withNamePolicy(options, "struct-member"),
      binder,
    },
  );
}

export function createInterfaceMemberSymbol(
  originalName: string | Namekey,
  options: NamedTypeSymbolOptions = {},
) {
  const scope = useNamedTypeScope();

  if (scope.ownerSymbol.typeKind !== "interface") {
    throw new Error(
      `Can't define a field outside of an interface, kind ${scope.ownerSymbol.typeKind}.`,
    );
  }

  const binder = options.binder ?? scope.ownerSymbol.binder;
  return createSymbol(
    NamedTypeSymbol,
    originalName,
    scope.members,
    "interface-member",
    {
      ...withNamePolicy(options, "interface-member"),
      binder,
    },
  );
}

export function createPackageSymbol(name: string, path?: string) {
  const scope = useEnclosingPackageScope();
  const pkgSymbol = scope?.ownerSymbol;
  if (!pkgSymbol) {
    const mod = useModule();
    const modName = mod.name;
    const builtin = mod.builtin;
    const pkgPath = path ? join(modName, path) : modName;
    return createSymbol(PackageSymbol, name, undefined, {
      path: pkgPath,
      builtin,
      binder: mod.binder,
    });
  }
  if (pkgSymbol.members.symbolNames.has(name)) {
    return pkgSymbol.members.symbolNames.get(name)! as PackageSymbol;
  }
  return createSymbol(PackageSymbol, name, pkgSymbol, {
    path,
    binder: pkgSymbol.binder,
  });
}

export function createFunctionSymbol(
  originalName: string | Namekey,
  isMethod: boolean,
  options: GoSymbolOptions = {},
) {
  const scope = useGoScope();
  if (!isMethod && scope instanceof GoLexicalScope) {
    const binder = options.binder ?? scope.binder;
    return createSymbol(FunctionSymbol, originalName, scope.types, {
      ...withNamePolicy(options, "function"),
      binder,
    });
  }
  const binder = options.binder ?? scope.binder;
  return createSymbol(FunctionSymbol, originalName, undefined, {
    ...withNamePolicy(options, "function"),
    binder,
  });
}

export function createPropertySymbol(
  originalName: string | Namekey,
  options: GoSymbolOptions,
) {
  const scope = useNamedTypeScope();
  const binder = options.binder ?? scope.binder;
  return createSymbol(GoSymbol, originalName, scope.members, {
    ...withNamePolicy(options, "struct-member"),
    binder,
  });
}

export function createVariableSymbol(
  originalName: string | Namekey,
  options: GoSymbolOptions = {},
) {
  const scope = useGoScope();
  if (!(scope instanceof GoLexicalScope)) {
    throw new Error(
      `Can't create variable symbol outside of a lexical scope, got a ${scope.constructor.name}.`,
    );
  }
  const binder = options.binder ?? scope.binder;
  return createSymbol(GoSymbol, originalName, scope.values, {
    ...withNamePolicy(options, "variable"),
    binder,
  });
}

export function createTypeSymbol(
  originalName: string | Namekey,
  kind: NamedTypeTypeKind,
  options: NamedTypeSymbolOptions = {},
) {
  const scope = useGoScope();
  if (scope instanceof GoLexicalScope) {
    const binder = options.binder ?? scope.binder;
    return createSymbol(NamedTypeSymbol, originalName, scope.types, kind, {
      ...withNamePolicy(options, "type"),
      binder,
    });
  }
  throw new Error(
    `Can't create type symbol outside of a lexical scope, got a ${scope.constructor.name}.`,
  );
}

export function createNestedStructSymbol(
  originalName: string | Namekey,
  kind: NamedTypeTypeKind,
  options: NamedTypeSymbolOptions = {},
) {
  const scope = useGoScope();
  if (scope instanceof GoNamedTypeScope) {
    const binder = options.binder ?? scope.binder;
    return createSymbol(
      NamedTypeSymbol,
      originalName,
      scope.ownerSymbol.members,
      kind,
      {
        ...withNamePolicy(options, "struct-member"),
        binder,
      },
    );
  }
  throw new Error(
    `Can't create named anonymous type symbol outside of a NamedType scope, got a ${scope.constructor.name}.`,
  );
}

let anonymousTypeID = 0;

export function createAnonymousTypeSymbol(
  kind: NamedTypeTypeKind,
  options: NamedTypeSymbolOptions = {},
) {
  const name =
    "anonymous_" + anonymousTypeID++ + "_this_should_not_appear_in_output";
  const scope = useGoScope();
  if (scope instanceof GoLexicalScope) {
    const binder = options.binder ?? scope.binder;
    return createSymbol(NamedTypeSymbol, name, scope.types, kind, {
      ...options,
      binder,
    });
  } else if (scope instanceof GoNamedTypeScope) {
    const binder = options.binder ?? scope.binder;
    return createSymbol(
      NamedTypeSymbol,
      name,
      scope.ownerSymbol.members,
      kind,
      {
        ...options,
        binder,
      },
    );
  }
  throw new Error(
    `Can't create anonymous type symbol outside of a lexical or NamedType scope, got a ${scope.constructor.name}.`,
  );
}

function withNamePolicy<T extends { namePolicy?: NamePolicyGetter }>(
  options: T,
  elementType: GoElements,
): GoSymbolOptions {
  return {
    ...options,
    namePolicy: options.namePolicy ?? useGoNamePolicy().for(elementType),
  };
}
