import { DatabaseSync } from "node:sqlite";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  formatComponentStack,
  outputFileContextsCte,
  outputFileRenderNodesCte,
  printPaginationFooter,
  requireId,
  shortPath,
} from "../types.js";
import { createTestDb } from "./test-db.js";
import { captureOutput } from "./capture.js";

describe("shortPath", () => {
  it("strips up to /packages/", () => {
    expect(shortPath("/home/user/projects/alloy/packages/core/src/render.ts")).toBe(
      "core/src/render.ts",
    );
  });

  it("returns full path if no /packages/", () => {
    expect(shortPath("/some/other/path.ts")).toBe("/some/other/path.ts");
  });
});

describe("requireId", () => {
  it("returns parsed integer", () => {
    expect(requireId(["42"], "usage")).toBe(42);
  });

  it("exits on missing arg", () => {
    const mockExit = vi.spyOn(process, "exit").mockImplementation(() => {
      throw new Error("exit");
    });
    expect(() => requireId([], "Usage: foo")).toThrow("exit");
    mockExit.mockRestore();
  });

  it("exits on NaN", () => {
    const mockExit = vi.spyOn(process, "exit").mockImplementation(() => {
      throw new Error("exit");
    });
    expect(() => requireId(["abc"], "Usage: foo")).toThrow("exit");
    mockExit.mockRestore();
  });
});

describe("formatComponentStack", () => {
  it("formats entries with source locations", () => {
    const json = JSON.stringify([
      { name: "App", source: { fileName: "/home/user/packages/core/src/app.tsx", lineNumber: 10, columnNumber: 3 } },
      { name: "Child", source: { fileName: "/home/user/packages/core/src/child.tsx", lineNumber: 20 } },
    ]);
    const result = formatComponentStack(json)!;
    expect(result).toContain("at App (core/src/app.tsx:10:3)");
    expect(result).toContain("at Child (core/src/child.tsx:20)");
  });

  it("formats entries without source locations", () => {
    const json = JSON.stringify([{ name: "Anonymous" }]);
    const result = formatComponentStack(json)!;
    expect(result).toBe("    at Anonymous");
  });

  it("returns undefined for invalid JSON", () => {
    expect(formatComponentStack("not json")).toBeUndefined();
  });
});

describe("printPaginationFooter", () => {
  let db: DatabaseSync;

  beforeEach(() => {
    db = createTestDb();
  });
  afterEach(() => {
    db.close();
  });

  it("prints footer when more results exist", () => {
    const { stdout } = captureOutput(() =>
      printPaginationFooter(
        db,
        "SELECT COUNT(*) as n FROM render_nodes WHERE kind = 'component'",
        [],
        1,
        1,
      ),
    );
    expect(stdout).toContain("showing 1 of 2");
  });

  it("does not print when shown < limit", () => {
    const { stdout } = captureOutput(() =>
      printPaginationFooter(
        db,
        "SELECT COUNT(*) as n FROM render_nodes WHERE kind = 'component'",
        [],
        10,
        2,
      ),
    );
    expect(stdout).toBe("");
  });
});

describe("outputFileContextsCte", () => {
  let db: DatabaseSync;

  beforeEach(() => {
    db = createTestDb();
    // Link render_node 2 (SourceFile) to context_id 100
    db.exec("UPDATE render_nodes SET context_id = 100 WHERE id = 2");
  });
  afterEach(() => {
    db.close();
  });

  it("returns valid SQL subquery for context lookup", () => {
    const cte = outputFileContextsCte();
    const sql = `SELECT * FROM effects WHERE context_id IN ${cte}`;
    const rows = db.prepare(sql).all("%models%") as any[];
    // Should find effects whose context_id matches SourceFile's context hierarchy
    expect(rows.length).toBeGreaterThan(0);
  });
});

describe("outputFileRenderNodesCte", () => {
  let db: DatabaseSync;

  beforeEach(() => {
    db = createTestDb();
  });
  afterEach(() => {
    db.close();
  });

  it("returns valid SQL subquery for render node descendants", () => {
    const cte = outputFileRenderNodesCte();
    const sql = `SELECT * FROM render_nodes WHERE id IN ${cte}`;
    const rows = db.prepare(sql).all("%models%") as any[];
    // SourceFile (node 2) and all descendants: 3, 4, 5, 6, 7, 8
    expect(rows.length).toBeGreaterThanOrEqual(6);
  });
});
