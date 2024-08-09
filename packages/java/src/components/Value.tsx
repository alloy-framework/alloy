import { memo } from "@alloy-js/core";

export interface ValueProps {
  value?: unknown;
}

export function Value(props: ValueProps) {
  return memo(() => {
    const value = props.value;

    if (typeof value === 'undefined') {
      return "null";
    } else if (typeof value === 'number' || typeof value === 'boolean') {
      return String(value);
    } else if (typeof value === 'string') {
      return `"${value}"`;
    } else if (typeof value === 'function') {
      // functions are inserted as-is.
      return value;
    }
  })
}