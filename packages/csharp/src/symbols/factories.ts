import {
  Namekey,
  NamePolicyGetter,
  OutputSymbolOptions,
  useBinder,
} from "@alloy-js/core";
import { getGlobalNamespace } from "../contexts/global-namespace.js";
import { CSharpElements, useCSharpNamePolicy } from "../name-policy.js";
import { CSharpClassScope } from "../scopes/class.js";
import { useCSharpScope, useNamedTypeScope } from "../scopes/contexts.js";
import { CSharpScope } from "../scopes/csharp.js";
import { CSharpLexicalScope } from "../scopes/lexical.js";
import { CSharpMethodScope } from "../scopes/method.js";
import { CSharpNamedTypeScope } from "../scopes/named-type.js";
import {
  CSharpNamespaceScope,
  useEnclosingNamespaceScope,
} from "../scopes/namespace.js";
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
  return new CSharpSymbol(
    originalName,
    scope.parameters,
    withNamePolicy(options, "parameter"),
  );
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

  return new CSharpSymbol(
    originalName,
    scope.typeParameters,
    withNamePolicy(options, "type-parameter"),
  );
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

  return new CSharpSymbol(
    originalName,
    scope.members,
    withNamePolicy(options, nameElement),
  );
}

export function createNamedTypeSymbol(
  name: string | Namekey,
  kind: NamedTypeTypeKind,
  options?: OutputSymbolOptions,
) {
  const scope = useNamedTypeScope();
  return new NamedTypeSymbol(name, scope.ownerSymbol.members, kind, options);
}

export function createNamespaceSymbol(name: string) {
  const scope = useEnclosingNamespaceScope();
  const nsSymbol = scope?.ownerSymbol ?? getGlobalNamespace(useBinder());
  if (nsSymbol.members.symbolNames.has(name)) {
    return nsSymbol.members.symbolNames.get(name)! as NamespaceSymbol;
  }
  return new NamespaceSymbol(name, nsSymbol);
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

  return new MethodSymbol(
    originalName,
    scope.members,
    options.methodKind ?? "ordinary",
    withNamePolicy(options, "class-method"),
  );
}

export function createPropertySymbol(
  name: string | Namekey,
  options: CSharpSymbolOptions,
) {
  const scope = useNamedTypeScope();
  return new CSharpSymbol(
    name,
    scope.members,
    withNamePolicy(options, "class-property"),
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
  return new CSharpSymbol(
    originalName,
    scope.localVariables,
    withNamePolicy(options, "variable"),
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
