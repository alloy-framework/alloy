import { isReactive, isRef, triggerRef } from "@vue/reactivity";
import Table from "cli-table3";
import { readFile } from "fs/promises";
import http from "http";
import { dirname, extname, join as pathJoin } from "path";
import { sep } from "pathe";
import pc from "picocolors";
import { fileURLToPath } from "url";
import { WebSocket, WebSocketServer } from "ws";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Serve static files from the package's dist root (two levels up from dist/src)
const uiDir = pathJoin(__dirname, "..");

const mimeTypes: Record<string, string> = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

import { contextsByKey } from "./context.js";
import { SourceFileContext } from "./context/source-file.js";
import { Context, getContext, syncEffect, untrack } from "./reactivity.js";
import {
  getContextForRenderNode,
  getRenderNodeForContext,
  PrintHook,
  printTree,
  RenderedTextTree,
} from "./render.js";
import { ComponentCreator, isComponentCreator } from "./runtime/component.js";
import { flushJobs } from "./scheduler.js";
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
  data: {
    symbol: SerializedOutputSymbol;
    nodeId: number | null;
  };
}

export interface WebSocketSymbolUpdated {
  type: "symbol_updated";
  data: {
    symbol: SerializedOutputSymbol;
    nodeId: number | null;
  };
}

export interface WebSocketSymbolDeleted {
  type: "symbol_deleted";
  data: {
    symbolId: number;
  };
}

export interface WebSocketScopeAdded {
  type: "scope_added";
  data: {
    scope: SerializedOutputScope;
    nodeId: number | null;
  };
}

export interface WebSocketScopeUpdated {
  type: "scope_updated";
  data: {
    scope: SerializedOutputScope;
    nodeId: number | null;
  };
}

export interface WebSocketScopeDeleted {
  type: "scope_deleted";
  data: {
    scopeId: number;
  };
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

export interface WebSocketRerender {
  type: "rerender";
  data: {
    nodeId: number;
  };
}

export type WebSocketMessage =
  | WebSocketScopeAdded
  | WebSocketScopeUpdated
  | WebSocketScopeDeleted
  | WebSocketSymbolAdded
  | WebSocketSymbolUpdated
  | WebSocketSymbolDeleted
  | WebSocketFileAdded
  | WebSocketFileUpdated
  | WebSocketNodeAdded
  | WebSocketNodeUpdated
  | WebSocketNodeDeleted
  | WebSocketErrorAdded
  | WebSocketRerender;

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
  sendDeletedSymbol(symbol: OutputSymbol): void;
  sendDeletedScope(scope: OutputScope): void;
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
  rerenderComponent(nodeId: number): void;
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

    const context = findRenderNodeForContext(getContext());

    const message: WebSocketSymbolAdded | WebSocketSymbolUpdated = {
      type,
      data: {
        symbol: untrack(() => symbol.toJSON()),
        nodeId: context ? nodeId(context) : null,
      },
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

    const context = findRenderNodeForContext(getContext());

    const message: WebSocketScopeAdded | WebSocketScopeUpdated = {
      type,
      data: {
        scope: untrack(() => scope.toJSON()),
        nodeId: context ? nodeId(context) : null,
      },
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
  sendDeletedSymbol(symbol) {
    if (!wss) return;

    const message: WebSocketSymbolDeleted = {
      type: "symbol_deleted",
      data: {
        symbolId: symbol.id,
      },
    };

    wss.clients.forEach((client: WebSocket) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
      }
    });

    // Remove from watched symbols to clean up memory
    watchedSymbols.delete(symbol);
  },
  sendDeletedScope(scope) {
    if (!wss) return;

    const message: WebSocketScopeDeleted = {
      type: "scope_deleted",
      data: {
        scopeId: scope.id,
      },
    };

    wss.clients.forEach((client: WebSocket) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
      }
    });

    // Remove from watched scopes to clean up memory
    watchedScopes.delete(scope);
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
            untrack(() =>
              JSON.stringify(message, (key, value) => {
                if (isRef(value)) {
                  return value.value; // serialize ref value
                }
                return value; // return other values as is
              }),
            ),
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
        client.send(untrack(() => JSON.stringify(message)));
      }
    });

    updateFile(node);
  },

  sendIntrinsicElementNode(printHook, parent, tag, props) {
    untrack(() => {
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
    });
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

    updateFile(node as RenderedTextTree);
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
  rerenderComponent(nodeId) {
    const node = nodeIds.get(nodeId);
    if (!node) {
      // eslint-disable-next-line no-console
      console.warn(`No node found with ID ${nodeId} for rerender.`);
      return;
    }

    const context = getContextForRenderNode(node as RenderedTextTree);
    if (!context) {
      // eslint-disable-next-line no-console
      console.warn(`No context found for node with ID ${nodeId} for rerender.`);
      return;
    }

    if (!context.rerenderHook) {
      // eslint-disable-next-line no-console
      console.warn(
        `No rerender hook found for node with ID ${nodeId}. Cannot rerender.`,
      );
      return;
    }

    triggerRef(context.rerenderHook);
    flushJobs();
  },
};

const fileContents = new Map<number, SerializedFileInfo>();
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

  const serializedFile: SerializedFileInfo = untrack(() => {
    return {
      id: fileId(file),
      path: pathParts.slice(0, -1),
      name: pathParts.at(-1)!,
      nodeId: rootComponentId,
      contents: printTree(rootNode as RenderedTextTree, {
        printWidth: context!.meta!.printOptions?.printWidth ?? 80,
        tabWidth: context!.meta!.printOptions?.tabWidth ?? 2,
        useTabs: context!.meta!.printOptions?.useTabs ?? false,
        noFlush: true,
      }),
    };
  });

  if (fileContents.has(serializedFile.id)) {
    const currentContents = fileContents.get(serializedFile.id)!;
    if (serializedFile.contents === currentContents.contents) {
      return;
    }
  }

  fileContents.set(serializedFile.id, serializedFile);

  debug.sendFile(serializedFile, "file_added");
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
const nodeIds = new Map<number, RenderedTextTree | PrintHook>();
let nodeCount = 0;
function nodeId(node: RenderedTextTree | PrintHook) {
  let id = seenNodes.get(node);
  if (id === undefined) {
    id = nodeCount++;
    seenNodes.set(node, id);
    nodeIds.set(id, node);
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

/**
 * Return the render node that owns the given context.
 */
function findRenderNodeForContext(context: Context | null) {
  let currentContext: Context | null = context;
  while (currentContext) {
    const renderContext = getRenderNodeForContext(currentContext);
    if (renderContext) {
      return renderContext;
    }
    currentContext = currentContext.owner;
  }

  return null;
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
  // Create HTTP server to serve debug UI files
  const server = http.createServer(async (req, res) => {
    let urlPath = req.url ?? "/";
    if (urlPath === "/") urlPath = "/index.html";
    const filePath = pathJoin(uiDir, urlPath);
    console.log(filePath);
    try {
      const data = await readFile(filePath);
      const ext = extname(filePath);
      const mime = mimeTypes[ext] || "application/octet-stream";
      res.writeHead(200, { "Content-Type": mime });
      res.end(data);
    } catch {
      res.writeHead(404);
      res.end("Not found");
    }
  });

  // Attach WebSocket server to HTTP server
  wss = new WebSocketServer({ server });

  // Start listening on port 8080
  server.listen(8080);

  // Wait for server to start listening
  await new Promise<void>((resolve, reject) => {
    server.on("listening", () => {
      // eslint-disable-next-line no-console
      console.log("Debug server started at http://localhost:8080");
      // eslint-disable-next-line no-console
      console.log("Waiting for debug client to connect...");
      resolve();
    });
    server.on("error", (error) => {
      // eslint-disable-next-line no-console
      console.error("Debug server error:", error);
      reject(error);
    });
  });

  // Wait for a WebSocket client to connect
  await new Promise<void>((resolve) => {
    wss!.on("connection", (ws) => {
      // eslint-disable-next-line no-console
      console.log("Debug client connected");
      ws.on("message", (data) => {
        try {
          const message = JSON.parse(data.toString()) as WebSocketMessage;
          if (message.type === "rerender") {
            debug.rerenderComponent(message.data.nodeId);
          }
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error("Failed to parse WebSocket message:", error);
        }
      });
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
