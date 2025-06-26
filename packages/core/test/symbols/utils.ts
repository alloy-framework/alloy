import { Binder } from "../../src/index.browser.js";
import {
  OutputScopeFlags,
  OutputSymbolFlags,
} from "../../src/symbols/flags.js";
import { OutputScope } from "../../src/symbols/output-scope.js";
import { OutputSymbol } from "../../src/symbols/output-symbol.js";
import { Refkey, refkey } from "../../src/symbols/refkey.js";

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

interface ScopeTreeResult {
  symbols: Record<string, OutputSymbol>;
  scopes: Record<string, OutputScope>;
}
export function createScopeTree(
  binder: Binder,
  tree: ScopeRecords,
): ScopeTreeResult {
  const createdItems: ScopeTreeResult = {
    symbols: {},
    scopes: {},
  };

  for (const [name, desc] of Object.entries(tree)) {
    createScope(name, desc);
  }

  return createdItems;

  function createScope(
    name: string,
    descriptor: ScopeDescriptor,
    parent = binder.globalScope,
  ) {
    const scope = new OutputScope(name, {
      binder,
      parent,
      flags: descriptor.flags,
    });

    createdItems.scopes[name] = scope;

    for (const [name, desc] of Object.entries(descriptor.symbols)) {
      createSymbol(name, desc, scope);
    }

    for (const [name, desc] of Object.entries(descriptor.scopes ?? {})) {
      createScope(name, desc, scope);
    }
  }

  function createSymbol(
    name: string,
    descriptor: SymbolDescriptor,
    parent: OutputScope,
  ) {
    const symbol = new OutputSymbol(name, {
      binder,
      scope: parent,
      refkeys: [descriptor.refkey ?? refkey()],
      flags: descriptor.flags ?? OutputSymbolFlags.None,
    });

    createdItems.symbols[name] = symbol;

    if (descriptor.instanceMembers) {
      for (const [name, desc] of Object.entries(descriptor.instanceMembers)) {
        createSymbol(name, desc, symbol.instanceMemberScope!);
      }
    }

    if (descriptor.staticMembers) {
      for (const [name, desc] of Object.entries(descriptor.staticMembers)) {
        createSymbol(name, desc, symbol.staticMemberScope!);
      }
    }
  }
}
