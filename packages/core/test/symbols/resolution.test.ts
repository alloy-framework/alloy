import { describe, expect, it } from "vitest";
import { createOutputBinder, refkey } from "../../src/index.browser.js";
import { flushJobs } from "../../src/scheduler.js";
import { OutputSymbolFlags } from "../../src/symbols/flags.js";
import { OutputSymbol } from "../../src/symbols/output-symbol.js";
import { createScopeTree } from "./utils.js";

describe("Symbol name resolution", () => {
  it.only("resolves static symbols", () => {
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
    const sym = new OutputSymbol("foo", {
      binder,
      scope: binder.globalScope,
      refkeys: [key],
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

    const sym = new OutputSymbol("foo", {
      binder,
      scope: binder.globalScope,
      refkeys: [key],
    });

    expect(resolvedSym.value?.targetDeclaration).toBe(sym);
  });

  it("handles deleted symbols by updating resolutions", () => {
    const key = refkey();
    const binder = createOutputBinder();

    const resolvedSym = binder.resolveDeclarationByKey(
      undefined,
      undefined,
      key,
    );

    const sym = new OutputSymbol("foo", {
      binder,
      scope: binder.globalScope,
      refkeys: [key],
    });

    flushJobs();
    expect(resolvedSym.value?.targetDeclaration).toBe(sym);

    sym.delete();
    flushJobs();
    expect(resolvedSym.value).toBe(undefined);
  });
});
