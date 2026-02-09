/**
 * Devtools session manager.
 *
 * Manages the lifecycle of a devtools session: enable, connect, broadcast
 * messages, and reset. Transport details (HTTP/WebSocket) are delegated
 * to devtools-transport.ts.
 */
import {
  createTransport,
  getAlloyVersion,
  type DevtoolsTransportState,
} from "./devtools-transport.js";

// ─────────────────────────────────────────────────────────────────────────────
// Public types
// ─────────────────────────────────────────────────────────────────────────────

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

export interface EnableDevtoolsOptions {
  /** Port to listen on. Use 0 for a random available port. Defaults to ALLOY_DEBUG_PORT or 8123. */
  port?: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// Session state
// ─────────────────────────────────────────────────────────────────────────────

let transportState: DevtoolsTransportState | null = null;
let transportPromise: Promise<DevtoolsTransportState> | null = null;
const messageHandlers = new Set<(message: DevtoolsIncomingMessage) => void>();
let devtoolsExplicitlyEnabled = false;
let devtoolsInitialized = false;
let loggedDevtoolsLinks = false;
let waitingForConnection = false;
let configuredPort: number | undefined;

// ─────────────────────────────────────────────────────────────────────────────
// Environment helpers
// ─────────────────────────────────────────────────────────────────────────────

function isNodeEnvironment() {
  return (
    typeof process !== "undefined" &&
    typeof process.versions === "object" &&
    Boolean(process.versions?.node)
  );
}

function getCwd() {
  if (!isNodeEnvironment()) return undefined;
  try {
    return process.cwd();
  } catch {
    return undefined;
  }
}

function resolveDebugPort() {
  const raw = process.env.ALLOY_DEBUG_PORT;
  if (!raw) return 8123;
  const parsed = Number.parseInt(raw, 10);
  if (Number.isNaN(parsed)) return 8123;
  return parsed;
}

// ─────────────────────────────────────────────────────────────────────────────
// Query functions
// ─────────────────────────────────────────────────────────────────────────────

/** Returns true when devtools are enabled (via env var or explicit call). */
export function isDevtoolsEnabled() {
  if (!isNodeEnvironment()) return false;
  return devtoolsExplicitlyEnabled || Boolean(process.env.ALLOY_DEBUG);
}

/** Returns true when a devtools client is currently connected. */
export function isDevtoolsConnected(): boolean {
  return Boolean(transportState?.connected);
}

/** Get the current server info, or null if not running. */
export function getDevtoolsServerInfo(): DevtoolsServerInfo | null {
  if (!transportState) return null;
  return { port: transportState.port, connected: transportState.connected };
}

// ─────────────────────────────────────────────────────────────────────────────
// Server lifecycle
// ─────────────────────────────────────────────────────────────────────────────

async function ensureServer(): Promise<DevtoolsTransportState> {
  if (transportState) return transportState;
  if (!transportPromise) {
    transportPromise = createTransport({
      port: configuredPort ?? resolveDebugPort(),
      onConnection(socket) {
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
      },
      onMessage(raw) {
        const message = raw as DevtoolsIncomingMessage;
        if (!message || !message.type) return;
        for (const handler of messageHandlers) {
          handler(message);
        }
      },
      onDisconnect() {
        // Currently no-op; transport handles client set management
      },
    }).then((state) => {
      transportState = state;
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
      return state;
    });
  }
  return transportPromise;
}

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Wait for a devtools client to connect before proceeding.
 *
 * Starts the devtools server if not already running, and blocks until a
 * devtools client connects via WebSocket.
 *
 * @example
 * ```ts
 * import { waitForDevtoolsConnection } from "@alloy-js/core/devtools";
 * import { render } from "@alloy-js/core";
 *
 * await waitForDevtoolsConnection();
 * const tree = render(<MyComponent />);
 * ```
 */
export async function waitForDevtoolsConnection(): Promise<void> {
  devtoolsExplicitlyEnabled = true;
  const server = await ensureServer();
  if (server.connected) return;
  await server.ready;
}

/**
 * Enable devtools and start the server, returning when the server is ready.
 * Use this in tests to enable devtools before connecting a client.
 *
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
  const server = await ensureServer();
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

/**
 * Start the devtools server and wait for a client connection.
 *
 * @example
 * ```ts
 * const serverInfo = await enableDevtoolsAndConnect({ port: 0 });
 * // ... run your test ...
 * await resetDevtoolsServerForTests();
 * ```
 *
 * @returns Server info once a client has connected
 */
export async function enableDevtoolsAndConnect(
  options?: EnableDevtoolsOptions,
): Promise<DevtoolsServerInfo> {
  const info = await enableDevtools(options);
  if (!info.connected) {
    await transportState!.ready;
  }
  return { port: transportState!.port, connected: true };
}

// ─────────────────────────────────────────────────────────────────────────────
// Messaging
// ─────────────────────────────────────────────────────────────────────────────

/** Broadcast a message to all connected devtools clients. */
export function broadcastDevtoolsMessage(message: DevtoolsMessage) {
  if (!isDevtoolsEnabled()) return;
  if (!transportState) return;
  if (transportState.clients.size === 0) return;

  try {
    const payload = JSON.stringify(message);
    for (const client of transportState.clients) {
      if (client.readyState === client.OPEN) {
        client.send(payload);
      }
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(
      `Failed to send devtools message (type: ${message.type}):`,
      err,
    );
  }
}

/** Register a handler for incoming devtools messages. Returns an unsubscribe function. */
export function registerDevtoolsMessageHandler(
  handler: (message: DevtoolsIncomingMessage) => void,
) {
  messageHandlers.add(handler);
  return () => messageHandlers.delete(handler);
}

/** Throw if devtools are enabled but no client is connected (for sync render). */
export function assertDevtoolsConnectedForSyncRender() {
  if (!isDevtoolsEnabled()) return;
  if (!transportState || !transportState.connected) {
    throw new Error(
      "ALLOY_DEBUG is set but devtools are not connected. Use renderAsync or wait for the devtools client before rendering.",
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Test utilities
// ─────────────────────────────────────────────────────────────────────────────

/** Reset all devtools state. For use in tests only. */
export async function resetDevtoolsServerForTests() {
  if (transportState) {
    await transportState.close();
  }
  transportState = null;
  transportPromise = null;
  devtoolsExplicitlyEnabled = false;
  devtoolsInitialized = false;
  configuredPort = undefined;
  loggedDevtoolsLinks = false;
}
