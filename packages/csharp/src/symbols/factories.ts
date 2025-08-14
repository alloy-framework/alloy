import { OutputSymbolOptions, useBinder } from "@alloy-js/core";
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
import { PropertySymbol } from "./property.js";

/**
 * Create a symbol for a parameter in the current method scope.
 */
export function createParameterSymbol(
  originalName: string,
  options: CSharpSymbolOptions = {},
) {
  const policy = useCSharpNamePolicy();
  const name = policy.getName(originalName, "parameter");
  const scope = useCSharpScope();
  if (
    !(scope instanceof CSharpMethodScope) &&
    !(scope instanceof CSharpClassScope)
  ) {
    throw new Error(
      `Can't create parameter ${name} symbol outside of a method or class scope.`,
    );
  }
  return new CSharpSymbol(name, scope.parameters, options);
}

export interface CreateTypeParameterSymbolOptions extends CSharpSymbolOptions {
  scope?: CSharpMethodScope | CSharpNamedTypeScope;
}
export function createTypeParameterSymbol(
  originalName: string,
  options: CreateTypeParameterSymbolOptions = {},
) {
  const policy = useCSharpNamePolicy();
  const name = policy.getName(originalName, "type-parameter");
  const scope = options.scope ?? useCSharpScope();
  if (
    !(scope instanceof CSharpMethodScope) &&
    !(scope instanceof CSharpNamedTypeScope)
  ) {
    throw new Error(
      "Can't create a type parameter symbol outside of a method or named type scope.",
    );
  }

  return new CSharpSymbol(name, scope.typeParameters, options);
}

export function createFieldSymbol(
  originalName: string,
  options: CSharpSymbolOptions = {},
) {
  const policy = useCSharpNamePolicy();
  let nameElement: CSharpElements = "class-member-private";

  if (
    options.accessibility === "public" ||
    options.accessibility === "internal" ||
    options.accessibility === "protected"
  ) {
    nameElement = "class-member-public";
  }

  const name = policy.getName(originalName, nameElement);
  const scope = useNamedTypeScope();

  if (
    scope.ownerSymbol.typeKind !== "class" &&
    scope.ownerSymbol.typeKind !== "struct"
  ) {
    throw new Error(`Can't define a field outside of a class or struct.`);
  }

  return new CSharpSymbol(name, scope.members, options);
}

export function createNamedTypeSymbol(
  name: string,
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
  originalName: string,
  options: CreateMethodSymbolOptions = {},
) {
  const name = useCSharpNamePolicy().getName(originalName, "class-method");
  const scope = useNamedTypeScope();

  if (
    scope.ownerSymbol.typeKind !== "class" &&
    scope.ownerSymbol.typeKind !== "interface" &&
    scope.ownerSymbol.typeKind !== "struct"
  ) {
    throw new Error(`Can't define a field outside of a class or struct.`);
  }

  return new MethodSymbol(
    name,
    scope.members,
    options.methodKind ?? "ordinary",
    options,
  );
}

export function createPropertySymbol(
  originalName: string,
  options: CSharpSymbolOptions,
) {
  const name = useCSharpNamePolicy().getName(originalName, "class-property");
  const scope = useNamedTypeScope();
  return new PropertySymbol(name, scope.members, options);
}

export function createVariableSymbol(
  originalName: string,
  options: CSharpSymbolOptions = {},
) {
  const policy = useCSharpNamePolicy();
  const name = policy.getName(originalName, "variable");
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
      `Can't create variable ${name} symbol outside of a lexical scope, got a ${scope.constructor.name}.`,
    );
  }
  return new CSharpSymbol(name, scope.localVariables, options);
}
