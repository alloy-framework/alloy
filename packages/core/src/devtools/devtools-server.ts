export interface DevtoolsMessage {
  type: string;
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
let waitingLogged = false;
const messageHandlers = new Set<(message: DevtoolsIncomingMessage) => void>();

function isNodeEnvironment() {
  return (
    typeof process !== "undefined" &&
    typeof process.versions === "object" &&
    Boolean(process.versions?.node)
  );
}

export function isDevtoolsEnabled() {
  if (!isNodeEnvironment()) return false;
  return Boolean(process.env.ALLOY_DEBUG);
}

function resolveDebugPort() {
  const raw = process.env.ALLOY_DEBUG_PORT;
  if (!raw) return 8123;
  const parsed = Number.parseInt(raw, 10);
  if (Number.isNaN(parsed)) return 8123;
  return parsed;
}

async function createServer(): Promise<DevtoolsServerState | null> {
  if (!isDevtoolsEnabled()) return null;

  const { WebSocketServer } = await import("ws");

  const port = resolveDebugPort();
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
    clients.add(socket);
    state.connected = true;
    resolveReady?.();
    // eslint-disable-next-line no-console
    console.log(`Devtools client connected on ws://127.0.0.1:${state.port}.`);

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

export async function ensureDevtoolsServer(): Promise<DevtoolsServerState | null> {
  if (!isDevtoolsEnabled()) return null;
  if (serverState) return serverState;
  if (!serverPromise) {
    serverPromise = createServer().then((state) => {
      serverState = state;
      return state;
    });
  }
  return serverPromise;
}

export async function waitForDevtoolsConnection(): Promise<void> {
  if (!isDevtoolsEnabled()) return;
  const server = await ensureDevtoolsServer();
  if (!server) return;
  if (server.connected) return;
  if (!waitingLogged) {
    waitingLogged = true;
    // eslint-disable-next-line no-console
    console.log(
      `ALLOY_DEBUG is set. Waiting for devtools client on ws://127.0.0.1:${server.port} (set VITE_ALLOY_DEBUG_PORT to match).`,
    );
  }
  await server.ready;
}

export async function broadcastDevtoolsMessage(message: DevtoolsMessage) {
  if (!isDevtoolsEnabled()) return;
  const server = await ensureDevtoolsServer();
  if (!server || server.clients.size === 0) return;
  const payload = JSON.stringify(message);
  for (const client of server.clients) {
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
  waitingLogged = false;
}
