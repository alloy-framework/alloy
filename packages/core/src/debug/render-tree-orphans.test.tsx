import { afterEach, beforeEach, describe, expect, it } from "vitest";
import WebSocket from "ws";
import {
  createMessageCollector,
  filterRenderTreeMessages,
  type DevtoolsMessage,
} from "../../testing/devtools-utils.js";
import { For } from "../components/For.jsx";
import { Output } from "../components/Output.jsx";
import { Show } from "../components/Show.jsx";
import {
  enableDevtools,
  resetDevtoolsServerForTests,
} from "../devtools/devtools-server.js";
import { ref } from "../reactivity.js";
import { renderAsync } from "../render.js";
import { flushJobsAsync } from "../scheduler.js";

/**
 * Build a snapshot of active render tree nodes from a stream of messages.
 * Returns a Map of nodeId → { parentId, kind, name, value }.
 */
function buildRenderTreeSnapshot(messages: DevtoolsMessage[]) {
  const active = new Map<
    number,
    { parentId: number | null; kind: string; name?: string; value?: string }
  >();

  for (const msg of messages) {
    if (msg.type === "render:node_added") {
      active.set(msg.id as number, {
        parentId: msg.parent_id as number | null,
        kind: msg.kind as string,
        name: msg.name as string | undefined,
        value: msg.value as string | undefined,
      });
    } else if (msg.type === "render:node_removed") {
      active.delete(msg.id as number);
    } else if (msg.type === "render:reset") {
      active.clear();
    }
  }

  return active;
}

/**
 * Find orphaned nodes: nodes whose parentId references a node not in the active set.
 */
function findOrphans(
  active: Map<
    number,
    { parentId: number | null; kind: string; name?: string; value?: string }
  >,
) {
  const orphans: Array<{
    id: number;
    parentId: number;
    kind: string;
    name?: string;
    value?: string;
  }> = [];

  for (const [id, node] of active) {
    if (node.parentId !== null && !active.has(node.parentId)) {
      orphans.push({ id, ...node, parentId: node.parentId! });
    }
  }

  return orphans;
}

describe("render tree node orphans", () => {
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
  });

  it("no orphans after removing items from For component", async () => {
    const items = ref(["a", "b", "c", "d"]);
    const collector = await createMessageCollector(socket!);

    function ItemView(props: { item: string }) {
      return (
        <>
          <>{props.item}</>
          <> - suffix</>
        </>
      );
    }

    await renderAsync(
      <Output>
        <For each={items}>{(item) => <ItemView item={item} />}</For>
      </Output>,
    );

    const renderMessages = await collector.waitForRender();
    const allMessages = [...filterRenderTreeMessages(renderMessages)];

    items.value = ["a", "d"];
    await flushJobsAsync();

    const updateMessages = await collector.waitForFlush();
    allMessages.push(...filterRenderTreeMessages(updateMessages));

    const active = buildRenderTreeSnapshot(allMessages);
    const orphans = findOrphans(active);

    expect(orphans).toEqual([]);
    collector.stop();
  });

  it("no orphans after toggling Show component with nested content", async () => {
    const visible = ref(true);
    const collector = await createMessageCollector(socket!);

    function Inner() {
      return (
        <>
          <>nested fragment</>
          <>more content</>
        </>
      );
    }

    await renderAsync(
      <Output>
        <Show when={visible.value}>
          <Inner />
        </Show>
      </Output>,
    );

    const renderMessages = await collector.waitForRender();
    const allMessages = [...filterRenderTreeMessages(renderMessages)];

    visible.value = false;
    await flushJobsAsync();
    const offMessages = await collector.waitForFlush();
    allMessages.push(...filterRenderTreeMessages(offMessages));

    visible.value = true;
    await flushJobsAsync();
    const onMessages = await collector.waitForFlush();
    allMessages.push(...filterRenderTreeMessages(onMessages));

    const active = buildRenderTreeSnapshot(allMessages);
    const orphans = findOrphans(active);

    expect(orphans).toEqual([]);
    collector.stop();
  });

  it("no orphans after replacing all items in For component", async () => {
    const items = ref(["x", "y", "z"]);
    const collector = await createMessageCollector(socket!);

    function Nested(props: { label: string }) {
      return (
        <>
          <>{props.label}</>
          <>
            <>deep nesting</>
          </>
        </>
      );
    }

    await renderAsync(
      <Output>
        <For each={items}>{(item) => <Nested label={item} />}</For>
      </Output>,
    );

    const renderMessages = await collector.waitForRender();
    const allMessages = [...filterRenderTreeMessages(renderMessages)];

    items.value = ["1", "2"];
    await flushJobsAsync();
    const replaceMessages = await collector.waitForFlush();
    allMessages.push(...filterRenderTreeMessages(replaceMessages));

    const active = buildRenderTreeSnapshot(allMessages);
    const orphans = findOrphans(active);

    expect(orphans).toEqual([]);
    collector.stop();
  });

  it("no orphans when For re-renders and some items are kept (cached subtree path)", async () => {
    // When `For` re-renders after items change, items that haven't changed
    // reuse the same CustomContext object (via mapJoin's slot cache). The
    // element cache detects these as cached elements and takes the `isCached`
    // path in recordSubtreeAdded. If the idToNode reverse mapping isn't
    // restored for cached nodes, their children won't be cleaned up on the
    // next re-render, creating orphans.
    const items = ref(["a", "b", "c"]);
    const collector = await createMessageCollector(socket!);

    function Item(props: { value: string }) {
      return <>item: {props.value}</>;
    }

    await renderAsync(
      <Output>
        <For each={items}>{(item) => <Item value={item} />}</For>
      </Output>,
    );

    const renderMessages = await collector.waitForRender();
    const allMessages = [...filterRenderTreeMessages(renderMessages)];

    // Change items but keep "a" — its CustomContext stays cached
    items.value = ["a", "x"];
    await flushJobsAsync();
    const update1 = await collector.waitForFlush();
    allMessages.push(...filterRenderTreeMessages(update1));

    // Change again, keeping "a" — cached subtree re-added
    items.value = ["a", "y", "z"];
    await flushJobsAsync();
    const update2 = await collector.waitForFlush();
    allMessages.push(...filterRenderTreeMessages(update2));

    const active = buildRenderTreeSnapshot(allMessages);
    const orphans = findOrphans(active);

    expect(orphans).toEqual([]);

    // No duplicate text nodes under the same parent
    const textByParent = new Map<number, string[]>();
    for (const [_id, node] of active) {
      if (node.kind === "text" && node.value && node.parentId !== null) {
        const list = textByParent.get(node.parentId) ?? [];
        list.push(node.value);
        textByParent.set(node.parentId, list);
      }
    }
    for (const [parentId, values] of textByParent) {
      const dupes = values.filter((v, i) => values.indexOf(v) !== i);
      expect(dupes, `Duplicate text nodes under parent ${parentId}`).toEqual(
        [],
      );
    }

    collector.stop();
  });

  it("no orphans when For with separators re-renders and keeps some items", async () => {
    // mapJoin creates separator/joiner slots between items. These separators
    // contain printHook subtrees that are part of the cached element tree.
    // When items change, the cached subtree is re-added but separator fragments
    // from previous renders must be properly cascade-deleted.
    //
    // This test checks the DB directly for orphaned rows.
    const { DatabaseSync } = await import("node:sqlite");
    const os = await import("node:os");
    const path = await import("node:path");
    const fs = await import("node:fs");
    const { initTrace, closeTrace } = await import("../debug/trace-writer.js");
    const { Block } = await import("../components/Block.jsx");
    const { Indent } = await import("../components/Indent.jsx");

    const tracePath = path.join(
      os.tmpdir(),
      `alloy-orphan-test-${Date.now()}.db`,
    );
    await initTrace(tracePath);

    const items = ref(["a", "b", "c", "d"]);
    const collector = await createMessageCollector(socket!);

    // Nested blocks simulate the deeply nested printHook trees
    // found in real emitters (e.g., flight-instructor)
    function Item(props: { value: string }) {
      return (
        <Block>
          <Indent>
            <>label: {props.value}</>
          </Indent>
        </Block>
      );
    }

    await renderAsync(
      <Output>
        <For each={items} joiner={"\n"}>
          {(item) => <Item value={item} />}
        </For>
      </Output>,
    );

    await collector.waitForRender();

    // Change items, keeping "a" — triggers cached subtree path for "a"
    items.value = ["a", "x", "y"];
    await flushJobsAsync();
    await collector.waitForFlush();

    // Change again
    items.value = ["a", "z"];
    await flushJobsAsync();
    await collector.waitForFlush();

    // Third change to exercise multiple cached re-add cycles
    items.value = ["a", "w", "v", "u"];
    await flushJobsAsync();
    await collector.waitForFlush();

    // Check the DB directly for orphaned nodes
    closeTrace();
    const traceDb = new DatabaseSync(tracePath, { readOnly: true });
    const orphans = traceDb
      .prepare(
        `SELECT n.id, n.parent_id, n.kind, n.name
         FROM render_nodes n
         WHERE n.parent_id IS NOT NULL
           AND NOT EXISTS (SELECT 1 FROM render_nodes p WHERE p.id = n.parent_id)`,
      )
      .all();

    traceDb.close();
    fs.unlinkSync(tracePath);

    expect(orphans).toEqual([]);

    collector.stop();
  });
});
