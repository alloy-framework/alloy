/**
 * WebSocket transport for the Alloy devtools server.
 *
 * Handles HTTP serving of the devtools UI and WebSocket connection management.
 * This module is concerned only with the transport layer — session lifecycle
 * is managed by devtools-server.ts.
 */
import { readFileSync } from "node:fs";
import {
  createServer as createHttpServer,
  type IncomingMessage,
  type ServerResponse,
} from "node:http";

export interface DevtoolsTransportState {
  port: number;
  connected: boolean;
  clients: Set<any>;
  httpServer: ReturnType<typeof createHttpServer>;
  ready: Promise<void>;
  close(): Promise<void>;
}

let cachedAlloyVersion: string | null = null;

/** Read the @alloy-js/core package version, cached after first call. */
export function getAlloyVersion(): string {
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

/** Attempt to load the devtools UI HTML from known candidate paths. */
function loadDevtoolsUiHtml(): string | null {
  const candidates = [
    new URL("../../dist/devtools/index.html", import.meta.url),
    new URL("../../devtools/index.html", import.meta.url),
    new URL("../../../devtools/dist/index.html", import.meta.url),
  ];
  for (const candidate of candidates) {
    try {
      return readFileSync(candidate, "utf-8");
    } catch {
      // try next
    }
  }
  return null;
}

export interface CreateTransportOptions {
  port: number;
  onConnection(socket: any): void;
  onMessage(message: unknown, socket: any): void;
  onDisconnect(socket: any): void;
}

/**
 * Create the HTTP + WebSocket transport. Returns when the server is listening.
 * Only accepts one concurrent WebSocket connection.
 */
export async function createTransport(
  options: CreateTransportOptions,
): Promise<DevtoolsTransportState> {
  const { WebSocketServer } = await import("ws");
  const devtoolsUiHtml = loadDevtoolsUiHtml();

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
    httpServer.listen(options.port);
  });

  const address = httpServer.address();
  const actualPort =
    typeof address === "object" && address !== null ?
      address.port
    : options.port;

  let resolveReady: (() => void) | undefined;
  const ready = new Promise<void>((resolve) => {
    resolveReady = resolve;
  });

  const clients = new Set<any>();
  const state: DevtoolsTransportState = {
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

  wss.on("connection", (socket) => {
    if (state.connected) {
      socket.close(1000, "Another devtools client is already connected");
      return;
    }

    clients.add(socket);
    state.connected = true;
    resolveReady?.();
    options.onConnection(socket);

    socket.on("message", (data) => {
      try {
        options.onMessage(JSON.parse(String(data)), socket);
      } catch {
        // ignore malformed messages
      }
    });

    socket.on("close", () => {
      clients.delete(socket);
      state.connected = clients.size > 0;
      options.onDisconnect(socket);
    });
  });

  return state;
}
