import { OutputScopeOptions } from "@alloy-js/core";
import { TSOutputScope } from "./scopes.js";
import { TSLexicalScope } from "./ts-lexical-scope.js";
import { TSOutputSymbol } from "./ts-output-symbol.js";

export class TSMemberScope extends TSLexicalScope {
  public static readonly declarationSpaces = [];

  constructor(
    name: string,
    parentScope: TSOutputScope | undefined,
    ownerSymbol: TSOutputSymbol,
    options: OutputScopeOptions = {},
  ) {
    options.ownerSymbol = ownerSymbol;
    super(name, parentScope, options);
  }
  get ownerSymbol() {
    return super.ownerSymbol as TSOutputSymbol;
  }

  get isMemberScope() {
    return true;
  }
}
