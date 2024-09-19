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
    refkey: "foo",
  });

  expect([...scope.getSymbolNames()]).toEqual(["sym"]);

  symbol.name = "bar";

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
    refkey: "foo",
  });

  const s2 = binder.createSymbol({
    name: "sym",
    scope,
    refkey: "foo",
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
      staticSym.refkey,
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
      nested_static.refkey,
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
      instance.refkey,
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

  it("doesn't resolve from outside the member scope", () => {
    const binder = createOutputBinder();
    const {
      scopes: { root },
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

    expect(() =>
      binder.resolveDeclarationByKey(root, undefined, instance.refkey),
    ).toThrow(/Cannot resolve member symbols/);
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
    const expectedRefkey = refkey(instantiation.refkey, instance.refkey);
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
    expect(
      instantiation.flags & OutputSymbolFlags.InstanceMemberContainer,
    ).toBeTruthy();
    expect(instantiation.instanceMemberScope).toBeDefined();
    const expectedRefkey = refkey(instantiation.refkey, instance.refkey);
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
      instantiation.refkey,
      newInstanceMemberRefkey,
    );
    expect(
      instantiation.instanceMemberScope!.symbolsByRefkey.get(newExpectedRefkey),
    ).toBeDefined();
  });
});
