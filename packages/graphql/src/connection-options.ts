import { createContext, useContext } from "@alloy-js/core";
import { String } from "./builtins/graphql.js";
import type { TypeReference } from "./schema.js";

/**
 * Resolved pagination options for connection fields.
 */
export interface ConnectionPaginationOptions {
  forward: boolean;
  backward: boolean;
  cursorType: TypeReference;
}

export interface ConnectionPaginationConfig {
  forward?: boolean;
  backward?: boolean;
  cursorType?: TypeReference;
}

const DEFAULT_PAGINATION: ConnectionPaginationOptions = {
  forward: true,
  backward: true,
  cursorType: String,
};

/**
 * Context that provides connection pagination defaults.
 */
export const ConnectionPaginationContext =
  createContext<ConnectionPaginationOptions>();

export function resolveConnectionPaginationOptions(
  config: ConnectionPaginationConfig,
  parent?: ConnectionPaginationOptions,
): ConnectionPaginationOptions {
  return {
    forward: config.forward ?? parent?.forward ?? DEFAULT_PAGINATION.forward,
    backward:
      config.backward ?? parent?.backward ?? DEFAULT_PAGINATION.backward,
    cursorType:
      config.cursorType ?? parent?.cursorType ?? DEFAULT_PAGINATION.cursorType,
  };
}

/**
 * Reads the active connection pagination defaults.
 */
export function useConnectionOptions(): ConnectionPaginationOptions {
  return useContext(ConnectionPaginationContext) ?? DEFAULT_PAGINATION;
}
