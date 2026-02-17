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

// eslint-disable-next-line no-control-regex
const stripAnsi = (s: string) => s.replace(/\x1b\[[0-9;]*m/g, "");

describe("shortPath", () => {
  it("converts absolute path to relative from cwd", () => {
    const cwd = process.cwd();
    const abs = cwd + "/src/types.ts";
    expect(shortPath(abs)).toBe("src/types.ts");
  });

  it("handles paths outside cwd with ../", () => {
    const result = shortPath("/some/other/path.ts");
    expect(result).toContain("path.ts");
    // Should be relative, not absolute
    expect(result).not.toMatch(/^\//);
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
    const cwd = process.cwd();
    const json = JSON.stringify([
      { name: "App", source: { fileName: cwd + "/src/app.tsx", lineNumber: 10, columnNumber: 3 } },
      { name: "Child", source: { fileName: cwd + "/src/child.tsx", lineNumber: 20 } },
    ]);
    const result = stripAnsi(formatComponentStack(json, true)!);
    expect(result).toContain("at App (src/app.tsx:10:3)");
    expect(result).toContain("at Child (src/child.tsx:20)");
  });

  it("formats entries without source locations", () => {
    const json = JSON.stringify([{ name: "Anonymous" }]);
    const result = stripAnsi(formatComponentStack(json, true)!);
    expect(result).toBe("    at Anonymous");
  });

  it("includes render node IDs when present", () => {
    const cwd = process.cwd();
    const json = JSON.stringify([
      { name: "App", renderNodeId: 42, source: { fileName: cwd + "/src/app.tsx", lineNumber: 10, columnNumber: 3 } },
      { name: "Child", renderNodeId: 99 },
    ]);
    const result = stripAnsi(formatComponentStack(json, true)!);
    expect(result).toContain("at App #42 (src/app.tsx:10:3)");
    expect(result).toContain("at Child #99");
  });

  it("hides node_modules frames by default", () => {
    const json = JSON.stringify([
      { name: "UserComp", source: { fileName: "/home/user/my-project/src/app.tsx", lineNumber: 5 } },
      { name: "LibComp", source: { fileName: "/home/user/node_modules/@alloy-js/core/src/lib.tsx", lineNumber: 10 } },
      { name: "NoSource" },
    ]);
    const result = stripAnsi(formatComponentStack(json)!);
    expect(result).toContain("at UserComp");
    expect(result).not.toContain("at LibComp");
    // Sourceless frames are kept (may be user components without annotations)
    expect(result).toContain("at NoSource");
    expect(result).toContain("1 external frames hidden (use --all-frames to show)");
  });

  it("shows all frames when allFrames is true", () => {
    const json = JSON.stringify([
      { name: "UserComp", source: { fileName: "/home/user/my-project/src/app.tsx", lineNumber: 5 } },
      { name: "LibComp", source: { fileName: "/home/user/node_modules/@alloy-js/core/src/lib.tsx", lineNumber: 10 } },
    ]);
    const result = stripAnsi(formatComponentStack(json, true)!);
    expect(result).toContain("at UserComp");
    expect(result).toContain("at LibComp");
    expect(result).not.toContain("external frames hidden");
  });

  it("returns undefined when all frames are library and not showing all", () => {
    const json = JSON.stringify([
      { name: "LibComp", source: { fileName: "/home/user/node_modules/@alloy-js/core/src/lib.tsx", lineNumber: 10 } },
    ]);
    expect(formatComponentStack(json)).toBeUndefined();
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
