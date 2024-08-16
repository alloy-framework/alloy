import { Binder, OutputSymbol, Refkey, useScope } from "@alloy-js/core";
import { TSOutputScope } from "./scopes.js";
import { TSMemberScope } from "./ts-member-scope.js";

// prettier-ignore
export enum TSSymbolFlags {
  None              = 0,
  LocalImportSymbol = 1 << 0,
  TypeSymbol        = 1 << 1,
  ParameterSymbol   = 1 << 2,
  MemberSymbol      = 1 << 3
}

export interface TSOutputSymbol extends OutputSymbol {
  scope: TSOutputScope;
  export: boolean;
  default: boolean;
  flags: TSSymbolFlags;
  memberScope?: TSMemberScope;
}

interface createTsSymbolOptions {
  name: string;
  refkey: Refkey;
  binder?: Binder;
  scope?: TSOutputScope;
  export?: boolean;
  default?: boolean;
  flags?: TSSymbolFlags;
}

export function createTSSymbol(options: createTsSymbolOptions): TSOutputSymbol {
  const scope = options.scope ?? (useScope() as TSOutputScope);

  if (scope.kind !== "module" && (options.export || options.default)) {
    throw new Error("Can't export symbol from non-module scope");
  }

  const binder = scope.binder;

  const sym = binder.createSymbol<TSOutputSymbol>({
    name: options.name,
    scope,
    refkey: options.refkey,
    export: !!options.export,
    default: !!options.default,
    flags: options.flags ?? TSSymbolFlags.None,
  });

  if (options.export && scope.kind === "module") {
    scope.exportedSymbols.set(sym.refkey, sym);
  }

  return sym;
}
