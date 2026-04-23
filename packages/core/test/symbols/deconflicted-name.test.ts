import { describe, expect, it } from "vitest";
import { Binder, createOutputBinder } from "../../src/binder.js";
import { flushJobs } from "../../src/scheduler.js";
import { BasicScope } from "../../src/symbols/basic-scope.js";
import { BasicSymbol } from "../../src/symbols/basic-symbol.js";
import type { OutputSymbol } from "../../src/symbols/output-symbol.js";

function setup(
  nameConflictResolver?: (name: string, syms: OutputSymbol[]) => void,
) {
  const binder: Binder = createOutputBinder({ nameConflictResolver });
  const scope = new BasicScope("root", undefined, { binder });
  return { binder, scope };
}

describe("deconflictedName", () => {
  it("default resolver renames losers via deconflictedName and reverts on removal", () => {
    const { scope } = setup();
    const a = new BasicSymbol("foo", scope.symbols, {});
    const b = new BasicSymbol("foo", scope.symbols, {});
    flushJobs();
    expect(a.name).toBe("foo");
    expect(b.name).toBe("foo_2");
    expect(a.deconflictedName).toBeUndefined();
    expect(b.deconflictedName).toBe("foo_2");

    b.delete();
    flushJobs();
    expect(a.name).toBe("foo");
    expect(a.deconflictedName).toBeUndefined();
  });

  it("works with a custom rename scheme that doesn't match the default _N pattern", () => {
    // Resolver uses a `$foo` prefix instead of `foo_N` suffix — the old
    // isAutoAlias regex would never match this.
    const customResolver = (_: string, symbols: OutputSymbol[]) => {
      if (symbols.length === 0) return;
      symbols[0].deconflictedName = undefined;
      for (let i = 1; i < symbols.length; i++) {
        symbols[i].deconflictedName = "$" + symbols[i].originalName;
      }
    };
    const { scope } = setup(customResolver);

    const a = new BasicSymbol("foo", scope.symbols, {});
    const b = new BasicSymbol("foo", scope.symbols, {});
    flushJobs();
    expect(a.name).toBe("foo");
    expect(b.name).toBe("$foo");

    b.delete();
    flushJobs();
    // Survivor reverts to the original name regardless of scheme.
    expect(a.name).toBe("foo");
    expect(a.deconflictedName).toBeUndefined();
  });

  it("direct .name assignment does not clear an active deconflictedName", () => {
    const { scope } = setup();
    const a = new BasicSymbol("foo", scope.symbols, {});
    const b = new BasicSymbol("foo", scope.symbols, {});
    flushJobs();
    expect(b.name).toBe("foo_2");

    // User-assigns the name while a conflict rename is active.
    b.name = "bar";
    // Effective name still shows the deconflict rename (resolver wins while active).
    expect(b.name).toBe("foo_2");

    // Once the collision clears, the user-assigned name takes effect.
    a.delete();
    flushJobs();
    expect(b.deconflictedName).toBeUndefined();
    expect(b.name).toBe("bar");
  });
});
