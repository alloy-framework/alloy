import { buildRenderTreeView } from "@/lib/debug-tree";
import type { ServerToClientMessage } from "@alloy-js/core/devtools";
import { describe, expect, it } from "vitest";
import {
  createDebugStore,
  processMessage,
  type PendingState,
} from "./debug-state";

function apply(messages: ServerToClientMessage[]) {
  const store = createDebugStore();
  const pending: PendingState = {};
  for (const message of messages) {
    processMessage(store, pending, message);
  }
  return buildRenderTreeView(store.treeState);
}

describe("debug-state component render tree projection", () => {
  it("routes component messages so wrapper nodes display component names", () => {
    const view = apply([
      { type: "render:reset" },
      {
        type: "render:node_added",
        id: 1,
        parent_id: null,
        kind: "root",
        seq: 1,
      },
      {
        type: "render:node_added",
        id: 2,
        parent_id: 1,
        kind: "directory",
        name: "alloy:directory",
        seq: 2,
      },
      {
        type: "component:added",
        id: 10,
        parent_id: null,
        name: "SourceDirectory",
        seq: 3,
      },
      {
        type: "component:root_added",
        component_id: 10,
        render_node_id: 2,
        ordinal: 0,
        seq: 4,
      },
    ]);

    expect(view[0]).toMatchObject({
      id: "2",
      name: "SourceDirectory",
      componentId: "10",
      renderNodeId: "2",
    });
  });

  it("decorates custom component roots below source files", () => {
    const view = apply([
      { type: "render:reset" },
      {
        type: "render:node_added",
        id: 1,
        parent_id: null,
        kind: "root",
        seq: 1,
      },
      {
        type: "render:node_added",
        id: 2,
        parent_id: 1,
        kind: "source-file",
        name: "alloy:source-file",
        seq: 2,
      },
      {
        type: "render:node_added",
        id: 3,
        parent_id: 2,
        kind: "intrinsic",
        name: "group",
        seq: 3,
      },
      {
        type: "component:added",
        id: 10,
        parent_id: null,
        name: "SourceFile",
        seq: 4,
      },
      {
        type: "component:root_added",
        component_id: 10,
        render_node_id: 2,
        ordinal: 0,
        seq: 5,
      },
      {
        type: "component:added",
        id: 11,
        parent_id: 10,
        name: "ModelDeclaration",
        seq: 6,
      },
      {
        type: "component:root_added",
        component_id: 11,
        render_node_id: 3,
        ordinal: 0,
        seq: 7,
      },
    ]);

    expect(view[0]).toMatchObject({
      name: "SourceFile",
      children: [
        expect.objectContaining({
          id: "3",
          name: "ModelDeclaration",
          componentId: "11",
        }),
      ],
    });
  });

  it("shows nested overlapping multi-root components", () => {
    const view = apply([
      { type: "render:reset" },
      {
        type: "render:node_added",
        id: 1,
        parent_id: null,
        kind: "root",
        seq: 1,
      },
      {
        type: "render:node_added",
        id: 2,
        parent_id: 1,
        kind: "source-file",
        name: "alloy:source-file",
        seq: 2,
      },
      {
        type: "render:node_added",
        id: 3,
        parent_id: 2,
        kind: "text",
        value: "interface ",
        seq: 3,
      },
      {
        type: "render:node_added",
        id: 4,
        parent_id: 2,
        kind: "intrinsic",
        name: "group",
        seq: 4,
      },
      {
        type: "component:added",
        id: 10,
        parent_id: null,
        name: "SourceFile",
        seq: 5,
      },
      {
        type: "component:root_added",
        component_id: 10,
        render_node_id: 2,
        ordinal: 0,
        seq: 6,
      },
      {
        type: "component:added",
        id: 11,
        parent_id: 10,
        name: "For",
        seq: 7,
      },
      {
        type: "component:root_added",
        component_id: 11,
        render_node_id: 3,
        ordinal: 0,
        seq: 8,
      },
      {
        type: "component:root_added",
        component_id: 11,
        render_node_id: 4,
        ordinal: 1,
        seq: 9,
      },
      {
        type: "component:added",
        id: 12,
        parent_id: 11,
        name: "Model",
        seq: 10,
      },
      {
        type: "component:root_added",
        component_id: 12,
        render_node_id: 3,
        ordinal: 0,
        seq: 11,
      },
      {
        type: "component:root_added",
        component_id: 12,
        render_node_id: 4,
        ordinal: 1,
        seq: 12,
      },
    ]);

    expect(view[0]).toMatchObject({
      name: "SourceFile",
      children: [
        expect.objectContaining({
          id: "component:11",
          name: "For",
          children: [
            expect.objectContaining({
              id: "component:12",
              name: "Model",
              children: [
                expect.objectContaining({ id: "3" }),
                expect.objectContaining({ id: "4" }),
              ],
            }),
          ],
        }),
      ],
    });
  });

  it("lifts only-child context nodes next to their parent component", () => {
    const view = apply([
      { type: "render:reset" },
      {
        type: "render:node_added",
        id: 1,
        parent_id: null,
        kind: "root",
        seq: 1,
      },
      {
        type: "render:node_added",
        id: 2,
        parent_id: 1,
        kind: "source-file",
        name: "alloy:source-file",
        seq: 2,
      },
      {
        type: "render:node_added",
        id: 3,
        parent_id: 2,
        kind: "customContext",
        name: "CustomContext",
        seq: 3,
      },
      {
        type: "render:node_added",
        id: 4,
        parent_id: 3,
        kind: "text",
        value: "content",
        seq: 4,
      },
      {
        type: "component:added",
        id: 10,
        parent_id: null,
        name: "SourceFile",
        seq: 5,
      },
      {
        type: "component:root_added",
        component_id: 10,
        render_node_id: 2,
        ordinal: 0,
        seq: 6,
      },
      {
        type: "component:added",
        id: 11,
        parent_id: 10,
        name: "Context SourceFile",
        seq: 7,
      },
      {
        type: "component:root_added",
        component_id: 11,
        render_node_id: 3,
        ordinal: 0,
        seq: 8,
      },
    ]);

    expect(view).toMatchObject([
      {
        id: "2",
        name: "SourceFile",
      },
      {
        id: "3",
        name: "Context SourceFile",
        componentId: "11",
        liftedFrom: "2",
        children: [expect.objectContaining({ id: "4" })],
      },
    ]);
    expect(view[0]).not.toHaveProperty("children");
  });
});
