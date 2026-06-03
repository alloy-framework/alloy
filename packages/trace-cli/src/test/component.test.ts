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
    expect(parsed).toHaveProperty("roots");
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
  it("does not treat render node ids as component ids", () => {
    const { stderr } = captureOutput(() =>
      componentCommand(db, "show", ["2"], {}),
    );
    expect(stderr).toContain("Component 2 not found");
  });

  it("shows component details", () => {
    const { stdout } = captureOutput(() =>
      componentCommand(db, "show", ["10"], {}),
    );
    expect(stdout).toContain('Component 10: "SourceFile"');
    expect(stdout).toContain("Source:");
    expect(stdout).toContain("Roots");
  });

  it("shows component details as json", () => {
    const { stdout } = captureOutput(() =>
      componentCommand(db, "show", ["10"], { json: true }),
    );
    const parsed = JSON.parse(stdout);
    expect(parsed.name).toBe("SourceFile");
    expect(parsed.id).toBe(10);
    expect(parsed.roots).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 2,
          kind: "source-file",
        }),
      ]),
    );
  });

  it("reports not found for missing id", () => {
    const { stderr } = captureOutput(() =>
      componentCommand(db, "show", ["999"], {}),
    );
    expect(stderr).toContain("not found");
  });

  it("lists children of a component", () => {
    const { stdout } = captureOutput(() =>
      componentCommand(db, "show", ["10"], {}),
    );
    expect(stdout).toContain("Roots (1)");
    expect(stdout).toContain("source-file alloy:source-file");
  });
});

describe("component tree", () => {
  it("prints full tree from root", () => {
    const { stdout } = captureOutput(() =>
      componentCommand(db, "tree", [], {}),
    );
    expect(stdout).toContain('"SourceFile"');
    expect(stdout).toContain('"Declaration"');
  });

  it("prints subtree from a specific node", () => {
    const { stderr } = captureOutput(() =>
      componentCommand(db, "tree", ["3"], {}),
    );
    expect(stderr).toContain("Component 3 not found");
  });

  it("prints subtree from a specific component", () => {
    const { stdout } = captureOutput(() =>
      componentCommand(db, "tree", ["11"], {}),
    );
    expect(stdout).toContain('"Declaration"');
    // should not contain parent SourceFile as a tree root
    expect(stdout).not.toContain('"SourceFile"');
  });

  it("respects depth limit", () => {
    const { stdout } = captureOutput(() =>
      componentCommand(db, "tree", [], { depth: 0 }),
    );
    expect(stdout).toContain('"SourceFile"');
    // Declaration is a child component, should be cut off.
    expect(stdout).not.toContain('"Declaration"');
  });

  it("filters by component name", () => {
    const { stdout } = captureOutput(() =>
      componentCommand(db, "tree", [], { component: "Declaration" }),
    );
    expect(stdout).toContain('"Declaration"');
  });

  it("outputs json tree", () => {
    const { stdout } = captureOutput(() =>
      componentCommand(db, "tree", [], { json: true }),
    );
    const tree = JSON.parse(stdout);
    expect(tree.name).toBe("SourceFile");
    expect(tree.roots[0].id).toBe(2);
    expect(tree.children.length).toBeGreaterThan(0);
  });
});

describe("component for-node", () => {
  it("lists components rooted at a render node", () => {
    const { stdout } = captureOutput(() =>
      componentCommand(db, "for-node", ["3"], {}),
    );
    expect(stdout).toContain("Components for render node 3");
    expect(stdout).toContain("Declaration");
    expect(stdout).toContain("direct");
  });

  it("walks ancestors to find components for descendant render nodes", () => {
    const { stdout } = captureOutput(() =>
      componentCommand(db, "for-node", ["4"], {}),
    );
    expect(stdout).toContain("Declaration");
    expect(stdout).toContain("SourceFile");
    expect(stdout).toContain("ancestor root #3");
  });

  it("returns json rows for render node component lookup", () => {
    const { stdout } = captureOutput(() =>
      componentCommand(db, "for-node", ["4"], { json: true }),
    );
    const rows = stdout
      .split("\n")
      .filter(Boolean)
      .map((line) => JSON.parse(line));
    expect(rows).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 11,
          root_render_node_id: 3,
          distance: 1,
        }),
      ]),
    );
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
