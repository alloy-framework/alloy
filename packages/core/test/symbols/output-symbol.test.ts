import { reactive, watch } from "@vue/reactivity";
import { describe, expect, it, vi } from "vitest";
import { namekey } from "../../src/refkey.js";
import { flushJobs } from "../../src/scheduler.js";
import { binder, createScope, createSymbol } from "./utils.js";

describe("OutputSymbol reactivity", () => {
  it("keeps symbol names up-to-date", () => {
    const scope = createScope("scope");
    const [symbol] = createSymbol("sym", scope);

    flushJobs();
    expect(scope.symbolNames.has("sym")).toBe(true);

    symbol.name = "bar";
    flushJobs();
    expect(scope.symbolNames.has("bar")).toBe(true);
  });

  it("resolves symbol conflicts", () => {
    const scope = createScope("scope");
    const [s1] = createSymbol("sym", scope);
    const [s2] = createSymbol("sym", scope);
    const [s3] = createSymbol("sym", scope);

    flushJobs();

    expect(s1.name).toEqual("sym");
    expect(s2.name).toEqual("sym_2");
    expect(s3.name).toEqual("sym_3");
  });

  it("is reactive on name, space, and scope", () => {
    const scope = createScope("scope");
    const [symbol] = createSymbol("sym", scope);

    const nameSpy = vi.fn();
    watch(() => symbol.name, nameSpy);
    const scopeSpy = vi.fn();
    watch(() => symbol.scope, scopeSpy);

    symbol.name = "foo";
    const newScope = createScope("new-scope");
    symbol.spaces = [newScope.symbols];

    expect(nameSpy).toHaveBeenCalled();
    expect(scopeSpy).toHaveBeenCalled();
  });

  it("doesn't get wrapped in a reactive proxy", () => {
    const scope = createScope("scope");
    const [symbol] = createSymbol("sym", scope);

    const rSymbol = reactive(symbol);
    expect(rSymbol).toBe(symbol);
  });
});

describe("OutputSymbol#metadata", () => {
  it("is reactive", () => {
    const scope = createScope("scope");
    const [symbol] = createSymbol("sym", scope, {
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
    const [symbol] = createSymbol("sym", scope);
    expect(scope.symbols.has(symbol)).toBe(true);
  });
});

describe("Symbol#delete", () => {
  it("deletes from parent scope", () => {
    const scope = createScope("parent");
    const [symbol] = createSymbol("sym", scope);
    expect(scope.symbols.has(symbol)).toBe(true);
    symbol.delete();
    expect(scope.symbols.has(symbol)).toBe(false);
  });
});

describe("OutputSymbol#copy", () => {
  it("copies name, flags", () => {
    const scope = createScope("scope");
    const [symbol] = createSymbol("sym", scope, {
      transient: true,
    });

    const copy = symbol.copy();
    expect(copy.name).toEqual("sym");
    expect(copy.isTransient).toBe(true);
    expect(copy.scope).toBeUndefined();
  });

  it("reactively copies name from the original symbol", () => {
    const scope = createScope("scope");
    const [symbol] = createSymbol("sym", scope);

    const copy = symbol.copy();
    expect(copy.name).toEqual("sym");
    expect(copy.scope).toBeUndefined();

    symbol.name = "bar";

    flushJobs();

    expect(copy.name).toEqual("bar");
  });

  it("copies member symbols", () => {
    const scope = createScope("scope");
    const [symbol] = createSymbol("sym", scope);
    createSymbol("static-member", symbol.staticMembers);
    createSymbol("instance-member", symbol.instanceMembers);

    const copy = symbol.copy();

    expect(copy.name).toEqual("sym");
    expect(copy.staticMembers.size).toBe(1);
    const staticMemberCopy = [...copy.staticMembers][0];
    expect(staticMemberCopy.name).toBe("static-member");
    expect(copy.instanceMembers.size).toBe(1);
    const instanceMemberCopy = [...copy.instanceMembers][0];
    expect(instanceMemberCopy.name).toBe("instance-member");
  });

  it("copies member symbols reactively", () => {
    const scope = createScope("scope");
    const [symbol] = createSymbol("sym", scope);
    const [staticMember] = createSymbol("static-member", symbol.staticMembers);
    createSymbol("instance-member", symbol.instanceMembers);

    const copy = symbol.copy();

    expect(copy.name).toEqual("sym");
    expect(copy.staticMembers.size).toBe(1);
    const staticMemberCopy = [...copy.staticMembers][0];

    const [newStaticMember] = createSymbol(
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

describe("Output symbol name", () => {
  it("intializes with a namekey", () => {
    const nk = namekey("foo");
    const scope = createScope("scope");
    const [symbol] = createSymbol(nk, scope);
    expect(symbol.name).toBe("foo");
    expect(binder.getSymbolForRefkey(nk).value).toBe(symbol);
  });

  it("applies name policy", () => {
    const scope = createScope("scope");
    const [symbol] = createSymbol("foo", scope, {
      namePolicy: (name) => `_${name}_`,
    });
    expect(symbol.name).toBe("_foo_");
  });

  it("ignores name policy with namekey option", () => {
    const nk = namekey("foo", { ignoreNamePolicy: true });
    const scope = createScope("scope");
    const [symbol] = createSymbol(nk, scope, {
      namePolicy: (name) => `_${name}_`,
    });
    expect(symbol.name).toBe("foo");
    expect(symbol.ignoreNamePolicy).toBe(true);
  });

  it("ignores name policy with symbol option", () => {
    const scope = createScope("scope");
    const [symbol] = createSymbol("foo", scope, {
      ignoreNamePolicy: true,
      namePolicy: (name) => `_${name}_`,
    });
    expect(symbol.name).toBe("foo");
    expect(symbol.ignoreNamePolicy).toBe(true);
  });

  it("handles name conflicts with a default name conflict policy", async () => {
    const scope = createScope("scope");
    const [symbol1] = createSymbol("foo", scope);
    const [symbol2] = createSymbol("foo", scope);
    await flushJobs();
    expect(symbol1.name).toBe("foo");
    expect(symbol2.name).toBe("foo_2");
  });

  it("ignores name conflicts with namekey option", () => {
    const nk1 = namekey("foo", { ignoreNameConflict: true });
    const nk2 = namekey("foo", { ignoreNameConflict: true });
    const scope = createScope("scope");
    const [symbol1] = createSymbol(nk1, scope);
    const [symbol2] = createSymbol(nk2, scope);
    expect(symbol1.name).toBe("foo");
    expect(symbol2.name).toBe("foo");
  });

  it("ignores name conflicts with symbol option", () => {
    const scope = createScope("scope");
    const [symbol1] = createSymbol("foo", scope, {
      ignoreNameConflict: true,
    });
    const [symbol2] = createSymbol("foo", scope, {
      ignoreNameConflict: true,
    });
    expect(symbol1.name).toBe("foo");
    expect(symbol2.name).toBe("foo");
  });
});
