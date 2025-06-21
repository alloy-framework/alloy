import { reactive, watch } from "@vue/reactivity";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ComponentContext } from "../../src/context.js";
import { MemberScopeContext } from "../../src/context/member-scope.js";
import { ScopeContext } from "../../src/index.browser.js";
import { renderTree } from "../../src/render.js";
import { flushJobs } from "../../src/scheduler.js";
import { Binder, createOutputBinder } from "../../src/symbols/binder.js";
import {
  OutputScopeFlags,
  OutputSymbolFlags,
} from "../../src/symbols/flags.js";
import { OutputScope } from "../../src/symbols/output-scope.js";
import { OutputSymbol } from "../../src/symbols/output-symbol.js";

let binder: Binder;
beforeEach(() => {
  binder = createOutputBinder();
});

describe("OutputSymbol reactivity", () => {
  it("keeps symbol names up-to-date", () => {
    const scope = new OutputScope("scope", { binder });
    const symbol = new OutputSymbol("sym", { binder, scope });
    flushJobs();
    expect(scope.symbolNames.has("sym")).toBe(true);

    symbol.name = "bar";
    flushJobs();
    expect(scope.symbolNames.has("bar")).toBe(true);
  });

  it("resolves symbol conflicts", () => {
    const scope = new OutputScope("scope", { binder });
    const s1 = new OutputSymbol("sym", { binder, scope });
    const s2 = new OutputSymbol("sym", { binder, scope });
    const s3 = new OutputSymbol("sym", { binder, scope });

    flushJobs();

    expect(s1.name).toEqual("sym");
    expect(s2.name).toEqual("sym_2");
    expect(s3.name).toEqual("sym_3");
  });

  it("is reactive on name, flags, scope, instanceMemberScope, and staticMemberScope", () => {
    const scope = new OutputScope("scope", { binder });
    const symbol = new OutputSymbol("sym", { binder, scope });

    const nameSpy = vi.fn();
    watch(() => symbol.name, nameSpy);
    const flagsSpy = vi.fn();
    watch(() => symbol.flags, flagsSpy);
    const scopeSpy = vi.fn();
    watch(() => symbol.scope, scopeSpy);
    const instanceMemberScopeSpy = vi.fn();
    watch(() => symbol.instanceMemberScope, instanceMemberScopeSpy);
    const staticMemberScopeSpy = vi.fn();
    watch(() => symbol.staticMemberScope, staticMemberScopeSpy);

    symbol.name = "foo";
    symbol.flags = 0;
    symbol.scope = new OutputScope("new-scope", { binder });
    symbol.flags |=
      OutputSymbolFlags.InstanceMemberContainer |
      OutputSymbolFlags.StaticMemberContainer;

    expect(nameSpy).toHaveBeenCalled();
    expect(flagsSpy).toHaveBeenCalled();
    expect(scopeSpy).toHaveBeenCalled();
    expect(instanceMemberScopeSpy).toHaveBeenCalled();
    expect(staticMemberScopeSpy).toHaveBeenCalled();
  });

  it("doesn't get wrapped in a reactive proxy", () => {
    const scope = new OutputScope("scope", { binder });
    const symbol = new OutputSymbol("sym", { binder, scope });

    const rSymbol = reactive(symbol);
    expect(rSymbol).toBe(symbol);
  });
});

describe("OutputSymbol#flags", () => {
  it("sets member flags based on parent scope", () => {
    const scope = new OutputScope("scope", { binder });
    const symbol = new OutputSymbol("sym", { binder, scope });
    expect(symbol.flags & OutputSymbolFlags.Member).toBeFalsy();
    const memberScope = new OutputScope("member-scope", {
      binder,
      owner: symbol,
      flags: OutputScopeFlags.InstanceMemberScope,
    });
    const memberSymbol = new OutputSymbol("member-sym", {
      binder,
      scope: memberScope,
    });
    expect(memberSymbol.flags & OutputSymbolFlags.InstanceMember).toBeTruthy();
  });
});

describe("OutputSymbol#staticMemberScope", () => {
  it("is created when needed", () => {
    const scope = new OutputScope("scope", { binder });
    const symbol = new OutputSymbol("sym", {
      binder,
      scope,
      flags: OutputSymbolFlags.StaticMemberContainer,
    });

    expect(symbol.staticMemberScope).toBeDefined();
    expect(symbol.staticMemberScope!.symbols.size).toEqual(0);
  });
});

describe("OutputSymbol#instanceMemberScope", () => {
  it("is created when needed", () => {
    const scope = new OutputScope("scope", { binder });
    const symbol = new OutputSymbol("sym", {
      binder,
      scope,
      flags: OutputSymbolFlags.InstanceMemberContainer,
    });

    expect(symbol.instanceMemberScope).toBeDefined();
    expect(symbol.instanceMemberScope!.symbols.size).toEqual(0);
  });
});

describe("OutputSymbol#metadata", () => {
  it("is reactive", () => {
    const scope = new OutputScope("scope", { binder });
    const symbol = new OutputSymbol("sym", {
      binder,
      scope,
      metadata: { foo: "bar" },
    });

    const metadataSpy = vi.fn();
    watch(() => symbol.metadata.foo, metadataSpy);
    symbol.metadata.foo = "baz";
    expect(metadataSpy).toHaveBeenCalled();
    expect(symbol.metadata.foo).toEqual("baz");
  });
});

describe("OutputSymbol#scope", () => {
  it("adds to parent scope", () => {
    const scope = new OutputScope("parent", { binder });
    const symbol = new OutputSymbol("sym", { binder, scope });
    expect(scope.symbols.has(symbol)).toBe(true);
  });

  it("defaults to the current lexical scope when not a member", () => {
    const scope = new OutputScope("parent", { binder });

    withContext([[ScopeContext, scope]], () => {
      const symbol = new OutputSymbol("sym", { binder });
      expect(scope.symbols.has(symbol)).toBe(true);
    });
  });

  it("defaults to the current member scope when a member", () => {
    const symbol = new OutputSymbol("Class", {
      binder,
      scope: binder.globalScope,
      flags: OutputSymbolFlags.MemberContainer,
    });

    withContext(
      [
        [
          MemberScopeContext,
          {
            instanceMembers: symbol.instanceMemberScope,
            staticMembers: symbol.staticMemberScope,
          },
        ],
      ],
      () => {
        const ms = new OutputSymbol("ms", {
          binder,
          flags: OutputSymbolFlags.InstanceMember,
        });
        const ss = new OutputSymbol("ss", {
          binder,
          flags: OutputSymbolFlags.StaticMember,
        });
        expect(symbol.instanceMemberScope!.symbols.has(ms)).toBe(true);
        expect(symbol.staticMemberScope!.symbols.has(ss)).toBe(true);
      },
    );
  });
});

type ContextRecord<T> = [ComponentContext<T>, T];

function withContext<Ts extends any[]>(
  contexts: { [K in keyof Ts]: ContextRecord<Ts[K]> },
  fn: () => void,
): void {
  let children = fn;
  for (let i = 0; i < contexts.length; i++) {
    const [context, value] = contexts[i];
    children = context.ProviderStc({ value }).children(children);
  }
  renderTree(children);
}

describe("Symbol#delete", () => {
  it("deletes from parent scope", () => {
    const scope = new OutputScope("parent", { binder });
    const symbol = new OutputSymbol("sym", { binder, scope });
    expect(scope.symbols.has(symbol)).toBe(true);
    symbol.delete();
    expect(scope.symbols.has(symbol)).toBe(false);
  });

  it("updates resolution");
});

describe("OutputSymbol#cloneInto", () => {
  it("copies values and propagates updates", () => {
    const scope = new OutputScope("scope", { binder });
    const scope2 = new OutputScope("scope2", { binder });
    const symbol = new OutputSymbol("sym", { binder, scope });
    const clone = symbol.copyToScope(scope2);

    expect(clone.name).toEqual("sym");
    expect(clone.flags).toEqual(symbol.flags);
    expect(clone.originalName).toEqual(symbol.originalName);

    symbol.name = "bar";
    symbol.flags = OutputSymbolFlags.InstanceMemberContainer;

    flushJobs();

    expect(clone.name).toEqual("bar");
    expect(clone.flags).toEqual(OutputSymbolFlags.InstanceMemberContainer);
  });

  it("works simply", () => {
    const scope = new OutputScope("scope", { binder });
    const symbol = new OutputSymbol("sym", {
      binder,
      scope,
      flags: OutputSymbolFlags.StaticMemberContainer,
    });

    const sourceStaticMember = new OutputSymbol("static-member", {
      binder,
      scope: symbol.staticMemberScope!,
    });
    const scope2 = new OutputScope("scope2", { binder });
    const clone = symbol.copyToScope(scope2);
    expect(clone.staticMemberScope!.symbols.size).toBe(1);

    sourceStaticMember.delete();
    flushJobs();
    expect(clone.staticMemberScope!.symbols.size).toBe(0);
  });
  it("clones instance and static member scopes", () => {
    const scope = new OutputScope("scope", { binder });
    const symbol = new OutputSymbol("sym", {
      binder,
      scope,
      flags: OutputSymbolFlags.MemberContainer,
    });

    const sourceStaticMember = new OutputSymbol("static-member", {
      binder,
      scope: symbol.staticMemberScope!,
      flags: OutputSymbolFlags.StaticMemberContainer,
    });

    const sourceInstanceMember = new OutputSymbol("instance-member", {
      binder,
      scope: symbol.instanceMemberScope!,
    });

    const scope2 = new OutputScope("scope2", { binder });
    const clone = symbol.copyToScope(scope2);

    expect(clone.instanceMemberScope).toBeDefined();
    expect(clone.staticMemberScope).toBeDefined();
    const clonedStaticMember = [...clone.staticMemberScope!.symbols][0];
    expect(clonedStaticMember.name).toBe("static-member");
    expect(clonedStaticMember).toBeDefined();
    expect(clonedStaticMember.flags).toBe(sourceStaticMember.flags);

    const clonedInstanceMember = [...clone.instanceMemberScope!.symbols][0];
    expect(clonedInstanceMember.name).toBe("instance-member");
    expect(clonedInstanceMember).toBeDefined();
    expect(clonedInstanceMember.flags).toBe(sourceInstanceMember.flags);
    expect(clonedInstanceMember.staticMemberScope).toBeUndefined();

    // test reactivity
    const newStaticSym = new OutputSymbol("new-sym", {
      binder,
      scope: symbol.staticMemberScope!,
    });

    const newInstanceSym = new OutputSymbol("new-sym", {
      binder,
      scope: symbol.instanceMemberScope!,
    });

    flushJobs();

    expect(clone.staticMemberScope!.symbolNames.has("new-sym")).toBe(true);
    expect(clone.instanceMemberScope!.symbolNames.has("new-sym")).toBe(true);

    newStaticSym.delete();
    newInstanceSym.delete();
    flushJobs();
    expect(clone.staticMemberScope!.symbolNames.has("new-sym")).toBe(false);
    expect(clone.instanceMemberScope!.symbolNames.has("new-sym")).toBe(false);
  });
});

describe("OutputSymbol#instantiateInto", () => {
  it("copies instance members to static member scope", () => {
    const scope = new OutputScope("scope", { binder });
    const classSym = new OutputSymbol("Class", {
      binder,
      scope,
      flags: OutputSymbolFlags.MemberContainer,
    });

    new OutputSymbol("instance-member", {
      binder,
      scope: classSym.instanceMemberScope!,
    });

    new OutputSymbol("static-member", {
      binder,
      scope: classSym.staticMemberScope!,
    });

    const targetSym = new OutputSymbol("Target", { binder, scope });
    classSym.instantiateTo(targetSym);
    expect(targetSym.staticMemberScope).toBeDefined();
    const staticNames = targetSym.staticMemberScope!.symbolNames;
    expect(staticNames.size).toEqual(1);
    expect(staticNames.has("instance-member")).toBe(true);
    const instantiatedSym = [...targetSym.staticMemberScope!.symbols][0];
    expect(instantiatedSym.flags & OutputSymbolFlags.StaticMember).toBeTruthy();
  });

  it("is reactive to new instance members", () => {
    const scope = new OutputScope("scope", { binder });
    const classSym = new OutputSymbol("Class", {
      binder,
      scope,
      flags: OutputSymbolFlags.MemberContainer,
    });

    new OutputSymbol("instance-member", {
      binder,
      scope: classSym.instanceMemberScope!,
    });

    const targetSym = new OutputSymbol("Target", { binder, scope });
    classSym.instantiateTo(targetSym);

    new OutputSymbol("new-instance-member", {
      binder,
      scope: classSym.instanceMemberScope!,
    });

    expect(
      targetSym.staticMemberScope!.symbolNames.has("new-instance-member"),
    ).toBeDefined();
    expect(targetSym.instanceMemberScope).toBeUndefined();
  });

  it("copies static members of instance members", () => {
    const scope = new OutputScope("scope", { binder });
    const classSym = new OutputSymbol("Class", {
      binder,
      scope,
      flags: OutputSymbolFlags.MemberContainer,
    });

    const instanceMemberSym = new OutputSymbol("instance-member", {
      binder,
      scope: classSym.instanceMemberScope!,
      flags: OutputSymbolFlags.StaticMemberContainer,
    });

    new OutputSymbol("static-of-instance", {
      binder,
      scope: instanceMemberSym.staticMemberScope!,
    });

    const targetSym = new OutputSymbol("Target", { binder, scope });
    classSym.instantiateTo(targetSym);

    expect(
      targetSym.staticMemberScope!.symbolNames.has("instance-member"),
    ).toBeTruthy();
    expect(targetSym.instanceMemberScope).toBeUndefined();

    const instantiatedSS = [...targetSym.staticMemberScope!.symbols][0];
    expect(instantiatedSS.staticMemberScope).toBeDefined();
    expect(
      instantiatedSS.staticMemberScope!.symbolNames.has("static-of-instance"),
    ).toBeTruthy();

    // check reactivity
    const newSym = new OutputSymbol("new-static-of-instance", {
      binder,
      scope: instanceMemberSym.staticMemberScope!,
    });

    flushJobs();
    expect(
      instantiatedSS.staticMemberScope!.symbolNames.has(
        "new-static-of-instance",
      ),
    ).toBeTruthy();

    newSym.delete();
    flushJobs();

    expect(
      instantiatedSS.staticMemberScope!.symbolNames.has("static-member-2"),
    ).toBeFalsy();
  });

  it("is idempotent", () => {
    const scope = new OutputScope("scope", { binder });
    const source = new OutputSymbol("sym", {
      binder,
      scope,
      flags: OutputSymbolFlags.InstanceMemberContainer,
    });

    new OutputSymbol("instance-member", {
      binder,
      scope: source.instanceMemberScope!,
    });

    const target = new OutputSymbol("target", { binder, scope });

    source.instantiateTo(target);
    source.instantiateTo(target);

    expect(target.staticMemberScope).toBeDefined();
    expect(target.staticMemberScope!.symbolNames.size).toEqual(1);
    expect(target.staticMemberScope!.symbolNames.has("instance-member")).toBe(
      true,
    );
  });
});
