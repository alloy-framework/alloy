// Browser stub for devtools-server - devtools are not supported in browsers

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

export function registerDevtoolsMessageHandler(
  _handler: (message: DevtoolsIncomingMessage) => void,
): () => void {
  return () => {};
}

export function assertDevtoolsConnectedForSyncRender(): void {
  // No-op in browser
}

export function isDevtoolsConnected(): boolean {
  return false;
}

export function getDevtoolsServerInfo(): DevtoolsServerInfo | null {
  return null;
}

export async function enableDevtoolsAndConnect(
  _options?: EnableDevtoolsOptions,
): Promise<DevtoolsServerInfo | null> {
  return null;
}

export async function resetDevtoolsServerForTests(): Promise<void> {
  // No-op in browser
}
