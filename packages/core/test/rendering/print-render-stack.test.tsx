import {
  Output,
  SourceDirectory,
  SourceFile,
  renderAsync,
} from "@alloy-js/core";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import WebSocket from "ws";
import { createNamedContext } from "../../src/context.js";
import {
  enableDevtools,
  resetDevtoolsServerForTests,
} from "../../src/devtools/devtools-server.js";
import { clearRenderStack } from "../../src/render-stack.js";
import "../../testing/extend-expect.js";

// Strip ANSI escape codes from a string for consistent testing across environments
function stripAnsi(str: string): string {
  // eslint-disable-next-line no-control-regex
  return str.replace(/\x1B\[[0-9;]*[a-zA-Z]/g, "");
}

// Helper to check if any console.error call contains a string (after stripping ANSI codes)
function expectErrorContaining(
  spy: ReturnType<typeof vi.spyOn>,
  substring: string,
) {
  const calls = spy.mock.calls.map((call) => stripAnsi(String(call[0])));
  expect(calls.some((msg) => msg.includes(substring))).toBe(true);
}

describe("printRenderStack", () => {
  let socket: WebSocket | undefined;

  beforeEach(async () => {
    const server = await enableDevtools({ port: 0 });
    socket = new WebSocket(`ws://127.0.0.1:${server.port}`);
    await new Promise<void>((resolve, reject) => {
      socket?.once("open", resolve);
      socket?.once("error", reject);
    });
  });

  afterEach(async () => {
    if (socket) {
      socket.close();
      socket = undefined;
    }
    await resetDevtoolsServerForTests();

    // Clear render stack to prevent state leakage between tests
    clearRenderStack();
  });

  it("prints the current file when an error occurs", async () => {
    const consoleErrorSpy = vi.spyOn(console, "error");

    function ThrowingComponent() {
      throw new Error("Test error");
    }

    function ParentComponent() {
      return <ThrowingComponent />;
    }

    await expect(
      renderAsync(
        <Output>
          <SourceFile path="test.ts" filetype="typescript">
            <ParentComponent />
          </SourceFile>
        </Output>,
      ),
    ).rejects.toThrow("Test error");

    // Check that console.error was called with file path
    expectErrorContaining(consoleErrorSpy, "Error rendering in file test.ts");
    expectErrorContaining(consoleErrorSpy, "ParentComponent");
    expectErrorContaining(consoleErrorSpy, "ThrowingComponent");

    consoleErrorSpy.mockRestore();
  });

  it("prints joined path from nested directories", async () => {
    const consoleErrorSpy = vi.spyOn(console, "error");

    function ThrowingComponent() {
      throw new Error("Nested error");
    }

    await expect(
      renderAsync(
        <Output>
          <SourceDirectory path="dir1">
            <SourceDirectory path="dir2">
              <SourceFile path="test.ts" filetype="typescript">
                <ThrowingComponent />
              </SourceFile>
            </SourceDirectory>
          </SourceDirectory>
        </Output>,
      ),
    ).rejects.toThrow("Nested error");

    // Should show the joined path of all directories
    expectErrorContaining(
      consoleErrorSpy,
      "Error rendering in file dir1/dir2/test.ts",
    );

    consoleErrorSpy.mockRestore();
  });

  it("works when no file context is present", async () => {
    const consoleErrorSpy = vi.spyOn(console, "error");

    function ThrowingComponent() {
      throw new Error("No file context error");
    }

    // Track the number of calls before our test
    const callsBefore = consoleErrorSpy.mock.calls.length;

    await expect(
      renderAsync(
        <Output>
          <ThrowingComponent />
        </Output>,
      ),
    ).rejects.toThrow("No file context error");

    // Get only the calls from THIS test (after callsBefore)
    const callsFromThisTest = consoleErrorSpy.mock.calls.slice(callsBefore);
    const messagesFromThisTest = callsFromThisTest.map((call: any) =>
      stripAnsi(String(call[0])),
    );

    // Output component creates a SourceDirectory with path "./"
    // The error message should be "Error rendering in file ./"
    expect(
      messagesFromThisTest.some(
        (msg: string) => msg && msg.includes("Error rendering in file ./"),
      ),
    ).toBe(true);

    consoleErrorSpy.mockRestore();
  });

  it("includes component stack with props", async () => {
    const consoleErrorSpy = vi.spyOn(console, "error");

    function ThrowingComponent(props: { message: string; count: number }) {
      throw new Error("Component error");
    }

    function WrapperComponent(props: { value: string }) {
      return <ThrowingComponent message={props.value} count={42} />;
    }

    await expect(
      renderAsync(
        <Output>
          <SourceFile path="props-test.ts" filetype="typescript">
            <WrapperComponent value="test" />
          </SourceFile>
        </Output>,
      ),
    ).rejects.toThrow("Component error");

    expectErrorContaining(
      consoleErrorSpy,
      "Error rendering in file props-test.ts",
    );
    expectErrorContaining(consoleErrorSpy, "WrapperComponent");
    expectErrorContaining(consoleErrorSpy, 'value: "test"');
    expectErrorContaining(consoleErrorSpy, "ThrowingComponent");
    expectErrorContaining(consoleErrorSpy, 'message: "test", count: 42');

    consoleErrorSpy.mockRestore();
  });

  it("prints 'Error rendering:' when no file or directory context is present", async () => {
    const consoleErrorSpy = vi.spyOn(console, "error");

    function ThrowingComponent() {
      throw new Error("No context error");
    }

    // Track the number of calls before our test
    const callsBefore = consoleErrorSpy.mock.calls.length;

    // Don't use Output wrapper to avoid SourceDirectory context
    await expect(renderAsync(<ThrowingComponent />)).rejects.toThrow();

    // Get only the calls from THIS test (after callsBefore)
    const callsFromThisTest = consoleErrorSpy.mock.calls.slice(callsBefore);
    const messagesFromThisTest = callsFromThisTest.map((call: any) =>
      stripAnsi(String(call[0])),
    );

    // Should have "Error rendering:" without file path
    expect(
      messagesFromThisTest.some(
        (msg: string) => msg && msg.includes("Error rendering:"),
      ),
    ).toBe(true);
    // Should NOT have any message with "in file"
    expect(
      messagesFromThisTest.some(
        (msg: string) => msg && msg.includes("in file"),
      ),
    ).toBe(false);

    consoleErrorSpy.mockRestore();
  });

  it("shows context name for named context providers", async () => {
    const consoleErrorSpy = vi.spyOn(console, "error");

    const MyContext = createNamedContext<string>("MyContext");

    function ThrowingComponent() {
      throw new Error("Context error");
    }

    await expect(
      renderAsync(
        <Output>
          <SourceFile path="context-test.ts" filetype="typescript">
            <MyContext.Provider value="test-value">
              <ThrowingComponent />
            </MyContext.Provider>
          </SourceFile>
        </Output>,
      ),
    ).rejects.toThrow("Context error");

    // Check that the named context provider is shown as a separate component
    expectErrorContaining(consoleErrorSpy, "at MyContext");
    expectErrorContaining(consoleErrorSpy, 'value: "test-value"');

    consoleErrorSpy.mockRestore();
  });
});
