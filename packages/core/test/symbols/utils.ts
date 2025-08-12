import { beforeEach } from "vitest";
import { Binder, createOutputBinder } from "../../src/binder.js";
import { Refkey } from "../../src/refkey.js";
import { BasicScope } from "../../src/symbols/basic-scope.js";
import { BasicSymbol } from "../../src/symbols/basic-symbol.js";
import {
  OutputScopeFlags,
  OutputSymbolFlags,
} from "../../src/symbols/flags.js";
import { OutputScopeOptions } from "../../src/symbols/output-scope.js";
import { OutputSymbolOptions } from "../../src/symbols/output-symbol.js";
import { SymbolTable } from "../../src/symbols/symbol-table.js";

type ScopeRecords = Record<string, ScopeDescriptor>;
type SymbolRecords = Record<string, SymbolDescriptor>;

interface ScopeDescriptor {
  flags?: OutputScopeFlags;
  scopes?: ScopeRecords;
  symbols: SymbolRecords;
}

interface SymbolDescriptor {
  refkey?: Refkey;
  flags?: OutputSymbolFlags;
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
  scope: BasicScope | SymbolTable,
  options?: OutputSymbolOptions,
) {
  const space = scope instanceof BasicScope ? scope.symbols : scope;
  return new BasicSymbol(name, space, {
    binder,
    ...options,
  });
}
