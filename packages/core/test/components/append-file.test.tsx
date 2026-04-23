import { existsSync, unlinkSync, writeFileSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { AppendFile, AppendRegion } from "../../src/components/AppendFile.jsx";
import "../../testing/extend-expect.js";
import { d } from "../../testing/render.js";

describe("AppendFile", () => {
  let testFilePath: string;

  beforeEach(() => {
    // Create a unique temporary file path for each test
    testFilePath = join(tmpdir(), `test-append-file-${Date.now()}.txt`);
  });

  afterEach(() => {
    // Clean up test file after each test
    if (existsSync(testFilePath)) {
      unlinkSync(testFilePath);
    }
  });

  it("should append content to end of file when no sigils present", async () => {
    // Create initial file content
    writeFileSync(testFilePath, "Initial content", "utf-8");

    const result = (
      <AppendFile path={testFilePath}>
        <AppendRegion id="append">New content</AppendRegion>
      </AppendFile>
    );

    await expect(result).toRenderToAsync("Initial content\nNew content");
  });

  it("should append content to end of file when no sigils present with no explicit append region", async () => {
    // Create initial file content
    writeFileSync(testFilePath, "Initial content", "utf-8");

    const result = <AppendFile path={testFilePath}>New content</AppendFile>;

    await expect(result).toRenderToAsync("Initial content\nNew content");
  });

  it("should append content within region sigils", async () => {
    const initialContent = d`
      Header content
      <!-- alloy-main-start -->
      <!-- alloy-main-end -->
      Footer content
    `;

    writeFileSync(testFilePath, initialContent, "utf-8");

    const result = (
      <AppendFile path={testFilePath} regions={["main"]}>
        <AppendRegion id="main">New main content</AppendRegion>
      </AppendFile>
    );

    await expect(result).toRenderToAsync(d`
      Header content
      <!-- alloy-main-start -->
      New main content
      <!-- alloy-main-end -->
      Footer content
    `);
  });

  it("should handle multiple regions", async () => {
    const initialContent = d`
      <!-- alloy-header-start -->
      <!-- alloy-header-end -->
      Main content
      <!-- alloy-footer-start -->
      <!-- alloy-footer-end -->
    `;

    writeFileSync(testFilePath, initialContent, "utf-8");

    const result = (
      <AppendFile path={testFilePath} regions={["header", "footer"]}>
        <AppendRegion id="header">Header text</AppendRegion>
        <AppendRegion id="footer">Footer text</AppendRegion>
      </AppendFile>
    );

    await expect(result).toRenderToAsync(d`
      <!-- alloy-header-start -->
      Header text
      <!-- alloy-header-end -->
      Main content
      <!-- alloy-footer-start -->
      Footer text
      <!-- alloy-footer-end -->
    `);
  });

  it("should preserve existing content and append new content", async () => {
    const initialContent = d`
      Header
      <!-- alloy-main-start -->
      Existing content
      <!-- alloy-main-end -->
      Footer
    `;

    writeFileSync(testFilePath, initialContent, "utf-8");

    const result = (
      <AppendFile path={testFilePath} regions={["main"]}>
        <AppendRegion id="main">New appended content</AppendRegion>
      </AppendFile>
    );

    await expect(result).toRenderToAsync(d`
      Header
      <!-- alloy-main-start -->
      Existing content
      New appended content
      <!-- alloy-main-end -->
      Footer
    `);
  });

  it("should use content prop instead of children", async () => {
    writeFileSync(testFilePath, "Start ", "utf-8");

    const result = (
      <AppendFile path={testFilePath}>
        <AppendRegion id="append" content="End" />
      </AppendFile>
    );

    await expect(result).toRenderToAsync("Start\nEnd");
  });

  it("should default to 'append' region when no regions specified", async () => {
    writeFileSync(testFilePath, "Content", "utf-8");

    const result = (
      <AppendFile path={testFilePath}>
        <AppendRegion id="append">default region</AppendRegion>
      </AppendFile>
    );

    await expect(result).toRenderToAsync("Content\ndefault region");
  });

  it("should emit diagnostic when region is missing corresponding AppendRegion", async () => {
    writeFileSync(testFilePath, "content", "utf-8");

    await expect(
      <AppendFile path={testFilePath} regions={["missing"]}>
        <AppendRegion id="append">content</AppendRegion>
      </AppendFile>,
    ).toHaveDiagnosticsAsync([
      {
        message:
          'Region "missing" specified but no corresponding AppendRegion child found',
        severity: "error",
      },
    ]);
  });

  it("should emit diagnostic when AppendRegion has neither children nor content", async () => {
    writeFileSync(testFilePath, "content", "utf-8");

    await expect(
      <AppendFile path={testFilePath}>
        <AppendRegion id="append" />
      </AppendFile>,
    ).toHaveDiagnosticsAsync([
      {
        message: 'AppendRegion "append" must have either children or content',
        severity: "error",
      },
    ]);
  });

  it("should throw error when region has missing start sigil", async () => {
    const contentWithOnlyEnd = d`
      Content
      <!-- alloy-incomplete-end -->
    `;

    writeFileSync(testFilePath, contentWithOnlyEnd, "utf-8");

    const result = (
      <AppendFile path={testFilePath} regions={["incomplete"]}>
        <AppendRegion id="incomplete">content</AppendRegion>
      </AppendFile>
    );

    // Should insert before the end sigil
    await expect(result).toRenderToAsync(d`
      Content
      content
      <!-- alloy-incomplete-end -->
    `);
  });

  it("should emit diagnostic when region has missing end sigil", async () => {
    const contentWithOnlyStart = d`
      Content
      <!-- alloy-incomplete-start -->
    `;

    writeFileSync(testFilePath, contentWithOnlyStart, "utf-8");

    await expect(
      <AppendFile path={testFilePath} regions={["incomplete"]}>
        <AppendRegion id="incomplete">content</AppendRegion>
      </AppendFile>,
    ).toHaveDiagnosticsAsync([
      {
        message:
          'Region "incomplete" has start sigil but no corresponding end sigil',
        severity: "error",
      },
    ]);
  });

  it("should handle complex nested content", async () => {
    const initialContent = d`
      <!-- alloy-config-start -->
      <!-- alloy-config-end -->
    `;

    writeFileSync(testFilePath, initialContent, "utf-8");

    const jsonContent = d`
      {
        "newProperty": "value",
        "nested": {
          "key": "data"
        }
      }
    `;

    const result = (
      <AppendFile path={testFilePath} regions={["config"]}>
        <AppendRegion id="config">{jsonContent}</AppendRegion>
      </AppendFile>
    );

    await expect(result).toRenderToAsync(d`
      <!-- alloy-config-start -->
      {
        "newProperty": "value",
        "nested": {
          "key": "data"
        }
      }
      <!-- alloy-config-end -->
    `);
  });

  it("should preserve indentation level of the end sigil", async () => {
    const initialContent = d`
      base
        <!-- alloy-indented-start -->
        <!-- alloy-indented-end -->
    `;

    writeFileSync(testFilePath, initialContent, "utf-8");

    const result = (
      <AppendFile path={testFilePath} regions={["indented"]}>
        <AppendRegion id="indented">new content</AppendRegion>
      </AppendFile>
    );

    await expect(result).toRenderToAsync(d`
      base
        <!-- alloy-indented-start -->
        new content
        <!-- alloy-indented-end -->
    `);
  });
});
