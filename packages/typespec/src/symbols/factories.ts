import {
  Namekey,
  NamePolicyGetter,
  onCleanup,
  OutputSymbolOptions,
  useScope,
} from "@alloy-js/core";
import { useNamespaceContext } from "../contexts/namespace.js";
import { TypeSpecElements, useTypeSpecNamePolicy } from "../name-policy.js";
import { SourceFileScope } from "../scopes/index.js";
import { NamedTypeScope } from "../scopes/named-type.js";
import { ValueOrArray } from "../util.js";
import { NamedTypeKind, NamedTypeSymbol, TypeSpecSymbol } from "./index.js";
import { NamespaceSymbol, NamespaceSymbolOptions } from "./namespace.js";

export function createNamespaceSymbol(
  name: ValueOrArray<string | Namekey>,
  options: NamespaceSymbolOptions = {},
): NamespaceSymbol {
  const scope = useScope();
  let parent: NamespaceSymbol | SourceFileScope;
  if (scope instanceof SourceFileScope) {
    parent = scope;
  } else {
    parent = scope.ownerSymbol as NamespaceSymbol;
  }
  // const parent = useNamespace()!;

  const names = normalizeNamespaceName(name);
  let current: NamespaceSymbol | undefined;
  for (const name of names) {
    current = createNamespaceSymbolInternal(name, current ?? parent, options);
  }
  return current!;
}

function normalizeNamespaceName(
  name: ValueOrArray<string | Namekey>,
): Array<string | Namekey> {
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
  parent: NamespaceSymbol | SourceFileScope,
  options: NamespaceSymbolOptions = {},
): NamespaceSymbol {
  const namePolicy =
    options.namePolicy ?? useTypeSpecNamePolicy().for("namespace");
  const expectedName = namePolicy(typeof name === "string" ? name : name.name);
  if (parent.members.symbolNames.has(expectedName)) {
    return parent.members.symbolNames.get(expectedName)! as NamespaceSymbol;
  }
  return withCleanup(
    new NamespaceSymbol(
      name,
      parent.members,
      withNamePolicy(options, "namespace"),
    ),
  );
}

export function createNamedTypeSymbol(
  name: string | Namekey,
  kind: NamedTypeKind,
  options?: OutputSymbolOptions,
) {
  const scope = useNamespaceContext();
  if (scope === undefined) {
    throw new Error(
      `Cannot create a named type symbol without a namespace context.`,
    );
  }
  const parentSymbol = scope?.symbol;
  return withCleanup(
    new NamedTypeSymbol(name, parentSymbol.memberSpaces, kind, options),
  );
}

export function createModelPropertySymbol(
  name: string | Namekey,
  options: OutputSymbolOptions = {},
) {
  const scope = useScope();
  if (!(scope instanceof NamedTypeScope)) {
    throw new Error(
      "Can't create a model property symbol outside of a named type scope.",
    );
  }
  const modelSymbol = scope.ownerSymbol;
  return withCleanup(
    new TypeSpecSymbol(
      name,
      modelSymbol.members,
      withNamePolicy(options, "model-property"),
    ),
  );
}

export function createTemplateParameterSymbol(
  name: string | Namekey,
  options: OutputSymbolOptions = {},
) {
  const scope = useScope();
  if (!(scope instanceof NamedTypeScope)) {
    throw new Error(
      "Can't create a template parameter symbol outside of a named type scope.",
    );
  }

  return withCleanup(
    new TypeSpecSymbol(
      name,
      scope.templateParameters,
      withNamePolicy(options, "template"),
    ),
  );
}

function withCleanup<T extends TypeSpecSymbol>(symbol: T): T {
  onCleanup(() => {
    symbol.delete();
  });
  return symbol;
}

function withNamePolicy<T extends { namePolicy?: NamePolicyGetter }>(
  options: T,
  elementType: TypeSpecElements,
) {
  return {
    ...options,
    namePolicy: options.namePolicy ?? useTypeSpecNamePolicy().for(elementType),
  };
}
