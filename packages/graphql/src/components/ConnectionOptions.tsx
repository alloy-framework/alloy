import type { Children } from "@alloy-js/core";
import { useContext } from "@alloy-js/core";
import {
  ConnectionPaginationContext,
  resolveConnectionPaginationOptions,
} from "../connection-options.js";
import type { TypeReference } from "../schema.js";

export interface ConnectionPaginationProps {
  children?: Children;
  forward?: boolean;
  backward?: boolean;
  cursorType?: TypeReference;
}

/**
 * Configures default pagination options for `Field.Connection` and `Connection`.
 *
 * @example Forward pagination defaults
 * ```tsx
 * <ConnectionPagination forward>
 *   <Schema>{children}</Schema>
 * </ConnectionPagination>
 * ```
 *
 * @example Custom cursor type
 * ```tsx
 * <ConnectionPagination forward backward cursorType={ID}>
 *   <Schema>{children}</Schema>
 * </ConnectionPagination>
 * ```
 *
 * @remarks
 * At least one of `forward` or `backward` must be true.
 * `cursorType` customizes the type for cursor arguments and fields.
 */
export function ConnectionPagination(props: ConnectionPaginationProps) {
  const parent = useContext(ConnectionPaginationContext);
  const value = resolveConnectionPaginationOptions(props, parent);

  if (!value.forward && !value.backward) {
    throw new Error(
      "ConnectionPagination requires at least one pagination direction.",
    );
  }

  return (
    <ConnectionPaginationContext.Provider value={value}>
      {props.children}
    </ConnectionPaginationContext.Provider>
  );
}
