import { existsSync, readFileSync, unlinkSync, writeFileSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { CopyFile } from "../../src/components/CopyFile.jsx";
import { SourceDirectory } from "../../src/components/SourceDirectory.jsx";
import { CopyOutputFile, render } from "../../src/render.js";
import { writeOutput } from "../../src/write-output.js";
import "../../testing/extend-expect.js";

describe("CopyFile", () => {
  let testDir: string;
  let sourceFile: string;
  let targetFile: string;

  beforeEach(() => {
    // Create unique temporary paths for each test
    testDir = tmpdir();
    sourceFile = join(testDir, "source.txt");
    targetFile = join(testDir, "target.txt");
  });

  afterEach(() => {
    // Clean up test files after each test
    if (existsSync(sourceFile)) {
      unlinkSync(sourceFile);
    }
    if (existsSync(targetFile)) {
      unlinkSync(targetFile);
    }
  });

  it("should create copy file context with correct paths", async () => {
    writeFileSync(sourceFile, "Hello, World!", "utf-8");

    const result = (
      <SourceDirectory path={testDir}>
        <CopyFile src={sourceFile} path="target.txt" />
      </SourceDirectory>
    );

    const output = render(result);
    await writeOutput(output);

    expect(output.contents).toHaveLength(1);
    const copyFileOutput = output.contents[0] as CopyOutputFile;
    expect(copyFileOutput.kind).toBe("file");
    expect(copyFileOutput.sourcePath).toBe(sourceFile);
    expect(copyFileOutput.path).toBe(join(testDir, "target.txt"));
    expect(existsSync(targetFile)).toBe(true);
    const targetContent = readFileSync(targetFile, "utf-8");
    expect(targetContent).toBe("Hello, World!");
  });

  it("should handle relative paths correctly", async () => {
    // Create source file
    writeFileSync(sourceFile, "Relative path test", "utf-8");

    const result = (
      <SourceDirectory path={testDir}>
        <SourceDirectory path="subdir">
          <CopyFile src={sourceFile} path="nested-target.txt" />
        </SourceDirectory>
      </SourceDirectory>
    );

    const output = render(result);

    // Find the copy file in the nested directory
    const subdir = output.contents.find(
      (item) =>
        item.kind === "directory" && item.path === join(testDir, "subdir"),
    );
    expect(subdir).toBeDefined();

    if (subdir && subdir.kind === "directory") {
      expect(subdir.contents).toHaveLength(1);
      const copyFile = subdir.contents[0];
      expect(copyFile.kind).toBe("file");

      if (copyFile.kind === "file" && "sourcePath" in copyFile) {
        expect(copyFile.sourcePath).toBe(sourceFile);
        expect(copyFile.path).toBe(
          join(testDir, "subdir", "nested-target.txt"),
        );
      }
    }
  });

  it("should throw error when used without SourceDirectory context", () => {
    // Create source file
    writeFileSync(sourceFile, "Error test", "utf-8");

    expect(() => {
      render(<CopyFile src={sourceFile} path="target.txt" />);
    }).toThrow("Copy file doesn't have parent directory");
  });
});
