// Browser stub for devtools-server - devtools are not supported in browsers

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

export function isDevtoolsEnabled(): boolean {
  return false;
}

export async function ensureDevtoolsServer(): Promise<null> {
  return null;
}

export async function waitForDevtoolsConnection(): Promise<void> {
  // No-op in browser
}

export interface EnableDevtoolsOptions {
  port?: number;
  waitForConnection?: boolean;
}

export async function enableDevtools(
  _options?: EnableDevtoolsOptions,
): Promise<void> {
  // No-op in browser
}

export async function initDevtoolsIfEnabled(): Promise<void> {
  // No-op in browser
}

export function flushDevtoolsMessages(): void {
  // No-op in browser
}

export function broadcastDevtoolsMessage(_message: DevtoolsMessage): void {
  // No-op in browser
}

export const broadcastDevtoolsMessageImmediate = broadcastDevtoolsMessage;

export function registerDevtoolsMessageHandler(
  _handler: (message: DevtoolsIncomingMessage) => void,
): () => void {
  return () => {};
}

export function assertDevtoolsConnectedForSyncRender(): void {
  // No-op in browser
}

export function getDevtoolsServerInfo(): DevtoolsServerInfo | null {
  return null;
}

export async function resetDevtoolsServerForTests(): Promise<void> {
  // No-op in browser
}
