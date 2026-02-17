import type {
  ClientToServerMessage,
  ServerToClientMessage,
} from "@alloy-js/core/devtools";
import type { DebugConnectionStatus } from "./debug-connection-types";

// ── Configuration ────────────────────────────────────────────────────────────

export function resolveDebugUrl(): string {
  const explicitUrl = import.meta.env.VITE_ALLOY_DEBUG_URL as
    | string
    | undefined;
  if (explicitUrl) return explicitUrl;

  const host =
    (import.meta.env.VITE_ALLOY_DEBUG_HOST as string | undefined) ??
    window.location.hostname ??
    "127.0.0.1";
  const port =
    (import.meta.env.VITE_ALLOY_DEBUG_PORT as string | undefined) ?? "8123";
  const protocol = window.location.protocol === "https:" ? "wss" : "ws";
  return `${protocol}://${host}:${port}`;
}

// ── Transport interface ──────────────────────────────────────────────────────

export interface DebugTransportCallbacks {
  onStatusChange: (status: DebugConnectionStatus, error?: string) => void;
  onMessage: (message: ServerToClientMessage) => void;
  /** Called on successful (re)connection so the consumer can reset state. */
  onConnected: () => void;
}

export interface DebugTransport {
  /** Start the connection (with auto-reconnect). */
  connect(): void;
  /** Tear down the connection and stop reconnecting. */
  disconnect(): void;
  /** Send a message to the server. No-op if not connected. */
  send(message: ClientToServerMessage): void;
}

// ── Implementation ───────────────────────────────────────────────────────────

export function createDebugTransport(
  callbacks: DebugTransportCallbacks,
): DebugTransport {
  let socket: WebSocket | null = null;
  let cancelled = false;
  let retryTimer: number | undefined;
  let attempts = 0;

  function attemptConnect() {
    if (cancelled) return;

    callbacks.onStatusChange("connecting");

    try {
      socket = new WebSocket(resolveDebugUrl());
    } catch (err) {
      callbacks.onStatusChange(
        "error",
        err instanceof Error ? err.message : String(err),
      );
      return;
    }

    socket.addEventListener("open", () => {
      if (cancelled) return;
      attempts = 0;
      callbacks.onConnected();
      callbacks.onStatusChange("connected");
    });

    socket.addEventListener("close", () => {
      if (cancelled) return;
      callbacks.onStatusChange("disconnected");
      socket = null;
      const delay = Math.min(2000, 250 * 2 ** attempts);
      attempts += 1;
      retryTimer = window.setTimeout(attemptConnect, delay);
    });

    socket.addEventListener("error", () => {
      if (cancelled) return;
      callbacks.onStatusChange("error", "Failed to connect to debug server");
      socket = null;
    });

    socket.addEventListener("message", (event) => {
      if (cancelled) return;

      let parsed: ServerToClientMessage | null = null;
      try {
        parsed = JSON.parse(String(event.data)) as ServerToClientMessage;
      } catch {
        return;
      }
      if (!parsed) return;

      callbacks.onMessage(parsed);
    });
  }

  return {
    connect() {
      cancelled = false;
      attemptConnect();
    },
    disconnect() {
      cancelled = true;
      if (retryTimer !== undefined) {
        window.clearTimeout(retryTimer);
        retryTimer = undefined;
      }
      socket?.close();
      socket = null;
    },
    send(message: ClientToServerMessage) {
      if (!socket || socket.readyState !== WebSocket.OPEN) return;
      socket.send(JSON.stringify(message));
    },
  };
}
