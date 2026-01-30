import { readFileSync } from "node:fs";
import {
  createServer as createHttpServer,
  type IncomingMessage,
  type ServerResponse,
} from "node:http";

export interface DevtoolsMessage {
  type: string;
  [key: string]: unknown;
}

export interface DevtoolsIncomingMessage {
  type: string;
  [key: string]: unknown;
}

export interface DevtoolsServerInfo {
  port: number;
  connected: boolean;
}

interface DevtoolsServerState extends DevtoolsServerInfo {
  clients: Set<any>;
  httpServer: ReturnType<typeof createHttpServer>;
  close(): Promise<void>;
  ready: Promise<void>;
}

let serverState: DevtoolsServerState | null = null;
let serverPromise: Promise<DevtoolsServerState | null> | null = null;
const messageHandlers = new Set<(message: DevtoolsIncomingMessage) => void>();
let cachedAlloyVersion: string | null = null;
let devtoolsExplicitlyEnabled = false;
let devtoolsInitialized = false;
let loggedDevtoolsLinks = false;
let waitingForConnection = false;

function getCwd() {
  if (!isNodeEnvironment()) return undefined;
  try {
    return process.cwd();
  } catch {
    return undefined;
  }
}

function getAlloyVersion() {
  if (cachedAlloyVersion) return cachedAlloyVersion;
  try {
    const pkgUrl = new URL("../../../package.json", import.meta.url);
    const pkg = JSON.parse(readFileSync(pkgUrl, "utf-8")) as {
      version?: string;
    };
    cachedAlloyVersion = pkg.version ?? "0.0.0";
  } catch {
    cachedAlloyVersion = "0.0.0";
  }
  return cachedAlloyVersion;
}

function isNodeEnvironment() {
  return (
    typeof process !== "undefined" &&
    typeof process.versions === "object" &&
    Boolean(process.versions?.node)
  );
}

export function isDevtoolsEnabled() {
  if (!isNodeEnvironment()) return false;
  return devtoolsExplicitlyEnabled || Boolean(process.env.ALLOY_DEBUG);
}

function resolveDebugPort() {
  const raw = process.env.ALLOY_DEBUG_PORT;
  if (!raw) return 8123;
  const parsed = Number.parseInt(raw, 10);
  if (Number.isNaN(parsed)) return 8123;
  return parsed;
}

let configuredPort: number | undefined;

async function createServer(): Promise<DevtoolsServerState> {
  const { WebSocketServer } = await import("ws");

  const devtoolsUiCandidates = [
    new URL("../../dist/devtools/index.html", import.meta.url),
    new URL("../../devtools/index.html", import.meta.url),
    new URL("../../../devtools/dist/index.html", import.meta.url),
  ];
  let devtoolsUiHtml: string | null = null;
  for (const candidate of devtoolsUiCandidates) {
    try {
      devtoolsUiHtml = readFileSync(candidate, "utf-8");
      break;
    } catch {
      devtoolsUiHtml = null;
    }
  }

  const port = configuredPort ?? resolveDebugPort();
  const httpServer = createHttpServer(
    (req: IncomingMessage, res: ServerResponse) => {
      const url = req.url ?? "/";
      if (url !== "/" && url !== "/index.html") {
        res.statusCode = 404;
        res.end("Not Found");
        return;
      }
      if (!devtoolsUiHtml) {
        res.statusCode = 404;
        res.end("Not Found");
        return;
      }
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.end(devtoolsUiHtml);
    },
  );
  const wss = new WebSocketServer({ server: httpServer });

  await new Promise<void>((resolve, reject) => {
    httpServer.once("listening", resolve);
    httpServer.once("error", reject);
    httpServer.listen(port);
  });

  const address = httpServer.address();
  const actualPort =
    typeof address === "object" && address !== null ? address.port : port;

  let resolveReady: (() => void) | undefined;
  const ready = new Promise<void>((resolve) => {
    resolveReady = resolve;
  });

  const clients = new Set<any>();
  const state: DevtoolsServerState = {
    port: actualPort,
    connected: false,
    clients,
    httpServer,
    ready,
    close: async () => {
      await new Promise<void>((resolve) => wss.close(() => resolve()));
      await new Promise<void>((resolve) => httpServer.close(() => resolve()));
      clients.clear();
      state.connected = false;
    },
  };
  if (!loggedDevtoolsLinks) {
    loggedDevtoolsLinks = true;
    // eslint-disable-next-line no-console
    console.log(`Alloy ${getAlloyVersion()}`);
    // eslint-disable-next-line no-console
    console.log(`➜ Debug UI: http://localhost:${state.port}/`);
    // eslint-disable-next-line no-console
    console.log(`➜ Websocket: ws://localhost:${state.port}/`);
    // eslint-disable-next-line no-console
    console.log("");
    waitingForConnection = true;
    // eslint-disable-next-line no-console
    process.stdout.write("Waiting for connection...");
  }

  wss.on("connection", (socket) => {
    // Only accept the first connection, reject subsequent ones
    if (state.connected) {
      socket.close(1000, "Another devtools client is already connected");
      return;
    }

    clients.add(socket);
    state.connected = true;
    resolveReady?.();
    if (waitingForConnection) {
      waitingForConnection = false;
      // eslint-disable-next-line no-console
      process.stdout.write(" Connected!\n");
    }

    socket.send(
      JSON.stringify({
        type: "debugger:info",
        version: getAlloyVersion(),
        cwd: getCwd(),
      }),
    );

    socket.on("message", (data) => {
      let message: DevtoolsIncomingMessage | null = null;
      try {
        message = JSON.parse(String(data)) as DevtoolsIncomingMessage;
      } catch {
        message = null;
      }
      if (!message || !message.type) return;
      for (const handler of messageHandlers) {
        handler(message);
      }
    });

    socket.on("close", () => {
      clients.delete(socket);
      state.connected = clients.size > 0;
    });
  });

  return state;
}

export async function ensureDevtoolsServer(): Promise<DevtoolsServerState> {
  if (serverState) return serverState;
  const server = await createServer();
  serverState = server;
  return server;
}

/**
 * Wait for a devtools client to connect before proceeding.
 *
 * This is useful in tests or scripts where you want to debug the render process
 * with the Alloy devtools UI. The function will start the devtools server if not
 * already running, and block until a devtools client connects.
 *
 * @example
 * ```ts
 * import { waitForDevtoolsConnection, render } from "@alloy-js/core";
 *
 * // In your test, wait for devtools before rendering
 * await waitForDevtoolsConnection();
 * const tree = render(<MyComponent />);
 * ```
 *
 * @returns A promise that resolves when devtools are connected
 */
export async function waitForDevtoolsConnection(): Promise<void> {
  devtoolsExplicitlyEnabled = true;
  const server = await ensureDevtoolsServer();
  if (server.connected) return;
  await server.ready;
}

export interface EnableDevtoolsOptions {
  /** Port to listen on. Use 0 for a random available port. Defaults to ALLOY_DEBUG_PORT or 8123. */
  port?: number;
}

/**
 * Enable devtools and start the server, returning when the server is ready.
 * Use this in tests to enable devtools before connecting a client.
 *
 * @param options - Configuration options
 * @returns Server info with port number
 */
export async function enableDevtools(
  options?: EnableDevtoolsOptions,
): Promise<DevtoolsServerInfo> {
  devtoolsExplicitlyEnabled = true;
  devtoolsInitialized = true;
  if (options?.port !== undefined) {
    configuredPort = options.port;
  }
  const server = await ensureDevtoolsServer();
  return { port: server.port, connected: server.connected };
}

/**
 * Initialize devtools if ALLOY_DEBUG is set. Called lazily by render functions.
 * Returns immediately if devtools are not enabled or already initialized.
 */
export async function initDevtoolsIfEnabled(): Promise<void> {
  if (devtoolsInitialized) return;
  if (!isDevtoolsEnabled()) return;
  devtoolsInitialized = true;
  await waitForDevtoolsConnection();
}

// Message batching for performance
const MESSAGE_BATCH_INTERVAL = 16; // ~60fps
let messageBatch: DevtoolsMessage[] = [];
let batchTimer: ReturnType<typeof setTimeout> | null = null;

function flushMessageBatch() {
  if (messageBatch.length === 0) return;
  if (!serverState || serverState.clients.size === 0) {
    messageBatch = [];
    return;
  }

  // Send all messages as a batch array for efficiency
  const payload =
    messageBatch.length === 1 ?
      JSON.stringify(messageBatch[0])
    : JSON.stringify({ type: "batch", messages: messageBatch });

  for (const client of serverState.clients) {
    if (client.readyState === client.OPEN) {
      client.send(payload);
    }
  }
  messageBatch = [];
  batchTimer = null;
}

export function broadcastDevtoolsMessage(message: DevtoolsMessage) {
  if (!isDevtoolsEnabled()) return;
  // Use synchronous access since server should already be initialized
  if (!serverState) return;
  if (serverState.clients.size === 0) return;

  // Add to batch
  messageBatch.push(message);

  // Schedule flush if not already scheduled
  if (batchTimer === null) {
    batchTimer = setTimeout(flushMessageBatch, MESSAGE_BATCH_INTERVAL);
  }
}

// For messages that need to be sent immediately (e.g., errors, connection info)
export function broadcastDevtoolsMessageImmediate(message: DevtoolsMessage) {
  if (!isDevtoolsEnabled()) return;
  if (!serverState) return;
  if (serverState.clients.size === 0) return;

  // Flush any pending batch first
  if (messageBatch.length > 0) {
    flushMessageBatch();
  }

  const payload = JSON.stringify(message);
  for (const client of serverState.clients) {
    if (client.readyState === client.OPEN) {
      client.send(payload);
    }
  }
}

export function registerDevtoolsMessageHandler(
  handler: (message: DevtoolsIncomingMessage) => void,
) {
  messageHandlers.add(handler);
  return () => messageHandlers.delete(handler);
}

export function assertDevtoolsConnectedForSyncRender() {
  if (!isDevtoolsEnabled()) return;
  if (!serverState || !serverState.connected) {
    throw new Error(
      "ALLOY_DEBUG is set but devtools are not connected. Use renderAsync or wait for the devtools client before rendering.",
    );
  }
}

export function getDevtoolsServerInfo(): DevtoolsServerInfo | null {
  if (!serverState) return null;
  return { port: serverState.port, connected: serverState.connected };
}

export async function resetDevtoolsServerForTests() {
  if (serverState) {
    await serverState.close();
  }
  serverState = null;
  serverPromise = null;
  devtoolsExplicitlyEnabled = false;
  devtoolsInitialized = false;
  configuredPort = undefined;
}
