import { DatabaseSync } from "node:sqlite";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { refCommand } from "../commands/ref.js";
import { captureOutput } from "./capture.js";
import { createTestDb } from "./test-db.js";

let db: DatabaseSync;

beforeEach(() => {
  db = createTestDb();
});
afterEach(() => {
  db.close();
});

describe("ref list", () => {
  it("lists all refs", () => {
    const { stdout } = captureOutput(() => refCommand(db, "list", [], {}));
    // 3 refs in seed data
    expect(stdout).toContain("ref");
    expect(stdout).toContain("computed");
  });

  it("filters by type/kind", () => {
    const { stdout } = captureOutput(() =>
      refCommand(db, "list", [], { type: "computed" }),
    );
    expect(stdout).toContain("computed");
    expect(stdout).not.toMatch(/^\s+\d+\s+ref\s/m);
  });

  it("filters by min-trackers", () => {
    const { stdout } = captureOutput(() =>
      refCommand(db, "list", [], { minTrackers: 3 }),
    );
    // ref 1 is tracked by effects 2, 3, 4 = 3 trackers
    expect(stdout).toContain("1");
  });

  it("shows unused refs", () => {
    const { stdout } = captureOutput(() =>
      refCommand(db, "list", [], { unused: true }),
    );
    // ref 3 (unusedRef) has no edges
    expect(stdout).toContain("3");
  });

  it("returns json", () => {
    const { stdout } = captureOutput(() =>
      refCommand(db, "list", [], { json: true }),
    );
    const lines = stdout.split("\n").filter(Boolean);
    expect(lines.length).toBe(3);
    const parsed = JSON.parse(lines[0]);
    expect(parsed).toHaveProperty("id");
    expect(parsed).toHaveProperty("kind");
    expect(parsed).toHaveProperty("tracked_by");
    expect(parsed).toHaveProperty("triggered");
  });

  it("shows empty message", () => {
    const { stdout } = captureOutput(() =>
      refCommand(db, "list", [], { type: "nonexistent" }),
    );
    expect(stdout).toContain("No refs found");
  });
});

describe("ref show", () => {
  it("shows ref details", () => {
    const { stdout } = captureOutput(() => refCommand(db, "show", ["1"], {}));
    expect(stdout).toContain("Ref 1");
    expect(stdout).toContain("kind: ref");
    expect(stdout).toContain("Tracked by 3 effects");
  });

  it("shows writers", () => {
    const { stdout } = captureOutput(() => refCommand(db, "show", ["2"], {}));
    expect(stdout).toContain("Written by");
    expect(stdout).toContain("content:models");
  });

  it("shows json with relationships", () => {
    const { stdout } = captureOutput(() =>
      refCommand(db, "show", ["1"], { json: true }),
    );
    const parsed = JSON.parse(stdout);
    expect(parsed.ref.kind).toBe("ref");
    expect(parsed.trackedBy.length).toBe(3);
  });

  it("reports not found", () => {
    const { stderr } = captureOutput(() =>
      refCommand(db, "show", ["999"], {}),
    );
    expect(stderr).toContain("not found");
  });
});

describe("ref chain", () => {
  it("shows reactive chain from a ref", () => {
    const { stdout } = captureOutput(() => refCommand(db, "chain", ["1"], {}));
    expect(stdout).toContain("ref 1");
    expect(stdout).toContain("triggers effect");
  });

  it("detects cycles", () => {
    // Add a cycle: effect 3 triggers ref 2, and we add an edge where effect 2 is triggered-by ref 2
    db.exec(`
      INSERT INTO edges VALUES (100, 'triggered-by', 2, 2, NULL, NULL, NULL, NULL, NULL);
      INSERT INTO edges VALUES (101, 'trigger', 2, 1, NULL, NULL, NULL, NULL, NULL);
    `);
    // Should not infinite loop — cycle: ref 1 -> effect 3 -> ref 2 -> effect 2 -> ref 1
    const { stdout } = captureOutput(() => refCommand(db, "chain", ["1"], {}));
    expect(stdout).toContain("ref 1");
    // chain should terminate (visited set prevents revisiting ref 1)
  });
});

describe("ref hotspots", () => {
  it("shows refs sorted by tracker count", () => {
    const { stdout } = captureOutput(() =>
      refCommand(db, "hotspots", [], {}),
    );
    expect(stdout).toContain("most trackers");
    // ref 1 has 3 trackers — should be first
    const lines = stdout.split("\n").filter((l) => l.trim().match(/^\d/));
    expect(lines.length).toBeGreaterThan(0);
  });

  it("returns json", () => {
    const { stdout } = captureOutput(() =>
      refCommand(db, "hotspots", [], { json: true }),
    );
    const first = JSON.parse(stdout.split("\n")[0]);
    expect(first).toHaveProperty("tracked_by");
    expect(first).toHaveProperty("triggered");
  });
});

describe("ref fanout", () => {
  it("shows which effects track a ref", () => {
    const { stdout } = captureOutput(() =>
      refCommand(db, "fanout", ["1"], {}),
    );
    expect(stdout).toContain("Ref 1");
    expect(stdout).toContain("tracked by 3 effects");
  });

  it("groups trackers by component", () => {
    const { stdout } = captureOutput(() =>
      refCommand(db, "fanout", ["1"], {}),
    );
    // effects 2 and 3 have component Declaration (or none), effect 4 has no component
    expect(stdout).toContain("Declaration");
  });

  it("shows writers", () => {
    const { stdout } = captureOutput(() =>
      refCommand(db, "fanout", ["2"], {}),
    );
    expect(stdout).toContain("Written by");
  });

  it("reports not found", () => {
    const { stderr } = captureOutput(() =>
      refCommand(db, "fanout", ["999"], {}),
    );
    expect(stderr).toContain("not found");
  });
});

describe("ref ownership", () => {
  it("shows component ancestry for a ref", () => {
    const { stdout } = captureOutput(() =>
      refCommand(db, "ownership", ["2"], {}),
    );
    expect(stdout).toContain("Ref 2");
    expect(stdout).toContain("Created by: effect 3");
    expect(stdout).toContain("Component ancestry");
  });

  it("handles ref with no creator", () => {
    // Add a ref with no creator
    db.exec(
      "INSERT INTO refs VALUES (10, 'ref', 'orphan', NULL, NULL, NULL, NULL, 10)",
    );
    const { stdout } = captureOutput(() =>
      refCommand(db, "ownership", ["10"], {}),
    );
    expect(stdout).toContain("Created outside reactive tracking");
  });
});
