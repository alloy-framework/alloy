import { beforeEach } from "vitest";

import type { Binder } from "../../src/binder.js";
import { createOutputBinder } from "../../src/binder.js";
import type { OutputSpace } from "../../src/index.js";
import type { Namekey, Refkey } from "../../src/refkey.js";
import { refkey } from "../../src/refkey.js";
import { BasicScope } from "../../src/symbols/basic-scope.js";
import { BasicSymbol } from "../../src/symbols/basic-symbol.js";
import type { OutputScopeOptions } from "../../src/symbols/output-scope.js";
import type { OutputSymbolOptions } from "../../src/symbols/output-symbol.js";

type ScopeRecords = Record<string, ScopeDescriptor>;
type SymbolRecords = Record<string, SymbolDescriptor>;

interface ScopeDescriptor {
  scopes?: ScopeRecords;
  symbols: SymbolRecords;
}

interface SymbolDescriptor {
  refkey?: Refkey;
  instanceMembers?: SymbolRecords;
  staticMembers?: SymbolRecords;
}

export let binder: Binder;
beforeEach(() => {
  binder = createOutputBinder();
});

export function createScope(
  name: string,
  parent?: BasicScope,
  options?: OutputScopeOptions,
) {
  return new BasicScope(name, parent, {
    binder,
    ...options,
  });
}

export function createSymbol(
  name: string | Namekey,
  scope: BasicScope | OutputSpace,
  options?: OutputSymbolOptions,
): [BasicSymbol, Refkey] {
  const space = scope instanceof BasicScope ? scope.symbols : scope;
  const key = refkey();
  const refkeys = options?.refkeys ? [...[options.refkeys].flat(), key] : [key];

  return [
    new BasicSymbol(name, space, {
      binder,
      ...options,
      refkeys,
    }),
    key,
  ];
}
