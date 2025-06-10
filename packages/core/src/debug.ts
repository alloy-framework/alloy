import { isReactive, isRef } from "@vue/reactivity";
import Table from "cli-table3";
import { sep } from "pathe";
import pc from "picocolors";
import { WebSocket, WebSocketServer } from "ws";
import { contextsByKey } from "./context.js";
import { SourceFileContext } from "./context/source-file.js";
import { Context, getContext, syncEffect } from "./reactivity.js";
import {
  getContextForRenderNode,
  getRenderNodeForContext,
  PrintHook,
  printTree,
  RenderedTextTree,
} from "./render.js";
import { ComponentCreator, isComponentCreator } from "./runtime/component.js";
import type {
  OutputScope,
  SerializedOutputScope,
} from "./symbols/output-scope.js";
import type {
  OutputSymbol,
  SerializedOutputSymbol,
} from "./symbols/output-symbol.js";

// WebSocket event types
export interface WebSocketSymbolAdded {
  type: "symbol_added";
  data: SerializedOutputSymbol;
}

export interface WebSocketSymbolUpdated {
  type: "symbol_updated";
  data: SerializedOutputSymbol;
}

export interface WebSocketScopeAdded {
  type: "scope_added";
  data: SerializedOutputScope;
}

export interface WebSocketScopeUpdated {
  type: "scope_updated";
  data: SerializedOutputScope;
}

export interface SerializedFileInfo {
  id: number;
  path: string[];
  name: string;
  contents: string;
  nodeId: number;
}

export interface WebSocketFileAdded {
  type: "file_added";
  data: SerializedFileInfo;
}

export interface WebSocketFileUpdated {
  type: "file_updated";
  data: SerializedFileInfo;
}

export interface SerializedNodeBase {
  id: number;
  kind: string;
  parentId: number | null;
  children: SerializedNodeContent[];
  deleted?: boolean; // Mark nodes as deleted but keep them in the tree
}

export type SerializedNodeContent =
  | string // text content
  | number; // a node reference;

export interface SerializedFragmentNode extends SerializedNodeBase {
  kind: "fragment";
}

export interface SerializedIntrinsicElementNode extends SerializedNodeBase {
  kind: "intrinsic";
  tag: string;
  props: Record<string, any>;
}

interface SerializedContext {
  name: string;
  value: unknown;
}

export interface SerializedComponentNode extends SerializedNodeBase {
  kind: "component";
  component: string;
  props: Record<string, any>;
  context: SerializedContext | null;
}

export type SerializedNode =
  | SerializedFragmentNode
  | SerializedIntrinsicElementNode
  | SerializedComponentNode;

export type WebSocketNodeAdded = {
  type: "node_added";
  data: SerializedNode;
};

export type WebSocketNodeUpdated = {
  type: "node_updated";
  data: SerializedNode;
};

export type WebSocketNodeDeleted = {
  type: "node_deleted";
  data: {
    nodeId: number;
  };
};

export interface ErrorInfo {
  message: string;
  stack: string;
  nodeId: number | null;
}

export interface WebSocketErrorAdded {
  type: "error_added";
  data: ErrorInfo;
}

export type WebSocketMessage =
  | WebSocketScopeAdded
  | WebSocketScopeUpdated
  | WebSocketSymbolAdded
  | WebSocketSymbolUpdated
  | WebSocketFileAdded
  | WebSocketFileUpdated
  | WebSocketNodeAdded
  | WebSocketNodeUpdated
  | WebSocketNodeDeleted
  | WebSocketErrorAdded;

// WebSocket server and debug interface
let wss: WebSocketServer | null = null;

interface DebugInterface {
  component: {
    stack(): void;
    tree(): void;
    watch(): void;
    render(): void;
    context(): void;
  };
  // Debug interface for sending symbols and scopes
  sendSymbol(
    symbol: OutputSymbol,
    type: "symbol_added" | "symbol_updated",
  ): void;
  sendScope(scope: OutputScope, type: "scope_added" | "scope_updated"): void;
  sendFile(file: SerializedFileInfo, type: "file_added" | "file_updated"): void;
  sendComponentNode(
    node: RenderedTextTree,
    parent: RenderedTextTree | null,
    component: ComponentCreator<any>,
  ): void;
  sendFragmentNode(
    node: RenderedTextTree,
    parent: RenderedTextTree | PrintHook | null,
  ): void;
  sendIntrinsicElementNode(
    printHook: PrintHook,
    parent: RenderedTextTree | PrintHook | null,
    tag: string,
    props: Record<string, any>,
  ): void;
  deleteNode(node: RenderedTextTree | PrintHook): void;
  sendError(error: Error, context: Context | null): void;
}

// Track symbols and scopes that we've already set up watchers for
const watchedSymbols = new WeakSet<OutputSymbol>();
const watchedScopes = new WeakSet<OutputScope>();

const debug: DebugInterface = {
  component: {
    stack: debugStack,
    tree() {
      // eslint-disable-next-line no-console
      console.log("tree");
    },
    watch() {
      // eslint-disable-next-line no-console
      console.log("watch");
    },
    render() {
      // eslint-disable-next-line no-console
      console.log("render");
    },
    context: debugContext,
  },
  sendSymbol(symbol, type) {
    if (!wss) return;

    const message: WebSocketMessage = {
      type,
      data: symbol.toJSON(),
    };

    wss.clients.forEach((client: WebSocket) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
      }
    });

    // Set up reactive effect to watch for symbol changes (only for new symbols)
    if (type === "symbol_added" && !watchedSymbols.has(symbol)) {
      watchedSymbols.add(symbol);

      let isFirstRun = true;

      // Watch for changes to symbol properties that would trigger an update
      syncEffect(() => {
        // Track all reactive properties that should trigger updates
        symbol.toJSON();

        // Send update message on subsequent runs (skip first run which is the initial setup)
        if (!isFirstRun) {
          debug.sendSymbol(symbol, "symbol_updated");
        }
        isFirstRun = false;
      });
    }
  },
  sendScope(scope, type) {
    if (!wss) return;

    const message: WebSocketMessage = {
      type,
      data: scope.toJSON(),
    };

    wss.clients.forEach((client: WebSocket) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
      }
    });

    // Set up reactive effect to watch for scope changes (only for new scopes)
    if (type === "scope_added" && !watchedScopes.has(scope)) {
      watchedScopes.add(scope);

      let isFirstRun = true;

      // Watch for changes to scope properties that would trigger an update
      syncEffect(() => {
        // Track all reactive properties that should trigger updates
        scope.toJSON();

        // Send update message on subsequent runs (skip first run which is the initial setup)
        if (!isFirstRun) {
          debug.sendScope(scope, "scope_updated");
        }
        isFirstRun = false;
      });
    }
  },
  sendFile(file, type) {
    if (!wss) return;

    const message: WebSocketMessage = {
      type,
      data: file,
    };

    wss.clients.forEach((client: WebSocket) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
      }
    });
  },
  sendComponentNode(node, parent, creator) {
    if (!wss) return;

    const serializedNode: SerializedComponentNode = {
      kind: "component",
      id: nodeId(node),
      parentId: parent ? nodeId(parent) : null,
      component: creator.component.name,
      props: creator.props,
      children: serializeChildren(node),
      context: null,
    };

    const context = getContextForRenderNode(node);
    if (context && context.context) {
      const key = Object.getOwnPropertySymbols(context.context)[0];
      if (key) {
        const contextDefinition = contextsByKey.get(key);
        const contextName = contextDefinition?.name ?? "unknown context";
        const value = context.context[key];

        serializedNode.context = {
          name: contextName,
          value,
        };
      }
    }

    const message: WebSocketNodeAdded = {
      type: "node_added",
      data: serializedNode,
    };

    syncEffect(() => {
      for (const [name, value] of Object.entries(creator.props)) {
        if (name === "children") continue;

        if (isRef(value)) {
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          value.value; // track ref
        } else if (
          typeof value === "function" &&
          !isComponentCreator(value) &&
          value.length === 0
        ) {
          value();
        }
      }
      wss!.clients.forEach((client: WebSocket) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(
            JSON.stringify(message, (key, value) => {
              if (isRef(value)) {
                return value.value; // serialize ref value
              }
              return value; // return other values as is
            }),
          );
        }
      });

      updateFile(node);
    });
  },

  sendFragmentNode(node, parent) {
    if (!wss) return;

    const serializedNode: SerializedFragmentNode = {
      kind: "fragment",
      id: nodeId(node),
      parentId: parent ? nodeId(parent) : null,
      children: serializeChildren(node),
    };

    const message: WebSocketNodeAdded = {
      type: "node_added",
      data: serializedNode,
    };

    wss.clients.forEach((client: WebSocket) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
      }
    });

    updateFile(node);
  },

  sendIntrinsicElementNode(printHook, parent, tag, props) {
    if (!wss) return;

    const serializedNode: SerializedIntrinsicElementNode = {
      kind: "intrinsic",
      id: nodeId(printHook),
      parentId: parent ? nodeId(parent) : null,
      tag,
      props,
      children: serializeChildren(printHook.subtree),
    };

    const message: WebSocketNodeAdded = {
      type: "node_added",
      data: serializedNode,
    };

    wss.clients.forEach((client: WebSocket) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
      }
    });

    updateFile(printHook.subtree);
  },
  deleteNode(node) {
    if (!wss) return;

    const message: WebSocketNodeDeleted = {
      type: "node_deleted",
      data: {
        nodeId: nodeId(node),
      },
    };

    wss.clients.forEach((client: WebSocket) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
      }
    });
  },
  sendError(error, context) {
    if (!wss) return;

    let errorNode = null;

    if (context) {
      // walk up to find the nearest render node since we might be in
      // a memo or other kind of effect.
      let currentContext: Context | null = context;
      while (currentContext) {
        const renderNode = getRenderNodeForContext(currentContext);
        if (renderNode) {
          errorNode = renderNode;
          break;
        }
        currentContext = currentContext.owner;
      }
    }

    const errorInfo: ErrorInfo = {
      message: error.message,
      stack: error.stack || "",
      nodeId: errorNode ? nodeId(errorNode) : null,
    };

    const message: WebSocketErrorAdded = {
      type: "error_added",
      data: errorInfo,
    };

    wss.clients.forEach((client: WebSocket) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
      }
    });
  },
};

function updateFile(node: RenderedTextTree) {
  let context = getContextForRenderNode(node) ?? null;
  let file;
  while (context) {
    if (context.meta?.sourceFile) {
      file = context.meta.sourceFile as SourceFileContext;
      break;
    }
    context = context.owner;
  }

  if (!file) {
    return;
  }

  const pathParts = file.path.split(sep);
  const rootNode = getRenderNodeForContext(context!)!;
  const rootComponentId = nodeId(rootNode);

  const serializedFile: SerializedFileInfo = {
    id: fileId(file),
    path: pathParts.slice(0, -1),
    name: pathParts.at(-1)!,
    nodeId: rootComponentId,
    contents: printTree(rootNode as RenderedTextTree, {
      printWidth: context!.meta!.printOptions?.printWidth ?? 80,
      tabWidth: context!.meta!.printOptions?.tabWidth ?? 2,
      useTabs: context!.meta!.printOptions?.useTabs ?? false,
    }),
  };

  debug.sendFile(serializedFile, "file_added");

  return;
}

function serializeChildren(node: RenderedTextTree): SerializedNodeContent[] {
  return node.map((child) => {
    if (typeof child === "string") {
      return child;
    } else {
      return nodeId(child);
    }
  });
}

const seenNodes = new WeakMap<RenderedTextTree | PrintHook, number>();
let nodeCount = 0;
function nodeId(node: RenderedTextTree | PrintHook) {
  let id = seenNodes.get(node);
  if (id === undefined) {
    id = nodeCount++;
    seenNodes.set(node, id);
  }
  return id;
}

const seenFiles = new WeakMap<SourceFileContext, number>();
let fileCount = 0;
function fileId(context: SourceFileContext) {
  let id = seenFiles.get(context);
  if (!id) {
    id = fileCount++;
    seenFiles.set(context, id);
  }
  return id;
}

function debugStack() {
  let currentContext = getContext();
  let foundContexts: Context[] = [];
  while (currentContext !== null) {
    if (
      currentContext.context &&
      Object.getOwnPropertySymbols(currentContext.context)[0]
    ) {
      foundContexts.push(currentContext);
    }

    if (
      currentContext.componentOwner &&
      currentContext.componentOwner.component.name !== "Provider"
    ) {
      process.stdout.write(
        style.component.name(currentContext.componentOwner.component.name) +
          "\n",
      );
      const table = kvTable();
      const props = currentContext.componentOwner.props;

      table.push([
        { hAlign: "right", content: "props" },
        props && Object.keys(props).length > 0 ?
          dumpValue(props)
        : pc.gray("(none)"),
      ]);

      table.push([
        { hAlign: "right", content: "contexts" },
        foundContexts.length > 0 ?
          foundContexts.map((c) => printContext(c, true)).join("\n")
        : pc.gray("(none)"),
      ]);

      process.stdout.write(table.toString() + "\n\n");
      foundContexts = [];
    }

    currentContext = currentContext.owner;
  }
}

function debugContext() {
  let currentContext = getContext();
  while (currentContext !== null) {
    // eslint-disable-next-line no-console
    console.log(printContext(currentContext));
    currentContext = currentContext.owner;
  }
}

function printContext(context: Context, omitOwner: boolean = false) {
  if (!context.context) return "";
  const key = Object.getOwnPropertySymbols(context.context)[0];
  if (!key) return "";
  const contextDefinition = contextsByKey.get(key);
  const contextName = contextDefinition?.name ?? "unknown context";
  const value = context.context[key];

  let output = style.context.name(contextName);
  if (!omitOwner) {
    const owner = findContextOwner(context);
    output += " provided by " + style.component.name(owner);
  }

  output += "\n" + dumpValue(value) + "\n";

  return output;
}

function findContextOwner(context: Context) {
  let currentContext: Context | null = context;
  while (
    currentContext &&
    (currentContext.componentOwner === undefined ||
      currentContext.componentOwner.component.name === "Provider")
  ) {
    currentContext = currentContext.owner;
  }

  return currentContext?.componentOwner?.component.name ?? "unknown";
}
declare global {
  // eslint-disable-next-line no-var
  var debug: DebugInterface;
}

globalThis.debug = debug;

// Initialize WebSocket server when debugging is enabled
if (shouldDebug()) {
  wss = new WebSocketServer({ port: 8080 });

  // Use top-level await to ensure the server is started before module evaluation completes
  await new Promise<void>((resolve, reject) => {
    wss!.on("listening", () => {
      // eslint-disable-next-line no-console
      console.log("Debug WebSocket server listening on port 8080");
      // eslint-disable-next-line no-console
      console.log("Waiting for debug client to connect...");
      resolve();
    });

    wss!.on("error", (error) => {
      // eslint-disable-next-line no-console
      console.error("Debug WebSocket server error:", error);
      reject(error);
    });
  });

  // Wait for a client to connect
  await new Promise<void>((resolve) => {
    wss!.on("connection", (ws) => {
      // eslint-disable-next-line no-console
      console.log("Debug client connected");
      resolve();
    });
  });
}

const style = {
  value: {
    primitive(value: string | number | boolean | null | undefined) {
      switch (typeof value) {
        case "string":
          return pc.blue(`"${value}"`);
        case "object":
        case "undefined":
          return pc.gray(String(value));
        default:
          return pc.blue(String(value));
      }
    },
    symbol(value: symbol) {
      return pc.gray(String(value));
    },
  },
  context: {
    name(name: string) {
      return pc.bgBlack(` ${pc.white(name)} `);
    },
  },
  component: {
    name(name: string) {
      return pc.bgBlue(` <${pc.white(name)}> `);
    },
  },
};

function reactiveTag(value: unknown) {
  if (isReactive(value)) {
    return " " + pc.greenBright(`reactive`) + " ";
  }
  return "";
}

function dumpValue(value: unknown, level = 0) {
  switch (typeof value) {
    case "boolean":
    case "string":
    case "number":
      return style.value.primitive(value) + reactiveTag(value);
    case "symbol":
      return style.value.symbol(value) + reactiveTag(value);
    case "object":
      if (value === null) {
        return style.value.primitive(null) + reactiveTag(value);
      } else {
        if (level > 0) return pc.gray(`{ ... }` + reactiveTag(value));

        const table = kvTable(" ");

        for (const [key, propValue] of Object.entries(value)) {
          table.push([{ content: key }, dumpValue(propValue, level + 1)]);
        }

        return table.toString();
      }
    case "function":
      return pc.gray("ƒ ()");
    case "undefined":
      return style.value.primitive(undefined);
  }
}

function kvTable(sep = "  ") {
  return new Table({
    chars: {
      top: "",
      "top-mid": "",
      "top-left": "",
      "top-right": "",
      bottom: "",
      "bottom-mid": "",
      "bottom-left": "",
      "bottom-right": "",
      left: "",
      "left-mid": "",
      mid: "",
      "mid-mid": "",
      right: "",
      "right-mid": "",
      middle: sep,
    },
    style: { "padding-left": 0, "padding-right": 0 },
  });
}

export function shouldDebug() {
  return typeof process !== "undefined" && !!process.env?.ALLOY_DEBUG;
}
