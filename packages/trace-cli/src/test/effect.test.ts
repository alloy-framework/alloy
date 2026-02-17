import { DatabaseSync } from "node:sqlite";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { effectCommand } from "../commands/effect.js";
import { captureOutput } from "./capture.js";
import { createTestDb } from "./test-db.js";

let db: DatabaseSync;

beforeEach(() => {
  db = createTestDb();
});
afterEach(() => {
  db.close();
});

describe("effect list", () => {
  it("lists all effects", () => {
    const { stdout } = captureOutput(() =>
      effectCommand(db, "list", [], {}),
    );
    expect(stdout).toContain("render:SourceFile");
    expect(stdout).toContain("render:Declaration");
    expect(stdout).toContain("content:models");
    expect(stdout).toContain("binder:resolve");
  });

  it("filters by name", () => {
    const { stdout } = captureOutput(() =>
      effectCommand(db, "list", [], { name: "render" }),
    );
    expect(stdout).toContain("render:SourceFile");
    expect(stdout).toContain("render:Declaration");
    expect(stdout).not.toContain("binder:resolve");
  });

  it("filters by type", () => {
    const { stdout } = captureOutput(() =>
      effectCommand(db, "list", [], { type: "binder" }),
    );
    expect(stdout).toContain("binder:resolve");
    expect(stdout).not.toContain("render:SourceFile");
  });

  it("filters by component", () => {
    const { stdout } = captureOutput(() =>
      effectCommand(db, "list", [], { component: "Declaration" }),
    );
    expect(stdout).toContain("render:Declaration");
    expect(stdout).not.toContain("render:SourceFile");
  });

  it("shows framework-only effects", () => {
    const { stdout } = captureOutput(() =>
      effectCommand(db, "list", [], { framework: true }),
    );
    expect(stdout).toContain("binder:resolve");
    expect(stdout).not.toContain("render:SourceFile");
  });

  it("returns json", () => {
    const { stdout } = captureOutput(() =>
      effectCommand(db, "list", [], { json: true }),
    );
    const lines = stdout.split("\n").filter(Boolean);
    expect(lines.length).toBe(4);
    const parsed = JSON.parse(lines[0]);
    expect(parsed).toHaveProperty("id");
    expect(parsed).toHaveProperty("name");
    expect(parsed).toHaveProperty("tracks");
    expect(parsed).toHaveProperty("triggers");
  });

  it("respects limit", () => {
    const { stdout } = captureOutput(() =>
      effectCommand(db, "list", [], { limit: 2 }),
    );
    expect(stdout).toContain("showing 2 of 4");
  });

  it("shows empty message when no match", () => {
    const { stdout } = captureOutput(() =>
      effectCommand(db, "list", [], { name: "nonexistent" }),
    );
    expect(stdout).toContain("No effects found");
  });
});

describe("effect show", () => {
  it("shows effect details", () => {
    const { stdout } = captureOutput(() =>
      effectCommand(db, "show", ["2"], {}),
    );
    expect(stdout).toContain('Effect 2: "render:Declaration"');
    expect(stdout).toContain("Source:");
    expect(stdout).toContain("Component: Declaration");
    expect(stdout).toContain("Tracks 1 refs");
  });

  it("shows lifecycle info", () => {
    const { stdout } = captureOutput(() =>
      effectCommand(db, "show", ["2"], {}),
    );
    expect(stdout).toContain("Lifecycle: ran 2 times, skipped 0");
    expect(stdout).toContain("triggered by ref 1");
  });

  it("shows json with all details", () => {
    const { stdout } = captureOutput(() =>
      effectCommand(db, "show", ["3"], { json: true }),
    );
    const parsed = JSON.parse(stdout);
    expect(parsed.effect.name).toBe("content:models");
    expect(parsed.tracks).toBeInstanceOf(Array);
    expect(parsed.triggeredBy).toBeInstanceOf(Array);
    expect(parsed.triggers).toBeInstanceOf(Array);
    expect(parsed.lifecycle).toBeInstanceOf(Array);
  });

  it("reports not found", () => {
    const { stderr } = captureOutput(() =>
      effectCommand(db, "show", ["999"], {}),
    );
    expect(stderr).toContain("not found");
  });
});

describe("effect chain", () => {
  it("shows causal chain from effect", () => {
    const { stdout } = captureOutput(() =>
      effectCommand(db, "chain", ["3"], {}),
    );
    expect(stdout).toContain("effect 3");
    expect(stdout).toContain("content:models");
    expect(stdout).toContain("Triggered by");
  });

  it("reports not found", () => {
    const { stderr } = captureOutput(() =>
      effectCommand(db, "chain", ["999"], {}),
    );
    expect(stderr).toContain("not found");
  });
});

describe("effect hotspots", () => {
  it("shows effects sorted by activity", () => {
    const { stdout } = captureOutput(() =>
      effectCommand(db, "hotspots", [], {}),
    );
    expect(stdout).toContain("highest reactive activity");
    // effect 3 has most activity (tracks 1, triggers 1, triggered-by 1)
    expect(stdout).toContain("content:models");
  });

  it("respects limit", () => {
    const { stdout } = captureOutput(() =>
      effectCommand(db, "hotspots", [], { limit: 1 }),
    );
    const lines = stdout
      .split("\n")
      .filter((l) => l.trim().match(/^\d/));
    expect(lines.length).toBeLessThanOrEqual(1);
  });

  it("returns json", () => {
    const { stdout } = captureOutput(() =>
      effectCommand(db, "hotspots", [], { json: true }),
    );
    const lines = stdout.split("\n").filter(Boolean);
    const parsed = JSON.parse(lines[0]);
    expect(parsed).toHaveProperty("tracks");
    expect(parsed).toHaveProperty("triggers");
    expect(parsed).toHaveProperty("refs_created");
  });
});

describe("effect ancestry", () => {
  it("walks up context ownership chain", () => {
    const { stdout } = captureOutput(() =>
      effectCommand(db, "ancestry", ["3"], {}),
    );
    expect(stdout).toContain('Effect 3: "content:models"');
    // effect 3 owner_context_id=200, which is effect 2's context_id
    // effect 2 component=Declaration, owner_context_id=100 -> effect 1 component=SourceFile
    expect(stdout).toContain("Declaration");
    expect(stdout).toContain("SourceFile");
  });
});

describe("effect subtree", () => {
  it("shows effects in context subtree", () => {
    const { stdout } = captureOutput(() =>
      effectCommand(db, "subtree", ["100"], {}),
    );
    expect(stdout).toContain("Subtree of effect context 100");
    expect(stdout).toContain("render:SourceFile");
    expect(stdout).toContain("Total effects:");
    expect(stdout).toContain("By type:");
  });

  it("reports not found for invalid context", () => {
    const { stderr } = captureOutput(() =>
      effectCommand(db, "subtree", ["9999"], {}),
    );
    expect(stderr).toContain("No effect with context_id");
  });
});
