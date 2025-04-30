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

  const s3 = binder.createSymbol({
    name: "sym",
    scope,
  });

  flushJobs();

  expect(_s1.name).toEqual("sym");
  expect(s2.name).toEqual("sym_2");
  expect(s3.name).toEqual("sym_3");
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
  it("instantiates instance members", () => {
    const binder = createOutputBinder();

    /**
     * The following structure would match code like this:
     * ```ts
     * // A class with instance members
     * class Source {
     *   instance() {
     *     print("instance");
     *   }
     * }
     *
     * // Instantiates into t
     * var t = new Source();
     *
     * t.instance();
     * ```
     */
    const {
      symbols: { rootSymbol, instance, instantiation },
    } = createScopeTree(binder, {
      rootScope: {
        symbols: {
          rootSymbol: {
            flags: OutputSymbolFlags.InstanceMemberContainer,
            instanceMembers: {
              instance: {
                flags: OutputSymbolFlags.InstanceMember,
              },
            },
          },
          instantiation: {},
        },
      },
    });

    binder.instantiateSymbolInto(rootSymbol, instantiation);
    expect(
      instantiation.flags & OutputSymbolFlags.StaticMemberContainer,
    ).toBeTruthy();
    expect(instantiation.staticMemberScope).toBeDefined();
    const expectedRefkey = refkey(
      instantiation.refkeys[0],
      instance.refkeys[0],
    );
    expect(
      instantiation.staticMemberScope!.symbolsByRefkey.get(expectedRefkey),
    ).toBeDefined();
  });

  it("doesn't duplicate symbols", () => {
    const binder = createOutputBinder();

    const {
      symbols: { rootSymbol, instantiation },
    } = createScopeTree(binder, {
      rootScope: {
        symbols: {
          rootSymbol: {
            flags: OutputSymbolFlags.InstanceMemberContainer,
            instanceMembers: {
              instance: {
                flags: OutputSymbolFlags.InstanceMember,
              },
            },
          },
          instantiation: {},
        },
      },
    });

    binder.instantiateSymbolInto(rootSymbol, instantiation);
    flushJobs();
    expect(instantiation.staticMemberScope!.symbols.size).toBe(1);

    const lateKey = refkey();
    // now add a brand‐new static member to source
    binder.createSymbol({
      name: "lateChild",
      scope: rootSymbol.instanceMemberScope!,
      refkey: lateKey,
      flags: OutputSymbolFlags.InstanceMember,
    });

    flushJobs();

    expect(rootSymbol.instanceMemberScope!.symbols.size).toBe(2);
    expect(instantiation.staticMemberScope!.symbols.size).toBe(2);
  });

  it("should remove members in instance when source deleted them", () => {
    const binder = createOutputBinder();

    const {
      symbols: { rootSymbol, instantiation },
    } = createScopeTree(binder, {
      rootScope: {
        symbols: {
          rootSymbol: {
            flags: OutputSymbolFlags.InstanceMemberContainer,
            instanceMembers: {
              instance: {
                flags: OutputSymbolFlags.InstanceMember,
              },
            },
          },
          instantiation: {},
        },
      },
    });

    binder.instantiateSymbolInto(rootSymbol, instantiation);
    expect(instantiation.staticMemberScope!.symbols.size).toBe(1);

    const lateKey = refkey();
    // now add a brand‐new static member to source
    binder.createSymbol({
      name: "lateChild",
      scope: rootSymbol.instanceMemberScope!,
      refkey: lateKey,
      flags: OutputSymbolFlags.InstanceMember,
    });

    flushJobs();

    expect(rootSymbol.instanceMemberScope!.symbols.size).toBe(2);
    expect(instantiation.staticMemberScope!.symbols.size).toBe(2);

    binder.deleteSymbol(
      rootSymbol.instanceMemberScope!.symbols.values().next().value!,
    );
    flushJobs();
    expect(rootSymbol.instanceMemberScope!.symbols.size).toBe(1);
    expect(instantiation.staticMemberScope!.symbols.size).toBe(1);
  });

  it("instantiates instance members added after the instantiation", () => {
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
                flags: OutputSymbolFlags.InstanceMember,
              },
            },
          },
          instantiation: {},
        },
      },
    });

    binder.instantiateSymbolInto(rootSymbol, instantiation);
    flushJobs();
    expect(
      instantiation.flags & OutputSymbolFlags.StaticMemberContainer,
    ).toBeTruthy();
    expect(instantiation.staticMemberScope).toBeDefined();
    const expectedRefkey = refkey(
      instantiation.refkeys[0],
      instance.refkeys[0],
    );
    expect(
      instantiation.staticMemberScope!.symbolsByRefkey.get(expectedRefkey),
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
    flushJobs();
    expect(
      instantiation.staticMemberScope!.symbolsByRefkey.get(newExpectedRefkey),
    ).toBeDefined();
  });

  it("instantiates static symbols for a static container source", () => {
    const binder = createOutputBinder();

    /**
     * The following structure would match code like this:
     * ```ts
     * // A class with instance members
     * class Source {
     *   static child() {
     *     print("child");
     *   }
     * }
     *
     *
     * var printChild = Source.child;
     *
     * printChild();
     * ```
     */
    const {
      symbols: { source, child, target },
    } = createScopeTree(binder, {
      root: {
        symbols: {
          source: {
            flags: OutputSymbolFlags.StaticMemberContainer,
            staticMembers: {
              child: { flags: OutputSymbolFlags.StaticMember },
            },
          },
          target: {},
        },
      },
    });

    binder.instantiateSymbolInto(source, target);

    // target must now be a StaticMemberContainer too
    expect(target.flags & OutputSymbolFlags.StaticMemberContainer).toBeTruthy();
    expect(target.staticMemberScope).toBeDefined();

    const expectedKey = refkey(target.refkeys[0], child.refkeys[0]);
    expect(
      target.staticMemberScope!.symbolsByRefkey.get(expectedKey),
    ).toBeDefined();
  });

  it("instantiates static symbols added after instantiation", () => {
    const binder = createOutputBinder();
    const lateKey = refkey();

    const {
      symbols: { source, target },
    } = createScopeTree(binder, {
      root: {
        symbols: {
          source: {
            flags: OutputSymbolFlags.StaticMemberContainer,
          },
          target: {},
        },
      },
    });

    // hook up instantiation
    binder.instantiateSymbolInto(source, target);

    // now add a brand‐new static member to source
    const late = binder.createSymbol({
      name: "lateChild",
      scope: source.staticMemberScope!,
      refkey: lateKey,
      flags: OutputSymbolFlags.StaticMember,
    });

    flushJobs();

    // it should *automatically* show up on target.staticMemberScope
    const expectedKey = refkey(target.refkeys[0], late.refkeys[0]);
    expect(
      target.staticMemberScope!.symbolsByRefkey.get(expectedKey),
    ).toBeDefined();
  });

  it("recursively instantiates nested static members", () => {
    const binder = createOutputBinder();

    /**
     * The following structure would match code like this:
     * ```ts
     *   class Source {
     *     static Level1 = class {
     *       static level2() { print("deep"); }
     *     }
     *   }
     *
     *   var target = Source;
     *
     *   target.Level1.level2()
     * ```
     */
    const {
      symbols: { source, level1, level2, target },
    } = createScopeTree(binder, {
      root: {
        symbols: {
          source: {
            flags: OutputSymbolFlags.StaticMemberContainer,
            staticMembers: {
              level1: {
                flags:
                  OutputSymbolFlags.StaticMember |
                  OutputSymbolFlags.StaticMemberContainer,
                staticMembers: {
                  level2: { flags: OutputSymbolFlags.StaticMember },
                },
              },
            },
          },
          target: {},
        },
      },
    });

    binder.instantiateSymbolInto(source, target);

    // level1 should appear under target.staticMemberScope
    const key1 = refkey(target.refkeys[0], level1.refkeys[0]);
    const instantiated1 = target.staticMemberScope!.symbolsByRefkey.get(key1)!;
    expect(instantiated1.name).toBe(level1.name);

    // and level2 should appear under the *child* staticMemberScope of that instantiated level1
    const childScope = instantiated1.staticMemberScope!;
    const key2 = refkey(instantiated1.refkeys[0], level2.refkeys[0]);
    expect(childScope.symbolsByRefkey.get(key2)).toBeDefined();
  });

  it("copies both instance *and* static members when source has both flags", () => {
    const binder = createOutputBinder();

    /**
     * ```ts
     *   class Source {
     *     instance() { print("inst"); }
     *     static s1()  { print("static"); }
     *   }
     *
     *   let t = new Source()
     *   t.instance()
     *   t.s1()
     * ```
     */
    const {
      symbols: { source, inst },
    } = createScopeTree(binder, {
      root: {
        symbols: {
          source: {
            flags:
              OutputSymbolFlags.InstanceMemberContainer |
              OutputSymbolFlags.StaticMemberContainer,
            instanceMembers: {
              i1: { flags: OutputSymbolFlags.InstanceMember },
            },
            staticMembers: {
              s1: { flags: OutputSymbolFlags.StaticMember },
            },
          },
          inst: {},
        },
      },
    });

    binder.instantiateSymbolInto(source, inst);

    expect(inst.staticMemberScope).toBeDefined();
    expect(
      [...inst.staticMemberScope!.symbols].some((s) => s.name === "i1"),
    ).toBe(true);

    // static side
    const symbols = [...source.staticMemberScope!.symbols];
    expect(inst.staticMemberScope).toBeDefined();
    const sKey = refkey(inst.refkeys[0], symbols[0].refkeys[0]);
    expect(inst.staticMemberScope!.symbolsByRefkey.has(sKey)).toBe(true);
  });

  it("is idempotent, calling twice does not duplicate", () => {
    const binder = createOutputBinder();
    const {
      symbols: { source, target },
    } = createScopeTree(binder, {
      root: {
        symbols: {
          source: {
            flags: OutputSymbolFlags.StaticMemberContainer,
            staticMembers: {
              a: { flags: OutputSymbolFlags.StaticMember },
            },
          },
          target: {},
        },
      },
    });

    binder.instantiateSymbolInto(source, target);
    flushJobs();
    const initialCount = target.staticMemberScope!.symbols.size;
    binder.instantiateSymbolInto(source, target);
    flushJobs();
    expect(target.staticMemberScope!.symbols.size).toBe(initialCount);
  });

  it("instantiates static children of instance members under the instance scope", () => {
    const binder = createOutputBinder();
    /**
     * ```ts
     *    class Source {
     *     instM = class {
     *       static deep() { print("deep"); }
     *     }
     *    }
     *
     *   var t = new Source();
     *   t.instM.deep();
     * ```
     */
    const {
      symbols: { source, deep, target },
    } = createScopeTree(binder, {
      root: {
        symbols: {
          source: {
            flags: OutputSymbolFlags.InstanceMemberContainer,
            instanceMembers: {
              instM: {
                flags:
                  OutputSymbolFlags.InstanceMember |
                  OutputSymbolFlags.StaticMemberContainer,
                staticMembers: {
                  deep: { flags: OutputSymbolFlags.StaticMember },
                },
              },
            },
          },
          target: {},
        },
      },
    });

    binder.instantiateSymbolInto(source, target);

    // Find the instantiated copy of instM under target.instanceMemberScope
    const instMSym = [...target.staticMemberScope!.symbols].find(
      (s) => s.name === "instM",
    )!;

    // instMSym should have gotten its own staticMemberScope via the StaticMemberContainer flag
    expect(instMSym.staticMemberScope).toBeDefined();

    // compute the expected key for the deep child:
    //    (<target>, <instM>)  then (on that)  (<deep original>)
    const expectedDeepKey = refkey(instMSym.refkeys[0], deep.refkeys[0]);

    expect(
      instMSym.staticMemberScope!.symbolsByRefkey.has(expectedDeepKey),
    ).toBe(true);
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

describe("Merging symbols", () => {
  it("uses the first symbol for the name and scope", () => {
    const binder = createOutputBinder();
    const scope = binder.createScope({
      kind: "foo",
      name: "scope",
      parent: binder.globalScope,
    });

    const s1r1 = refkey();
    const s1r2 = refkey();
    const s2r1 = refkey();

    const s1 = binder.createSymbol({
      name: "sym",
      scope,
      flags: OutputSymbolFlags.Transient,
      refkey: [s1r1, s1r2],
    });

    const s2 = binder.createSymbol({
      name: "sym",
      flags: OutputSymbolFlags.Transient,
      refkey: s2r1,
    });

    expect(scope.symbols.size).toBe(0);
    const merged = binder.mergeSymbols([s1, s2]);
    expect(merged.name).toBe("sym");
    expect(merged.scope).toBe(scope);
    expect(merged.flags & ~OutputSymbolFlags.Transient).toBe(0);
    expect(scope.symbols.size).toBe(1);
    expect(Array.from(scope.symbols.values())[0]).toBe(merged);
    expect(merged.refkeys).toEqual([s1r1, s1r2, s2r1]);
  });

  it("merges static and instance symbols together", () => {
    const binder = createOutputBinder();
    const scope = binder.createScope({
      kind: "foo",
      name: "scope",
      parent: binder.globalScope,
    });

    const s1 = binder.createSymbol({
      name: "sym",
      scope,
      flags:
        OutputSymbolFlags.Transient | OutputSymbolFlags.StaticMemberContainer,
    });

    const s2 = binder.createSymbol({
      name: "sym",
      flags:
        OutputSymbolFlags.Transient | OutputSymbolFlags.StaticMemberContainer,
    });

    binder.createSymbol({
      name: "m1",
      scope: s1.staticMemberScope!,
      flags: OutputSymbolFlags.StaticMember,
    });

    binder.createSymbol({
      name: "m2",
      scope: s2.staticMemberScope!,
      flags: OutputSymbolFlags.StaticMember,
    });

    const merged = binder.mergeSymbols([s1, s2]);
    expect(merged.staticMemberScope).toBeDefined();
    expect(merged.staticMemberScope?.symbols.size).toBe(2);
  });
});
