import { existsSync, unlinkSync, writeFileSync } from "fs";
import { tmpdir } from "os";
import { join } from "pathe";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { UpdateFile } from "../../src/components/UpdateFile.jsx";
import { render } from "../../src/render.js";
import "../../testing/extend-expect.js";
import { d } from "../../testing/render.js";

describe("UpdateFile", () => {
  let testFilePath: string;

  beforeEach(() => {
    testFilePath = join(tmpdir(), "test-file.txt");
  });

  afterEach(() => {
    if (existsSync(testFilePath)) {
      unlinkSync(testFilePath);
    }
  });

  describe("when file exists", () => {
    it("should read existing file and transform content", async () => {
      const existingContent = "Hello World";
      writeFileSync(testFilePath, existingContent, "utf-8");

      const result = (
        <UpdateFile path={testFilePath}>
          {(currentContents) => {
            return `${currentContents?.toUpperCase()}`;
          }}
        </UpdateFile>
      );

      await expect(result).toRenderToAsync("HELLO WORLD");
    });

    it("should handle JSON file updates", async () => {
      const existingConfig = { version: "1.0.0", name: "test" };
      writeFileSync(testFilePath, JSON.stringify(existingConfig), "utf-8");

      const result = (
        <UpdateFile path={testFilePath}>
          {(currentContents) => {
            const config = JSON.parse(currentContents!);
            config.version = "2.0.0";
            config.newProperty = "added";
            return JSON.stringify(config, null, 2);
          }}
        </UpdateFile>
      );

      await expect(result).toRenderToAsync(d`
        {
          "version": "2.0.0",
          "name": "test",
          "newProperty": "added"
        }
      `);
    });

    it("should handle multiline content transformation", async () => {
      const existingContent = d`
        line 1
        line 2
        line 3
      `;
      writeFileSync(testFilePath, existingContent, "utf-8");

      const result = (
        <UpdateFile path={testFilePath}>
          {(currentContents) => {
            const lines = currentContents!.split("\n");
            const modifiedLines = lines.map((line) => `// ${line}`);
            return modifiedLines.join("\n");
          }}
        </UpdateFile>
      );

      await expect(result).toRenderToAsync(d`
        // line 1
        // line 2
        // line 3
      `);
    });

    it("should handle empty existing file", async () => {
      writeFileSync(testFilePath, "", "utf-8");

      const result = (
        <UpdateFile path={testFilePath}>
          {(currentContents) => {
            return `Content was: "${currentContents || "empty"}"`;
          }}
        </UpdateFile>
      );

      await expect(result).toRenderToAsync('Content was: "empty"');
    });
  });

  describe("when file does not exist", () => {
    it("should use defaultContent when file does not exist", async () => {
      const result = (
        <UpdateFile path="non-existent.txt" defaultContent="default content">
          {(currentContents) => {
            if (currentContents === null) {
              return `File did not exist`;
            }
            return `File existed with: ${currentContents}`;
          }}
        </UpdateFile>
      );

      await expect(result).toRenderToAsync("File did not exist");
    });

    it("should use defaultContentPath when file does not exist", async () => {
      const defaultFilePath = join(
        tmpdir(),
        `default-content-${Date.now()}.txt`,
      );
      const defaultContent = "This is default content from file";
      writeFileSync(defaultFilePath, defaultContent, "utf-8");

      try {
        const result = (
          <UpdateFile
            path="non-existent.txt"
            defaultContentPath={defaultFilePath}
          >
            {(currentContents) => {
              return `Default: ${currentContents}`;
            }}
          </UpdateFile>
        );

        await expect(result).toRenderToAsync(
          "Default: This is default content from file",
        );
      } finally {
        if (existsSync(defaultFilePath)) {
          unlinkSync(defaultFilePath);
        }
      }
    });

    it("should pass null to children when no default content provided", async () => {
      const result = (
        <UpdateFile path="non-existent.txt">
          {(currentContents) => {
            if (currentContents === null) {
              return `Creating new file`;
            }
            return `Updating existing file: ${currentContents}`;
          }}
        </UpdateFile>
      );

      await expect(result).toRenderToAsync("Creating new file");
    });

    it("should create JSON file from scratch when it doesn't exist", async () => {
      const result = (
        <UpdateFile path="new-config.json">
          {(currentContents) => {
            const config = currentContents ? JSON.parse(currentContents) : {};
            config.name = "new-project";
            config.version = "1.0.0";
            config.dependencies = {};
            return JSON.stringify(config, null, 2);
          }}
        </UpdateFile>
      );

      await expect(result).toRenderToAsync(d`
        {
          "name": "new-project",
          "version": "1.0.0",
          "dependencies": {}
        }
      `);
    });
  });

  describe("error handling", () => {
    it("should throw error when defaultContentPath file does not exist", async () => {
      expect(() =>
        render(
          <UpdateFile
            path="non-existent.txt"
            defaultContentPath="/path/that/does/not/exist.txt"
          >
            {(currentContents) => currentContents}
          </UpdateFile>,
        ),
      ).toThrow();
    });

    it("should handle file system errors gracefully", async () => {
      // Try to read a directory as a file (should cause an error)
      const dirPath = join(tmpdir(), `test-dir-${Date.now()}`);

      expect(() =>
        render(
          <UpdateFile path={dirPath}>
            {(currentContents) => currentContents}
          </UpdateFile>,
        ),
      ).toThrow();
    });
  });
});
