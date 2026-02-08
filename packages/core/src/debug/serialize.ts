/**
 * Shared serialization utilities for debug modules.
 *
 * Provides safe, depth-limited serialization of arbitrary values for
 * transmission over the devtools protocol. Handles reactive refs, circular
 * references, and non-plain objects.
 */
import { isReactive, isRef } from "@vue/reactivity";
import { untrack } from "../reactivity.js";

const MAX_ENTRIES = 50;
const MAX_DEPTH = 3;

function isPlainObject(value: unknown): boolean {
  if (!value || typeof value !== "object") return false;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

function sanitize(
  value: unknown,
  depth: number,
  seen: WeakSet<object>,
): unknown {
  if (depth > MAX_DEPTH) return "[MaxDepth]";
  if (
    value === null ||
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return value;
  }
  if (typeof value === "bigint") return value.toString();
  if (typeof value === "symbol") return value.toString();
  if (typeof value === "function") return "[Function]";
  if (isRef(value)) {
    return sanitize(value.value, depth + 1, seen);
  }
  if (isReactive(value)) {
    return "[Reactive]";
  }
  if (Array.isArray(value)) {
    return value
      .slice(0, MAX_ENTRIES)
      .map((item) => sanitize(item, depth + 1, seen));
  }
  if (typeof value === "object") {
    const obj = value as Record<string, unknown>;
    if (seen.has(obj)) return "[Circular]";
    seen.add(obj);
    if (!isPlainObject(obj)) {
      const name = obj.constructor?.name ?? "Object";
      return `[${name}]`;
    }
    const entries = Object.entries(obj).slice(0, MAX_ENTRIES);
    const result: Record<string, unknown> = {};
    for (const [key, val] of entries) {
      result[key] = sanitize(val, depth + 1, seen);
    }
    return result;
  }
  return String(value);
}

/**
 * Sanitize a record of metadata for safe serialization over the devtools
 * protocol. Unwraps refs, replaces reactive objects with placeholders, limits
 * depth and entry count, and detects circular references.
 *
 * Runs inside `untrack()` to avoid creating reactive dependencies.
 */
export function sanitizeRecord(
  input: Record<string, unknown> | undefined,
): Record<string, unknown> | undefined {
  return untrack(() => {
    if (!input) return undefined;
    const seen = new WeakSet<object>();
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(input).slice(0, MAX_ENTRIES)) {
      result[key] = sanitize(value, 0, seen);
    }
    return result;
  });
}
