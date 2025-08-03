import { useScope } from "@alloy-js/core";
import { TSLexicalScope } from "./ts-lexical-scope.js";
import { TSMemberScope } from "./ts-member-scope.js";
import { TSModuleScope } from "./ts-module-scope.js";
import { TSPackageScope } from "./ts-package-scope.js";

export type TSOutputScope = TSPackageScope | TSModuleScope | TSLexicalScope;

export function useTSScope() {
  return useScope() as TSOutputScope;
}

export function useTSLexicalScope(): TSLexicalScope {
  const scope = useTSScope();

  if (!(scope instanceof TSLexicalScope)) {
    throw new Error(
      "Expected a TSLexicalScope, but got " + scope.constructor.name,
    );
  }

  return scope;
}

export function useTSLexicalScopeIfPresent() {
  const scope = useTSScope();
  if (!scope) {
    return undefined;
  }
  if (!(scope instanceof TSLexicalScope)) {
    throw new Error(
      "Expected a TSLexicalScope, but got " + scope.constructor.name,
    );
  }
  return scope;
}

export function useTSMemberScope(): TSMemberScope {
  const scope = useTSScope();

  if (!(scope instanceof TSMemberScope)) {
    throw new Error(
      "Expected a TSMemberScope, but got " + scope.constructor.name,
    );
  }

  return scope;
}
