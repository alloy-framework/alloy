import { reactive, watch } from "@vue/reactivity";
import { describe, expect, it, vi } from "vitest";
import { flushJobs } from "../../src/scheduler.js";
import { BasicSymbol } from "../../src/symbols/basic-symbol.js";
import { OutputSymbolFlags } from "../../src/symbols/flags.js";
import { createScope, createSymbol } from "./utils.js";

describe("OutputSymbol reactivity", () => {
  it("keeps symbol names up-to-date", () => {
    const scope = createScope("scope");
    const symbol = createSymbol("sym", scope);

    flushJobs();
    expect(scope.symbolNames.has("sym")).toBe(true);

    symbol.name = "bar";
    flushJobs();
    expect(scope.symbolNames.has("bar")).toBe(true);
  });

  it("resolves symbol conflicts", () => {
    const scope = createScope("scope");
    const s1 = createSymbol("sym", scope);
    const s2 = createSymbol("sym", scope);
    const s3 = createSymbol("sym", scope);

    flushJobs();

    expect(s1.name).toEqual("sym");
    expect(s2.name).toEqual("sym_2");
    expect(s3.name).toEqual("sym_3");
  });

  it("is reactive on name, flags, space, and scope", () => {
    const scope = createScope("scope");
    const symbol = createSymbol("sym", scope);

    const nameSpy = vi.fn();
    watch(() => symbol.name, nameSpy);
    const flagsSpy = vi.fn();
    watch(() => symbol.flags, flagsSpy);
    const scopeSpy = vi.fn();
    watch(() => symbol.scope, scopeSpy);

    symbol.name = "foo";
    symbol.flags = OutputSymbolFlags.Transient;
    const newScope = createScope("new-scope");
    symbol.spaces = [newScope.symbols];

    expect(nameSpy).toHaveBeenCalled();
    expect(flagsSpy).toHaveBeenCalled();
    expect(scopeSpy).toHaveBeenCalled();
  });

  it("doesn't get wrapped in a reactive proxy", () => {
    const scope = createScope("scope");
    const symbol = createSymbol("sym", scope);

    const rSymbol = reactive(symbol);
    expect(rSymbol).toBe(symbol);
  });
});

describe("OutputSymbol#metadata", () => {
  it("is reactive", () => {
    const scope = createScope("scope");
    const symbol = createSymbol("sym", scope, {
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
    const scope = createScope("parent");
    const symbol = createSymbol("sym", scope);
    expect(scope.symbols.has(symbol)).toBe(true);
  });
});

describe("Symbol#delete", () => {
  it("deletes from parent scope", () => {
    const scope = createScope("parent");
    const symbol = createSymbol("sym", scope);
    expect(scope.symbols.has(symbol)).toBe(true);
    symbol.delete();
    expect(scope.symbols.has(symbol)).toBe(false);
  });
});

describe("OutputSymbol#copy", () => {
  it("copies name, flags", () => {
    const scope = createScope("scope");
    const symbol = createSymbol("sym", scope, {
      flags: OutputSymbolFlags.Transient,
    });

    const copy = symbol.copy();
    expect(copy.name).toEqual("sym");
    expect(copy.flags).toEqual(OutputSymbolFlags.Transient);
    expect(copy.scope).toBeUndefined();
  });

  it("reactively copies name and flags from the original symbol", () => {
    const scope = createScope("scope");
    const symbol = createSymbol("sym", scope, {
      flags: OutputSymbolFlags.Transient,
    });

    const copy = symbol.copy();
    expect(copy.name).toEqual("sym");
    expect(copy.flags).toEqual(OutputSymbolFlags.Transient);
    expect(copy.scope).toBeUndefined();

    symbol.name = "bar";
    symbol.flags = 0;

    flushJobs();

    expect(copy.flags).toEqual(0);
    expect(copy.name).toEqual("bar");
  });

  it("copies member symbols", () => {
    const scope = createScope("scope");
    const symbol = createSymbol("sym", scope);
    const staticMember = createSymbol("static-member", symbol.staticMembers);
    const instanceMember = createSymbol(
      "instance-member",
      symbol.instanceMembers,
    );

    const copy = symbol.copy();

    expect(copy.name).toEqual("sym");
    expect(copy.flags).toEqual(symbol.flags);
    expect(copy.staticMembers.size).toBe(1);
    const staticMemberCopy = [...copy.staticMembers][0];
    expect(staticMemberCopy.name).toBe("static-member");
    expect(staticMemberCopy.flags).toBe(staticMember.flags);
    expect(copy.instanceMembers.size).toBe(1);
    const instanceMemberCopy = [...copy.instanceMembers][0];
    expect(instanceMemberCopy.name).toBe("instance-member");
    expect(instanceMemberCopy.flags).toBe(instanceMember.flags);
  });

  it("copies member symbols reactively", () => {
    const scope = createScope("scope");
    const symbol = createSymbol("sym", scope);
    const staticMember = createSymbol("static-member", symbol.staticMembers);
    createSymbol("instance-member", symbol.instanceMembers);

    const copy = symbol.copy();

    expect(copy.name).toEqual("sym");
    expect(copy.flags).toEqual(symbol.flags);
    expect(copy.staticMembers.size).toBe(1);
    const staticMemberCopy = [...copy.staticMembers][0];

    const newStaticMember = createSymbol(
      "static-member-2",
      symbol.staticMembers,
    );
    staticMember.name = "hi";

    flushJobs();

    const secondStaticMemberCopy = [...copy.staticMembers][1];
    expect(secondStaticMemberCopy.name).toBe("static-member-2");
    expect(staticMemberCopy.name).toBe("hi");

    newStaticMember.delete();
    flushJobs();
    expect(copy.staticMembers.size).toBe(1);
    expect(copy.staticMembers.symbolNames.has("static-member-2")).toBe(false);
    expect(copy.staticMembers.symbolNames.has("hi")).toBe(true);
  });
});

describe("OutputSymbol#instantiateTo", () => {
  it("copies instance members to static member scope", () => {
    const scope = createScope("scope");
    const classSym = createSymbol("Class", scope);
    createSymbol("instance-member", classSym.instanceMembers);
    createSymbol("static-member", classSym.staticMembers);

    const targetSym = createSymbol("Target", scope);
    classSym.instantiateTo(targetSym);

    expect(targetSym.staticMembers.size).toEqual(1);
    const staticNames = targetSym.staticMembers.symbolNames;
    expect(staticNames.size).toEqual(1);
    expect(staticNames.has("instance-member")).toBe(true);
  });

  it("is reactive to new instance members", () => {
    const scope = createScope("scope");
    const classSym = createSymbol("Class", scope);
    createSymbol("instance-member", classSym.instanceMembers);
    const targetSym = createSymbol("Target", scope);
    classSym.instantiateTo(targetSym);
    expect(targetSym.staticMembers.size).toEqual(1);
    createSymbol("new-instance-member", classSym.instanceMembers);
    flushJobs();
    expect(
      targetSym.staticMembers.symbolNames.has("new-instance-member"),
    ).toBeTruthy();
  });

  it("copies static members of instance members", () => {
    const scope = createScope("scope");
    const classSym = createSymbol("Class", scope);
    const instanceMemberSym = createSymbol(
      "instance-member",
      classSym.instanceMembers,
    );
    createSymbol("static-of-instance", instanceMemberSym.staticMembers);
    const targetSym = createSymbol("Target", scope);
    classSym.instantiateTo(targetSym);

    expect(
      targetSym.staticMembers.symbolNames.has("instance-member"),
    ).toBeTruthy();

    const instantiatedSS = [...targetSym.staticMembers][0] as BasicSymbol;
    expect(
      instantiatedSS.staticMembers.symbolNames.has("static-of-instance"),
    ).toBeTruthy();

    // check reactivity
    const newSym = new BasicSymbol(
      "new-static-of-instance",
      instanceMemberSym.staticMembers,
    );

    flushJobs();
    expect(
      instantiatedSS.staticMembers.symbolNames.has("new-static-of-instance"),
    ).toBeTruthy();

    newSym.delete();
    flushJobs();

    expect(
      instantiatedSS.staticMembers.symbolNames.has("static-member-2"),
    ).toBeFalsy();
  });

  it("is idempotent", () => {
    const scope = createScope("scope");
    const source = createSymbol("sym", scope);
    createSymbol("instance-member", source.instanceMembers);

    const target = createSymbol("target", scope);

    source.instantiateTo(target);
    source.instantiateTo(target);

    expect(target.staticMembers).toBeDefined();
    expect(target.staticMembers.symbolNames.size).toEqual(1);
    expect(target.staticMembers.symbolNames.has("instance-member")).toBe(true);
  });
});
