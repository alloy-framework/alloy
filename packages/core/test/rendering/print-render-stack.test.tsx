import { Output, SourceDirectory, SourceFile } from "@alloy-js/core";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createNamedContext } from "../../src/context.js";
import { clearRenderStack } from "../../src/render-stack.js";
import { renderTree } from "../../src/render.js";
import "../../testing/extend-expect.js";

describe("printRenderStack", () => {
  let originalEnv: string | undefined;

  beforeEach(() => {
    // Enable debug mode
    originalEnv = process.env.ALLOY_DEBUG;
    process.env.ALLOY_DEBUG = "1";
  });

  afterEach(() => {
    // Restore environment
    if (originalEnv === undefined) {
      delete process.env.ALLOY_DEBUG;
    } else {
      process.env.ALLOY_DEBUG = originalEnv;
    }

    // Clear render stack to prevent state leakage between tests
    clearRenderStack();
  });

  it("prints the current file when an error occurs", () => {
    const consoleErrorSpy = vi.spyOn(console, "error");

    function ThrowingComponent() {
      throw new Error("Test error");
    }

    function ParentComponent() {
      return <ThrowingComponent />;
    }

    expect(() => {
      renderTree(
        <Output>
          <SourceFile path="test.ts" filetype="typescript">
            <ParentComponent />
          </SourceFile>
        </Output>,
      );
    }).toThrow("Test error");

    // Check that console.error was called with file path
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error rendering in file test.ts",
    );
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining("ParentComponent"),
    );
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining("ThrowingComponent"),
    );

    consoleErrorSpy.mockRestore();
  });

  it("prints joined path from nested directories", () => {
    const consoleErrorSpy = vi.spyOn(console, "error");

    function ThrowingComponent() {
      throw new Error("Nested error");
    }

    expect(() => {
      renderTree(
        <Output>
          <SourceDirectory path="dir1">
            <SourceDirectory path="dir2">
              <SourceFile path="test.ts" filetype="typescript">
                <ThrowingComponent />
              </SourceFile>
            </SourceDirectory>
          </SourceDirectory>
        </Output>,
      );
    }).toThrow("Nested error");

    // Should show the joined path of all directories
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error rendering in file dir1/dir2/test.ts",
    );

    consoleErrorSpy.mockRestore();
  });

  it("works when no file context is present", () => {
    const consoleErrorSpy = vi.spyOn(console, "error");

    function ThrowingComponent() {
      throw new Error("No file context error");
    }

    // Track the number of calls before our test
    const callsBefore = consoleErrorSpy.mock.calls.length;

    expect(() => {
      renderTree(
        <Output>
          <ThrowingComponent />
        </Output>,
      );
    }).toThrow("No file context error");

    // Get only the calls from THIS test (after callsBefore)
    const callsFromThisTest = consoleErrorSpy.mock.calls.slice(callsBefore);
    const messagesFromThisTest = callsFromThisTest.map((call: any) => call[0]);

    // Output component creates a SourceDirectory with path "./"
    // The error message should be "Error rendering in file ./"
    expect(messagesFromThisTest).toContain("Error rendering in file ./");

    consoleErrorSpy.mockRestore();
  });

  it("includes component stack with props", () => {
    const consoleErrorSpy = vi.spyOn(console, "error");

    function ThrowingComponent(props: { message: string; count: number }) {
      throw new Error("Component error");
    }

    function WrapperComponent(props: { value: string }) {
      return <ThrowingComponent message={props.value} count={42} />;
    }

    expect(() => {
      renderTree(
        <Output>
          <SourceFile path="props-test.ts" filetype="typescript">
            <WrapperComponent value="test" />
          </SourceFile>
        </Output>,
      );
    }).toThrow("Component error");

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error rendering in file props-test.ts",
    );
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining("WrapperComponent"),
    );
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining('value: "test"'),
    );
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining("ThrowingComponent"),
    );
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining('message: "test", count: 42'),
    );

    consoleErrorSpy.mockRestore();
  });

  it("prints 'Error rendering:' when no file or directory context is present", () => {
    const consoleErrorSpy = vi.spyOn(console, "error");

    function ThrowingComponent() {
      throw new Error("No context error");
    }

    // Track the number of calls before our test
    const callsBefore = consoleErrorSpy.mock.calls.length;

    // Don't use Output wrapper to avoid SourceDirectory context
    expect(() => {
      renderTree(<ThrowingComponent />);
    }).toThrow();

    // Get only the calls from THIS test (after callsBefore)
    const callsFromThisTest = consoleErrorSpy.mock.calls.slice(callsBefore);
    const messagesFromThisTest = callsFromThisTest.map((call: any) => call[0]);

    // Should have "Error rendering:" without file path
    expect(messagesFromThisTest).toContain("Error rendering:");
    // Should NOT have any message with "in file"
    expect(
      messagesFromThisTest.some(
        (msg: string) => msg && msg.includes("in file"),
      ),
    ).toBe(false);

    consoleErrorSpy.mockRestore();
  });

  it("shows context name for named context providers", () => {
    const consoleErrorSpy = vi.spyOn(console, "error");

    const MyContext = createNamedContext<string>("MyContext");

    function ThrowingComponent() {
      throw new Error("Context error");
    }

    expect(() => {
      renderTree(
        <Output>
          <SourceFile path="context-test.ts" filetype="typescript">
            <MyContext.Provider value="test-value">
              <ThrowingComponent />
            </MyContext.Provider>
          </SourceFile>
        </Output>,
      );
    }).toThrow("Context error");

    // Check that the named context provider is shown as a separate component
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining("at MyContext"),
    );
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining('value: "test-value"'),
    );

    consoleErrorSpy.mockRestore();
  });
});
