import {
  Binder,
  OutputSymbol,
  OutputSymbolFlags,
  Refkey,
  useDefaultScope,
} from "@alloy-js/core";
import { TSOutputScope } from "./scopes.js";
import { createTSMemberScope, TSMemberScope } from "./ts-member-scope.js";

// prettier-ignore
export enum TSSymbolFlags {
  None                   = 0,
  LocalImportSymbol      = 1 << 0,
  TypeSymbol             = 1 << 1,
  ParameterSymbol        = 1 << 2,
  PrivateMember          = 1 << 3,
  PrivateMemberContainer = 1 << 4,
}

export interface TSOutputSymbol extends OutputSymbol {
  scope: TSOutputScope;
  export: boolean;
  default: boolean;
  tsFlags: TSSymbolFlags;
  privateMemberScope?: TSMemberScope;
  privateStaticMemberScope?: TSMemberScope;
}

export interface createTsSymbolOptions {
  name: string;
  refkey?: Refkey | Refkey[];
  binder?: Binder;
  scope?: TSOutputScope;
  export?: boolean;
  default?: boolean;
  flags?: OutputSymbolFlags;
  tsFlags?: TSSymbolFlags;
  metadata?: Record<string, unknown>;
}

export function createTSSymbol(options: createTsSymbolOptions): TSOutputSymbol {
  const scope =
    options.scope ?? (useDefaultScope(options.flags) as TSOutputScope);

  if (scope.kind !== "module" && (options.export || options.default)) {
    throw new Error("Can't export symbol from non-module scope");
  }

  const binder = scope.binder;
  const tsFlags = options.tsFlags ?? TSSymbolFlags.None;
  const sym = binder.createSymbol<TSOutputSymbol>({
    name: options.name,
    scope,
    refkey: options.refkey,
    export: !!options.export,
    default: !!options.default,
    flags: options.flags ?? OutputSymbolFlags.None,
    tsFlags,
    metadata: options.metadata,
  });

  if (tsFlags & TSSymbolFlags.PrivateMemberContainer) {
    sym.privateMemberScope = createTSMemberScope(binder, undefined, sym);
    sym.privateStaticMemberScope = createTSMemberScope(
      binder,
      undefined,
      sym,
      true,
    );
  }

  if (options.export && scope.kind === "module") {
    for (const refkey of sym.refkeys) {
      scope.exportedSymbols.set(refkey, sym);
    }
  }

  return sym;
}
