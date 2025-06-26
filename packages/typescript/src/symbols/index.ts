import {
  OutputScopeOptions,
  useScope,
} from "../../../core/src/index.browser.js";
import { useLexicalScope, useMemberOwner } from "../utils.js";
import { TSLexicalScope } from "./ts-lexical-scope.js";
import { CreateTsSymbolOptions, TSOutputSymbol } from "./ts-output-symbol.js";

export * from "./reference.js";
export * from "./scopes.js";
export * from "./ts-lexical-scope.js";
export * from "./ts-module-scope.js";
export * from "./ts-output-symbol.js";
export * from "./ts-package-scope.js";

export function createTypeAndValueSymbol(
  name: string,
  options: CreateTsSymbolOptions = {},
) {
  const scope = useLexicalScope();
  const spaces = scope ? [scope.types, scope.values] : [];
  return new TSOutputSymbol(name, spaces, options);
}

export function createTypeSymbol(name: string, options: CreateTsSymbolOptions) {
  const scope = useLexicalScope();
  const spaces = scope ? [scope.types] : [];
  return new TSOutputSymbol(name, spaces, options);
}

export function createValueSymbol(
  name: string,
  options: CreateTsSymbolOptions = {},
) {
  const scope = useLexicalScope();
  const spaces = scope ? [scope.values] : [];
  return new TSOutputSymbol(name, spaces, options);
}

export function createStaticMemberSymbol(
  name: string,
  options: CreateTsSymbolOptions = {},
) {
  const owner = useMemberOwner();
  return new TSOutputSymbol(name, owner.staticMembers, options);
}

export function createInstanceMemberSymbol(
  name: string,
  options: CreateTsSymbolOptions = {},
) {
  const owner = useMemberOwner();
  return new TSOutputSymbol(name, owner.instanceMembers, options);
}

export function createPrivateStaticMemberSymbol(
  name: string,
  options: CreateTsSymbolOptions = {},
) {
  const owner = useMemberOwner();
  return new TSOutputSymbol(name, owner.privateStaticMembers, options);
}

export function createPrivateInstanceMemberSymbol(
  name: string,
  options: CreateTsSymbolOptions = {},
) {
  const owner = useMemberOwner();
  return new TSOutputSymbol(name, owner.privateInstanceMembers, options);
}

export function createMemberSymbol(
  name: string,
  locationOptions: { jsPrivate?: boolean; static?: boolean },
  options: CreateTsSymbolOptions = {},
) {
  if (locationOptions.jsPrivate) {
    if (locationOptions.static) {
      return createPrivateStaticMemberSymbol(name, options);
    } else {
      return createPrivateInstanceMemberSymbol(name, options);
    }
  } else {
    if (locationOptions.static) {
      return createStaticMemberSymbol(name, options);
    } else {
      return createInstanceMemberSymbol(name, options);
    }
  }
}

export function createLexicalScope(
  name: string,
  options: OutputScopeOptions = {},
) {
  const parent = useScope();

  return new TSLexicalScope(name, parent, options);
}
