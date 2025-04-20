import { describe, expect, it } from "vitest";
import {
  Binder,
  createOutputBinder,
  OutputScope,
  OutputScopeFlags,
  OutputSymbol,
  OutputSymbolFlags,
} from "../src/binder.js";
import { Refkey, refkey } from "../src/refkey.js";
import { flushJobs } from "../src/scheduler.js";

it("works", () => {
  const binder = createOutputBinder();
  const scope = binder.createScope({
    kind: "foo",
    name: "scope",
    parent: binder.globalScope,
  });

  const symbol = binder.createSymbol({
    name: "sym",
    scope,
  });

  flushJobs();
  expect([...scope.getSymbolNames()]).toEqual(["sym"]);

  symbol.name = "bar";
  flushJobs();
  expect([...scope.getSymbolNames()]).toEqual(["bar"]);
});

it("resolves symbol conflicts", () => {
  const binder = createOutputBinder();
  const scope = binder.createScope({
    kind: "foo",
    name: "scope",
    parent: binder.globalScope,
  });

  const _s1 = binder.createSymbol({
    name: "sym",
    scope,
  });

  const s2 = binder.createSymbol({
    name: "sym",
    scope,
  });

  expect(s2.name).toEqual("sym_2");
});

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
function createScopeTree(binder: Binder, tree: ScopeRecords): ScopeTreeResult {
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
    const scope = binder.createScope({
      kind: "useless",
      name,
      parent,
      flags: descriptor.flags ?? OutputScopeFlags.None,
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
    const symbol = binder.createSymbol({
      name,
      scope: parent,
      refkey: descriptor.refkey ?? refkey(),
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
describe("static members", () => {
  it("resolves static symbols", () => {
    const binder = createOutputBinder();
    const {
      scopes: { root },
      symbols: { root: rootSym, static: staticSym },
    } = createScopeTree(binder, {
      root: {
        symbols: {
          root: {
            flags:
              OutputSymbolFlags.InstanceMemberContainer |
              OutputSymbolFlags.StaticMemberContainer,
            staticMembers: {
              static: {
                flags: OutputSymbolFlags.StaticMember,
              },
            },
          },
        },
      },
    });

    const resolution = binder.resolveDeclarationByKey(
      root,
      undefined,
      staticSym.refkeys[0],
    );
    expect(resolution.value).toBeDefined();
    const { commonScope, pathUp, pathDown, targetDeclaration, memberPath } =
      resolution.value!;
    expect(commonScope).toBe(root);
    expect(targetDeclaration).toBe(rootSym);
    expect(pathDown).toEqual([]);
    expect(pathUp).toEqual([]);
    expect(memberPath!.map((s) => s.name)).toEqual(["root", "static"]);
  });

  it("resolves deeply nested static symbols", () => {
    const binder = createOutputBinder();
    const {
      scopes: { root },
      symbols: { root: rootSym, nested_static },
    } = createScopeTree(binder, {
      root: {
        symbols: {
          root: {
            flags:
              OutputSymbolFlags.InstanceMemberContainer |
              OutputSymbolFlags.StaticMemberContainer,
            staticMembers: {
              static: {
                flags:
                  OutputSymbolFlags.StaticMember |
                  OutputSymbolFlags.StaticMemberContainer,
                staticMembers: {
                  nested_static: {
                    flags: OutputSymbolFlags.StaticMember,
                  },
                },
              },
            },
          },
        },
      },
    });

    const resolution = binder.resolveDeclarationByKey(
      root,
      undefined,
      nested_static.refkeys[0],
    );
    expect(resolution.value).toBeDefined();
    const { commonScope, pathUp, pathDown, targetDeclaration, memberPath } =
      resolution.value!;
    expect(commonScope).toBe(root);
    expect(targetDeclaration).toBe(rootSym);
    expect(pathDown).toEqual([]);
    expect(pathUp).toEqual([]);
    expect(memberPath!.map((s) => s.name)).toEqual([
      "root",
      "static",
      "nested_static",
    ]);
  });

  it("resolves static symbols lazily", () => {
    const staticSymRefkey = refkey();

    const binder = createOutputBinder();
    const {
      scopes: { root },
      symbols: { root: rootSym },
    } = createScopeTree(binder, {
      root: {
        symbols: {
          root: {
            flags:
              OutputSymbolFlags.InstanceMemberContainer |
              OutputSymbolFlags.StaticMemberContainer,
          },
        },
      },
    });

    const resolution = binder.resolveDeclarationByKey(
      root,
      undefined,
      staticSymRefkey,
    );
    expect(resolution.value).toBeUndefined();
    binder.createSymbol({
      name: "static",
      scope: rootSym.staticMemberScope!,
      refkey: staticSymRefkey,
      flags: OutputSymbolFlags.StaticMember,
    });

    expect(resolution.value).toBeDefined();
    const { commonScope, pathUp, pathDown, targetDeclaration, memberPath } =
      resolution.value!;
    expect(commonScope).toBe(root);
    expect(targetDeclaration).toBe(rootSym);
    expect(pathDown).toEqual([]);
    expect(pathUp).toEqual([]);
    expect(memberPath!.map((s) => s.name)).toEqual(["root", "static"]);
  });
});

describe("instance members", () => {
  it("resolves", () => {
    const binder = createOutputBinder();
    const {
      symbols: { root: rootSym, instance },
    } = createScopeTree(binder, {
      root: {
        symbols: {
          root: {
            flags: OutputSymbolFlags.InstanceMemberContainer,
            instanceMembers: {
              instance: {
                flags: OutputSymbolFlags.InstanceMember,
              },
            },
          },
        },
      },
    });

    const resolution = binder.resolveDeclarationByKey(
      undefined,
      rootSym.instanceMemberScope!,
      instance.refkeys[0],
    );
    expect(resolution.value).toBeDefined();
    const { commonScope, pathUp, pathDown, targetDeclaration, memberPath } =
      resolution.value!;

    expect(commonScope).toBe(rootSym.instanceMemberScope);
    expect(targetDeclaration).toBe(instance);
    expect(pathDown).toEqual([]);
    expect(pathUp).toEqual([]);
    expect(memberPath).toEqual([instance]);
  });
});

describe("instantiating members", () => {
  it("instantiates static symbols", () => {
    const binder = createOutputBinder();
    const {
      symbols: { rootSymbol, instance, instantiation },
    } = createScopeTree(binder, {
      rootScope: {
        symbols: {
          rootSymbol: {
            flags: OutputSymbolFlags.InstanceMemberContainer,
            instanceMembers: {
              instance: {
                flags: OutputSymbolFlags.StaticMember,
              },
            },
          },
          instantiation: {},
        },
      },
    });

    binder.instantiateSymbolInto(rootSymbol, instantiation);
    expect(
      instantiation.flags & OutputSymbolFlags.InstanceMemberContainer,
    ).toBeTruthy();
    expect(instantiation.instanceMemberScope).toBeDefined();
    const expectedRefkey = refkey(
      instantiation.refkeys[0],
      instance.refkeys[0],
    );
    expect(
      instantiation.instanceMemberScope!.symbolsByRefkey.get(expectedRefkey),
    ).toBeDefined();
  });

  it("instantiates static symbols that are added after the instantiation", () => {
    const binder = createOutputBinder();
    const {
      symbols: { rootSymbol, instance, instantiation },
    } = createScopeTree(binder, {
      rootScope: {
        symbols: {
          rootSymbol: {
            flags: OutputSymbolFlags.InstanceMemberContainer,
            instanceMembers: {
              instance: {
                flags: OutputSymbolFlags.StaticMember,
              },
            },
          },
          instantiation: {},
        },
      },
    });

    binder.instantiateSymbolInto(rootSymbol, instantiation);
    console.log("First flush");
    flushJobs();
    expect(
      instantiation.flags & OutputSymbolFlags.InstanceMemberContainer,
    ).toBeTruthy();
    expect(instantiation.instanceMemberScope).toBeDefined();
    const expectedRefkey = refkey(
      instantiation.refkeys[0],
      instance.refkeys[0],
    );
    expect(
      instantiation.instanceMemberScope!.symbolsByRefkey.get(expectedRefkey),
    ).toBeDefined();

    const newInstanceMemberRefkey = refkey();
    binder.createSymbol({
      name: "newInstanceMember",
      scope: rootSymbol.instanceMemberScope!,
      refkey: newInstanceMemberRefkey,
      flags: OutputSymbolFlags.InstanceMember,
    });
    const newExpectedRefkey = refkey(
      instantiation.refkeys[0],
      newInstanceMemberRefkey,
    );
    console.log("Last flush");
    flushJobs();
    expect(
      instantiation.instanceMemberScope!.symbolsByRefkey.get(newExpectedRefkey),
    ).toBeDefined();
  });
});

describe("symbol name resolution", () => {
  it("resolves static symbols", () => {
    const binder = createOutputBinder();
    const {
      symbols: { static: staticSym },
    } = createScopeTree(binder, {
      root: {
        symbols: {
          root: {
            flags:
              OutputSymbolFlags.InstanceMemberContainer |
              OutputSymbolFlags.StaticMemberContainer,
            staticMembers: {
              static: {
                flags: OutputSymbolFlags.StaticMember,
              },
            },
          },
        },
      },
    });

    const result = binder.resolveFQN("root.root.static");
    expect(result.value).toEqual(staticSym);
  });

  it("resolves static symbols that are added later", () => {
    const binder = createOutputBinder();
    const result = binder.resolveFQN("root.root.static");
    expect(result.value).toBeUndefined();

    const {
      symbols: { static: staticSym },
    } = createScopeTree(binder, {
      root: {
        symbols: {
          root: {
            flags:
              OutputSymbolFlags.InstanceMemberContainer |
              OutputSymbolFlags.StaticMemberContainer,
            staticMembers: {
              static: {
                flags: OutputSymbolFlags.StaticMember,
              },
            },
          },
        },
      },
    });

    expect(result.value).toEqual(staticSym);
  });

  it("resolves instance symbols", () => {
    const binder = createOutputBinder();
    const {
      symbols: { instance },
    } = createScopeTree(binder, {
      root: {
        symbols: {
          root: {
            flags: OutputSymbolFlags.InstanceMemberContainer,
            instanceMembers: {
              instance: {
                flags: OutputSymbolFlags.InstanceMember,
              },
            },
          },
        },
      },
    });

    const result = binder.resolveFQN("root.root#instance");
    expect(result.value).toEqual(instance);
  });

  it("resolves instance symbols that are added later", () => {
    const binder = createOutputBinder();
    const result = binder.resolveFQN("root.root#instance");
    expect(result.value).toBeUndefined();

    const {
      symbols: { instance },
    } = createScopeTree(binder, {
      root: {
        symbols: {
          root: {
            flags: OutputSymbolFlags.InstanceMemberContainer,
            instanceMembers: {
              instance: {
                flags: OutputSymbolFlags.InstanceMember,
              },
            },
          },
        },
      },
    });

    expect(result.value).toEqual(instance);
  });
});

describe("refkey resolution", () => {
  it("resolves existing symbols by refkey", () => {
    const key = refkey();
    const binder = createOutputBinder();
    const sym = binder.createSymbol({
      name: "foo",
      refkey: key,
      scope: binder.globalScope,
    });

    const resolvedSym = binder.resolveDeclarationByKey(
      undefined,
      undefined,
      key,
    );
    expect(resolvedSym.value?.targetDeclaration).toBe(sym);
  });

  it("resolves symbols by refkey when symbol is added later", () => {
    const key = refkey();
    const binder = createOutputBinder();

    const resolvedSym = binder.resolveDeclarationByKey(
      undefined,
      undefined,
      key,
    );

    const sym = binder.createSymbol({
      name: "foo",
      refkey: key,
      scope: binder.globalScope,
    });

    expect(resolvedSym.value?.targetDeclaration).toBe(sym);
  });

  it("resolves symbols by refkey when refkey is added later", () => {
    const key = refkey();
    const binder = createOutputBinder();

    const resolvedSym = binder.resolveDeclarationByKey(
      undefined,
      undefined,
      key,
    );

    const sym = binder.createSymbol({
      name: "foo",
      scope: binder.globalScope,
    });

    expect(resolvedSym.value).toBe(undefined);

    sym.refkeys[0] = key;
    flushJobs();
    expect(resolvedSym.value?.targetDeclaration).toBe(sym);
  });
});

describe("Deleting symbols", () => {
  it("updates resolutions", () => {
    const key = refkey();
    const binder = createOutputBinder();

    const resolvedSym = binder.resolveDeclarationByKey(
      undefined,
      undefined,
      key,
    );

    const sym = binder.createSymbol({
      name: "foo",
      scope: binder.globalScope,
    });

    expect(resolvedSym.value).toBe(undefined);

    sym.refkeys[0] = key;
    flushJobs();
    expect(resolvedSym.value?.targetDeclaration).toBe(sym);

    binder.deleteSymbol(sym);
    flushJobs();
    expect(resolvedSym.value).toBe(undefined);
  });

  it("removes from parent scopes", () => {
    const binder = createOutputBinder();
    const result = binder.resolveFQN("root.root#instance");
    expect(result.value).toBeUndefined();

    const {
      symbols: { instance, root, staticc },
      scopes: { rootScope },
    } = createScopeTree(binder, {
      rootScope: {
        symbols: {
          root: {
            flags:
              OutputSymbolFlags.InstanceMemberContainer |
              OutputSymbolFlags.StaticMemberContainer,
            instanceMembers: {
              instance: {
                flags: OutputSymbolFlags.InstanceMember,
              },
            },
            staticMembers: {
              staticc: {
                flags: OutputSymbolFlags.StaticMember,
              },
            },
          },
        },
      },
    });

    const staticScope = root.staticMemberScope!;
    const instanceScope = root.instanceMemberScope!;

    expect(staticScope.symbols.size).toBe(1);
    binder.deleteSymbol(staticc);
    expect(staticScope.symbols.size).toBe(0);

    expect(instanceScope.symbols.size).toBe(1);
    binder.deleteSymbol(instance);
    expect(instanceScope.symbols.size).toBe(0);

    expect(rootScope.symbols.size).toBe(1);
    binder.deleteSymbol(root);
    expect(rootScope.symbols.size).toBe(0);
  });
});
