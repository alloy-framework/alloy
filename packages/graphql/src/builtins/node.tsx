import { namekey } from "@alloy-js/core";

/**
 * Namekey for the canonical `Node` interface.
 * Kept in builtins to provide a shared identity without pulling in JSX helpers.
 */
export const Node = namekey("Node");
