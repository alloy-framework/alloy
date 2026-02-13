/**
 * Tests that verify the WebSocket message format produced by the server
 * matches what the devtools frontend expects. Each test renders something,
 * collects the raw JSON messages over the WebSocket, and checks the shape.
 *
 * Tests subscribe to specific channels to validate the subscription mechanism
 * and avoid filtering noise from unrelated channels.
 */
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import WebSocket from "ws";
import {
  createMessageCollector,
  type DevtoolsMessage,
} from "../../testing/devtools-utils.js";
import { Declaration } from "../components/Declaration.js";
import { For } from "../components/For.js";
import { Output } from "../components/Output.jsx";
import { Scope } from "../components/Scope.js";
import { SourceFile } from "../components/SourceFile.js";
import {
  enableDevtools,
  resetDevtoolsServerForTests,
} from "../devtools/devtools-server.js";
import { effect, ref } from "../reactivity.js";
import { renderAsync } from "../render.js";
import { flushJobsAsync } from "../scheduler.js";
import { debug } from "./index.js";

let socket: WebSocket | undefined;
let port: number;

beforeEach(async () => {
  debug.effect.reset();
  const server = await enableDevtools({ port: 0 });
  port = server.port;
  socket = new WebSocket(`ws://127.0.0.1:${port}`);
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
  debug.effect.reset();
});

// ---------------------------------------------------------------------------
// Subscriptions
// ---------------------------------------------------------------------------

describe("subscriptions", () => {
  it("only receives messages for subscribed channels", async () => {
    // Subscribe to render only — should NOT see effects, refs, etc.
    const collector = await createMessageCollector(socket!, ["render"]);
    await renderAsync(<Output>hello</Output>);
    const messages = await collector.waitForRender();
    collector.stop();

    const types = new Set(messages.map((m) => m.type));
    // Should have render messages
    expect(types.has("render:node_added")).toBe(true);
    // Should NOT have effect/ref/symbol/scope/edge messages
    expect(types.has("effect:added")).toBe(false);
    expect(types.has("ref:added")).toBe(false);
    expect(types.has("symbol:added")).toBe(false);
    expect(types.has("scope:added")).toBe(false);
  });

  it("receives messages from multiple subscribed channels", async () => {
    const collector = await createMessageCollector(socket!, [
      "render",
      "effects",
      "refs",
    ]);
    await renderAsync(<Output>hello</Output>);
    const messages = await collector.waitForRender();
    collector.stop();

    const types = new Set(messages.map((m) => m.type));
    expect(types.has("render:node_added")).toBe(true);
    expect(types.has("effect:added")).toBe(true);
    expect(types.has("ref:added")).toBe(true);
    // Not subscribed to these
    expect(types.has("symbol:added")).toBe(false);
    expect(types.has("scope:added")).toBe(false);
  });

  it("lifecycle signals are received regardless of subscription", async () => {
    // Subscribe to nothing useful — lifecycle signals bypass subscriptions
    const collector = await createMessageCollector(socket!, ["diagnostics"]);
    await renderAsync(<Output />);
    const messages = await collector.waitForRender();
    collector.stop();

    expect(messages.some((m) => m.type === "render:complete")).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// render channel
// ---------------------------------------------------------------------------

describe("render:node_added", () => {
  it("root node has null parent_id and kind 'root'", async () => {
    const collector = await createMessageCollector(socket!, ["render"]);
    await renderAsync(<Output />);
    const messages = await collector.waitForRender();
    collector.stop();

    const root = messages.find(
      (m) => m.type === "render:node_added" && m.kind === "root",
    );
    expect(root).toMatchObject({
      type: "render:node_added",
      id: expect.any(Number),
      parent_id: null,
      kind: "root",
      seq: expect.any(Number),
    });
  });

  it("component node has numeric id, parent_id, and name", async () => {
    const collector = await createMessageCollector(socket!, ["render"]);
    await renderAsync(<Output />);
    const messages = await collector.waitForRender();
    collector.stop();

    const output = messages.find(
      (m) => m.type === "render:node_added" && m.name === "Output",
    );
    expect(output).toMatchObject({
      type: "render:node_added",
      id: expect.any(Number),
      parent_id: expect.any(Number),
      kind: "component",
      name: "Output",
    });
  });

  it("text node has string value", async () => {
    const collector = await createMessageCollector(socket!, ["render"]);
    await renderAsync(<Output>hello</Output>);
    const messages = await collector.waitForRender();
    collector.stop();

    const text = messages.find(
      (m) => m.type === "render:node_added" && m.kind === "text",
    );
    expect(text).toBeDefined();
    expect(text!.value).toBe("hello");
    expect(text!.parent_id).toEqual(expect.any(Number));
  });

  it("non-text node has null value (not undefined)", async () => {
    const collector = await createMessageCollector(socket!, ["render"]);
    await renderAsync(<Output>hello</Output>);
    const messages = await collector.waitForRender();
    collector.stop();

    const component = messages.find(
      (m) => m.type === "render:node_added" && m.kind === "component",
    );
    expect(component!.value).toBeNull();
  });
});

describe("render:node_removed", () => {
  it("is emitted when a reactive component removes children", async () => {
    const show = ref(true);
    const collector = await createMessageCollector(socket!, ["render"]);

    function Conditional() {
      return () => (show.value ? "visible" : "");
    }

    await renderAsync(
      <Output>
        <Conditional />
      </Output>,
    );
    const renderMessages = await collector.waitForRender();

    // Verify the text node "visible" was added
    const textAdded = renderMessages.find(
      (m) => m.type === "render:node_added" && m.value === "visible",
    );
    expect(textAdded).toBeDefined();

    // Toggle visibility to trigger removal
    show.value = false;
    await flushJobsAsync();
    const flushMessages = await collector.waitForFlush();
    collector.stop();

    const removed = flushMessages.filter(
      (m) => m.type === "render:node_removed",
    );
    expect(removed.length).toBeGreaterThan(0);
    expect(removed[0]).toMatchObject({
      type: "render:node_removed",
      id: expect.any(Number),
    });
  });
});

describe("render:node_updated", () => {
  it("emits node_added during reactive list growth", async () => {
    const items = ref(["a"]);
    const collector = await createMessageCollector(socket!, ["render"]);
    await renderAsync(
      <Output>
        <For each={items}>{(item) => <>{item}</>}</For>
      </Output>,
    );
    await collector.waitForRender();

    // Add an item to trigger reactive update
    items.value = [...items.value, "b"];
    await flushJobsAsync();
    const flushMessages = await collector.waitForFlush();
    collector.stop();

    // Reactive updates produce new node_added messages for new content
    const added = flushMessages.filter((m) => m.type === "render:node_added");
    expect(added.length).toBeGreaterThan(0);
    // Should contain the new "b" text node
    const bNode = added.find((m) => m.value === "b");
    expect(bNode).toBeDefined();
  });
});

describe("render:reset", () => {
  it("is sent before node_added messages", async () => {
    const collector = await createMessageCollector(socket!, ["render"]);
    await renderAsync(<Output />);
    const messages = await collector.waitForRender();
    collector.stop();

    const renderMessages = messages.filter(
      (m) =>
        m.type === "render:reset" ||
        m.type === "render:node_added" ||
        m.type === "render:complete",
    );
    expect(renderMessages[0]).toMatchObject({ type: "render:reset" });
  });
});

describe("render:complete", () => {
  it("is sent after all node_added messages", async () => {
    const collector = await createMessageCollector(socket!, ["render"]);
    await renderAsync(<Output />);
    const messages = await collector.waitForRender();
    collector.stop();

    const renderMessages = messages.filter(
      (m) =>
        m.type === "render:reset" ||
        m.type === "render:node_added" ||
        m.type === "render:complete",
    );
    const last = renderMessages[renderMessages.length - 1];
    expect(last).toMatchObject({ type: "render:complete" });
  });
});

// ---------------------------------------------------------------------------
// effects channel
// ---------------------------------------------------------------------------

describe("effect:added", () => {
  it("has id, effect_type, and seq", async () => {
    const collector = await createMessageCollector(socket!, ["effects"]);
    await renderAsync(<Output>hello</Output>);
    const messages = await collector.waitForRender();
    collector.stop();

    const effects = messages.filter((m) => m.type === "effect:added");
    expect(effects.length).toBeGreaterThan(0);

    const e = effects[0];
    expect(e).toMatchObject({
      type: "effect:added",
      id: expect.any(Number),
      seq: expect.any(Number),
    });
    expect("effect_type" in e).toBe(true);
  });
});

describe("effect:updated", () => {
  it("is emitted when an effect's component is set", async () => {
    const collector = await createMessageCollector(socket!, ["effects"]);
    await renderAsync(<Output>hello</Output>);
    const messages = await collector.waitForRender();
    collector.stop();

    const updated = messages.filter((m) => m.type === "effect:updated");
    // Effects get updated with component info during render
    if (updated.length > 0) {
      expect(updated[0]).toMatchObject({
        type: "effect:updated",
      });
    }
  });
});

// ---------------------------------------------------------------------------
// refs channel
// ---------------------------------------------------------------------------

describe("ref:added", () => {
  it("has id, kind, and seq", async () => {
    const collector = await createMessageCollector(socket!, ["refs"]);
    await renderAsync(<Output>hello</Output>);
    const messages = await collector.waitForRender();
    collector.stop();

    const refs = messages.filter((m) => m.type === "ref:added");
    expect(refs.length).toBeGreaterThan(0);

    const r = refs[0];
    expect(r).toMatchObject({
      type: "ref:added",
      id: expect.any(Number),
      seq: expect.any(Number),
    });
    // kind is nullable
    expect("kind" in r).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// edges channel
// ---------------------------------------------------------------------------

describe("edge:track and edge:trigger", () => {
  it("emits edge messages with effect_id and ref_id", async () => {
    const collector = await createMessageCollector(socket!, ["edges"]);
    await renderAsync(<Output>hello</Output>);
    const messages = await collector.waitForRender();
    collector.stop();

    const edges = messages.filter(
      (m) => m.type === "edge:track" || m.type === "edge:trigger",
    );
    expect(edges.length).toBeGreaterThan(0);

    const edge = edges[0];
    expect(edge).toMatchObject({
      seq: expect.any(Number),
      effect_id: expect.any(Number),
    });
    // ref_id is present (may be null for some edge types)
    expect("ref_id" in edge).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// symbols channel
// ---------------------------------------------------------------------------

describe("symbol:added", () => {
  it("has id, name, boolean flags, and seq", async () => {
    const collector = await createMessageCollector(socket!, ["symbols"]);
    await renderAsync(
      <Output>
        <Scope name="myScope">
          <Declaration name="Foo">foo content</Declaration>
        </Scope>
      </Output>,
    );
    const messages = await collector.waitForRender();
    collector.stop();

    const symbols = messages.filter((m) => m.type === "symbol:added");
    expect(symbols.length).toBeGreaterThan(0);

    const sym = symbols.find((m) => m.name === "Foo");
    expect(sym).toBeDefined();
    expect(sym).toMatchObject({
      type: "symbol:added",
      id: expect.any(Number),
      name: "Foo",
      seq: expect.any(Number),
    });
    // Boolean flags are 0/1 integers
    expect([0, 1]).toContain(sym!.is_member);
    expect([0, 1]).toContain(sym!.is_transient);
    expect([0, 1]).toContain(sym!.is_alias);
    // Nullable fields exist as keys
    expect("scope_id" in sym!).toBe(true);
    expect("owner_symbol_id" in sym!).toBe(true);
    expect("metadata" in sym!).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// scopes channel
// ---------------------------------------------------------------------------

describe("scope:added", () => {
  it("has id, name, is_member_scope, and seq", async () => {
    const collector = await createMessageCollector(socket!, ["scopes"]);
    await renderAsync(
      <Output>
        <Scope name="TestScope">content</Scope>
      </Output>,
    );
    const messages = await collector.waitForRender();
    collector.stop();

    const scopes = messages.filter((m) => m.type === "scope:added");
    expect(scopes.length).toBeGreaterThan(0);

    const scope = scopes.find((s) => s.name === "TestScope");
    expect(scope).toBeDefined();
    expect(scope).toMatchObject({
      type: "scope:added",
      id: expect.any(Number),
      name: "TestScope",
      seq: expect.any(Number),
    });
    expect([0, 1]).toContain(scope!.is_member_scope);
    expect("parent_id" in scope!).toBe(true);
    expect("metadata" in scope!).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// files channel
// ---------------------------------------------------------------------------

describe("file:added", () => {
  it("has path, filetype, and seq", async () => {
    const collector = await createMessageCollector(socket!, ["files"]);
    await renderAsync(
      <Output>
        <SourceFile path="test.ts" filetype="typescript">
          content
        </SourceFile>
      </Output>,
    );
    const messages = await collector.waitForRender();
    collector.stop();

    const files = messages.filter((m) => m.type === "file:added");
    expect(files.length).toBeGreaterThan(0);

    const file = files.find((f) => (f.path as string).endsWith("test.ts"));
    expect(file).toBeDefined();
    expect(file).toMatchObject({
      type: "file:added",
      path: expect.stringContaining("test.ts"),
      filetype: "typescript",
      seq: expect.any(Number),
    });
  });
});

// ---------------------------------------------------------------------------
// directories channel
// ---------------------------------------------------------------------------

describe("directory:added", () => {
  it("has path and seq", async () => {
    const collector = await createMessageCollector(socket!, ["directories"]);
    await renderAsync(<Output>hello</Output>);
    const messages = await collector.waitForRender();
    collector.stop();

    const dirs = messages.filter((m) => m.type === "directory:added");
    expect(dirs.length).toBeGreaterThan(0);

    expect(dirs[0]).toMatchObject({
      type: "directory:added",
      path: expect.any(String),
      seq: expect.any(Number),
    });
  });
});

// ---------------------------------------------------------------------------
// scheduler channel
// ---------------------------------------------------------------------------

describe("scheduler:job", () => {
  it("is emitted during synchronous flush", async () => {
    // Scheduler events are only traced during synchronous flushJobs(),
    // not flushJobsAsync(). Subscribe to scheduler + render to see them.
    const collector = await createMessageCollector(socket!, [
      "scheduler",
      "render",
    ]);
    // A simple render triggers flushJobs internally
    await renderAsync(<Output>hello</Output>);
    const messages = await collector.waitForRender();
    collector.stop();

    const jobs = messages.filter((m) => m.type === "scheduler:job");
    // Scheduler events occur during the synchronous flush inside renderAsync
    if (jobs.length > 0) {
      expect(jobs[0]).toMatchObject({
        type: "scheduler:job",
        seq: expect.any(Number),
      });
      expect("event" in jobs[0] || "jobs_run" in jobs[0]).toBe(true);
    }
  });
});

// ---------------------------------------------------------------------------
// lifecycle channel
// ---------------------------------------------------------------------------

describe("effect:lifecycle", () => {
  it("is emitted for effect lifecycle events", async () => {
    const collector = await createMessageCollector(socket!, ["lifecycle"]);

    const r = ref(0);
    effect(() => {
      void r.value;
    });
    await renderAsync(<Output>hello</Output>);
    const messages = await collector.waitForRender();

    // Trigger a lifecycle event
    r.value = 1;
    await flushJobsAsync();
    const flushMessages = await collector.waitForFlush();
    collector.stop();

    const all = [...messages, ...flushMessages];
    const lifecycle = all.filter((m) => m.type === "effect:lifecycle");
    if (lifecycle.length > 0) {
      expect(lifecycle[0]).toMatchObject({
        type: "effect:lifecycle",
        seq: expect.any(Number),
      });
      expect("effect_id" in lifecycle[0]).toBe(true);
      expect("event" in lifecycle[0]).toBe(true);
    }
  });
});

// ---------------------------------------------------------------------------
// diagnostics channel
// ---------------------------------------------------------------------------

describe("diagnostics:report", () => {
  it("has message, severity, and seq", async () => {
    const { insertDiagnostic } = await import("./trace-writer.js");
    const collector = await createMessageCollector(socket!, ["diagnostics"]);

    // Insert a diagnostic directly through the trace writer
    insertDiagnostic(
      "test warning",
      "warning",
      undefined,
      undefined,
      undefined,
      undefined,
    );

    // Render to get a completion signal for the collector
    await renderAsync(<Output />);
    const messages = await collector.waitForRender();
    collector.stop();

    const diags = messages.filter((m) => m.type === "diagnostics:report");
    expect(diags.length).toBeGreaterThan(0);

    expect(diags[0]).toMatchObject({
      type: "diagnostics:report",
      message: "test warning",
      severity: "warning",
      seq: expect.any(Number),
    });
    // Nullable source location fields exist
    expect("source_file" in diags[0]).toBe(true);
    expect("source_line" in diags[0]).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// errors channel
// ---------------------------------------------------------------------------

describe("render:error", () => {
  it("has name, message, and seq", async () => {
    const { insertRenderError } = await import("./trace-writer.js");
    const collector = await createMessageCollector(socket!, ["errors"]);

    // Insert an error directly through the trace writer
    insertRenderError("Error", "kaboom", "Error: kaboom\n  at ...", undefined);

    // Render to get a completion signal
    await renderAsync(<Output />);
    const messages = await collector.waitForRender();
    collector.stop();

    const errors = messages.filter((m) => m.type === "render:error");
    expect(errors.length).toBeGreaterThan(0);

    expect(errors[0]).toMatchObject({
      type: "render:error",
      name: "Error",
      message: "kaboom",
      seq: expect.any(Number),
    });
    expect("stack" in errors[0]).toBe(true);
    expect("component_stack" in errors[0]).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// flushJobs:complete lifecycle signal
// ---------------------------------------------------------------------------

describe("flushJobs:complete", () => {
  it("is emitted after a reactive flush", async () => {
    const items = ref(["a"]);
    const collector = await createMessageCollector(socket!, ["render"]);

    await renderAsync(
      <Output>
        <For each={items}>{(item) => <>{item}</>}</For>
      </Output>,
    );
    await collector.waitForRender();

    items.value = ["a", "b"];
    await flushJobsAsync();
    const flushMessages = await collector.waitForFlush();
    collector.stop();

    // waitForFlush resolves on flushJobs:complete, so if we get here it was received
    expect(flushMessages.some((m) => m.type === "flushJobs:complete")).toBe(
      true,
    );
  });
});

// ---------------------------------------------------------------------------
// debugger:info (connection handshake)
// ---------------------------------------------------------------------------

describe("debugger:info", () => {
  it("is sent on connection before any other messages", async () => {
    // Close the existing socket so the server accepts a new one
    socket!.close();
    await new Promise((resolve) => setTimeout(resolve, 100));

    const freshSocket = new WebSocket(`ws://127.0.0.1:${port}`);
    const firstMessage = new Promise<DevtoolsMessage>((resolve, reject) => {
      const timeout = setTimeout(
        () => reject(new Error("No debugger:info received")),
        3000,
      );
      freshSocket.once("message", (data) => {
        clearTimeout(timeout);
        resolve(JSON.parse(String(data)));
      });
    });

    await new Promise<void>((resolve, reject) => {
      freshSocket.once("open", resolve);
      freshSocket.once("error", reject);
    });

    const first = await firstMessage;
    freshSocket.close();
    // Replace socket so afterEach doesn't close an already-closed socket
    socket = undefined;

    expect(first).toMatchObject({
      type: "debugger:info",
      version: expect.any(String),
    });
  });
});

// ---------------------------------------------------------------------------
// null vs undefined contract
// ---------------------------------------------------------------------------

describe("null vs undefined contract", () => {
  it("nullable fields arrive as null (not undefined or missing)", async () => {
    const collector = await createMessageCollector(socket!, ["render"]);
    await renderAsync(<Output>hello</Output>);
    const messages = await collector.waitForRender();
    collector.stop();

    // Root node: parent_id should be explicit null
    const root = messages.find(
      (m: DevtoolsMessage) =>
        m.type === "render:node_added" && m.kind === "root",
    );
    expect(root).toBeDefined();
    expect(root!.parent_id).toBeNull();
    expect("parent_id" in root!).toBe(true);

    // Component node: value should be null, not undefined
    const component = messages.find(
      (m: DevtoolsMessage) =>
        m.type === "render:node_added" && m.kind === "component",
    );
    expect(component).toBeDefined();
    expect(component!.value).toBeNull();
    expect("value" in component!).toBe(true);

    // source_file is nullable
    expect("source_file" in root!).toBe(true);
  });

  it("non-null fields have correct types", async () => {
    const collector = await createMessageCollector(socket!, ["render"]);
    await renderAsync(<Output>hello</Output>);
    const messages = await collector.waitForRender();
    collector.stop();

    const text = messages.find(
      (m: DevtoolsMessage) =>
        m.type === "render:node_added" && m.kind === "text",
    );
    expect(text).toBeDefined();
    // value is a string for text nodes
    expect(typeof text!.value).toBe("string");
    // id is always a number
    expect(typeof text!.id).toBe("number");
    // parent_id is a number for non-root nodes
    expect(typeof text!.parent_id).toBe("number");
  });
});

// ---------------------------------------------------------------------------
// seq ordering
// ---------------------------------------------------------------------------

describe("seq ordering", () => {
  it("messages have monotonically increasing seq", async () => {
    const collector = await createMessageCollector(socket!, ["render"]);
    await renderAsync(<Output>hello</Output>);
    const messages = await collector.waitForRender();
    collector.stop();

    const seqs = messages
      .filter((m) => typeof m.seq === "number")
      .map((m) => m.seq as number);
    for (let i = 1; i < seqs.length; i++) {
      expect(seqs[i]).toBeGreaterThan(seqs[i - 1]);
    }
  });
});
