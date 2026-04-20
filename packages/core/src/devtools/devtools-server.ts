/**
 * Devtools session manager.
 *
 * Manages the lifecycle of a devtools session: enable, connect, broadcast
 * messages, and reset. Transport details (HTTP/WebSocket) are delegated
 * to devtools-transport.ts.
 */
import type { ChangeChannel, ChangeEvent } from "../debug/trace-writer.js";
import {
  ALL_CHANNELS,
  closeTrace,
  initTrace,
  isTraceEnabled,
  queryChannel,
  setChangeListener,
} from "../debug/trace-writer.js";
import {
  createTransport,
  getAlloyVersion,
  type DevtoolsTransportState,
} from "./devtools-transport.js";

// ─────────────────────────────────────────────────────────────────────────────
// Public types
// ─────────────────────────────────────────────────────────────────────────────

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
let tempDbPath: string | null = null;
let subscribedPromise: Promise<void> | null = null;
let resolveSubscribed: (() => void) | null = null;

// ─────────────────────────────────────────────────────────────────────────────
// Per-client subscription state
// ─────────────────────────────────────────────────────────────────────────────

interface ClientState {
  subscriptions: Set<ChangeChannel>;
}

const clientStates = new Map<any, ClientState>();

function eventToMessageType(event: ChangeEvent): string {
  const map: Record<string, Record<string, string>> = {
    render: {
      added: "render:node_added",
      updated: "render:node_updated",
      removed: "render:node_removed",
      reset: "render:reset",
    },
    effects: { added: "effect:added", updated: "effect:updated" },
    refs: { added: "ref:added" },
    edges: { added: `edge:${(event.data as any).edge_type ?? "track"}` },
    symbols: {
      added: "symbol:added",
      updated: "symbol:updated",
      removed: "symbol:removed",
    },
    scopes: {
      added: "scope:added",
      updated: "scope:updated",
      removed: "scope:removed",
    },
    files: {
      added: "file:added",
      updated: "file:updated",
      removed: "file:removed",
    },
    directories: { added: "directory:added", removed: "directory:removed" },
    diagnostics: { added: "diagnostics:report" },
    errors: { added: "render:error" },
    lifecycle: { added: "effect:lifecycle" },
    scheduler: { added: "scheduler:job" },
  };
  return (
    map[event.channel]?.[event.action] ?? `${event.channel}:${event.action}`
  );
}

function channelToInitialMessageType(
  channel: ChangeChannel,
  row: Record<string, unknown>,
): string {
  const map: Record<string, string> = {
    render: "render:node_added",
    effects: "effect:added",
    refs: "ref:added",
    symbols: "symbol:added",
    scopes: "scope:added",
    files: "file:added",
    directories: "directory:added",
    diagnostics: "diagnostics:report",
    errors: "render:error",
    lifecycle: "effect:lifecycle",
    scheduler: "scheduler:job",
  };
  if (channel === "edges") {
    return `edge:${(row.type as string) ?? "track"}`;
  }
  return map[channel] ?? `${channel}:added`;
}

function sendInitialState(socket: any, channels: ChangeChannel[]): void {
  if (!isTraceEnabled()) return;
  for (const channel of channels) {
    const rows = queryChannel(channel);
    for (const row of rows) {
      const msgType = channelToInitialMessageType(channel, row);
      // Remap SQLite column names that collide with the message `type` field
      if (channel === "effects" && row.type !== undefined) {
        row.effect_type = row.type;
      }
      const msg = { ...row, type: msgType };
      socket.send(JSON.stringify(msg));
    }
  }
}

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
// Temp SQLite for devtools
// ─────────────────────────────────────────────────────────────────────────────

async function ensureSqliteForDevtools(): Promise<void> {
  if (isTraceEnabled()) return;
  const os = await import("node:os");
  const path = await import("node:path");
  tempDbPath = path.join(os.tmpdir(), `alloy-debug-${process.pid}.db`);
  await initTrace(tempDbPath);
  process.on("exit", () => {
    if (!tempDbPath) return;
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const fs = require("node:fs");
      fs.unlinkSync(tempDbPath);
      try {
        fs.unlinkSync(tempDbPath + "-wal");
      } catch {
        /* ignore */
      }
      try {
        fs.unlinkSync(tempDbPath + "-shm");
      } catch {
        /* ignore */
      }
    } catch {
      /* ignore cleanup failures */
    }
  });
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
        // Start with no subscriptions — client must subscribe explicitly.
        clientStates.set(socket, { subscriptions: new Set() });
        if (!subscribedPromise) {
          subscribedPromise = new Promise<void>((resolve) => {
            resolveSubscribed = resolve;
          });
        }
        if (waitingForConnection) {
          waitingForConnection = false;
          process.stdout.write(" Connected!\n");
        }
        socket.send(
          JSON.stringify({
            type: "debugger:info",
            version: getAlloyVersion(),
            cwd: getCwd(),
            sourceMapEnabled: process.execArgv.includes("--enable-source-maps"),
          }),
        );
      },
      onMessage(raw, socket) {
        const message = raw as DevtoolsIncomingMessage;
        if (!message || !message.type) return;

        if (message.type === "subscribe") {
          const channels = (message as any).channels as string[];
          const state = clientStates.get(socket);
          if (state && channels && Array.isArray(channels)) {
            const validChannels = channels.filter((ch) =>
              ALL_CHANNELS.includes(ch as ChangeChannel),
            ) as ChangeChannel[];
            state.subscriptions = new Set(validChannels);
            sendInitialState(socket, validChannels);
          }
          resolveSubscribed?.();
          return;
        }
        if (message.type === "unsubscribe") {
          const channels = (message as any).channels as string[];
          const state = clientStates.get(socket);
          if (state && channels) {
            for (const ch of channels)
              state.subscriptions.delete(ch as ChangeChannel);
          }
          return;
        }

        for (const handler of messageHandlers) {
          handler(message);
        }
      },
      onDisconnect(socket) {
        clientStates.delete(socket);
      },
    }).then((state) => {
      transportState = state;

      // Wire up the change notification bus to forward events to subscribed clients
      setChangeListener((event: ChangeEvent) => {
        if (!transportState) return;

        // Lifecycle signals are broadcast to ALL connected clients
        const signalType = (event.data as any)?._signal as string | undefined;
        if (signalType) {
          const payload = JSON.stringify({ type: signalType });
          for (const client of transportState.clients) {
            if (client.readyState === client.OPEN) {
              client.send(payload);
            }
          }
          return;
        }

        const msgType = eventToMessageType(event);
        const message = { ...event.data, type: msgType };
        const payload = JSON.stringify(message);

        for (const [client, clientState] of clientStates) {
          if (client.readyState !== client.OPEN) continue;
          if (clientState.subscriptions.has(event.channel)) {
            client.send(payload);
          }
        }
      });

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
  if (!server.connected) {
    await server.ready;
  }
  // Wait for the client to send its initial subscribe message so that
  // messages emitted during a synchronous render are not dropped.
  if (subscribedPromise) {
    await subscribedPromise;
  }
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
  await ensureSqliteForDevtools();
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
  await ensureSqliteForDevtools();
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
  setChangeListener(null);
  clientStates.clear();
  if (transportState) {
    await transportState.close();
  }
  transportState = null;
  transportPromise = null;
  devtoolsExplicitlyEnabled = false;
  devtoolsInitialized = false;
  configuredPort = undefined;
  loggedDevtoolsLinks = false;
  subscribedPromise = null;
  resolveSubscribed = null;
  // Close the trace DB so each test starts fresh
  closeTrace();
}
