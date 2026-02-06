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
let _serverPromise: Promise<DevtoolsServerState> | null = null;
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
  if (!_serverPromise) {
    _serverPromise = createServer().then((server) => {
      serverState = server;
      return server;
    });
  }
  return _serverPromise;
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
 * import { waitForDevtoolsConnection } from "@alloy-js/core/devtools";
 * import { render } from "@alloy-js/core";
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

export function broadcastDevtoolsMessage(message: DevtoolsMessage) {
  if (!isDevtoolsEnabled()) return;
  // Use synchronous access since server should already be initialized
  if (!serverState) return;
  if (serverState.clients.size === 0) return;

  try {
    const payload = JSON.stringify(message);
    for (const client of serverState.clients) {
      if (client.readyState === client.OPEN) {
        client.send(payload);
      }
    }
  } catch (err) {
    // Log but don't throw - don't break rendering due to devtools issues
    // eslint-disable-next-line no-console
    console.error(
      `Failed to send devtools message (type: ${message.type}):`,
      err,
    );
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

export function isDevtoolsConnected(): boolean {
  return Boolean(serverState?.connected);
}

export function getDevtoolsServerInfo(): DevtoolsServerInfo | null {
  if (!serverState) return null;
  return { port: serverState.port, connected: serverState.connected };
}

/**
 * Start the devtools server and wait for a client connection.
 * Convenience function for tests that need to inspect render output
 * with the devtools UI.
 *
 * @example
 * ```ts
 * import { enableDevtoolsAndConnect, resetDevtoolsServerForTests } from "@alloy-js/core/devtools";
 *
 * const serverInfo = await enableDevtoolsAndConnect({ port: 0 });
 * // ... run your test ...
 * await resetDevtoolsServerForTests();
 * ```
 *
 * @returns Server info with port number once a client has connected
 */
export async function enableDevtoolsAndConnect(
  options?: EnableDevtoolsOptions,
): Promise<DevtoolsServerInfo> {
  const info = await enableDevtools(options);
  if (!info.connected) {
    await serverState!.ready;
  }
  return { port: serverState!.port, connected: true };
}

export async function resetDevtoolsServerForTests() {
  if (serverState) {
    await serverState.close();
  }
  serverState = null;
  _serverPromise = null;
  devtoolsExplicitlyEnabled = false;
  devtoolsInitialized = false;
  configuredPort = undefined;
  loggedDevtoolsLinks = false;
}
