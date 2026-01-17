import { isReactive, isRef, watch } from "@vue/reactivity";
import { getContext } from "../reactivity.js";
import type { OutputScope } from "../symbols/output-scope.js";
import type { OutputSymbol } from "../symbols/output-symbol.js";
import {
  broadcastDevtoolsMessage,
  isDevtoolsEnabled,
} from "./devtools-server.js";
import { getRenderNodeId } from "./render-tree-debug.js";

interface ScopeSnapshot {
  id: number;
  name: string;
  parentId: number | null;
  ownerSymbolId: number | null;
  isMemberScope: boolean;
  renderNodeId: number | null;
  metadata: Record<string, unknown> | undefined;
}

interface SymbolSnapshot {
  id: number;
  name: string;
  originalName: string;
  scopeId: number | null;
  ownerSymbolId: number | null;
  isMemberSymbol: boolean;
  isTransient: boolean;
  isAlias: boolean;
  movedToId: number | null;
  renderNodeId: number | null;
  metadata: Record<string, unknown> | undefined;
}

function emit(message: { type: string; [key: string]: unknown }) {
  if (!isDevtoolsEnabled()) return;
  void broadcastDevtoolsMessage(message);
}

const scopeWatchers = new Map<number, () => void>();
const symbolWatchers = new Map<number, () => void>();

function shallowEqual(a: Record<string, unknown>, b: Record<string, unknown>) {
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) return false;
  for (const key of aKeys) {
    if (a[key] !== b[key]) return false;
  }
  return true;
}

function sanitizeMetadata(input: Record<string, unknown> | undefined) {
  if (!input) return undefined;
  const seen = new WeakSet<object>();
  const maxEntries = 50;
  const maxDepth = 3;

  function isPlainObject(value: unknown) {
    if (!value || typeof value !== "object") return false;
    const proto = Object.getPrototypeOf(value);
    return proto === Object.prototype || proto === null;
  }

  function sanitize(value: unknown, depth: number): unknown {
    if (depth > maxDepth) return "[MaxDepth]";
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
      return sanitize(value.value, depth + 1);
    }
    if (isReactive(value)) {
      return "[Reactive]";
    }
    if (Array.isArray(value)) {
      return value
        .slice(0, maxEntries)
        .map((item) => sanitize(item, depth + 1));
    }
    if (typeof value === "object") {
      const obj = value as Record<string, unknown>;
      if (seen.has(obj)) return "[Circular]";
      seen.add(obj);
      if (!isPlainObject(obj)) {
        const name = obj.constructor?.name ?? "Object";
        return `[${name}]`;
      }
      const entries = Object.entries(obj).slice(0, maxEntries);
      const result: Record<string, unknown> = {};
      for (const [key, val] of entries) {
        result[key] = sanitize(val, depth + 1);
      }
      return result;
    }
    return String(value);
  }

  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(input).slice(0, maxEntries)) {
    result[key] = sanitize(value, 0);
  }
  return result;
}

function getRenderNodeIdForCurrentContext() {
  const context = getContext();
  let current = context;
  while (current) {
    const renderNode = current.meta?.renderNode as
      | Parameters<typeof getRenderNodeId>[0]
      | undefined;
    if (renderNode) {
      return getRenderNodeId(renderNode) ?? null;
    }
    current = current.owner;
  }
  return null;
}

function snapshotScope(
  scope: OutputScope,
  renderNodeId: number | null,
): ScopeSnapshot {
  return {
    id: scope.id,
    name: scope.name,
    parentId: scope.parent?.id ?? null,
    ownerSymbolId: scope.ownerSymbol?.id ?? null,
    isMemberScope: scope.isMemberScope,
    renderNodeId,
    metadata: sanitizeMetadata(scope.metadata),
  };
}

function snapshotSymbol(
  symbol: OutputSymbol,
  renderNodeId: number | null,
): SymbolSnapshot {
  return {
    id: symbol.id,
    name: symbol.name,
    originalName: symbol.originalName,
    scopeId: symbol.scope?.id ?? null,
    ownerSymbolId: symbol.ownerSymbol?.id ?? null,
    isMemberSymbol: symbol.isMemberSymbol,
    isTransient: symbol.isTransient,
    isAlias: symbol.isAlias,
    movedToId: symbol.movedTo?.id ?? null,
    renderNodeId,
    metadata: sanitizeMetadata(symbol.metadata),
  };
}

export function registerDebugScope(scope: OutputScope) {
  if (!isDevtoolsEnabled()) return;
  if (scopeWatchers.has(scope.id)) return;
  const renderNodeId = getRenderNodeIdForCurrentContext();
  let previous = snapshotScope(scope, renderNodeId);
  emit({ type: "symbols:scopeAdded", scope: previous });
  const stop = watch(
    () => snapshotScope(scope, renderNodeId),
    (next) => {
      if (!shallowEqual(previous, next)) {
        previous = next;
        emit({ type: "symbols:scopeUpdated", scope: next });
      }
    },
  );
  scopeWatchers.set(scope.id, stop);
}

export function unregisterDebugScope(scope: OutputScope) {
  if (!isDevtoolsEnabled()) return;
  const stop = scopeWatchers.get(scope.id);
  if (stop) stop();
  scopeWatchers.delete(scope.id);
  emit({ type: "symbols:scopeRemoved", id: scope.id });
}

export function registerDebugSymbol(symbol: OutputSymbol) {
  if (!isDevtoolsEnabled()) return;
  if (symbolWatchers.has(symbol.id)) return;
  const renderNodeId = getRenderNodeIdForCurrentContext();
  let previous = snapshotSymbol(symbol, renderNodeId);
  emit({ type: "symbols:symbolAdded", symbol: previous });
  const stop = watch(
    () => snapshotSymbol(symbol, renderNodeId),
    (next) => {
      if (!shallowEqual(previous, next)) {
        previous = next;
        emit({ type: "symbols:symbolUpdated", symbol: next });
      }
    },
  );
  symbolWatchers.set(symbol.id, stop);
}

export function unregisterDebugSymbol(symbol: OutputSymbol) {
  if (!isDevtoolsEnabled()) return;
  const stop = symbolWatchers.get(symbol.id);
  if (stop) stop();
  symbolWatchers.delete(symbol.id);
  emit({ type: "symbols:symbolRemoved", id: symbol.id });
}
