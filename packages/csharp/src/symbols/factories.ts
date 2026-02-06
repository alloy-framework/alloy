import {
  createSymbol,
  Namekey,
  NamePolicyGetter,
  onCleanup,
  OutputSymbolOptions,
  useBinder,
} from "@alloy-js/core";
import { getGlobalNamespace } from "../contexts/global-namespace.js";
import { useNamespaceContext } from "../contexts/namespace.js";
import { CSharpElements, useCSharpNamePolicy } from "../name-policy.js";
import { CSharpClassScope } from "../scopes/class.js";
import { useCSharpScope, useNamedTypeScope } from "../scopes/contexts.js";
import { CSharpScope } from "../scopes/csharp.js";
import { CSharpLexicalScope } from "../scopes/lexical.js";
import { CSharpMethodScope } from "../scopes/method.js";
import { CSharpNamedTypeScope } from "../scopes/named-type.js";
import { CSharpNamespaceScope } from "../scopes/namespace.js";
import { CSharpSourceFileScope } from "../scopes/source-file.js";
import { CSharpSymbol, CSharpSymbolOptions } from "./csharp.js";
import { MethodKinds, MethodSymbol } from "./method.js";
import { NamedTypeSymbol, NamedTypeTypeKind } from "./named-type.js";
import { NamespaceSymbol } from "./namespace.js";

/**
 * Create a symbol for a parameter in the current method scope.
 */
export function createParameterSymbol(
  originalName: string | Namekey,
  options: CSharpSymbolOptions = {},
) {
  const scope = useCSharpScope();
  if (
    !(scope instanceof CSharpMethodScope) &&
    !(scope instanceof CSharpClassScope)
  ) {
    throw new Error(
      `Can't create parameter symbol outside of a method or class scope.`,
    );
  }
  const binder = options.binder ?? scope.binder;
  return createSymbol(CSharpSymbol, originalName, scope.parameters, {
    ...withNamePolicy(options, "parameter"),
    binder,
  });
}

export interface CreateTypeParameterSymbolOptions extends CSharpSymbolOptions {
  scope?: CSharpMethodScope | CSharpNamedTypeScope;
}
export function createTypeParameterSymbol(
  originalName: string | Namekey,
  options: CreateTypeParameterSymbolOptions = {},
) {
  const scope = options.scope ?? useCSharpScope();
  if (
    !(scope instanceof CSharpMethodScope) &&
    !(scope instanceof CSharpNamedTypeScope)
  ) {
    throw new Error(
      "Can't create a type parameter symbol outside of a method or named type scope.",
    );
  }

  const binder = options.binder ?? scope.binder;
  return createSymbol(CSharpSymbol, originalName, scope.typeParameters, {
    ...withNamePolicy(options, "type-parameter"),
    binder,
  });
}

export function createFieldSymbol(
  originalName: string | Namekey,
  options: CSharpSymbolOptions = {},
) {
  let nameElement: CSharpElements = "class-member-private";

  if (
    options.accessibility === "public" ||
    options.accessibility === "internal" ||
    options.accessibility === "protected"
  ) {
    nameElement = "class-member-public";
  }

  const scope = useNamedTypeScope();

  if (
    scope.ownerSymbol.typeKind !== "class" &&
    scope.ownerSymbol.typeKind !== "struct"
  ) {
    throw new Error(`Can't define a field outside of a class or struct.`);
  }

  const binder = options.binder ?? scope.binder;
  return createSymbol(CSharpSymbol, originalName, scope.members, {
    ...withNamePolicy(options, nameElement),
    binder,
  });
}

function withCleanup<T extends CSharpSymbol>(sym: T): T {
  onCleanup(() => {
    sym.delete();
  });
  return sym;
}

export function createNamedTypeSymbol(
  name: string | Namekey,
  kind: NamedTypeTypeKind,
  options?: OutputSymbolOptions,
) {
  const scope = useNamedTypeScope();
  const binder = options?.binder ?? scope.ownerSymbol.binder;
  return withCleanup(
    createSymbol(NamedTypeSymbol, name, scope.ownerSymbol.members, kind, {
      ...options,
      binder,
    }),
  );
}

export function createNamespaceSymbol(
  name: string | Namekey | (string | Namekey)[],
  options: CSharpSymbolOptions = {},
): NamespaceSymbol {
  const scope = useNamespaceContext();
  const parentSymbol =
    scope?.symbol ??
    getGlobalNamespace(options.binder ?? scope?.symbol?.binder ?? useBinder());
  const names = normalizeNamespaceName(name);
  let current = parentSymbol;
  for (const name of names) {
    current = createNamespaceSymbolInternal(name, current, options);
  }
  return current;
}

function normalizeNamespaceName(
  name: string | Namekey | (string | Namekey)[],
): (string | Namekey)[] {
  if (Array.isArray(name)) {
    return name;
  }
  if (typeof name === "string" && name.includes(".")) {
    return name.split(".");
  }
  return [name];
}

function createNamespaceSymbolInternal(
  name: string | Namekey,
  parentSymbol: NamespaceSymbol,
  options: CSharpSymbolOptions = {},
): NamespaceSymbol {
  const namePolicy =
    options.namePolicy ?? useCSharpNamePolicy().for("namespace");
  const expectedName = namePolicy(typeof name === "string" ? name : name.name);
  if (parentSymbol.members.symbolNames.has(expectedName)) {
    return parentSymbol.members.symbolNames.get(
      expectedName,
    )! as NamespaceSymbol;
  }
  const binder = options.binder ?? parentSymbol.binder;
  return withCleanup(
    createSymbol(NamespaceSymbol, name, parentSymbol, {
      ...withNamePolicy(options, "namespace"),
      binder,
    }),
  );
}

export interface CreateMethodSymbolOptions extends CSharpSymbolOptions {
  methodKind?: MethodKinds;
}

export function createMethodSymbol(
  originalName: string | Namekey,
  options: CreateMethodSymbolOptions = {},
) {
  const scope = useNamedTypeScope();

  if (
    scope.ownerSymbol.typeKind !== "class" &&
    scope.ownerSymbol.typeKind !== "interface" &&
    scope.ownerSymbol.typeKind !== "struct"
  ) {
    throw new Error(
      `Can't define a method outside of a class, interface, or struct.`,
    );
  }

  const binder = options.binder ?? scope.binder;
  return withCleanup(
    createSymbol(
      MethodSymbol,
      originalName,
      scope.members,
      options.methodKind ?? "ordinary",
      {
        ...withNamePolicy(options, "class-method"),
        binder,
      },
    ),
  );
}

export function createPropertySymbol(
  name: string | Namekey,
  options: CSharpSymbolOptions,
) {
  const scope = useNamedTypeScope();
  const binder = options.binder ?? scope.binder;
  return withCleanup(
    createSymbol(CSharpSymbol, name, scope.members, {
      ...withNamePolicy(options, "class-property"),
      binder,
    }),
  );
}

export function createVariableSymbol(
  originalName: string | Namekey,
  options: CSharpSymbolOptions = {},
) {
  let scope = useCSharpScope();
  if (
    scope instanceof CSharpNamespaceScope &&
    scope.ownerSymbol === getGlobalNamespace(scope.ownerSymbol.binder)
  ) {
    // allow top-level variables in the global namespace, which are local to the source file.
    scope = scope.parent as CSharpScope;

    if (!(scope instanceof CSharpSourceFileScope)) {
      throw new Error(
        "Variable declarations must be in the global namespace or within a lexical scope.",
      );
    }
  }

  if (!(scope instanceof CSharpLexicalScope)) {
    throw new Error(
      `Can't create variable symbol outside of a lexical scope, got a ${scope.constructor.name}.`,
    );
  }
  const binder = options.binder ?? scope.binder;
  return withCleanup(
    createSymbol(CSharpSymbol, originalName, scope.localVariables, {
      ...withNamePolicy(options, "variable"),
      binder,
    }),
  );
}

function withNamePolicy<T extends { namePolicy?: NamePolicyGetter }>(
  options: T,
  elementType: CSharpElements,
) {
  return {
    ...options,
    namePolicy: options.namePolicy ?? useCSharpNamePolicy().for(elementType),
  };
}
