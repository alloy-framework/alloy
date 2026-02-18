import { DatabaseSync } from "node:sqlite";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { componentCommand } from "../commands/component.js";
import { captureOutput } from "./capture.js";
import { createTestDb } from "./test-db.js";

let db: DatabaseSync;

beforeEach(() => {
  db = createTestDb();
});
afterEach(() => {
  db.close();
});

describe("component list", () => {
  it("lists all components", () => {
    const { stdout } = captureOutput(() =>
      componentCommand(db, "list", [], {}),
    );
    expect(stdout).toContain("SourceFile");
    expect(stdout).toContain("Declaration");
  });

  it("filters by name", () => {
    const { stdout } = captureOutput(() =>
      componentCommand(db, "list", [], { name: "Source" }),
    );
    expect(stdout).toContain("SourceFile");
    expect(stdout).not.toContain("Declaration");
  });

  it("returns json", () => {
    const { stdout } = captureOutput(() =>
      componentCommand(db, "list", [], { json: true }),
    );
    const lines = stdout.split("\n").filter(Boolean);
    expect(lines.length).toBe(2);
    const parsed = JSON.parse(lines[0]);
    expect(parsed).toHaveProperty("id");
    expect(parsed).toHaveProperty("name");
    expect(parsed).toHaveProperty("children");
  });

  it("returns empty message when no match", () => {
    const { stdout } = captureOutput(() =>
      componentCommand(db, "list", [], { name: "NonExistent" }),
    );
    expect(stdout).toContain("No components found");
  });

  it("respects limit", () => {
    const { stdout } = captureOutput(() =>
      componentCommand(db, "list", [], { limit: 1 }),
    );
    // should show pagination footer since there are 2 components
    expect(stdout).toContain("showing 1 of 2");
  });

  it("filters by source file", () => {
    const { stdout } = captureOutput(() =>
      componentCommand(db, "list", [], { sourceFile: "source-file" }),
    );
    expect(stdout).toContain("SourceFile");
    expect(stdout).not.toContain("Declaration");
  });
});

describe("component show", () => {
  it("shows component details", () => {
    const { stdout } = captureOutput(() =>
      componentCommand(db, "show", ["2"], {}),
    );
    expect(stdout).toContain('Component 2: "SourceFile"');
    expect(stdout).toContain("Source:");
    expect(stdout).toContain("Children");
  });

  it("shows component details as json", () => {
    const { stdout } = captureOutput(() =>
      componentCommand(db, "show", ["2"], { json: true }),
    );
    const parsed = JSON.parse(stdout);
    expect(parsed.name).toBe("SourceFile");
    expect(parsed.kind).toBe("component");
  });

  it("reports not found for missing id", () => {
    const { stderr } = captureOutput(() =>
      componentCommand(db, "show", ["999"], {}),
    );
    expect(stderr).toContain("not found");
  });

  it("lists children of a component", () => {
    const { stdout } = captureOutput(() =>
      componentCommand(db, "show", ["2"], {}),
    );
    // SourceFile has children: Declaration(3), Fragment(5), memo(7)
    expect(stdout).toContain("Children (3)");
    expect(stdout).toContain("component Declaration");
    expect(stdout).toContain("fragment");
    expect(stdout).toContain("memo");
  });
});

describe("component tree", () => {
  it("prints full tree from root", () => {
    const { stdout } = captureOutput(() =>
      componentCommand(db, "tree", [], {}),
    );
    expect(stdout).toContain("root");
    expect(stdout).toContain('"SourceFile"');
    expect(stdout).toContain('"Declaration"');
    expect(stdout).toContain("text");
  });

  it("prints subtree from a specific node", () => {
    const { stdout } = captureOutput(() =>
      componentCommand(db, "tree", ["3"], {}),
    );
    expect(stdout).toContain('"Declaration"');
    expect(stdout).toContain("text");
    // should not contain parent SourceFile as a tree root
    expect(stdout).not.toContain('"SourceFile"');
  });

  it("respects depth limit", () => {
    const { stdout } = captureOutput(() =>
      componentCommand(db, "tree", [], { depth: 1 }),
    );
    expect(stdout).toContain("root");
    expect(stdout).toContain('"SourceFile"');
    // Declaration is depth 2, should be cut off
    expect(stdout).not.toContain('"Declaration"');
  });

  it("filters by component name", () => {
    const { stdout } = captureOutput(() =>
      componentCommand(db, "tree", [], { component: "Declaration" }),
    );
    expect(stdout).toContain('"Declaration"');
    expect(stdout).toContain("text");
  });

  it("outputs json tree", () => {
    const { stdout } = captureOutput(() =>
      componentCommand(db, "tree", [], { json: true }),
    );
    const tree = JSON.parse(stdout);
    expect(tree.kind).toBe("root");
    expect(tree.children.length).toBeGreaterThan(0);
  });
});

describe("component stats", () => {
  it("shows per-component overhead", () => {
    const { stdout } = captureOutput(() =>
      componentCommand(db, "stats", [], {}),
    );
    expect(stdout).toContain("SourceFile");
    expect(stdout).toContain("Declaration");
    expect(stdout).toContain("Per-component overhead");
  });

  it("returns json stats", () => {
    const { stdout } = captureOutput(() =>
      componentCommand(db, "stats", [], { json: true }),
    );
    const lines = stdout.split("\n").filter(Boolean);
    expect(lines.length).toBeGreaterThan(0);
    const parsed = JSON.parse(lines[0]);
    expect(parsed).toHaveProperty("name");
    expect(parsed).toHaveProperty("instances");
    expect(parsed).toHaveProperty("total_effects");
  });
});
