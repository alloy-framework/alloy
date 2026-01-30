import { readFileSync } from "node:fs";

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
  close(): Promise<void>;
  ready: Promise<void>;
}

let serverState: DevtoolsServerState | null = null;
let serverPromise: Promise<DevtoolsServerState | null> | null = null;
const messageHandlers = new Set<(message: DevtoolsIncomingMessage) => void>();
let cachedAlloyVersion: string | null = null;
let devtoolsExplicitlyEnabled = false;
let devtoolsInitialized = false;

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

  const port = configuredPort ?? resolveDebugPort();
  const wss = new WebSocketServer({ port });

  await new Promise<void>((resolve, reject) => {
    wss.once("listening", resolve);
    wss.once("error", reject);
  });

  const address = wss.address();
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
    ready,
    close: async () => {
      await new Promise<void>((resolve) => wss.close(() => resolve()));
      clients.clear();
      state.connected = false;
    },
  };

  wss.on("connection", (socket) => {
    // Only accept the first connection, reject subsequent ones
    if (state.connected) {
      socket.close(1000, "Another devtools client is already connected");
      return;
    }

    clients.add(socket);
    state.connected = true;
    resolveReady?.();
    // eslint-disable-next-line no-console
    console.log(`Devtools client connected on ws://127.0.0.1:${state.port}.`);

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
  // eslint-disable-next-line no-console
  console.log(
    `Waiting for devtools client on ws://127.0.0.1:${server.port} (set VITE_ALLOY_DEBUG_PORT to match).`,
  );
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
