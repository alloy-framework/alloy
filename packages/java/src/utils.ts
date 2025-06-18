import { useScope } from "@alloy-js/core";
import { JavaLexicalScope } from "./symbols/java-lexical-scope.js";

export function useLexicalScope(): JavaLexicalScope | undefined {
  const scopeContext = useScope();
  if (!scopeContext) {
    return undefined;
  }

  if (!(scopeContext instanceof JavaLexicalScope)) {
    throw new Error(
      "A lexical scope is required but the current scope is not a lexical scope",
    );
  }

  return scopeContext;
}
