import { beforeEach } from "vitest";
import { Binder, createOutputBinder } from "../../src/binder.js";
import { OutputSpace } from "../../src/index.js";
import { Refkey } from "../../src/refkey.js";
import { BasicScope } from "../../src/symbols/basic-scope.js";
import { BasicSymbol } from "../../src/symbols/basic-symbol.js";
import { OutputScopeOptions } from "../../src/symbols/output-scope.js";
import { OutputSymbolOptions } from "../../src/symbols/output-symbol.js";

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
  name: string,
  scope: BasicScope | OutputSpace,
  options?: OutputSymbolOptions,
) {
  const space = scope instanceof BasicScope ? scope.symbols : scope;
  return new BasicSymbol(name, space, {
    binder,
    ...options,
  });
}
