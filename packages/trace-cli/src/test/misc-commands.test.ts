import { DatabaseSync } from "node:sqlite";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { runErrors } from "../commands/errors.js";
import { fileCommand } from "../commands/file.js";
import { runQuery } from "../commands/query.js";
import { scopeCommand } from "../commands/scope.js";
import { statsCommand } from "../commands/stats.js";
import { symbolCommand } from "../commands/symbol.js";
import { captureOutput } from "./capture.js";
import { createTestDb } from "./test-db.js";

let db: DatabaseSync;

beforeEach(() => {
  db = createTestDb();
});
afterEach(() => {
  db.close();
});

describe("stats", () => {
  it("shows aggregate statistics", () => {
    const { stdout } = captureOutput(() => statsCommand(db, [], {}));
    expect(stdout).toContain("Summary");
    expect(stdout).toContain("Effects: 4");
    expect(stdout).toContain("Refs: 3");
    expect(stdout).toContain("Edges: 5");
    expect(stdout).toContain("Components: 2");
    expect(stdout).toContain("Render nodes: 8");
    expect(stdout).toContain("Symbols: 3");
    expect(stdout).toContain("Scopes: 2");
    expect(stdout).toContain("Output files: 2");
    expect(stdout).toContain("Errors: 1");
  });

  it("shows overhead analysis", () => {
    const { stdout } = captureOutput(() => statsCommand(db, [], {}));
    expect(stdout).toContain("Overhead");
    expect(stdout).toContain("Framework effects:");
    expect(stdout).toContain("Effects per component:");
  });

  it("shows effects by type", () => {
    const { stdout } = captureOutput(() => statsCommand(db, [], {}));
    expect(stdout).toContain("Effects by type");
    expect(stdout).toContain("render");
    expect(stdout).toContain("content");
    expect(stdout).toContain("binder");
  });

  it("shows ref usage", () => {
    const { stdout } = captureOutput(() => statsCommand(db, [], {}));
    expect(stdout).toContain("Ref usage");
    expect(stdout).toContain("Never tracked:");
    expect(stdout).toContain("Completely unused:");
  });

  it("shows top components", () => {
    const { stdout } = captureOutput(() => statsCommand(db, [], {}));
    expect(stdout).toContain("Top components");
    expect(stdout).toContain("SourceFile");
    expect(stdout).toContain("Declaration");
  });

  it("returns json", () => {
    const { stdout } = captureOutput(() =>
      statsCommand(db, [], { json: true }),
    );
    const parsed = JSON.parse(stdout);
    expect(parsed.effects).toBe(4);
    expect(parsed.refs).toBe(3);
    expect(parsed.edges).toBe(5);
    expect(parsed.components).toBe(2);
    expect(parsed.renderNodes).toBe(8);
    expect(parsed.symbols).toBe(3);
    expect(parsed.scopes).toBe(2);
    expect(parsed.outputFiles).toBe(2);
    expect(parsed.errors).toBe(1);
  });
});

describe("errors", () => {
  it("lists render errors", () => {
    const { stdout } = captureOutput(() => runErrors(db, {}));
    expect(stdout).toContain("1 render error(s)");
    expect(stdout).toContain("TypeError: Cannot read property x");
    expect(stdout).toContain("at Declaration (/src/decl.tsx:15:3)");
  });

  it("shows component stack with source locations", () => {
    const { stdout } = captureOutput(() => runErrors(db, {}));
    expect(stdout).toContain("Component stack:");
    expect(stdout).toContain("at SourceFile (typescript/src/components/source-file.tsx:10:5)");
    expect(stdout).toContain("at Declaration (typescript/src/components/declaration.tsx:25:3)");
  });

  it("shows first stack line", () => {
    const { stdout } = captureOutput(() => runErrors(db, {}));
    expect(stdout).toContain("at Declaration");
  });

  it("shows empty when no errors", () => {
    db.exec("DELETE FROM render_errors");
    const { stdout } = captureOutput(() => runErrors(db, {}));
    expect(stdout).toContain("No render errors");
  });

  it("returns json", () => {
    const { stdout } = captureOutput(() => runErrors(db, { json: true }));
    const parsed = JSON.parse(stdout);
    expect(parsed.name).toBe("TypeError");
    expect(parsed.message).toContain("Cannot read property");
  });
});

describe("file", () => {
  it("lists output files", () => {
    const { stdout } = captureOutput(() => fileCommand(db, "list", [], {}));
    expect(stdout).toContain("2 file(s) generated");
    expect(stdout).toContain("src/models.ts");
    expect(stdout).toContain("src/index.ts");
  });

  it("returns json", () => {
    const { stdout } = captureOutput(() =>
      fileCommand(db, "list", [], { json: true }),
    );
    const lines = stdout.split("\n").filter(Boolean);
    expect(lines.length).toBe(2);
    const parsed = JSON.parse(lines[0]);
    expect(parsed.path).toBe("src/models.ts");
  });

  it("shows file content", () => {
    const { stdout } = captureOutput(() =>
      fileCommand(db, "show", ["src/models.ts"], {}),
    );
    expect(stdout).toContain("src/models.ts");
    expect(stdout).toContain("export interface Foo");
  });

  it("shows empty when no files", () => {
    db.exec("DELETE FROM output_files");
    const { stdout } = captureOutput(() => fileCommand(db, "list", [], {}));
    expect(stdout).toContain("No output files recorded");
  });

  describe("search", () => {
    it("finds text node and shows component stack", () => {
      const { stdout } = captureOutput(() =>
        fileCommand(db, "search", ["src/models.ts", "interface", "Foo"], {}),
      );
      expect(stdout).toContain("Found 1 text node(s)");
      expect(stdout).toContain("export interface Foo");
      expect(stdout).toContain("Component stack");
      expect(stdout).toContain("at Declaration");
      expect(stdout).toContain("at SourceFile");
    });

    it("shows source locations in stack trace format", () => {
      const { stdout } = captureOutput(() =>
        fileCommand(db, "search", ["src/models.ts", "interface", "Foo"], {}),
      );
      expect(stdout).toContain("at Declaration (typescript/src/components/declaration.tsx:25:3)");
      expect(stdout).toContain("at SourceFile (typescript/src/components/source-file.tsx:10:5)");
    });

    it("matches by path suffix", () => {
      const { stdout } = captureOutput(() =>
        fileCommand(db, "search", ["models.ts", "interface"], {}),
      );
      expect(stdout).toContain("Found 1 text node(s)");
    });

    it("finds import text in fragment subtree", () => {
      const { stdout } = captureOutput(() =>
        fileCommand(db, "search", ["src/models.ts", "import"], {}),
      );
      expect(stdout).toContain("Found 1 text node(s)");
      expect(stdout).toContain("import { Bar }");
      // Fragment has no component ancestor until SourceFile
      expect(stdout).toContain("SourceFile");
    });

    it("reports no match", () => {
      const { stdout } = captureOutput(() =>
        fileCommand(db, "search", ["src/models.ts", "nonexistent"], {}),
      );
      expect(stdout).toContain("No text matching");
    });

    it("returns json", () => {
      const { stdout } = captureOutput(() =>
        fileCommand(db, "search", ["src/models.ts", "interface", "Foo"], { json: true }),
      );
      const parsed = JSON.parse(stdout);
      expect(parsed.textNodeId).toBe(4);
      expect(parsed.text).toContain("interface Foo");
      expect(parsed.stack).toHaveLength(2);
      expect(parsed.stack[0].name).toBe("Declaration");
      expect(parsed.stack[1].name).toBe("SourceFile");
    });
  });
});

describe("query", () => {
  it("executes raw SQL and shows results", () => {
    const { stdout } = captureOutput(() =>
      runQuery(db, ["SELECT COUNT(*) as n FROM effects"], {}),
    );
    expect(stdout).toContain("n");
    expect(stdout).toContain("4");
  });

  it("shows no results message", () => {
    const { stdout } = captureOutput(() =>
      runQuery(db, ["SELECT * FROM effects WHERE id = -1"], {}),
    );
    expect(stdout).toContain("(no results)");
  });

  it("returns json", () => {
    const { stdout } = captureOutput(() =>
      runQuery(db, ["SELECT id, name FROM effects LIMIT 1"], { json: true }),
    );
    const parsed = JSON.parse(stdout);
    expect(parsed).toHaveProperty("id");
    expect(parsed).toHaveProperty("name");
  });

  it("shows sql error for invalid query", () => {
    const { stderr } = captureOutput(() => {
      try {
        runQuery(db, ["INVALID SQL"], {});
      } catch {
        // process.exit is called, so we catch
      }
    });
    expect(stderr).toContain("SQL error");
  });

  it("respects limit", () => {
    const { stdout } = captureOutput(() =>
      runQuery(db, ["SELECT * FROM render_nodes"], { limit: 2 }),
    );
    // Should show a "more rows" message since there are 8 nodes
    expect(stdout).toContain("more rows");
  });
});

describe("symbol", () => {
  it("lists all symbols", () => {
    const { stdout } = captureOutput(() =>
      symbolCommand(db, "list", [], {}),
    );
    expect(stdout).toContain("Foo");
    expect(stdout).toContain("bar");
    expect(stdout).toContain("Baz");
  });

  it("filters by name", () => {
    const { stdout } = captureOutput(() =>
      symbolCommand(db, "list", [], { name: "Foo" }),
    );
    expect(stdout).toContain("Foo");
    expect(stdout).not.toContain("bar");
  });

  it("shows symbol flags", () => {
    const { stdout } = captureOutput(() =>
      symbolCommand(db, "list", [], {}),
    );
    expect(stdout).toContain("member");
    expect(stdout).toContain("transient");
  });

  it("shows original name when different", () => {
    const { stdout } = captureOutput(() =>
      symbolCommand(db, "list", [], {}),
    );
    expect(stdout).toContain("original: BazOriginal");
  });

  it("shows symbol details", () => {
    const { stdout } = captureOutput(() =>
      symbolCommand(db, "show", ["1"], {}),
    );
    expect(stdout).toContain('Symbol 1: "Foo"');
    expect(stdout).toContain("Scope:");
  });

  it("shows json for symbol show", () => {
    const { stdout } = captureOutput(() =>
      symbolCommand(db, "show", ["1"], { json: true }),
    );
    const parsed = JSON.parse(stdout);
    expect(parsed.name).toBe("Foo");
    expect(parsed.scope_id).toBe(1);
  });

  it("reports not found", () => {
    const { stderr } = captureOutput(() =>
      symbolCommand(db, "show", ["999"], {}),
    );
    expect(stderr).toContain("not found");
  });

  it("returns json list", () => {
    const { stdout } = captureOutput(() =>
      symbolCommand(db, "list", [], { json: true }),
    );
    const lines = stdout.split("\n").filter(Boolean);
    expect(lines.length).toBe(3);
  });

  it("shows empty message", () => {
    const { stdout } = captureOutput(() =>
      symbolCommand(db, "list", [], { name: "nonexistent" }),
    );
    expect(stdout).toContain("No symbols found");
  });
});

describe("scope", () => {
  it("lists all scopes", () => {
    const { stdout } = captureOutput(() =>
      scopeCommand(db, "list", [], {}),
    );
    expect(stdout).toContain("global");
    expect(stdout).toContain("Foo");
  });

  it("shows member scope flag", () => {
    const { stdout } = captureOutput(() =>
      scopeCommand(db, "list", [], {}),
    );
    expect(stdout).toContain("[member]");
  });

  it("filters by name", () => {
    const { stdout } = captureOutput(() =>
      scopeCommand(db, "list", [], { name: "global" }),
    );
    expect(stdout).toContain("global");
    expect(stdout).not.toContain("Foo");
  });

  it("shows scope details", () => {
    const { stdout } = captureOutput(() =>
      scopeCommand(db, "show", ["2"], {}),
    );
    expect(stdout).toContain('Scope 2: "Foo"');
    expect(stdout).toContain("Parent:");
    expect(stdout).toContain("Member scope: true");
    expect(stdout).toContain("Owner symbol:");
  });

  it("lists scope symbols", () => {
    const { stdout } = captureOutput(() =>
      scopeCommand(db, "show", ["1"], {}),
    );
    expect(stdout).toContain("Symbols:");
    expect(stdout).toContain("Foo");
  });

  it("returns json", () => {
    const { stdout } = captureOutput(() =>
      scopeCommand(db, "show", ["2"], { json: true }),
    );
    const parsed = JSON.parse(stdout);
    expect(parsed.name).toBe("Foo");
    expect(parsed.is_member_scope).toBe(1);
  });

  it("reports not found", () => {
    const { stderr } = captureOutput(() =>
      scopeCommand(db, "show", ["999"], {}),
    );
    expect(stderr).toContain("not found");
  });

  it("shows empty message", () => {
    const { stdout } = captureOutput(() =>
      scopeCommand(db, "list", [], { name: "nonexistent" }),
    );
    expect(stdout).toContain("No scopes found");
  });
});
