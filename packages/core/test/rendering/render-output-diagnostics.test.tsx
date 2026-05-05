import { afterEach, describe, expect, it, vi } from "vitest";
import {
  emitDiagnostic,
  Output,
  render,
  renderAsync,
  SourceFile,
} from "../../src/index.js";
import { sourceFilesForTree } from "../../src/render-output.js";
import { getDiagnosticsForTree, renderTree } from "../../src/test-render.js";

afterEach(() => {
  vi.restoreAllMocks();
});

function DiagnosticComponent() {
  emitDiagnostic({
    severity: "warning",
    message: "component warning",
  });

  return null;
}

function AsyncDiagnosticComponent() {
  emitDiagnostic({
    severity: "warning",
    message: "async component warning",
  });

  return null;
}

describe("render output diagnostics", () => {
  it("records missing Output diagnostics on rendered trees", () => {
    const tree = renderTree("orphan text");

    expect(sourceFilesForTree(tree)).toEqual({
      kind: "directory",
      path: "",
      contents: [],
    });
    expect(getDiagnosticsForTree(tree)).toEqual([
      expect.objectContaining({
        severity: "error",
        message: expect.stringContaining("No root directory found"),
      }),
    ]);
  });

  it("reports component diagnostics from render", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    render(
      <Output>
        <DiagnosticComponent />
      </Output>,
    );

    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining("component warning"),
    );
  });

  it("reports component diagnostics from renderAsync", async () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    await renderAsync(
      <Output>
        <AsyncDiagnosticComponent />
      </Output>,
    );

    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining("async component warning"),
    );
  });

  it("reports missing Output diagnostics from render", () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    expect(render("orphan text")).toEqual({
      kind: "directory",
      path: "",
      contents: [],
    });
    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining("No root directory found"),
    );
  });

  it("reports missing Output diagnostics from renderAsync", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    await expect(renderAsync("orphan text")).resolves.toEqual({
      kind: "directory",
      path: "",
      contents: [],
    });
    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining("No root directory found"),
    );
  });

  it("reports output traversal errors through diagnostics", () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() =>
      render(
        <SourceFile path="orphan.txt" filetype="text/plain">
          orphan
        </SourceFile>,
      ),
    ).toThrow("Source file doesn't have parent directory");

    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining("Source file doesn't have parent directory"),
    );
  });
});
