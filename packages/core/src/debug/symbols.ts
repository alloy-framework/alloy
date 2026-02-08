import { watch } from "@vue/reactivity";
import { getContext, untrack } from "../reactivity.js";
import type { OutputScope } from "../symbols/output-scope.js";
import type { OutputSymbol } from "../symbols/output-symbol.js";
import { getRenderNodeId } from "./render.js";
import { sanitizeRecord } from "./serialize.js";
import {
  emitDevtoolsMessage,
  isDevtoolsEnabled,
  TracePhase,
  traceType,
} from "./trace.js";

interface ScopeSnapshot {
  id: number;
  name: string;
  parentId: number | null;
  ownerSymbolId: number | null;
  isMemberScope: boolean;
  renderNodeId: number | null;
  metadata: Record<string, unknown> | undefined;
  debugInfo: Record<string, unknown> | undefined;
  children: Array<{ id: number; name: string }>;
  spaces: Array<{ key: string; symbols: Array<{ id: number; name: string }> }>;
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
  debugInfo: Record<string, unknown> | undefined;
  memberSpaces: Array<{
    key: string;
    symbols: Array<{ id: number; name: string }>;
  }>;
}

const scopeWatchers = new Map<number, () => void>();
const symbolWatchers = new Map<number, () => void>();

function shallowEqual<T extends object>(a: T, b: T) {
  const aRecord = a as Record<string, unknown>;
  const bRecord = b as Record<string, unknown>;
  const aKeys = Object.keys(aRecord);
  const bKeys = Object.keys(bRecord);
  if (aKeys.length !== bKeys.length) return false;
  for (const key of aKeys) {
    const aValue = aRecord[key];
    const bValue = bRecord[key];
    if (aValue === bValue) continue;
    if (aValue === undefined || bValue === undefined) return false;
    const aType = typeof aValue;
    const bType = typeof bValue;
    if (aType === "object" || bType === "object") {
      if (JSON.stringify(aValue) !== JSON.stringify(bValue)) return false;
    } else if (aValue !== bValue) {
      return false;
    }
  }
  return true;
}

function sanitizeDebugInfo(input: Record<string, unknown> | undefined) {
  return sanitizeRecord(input);
}

function getRenderNodeIdForCurrentContext() {
  return untrack(() => {
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
  });
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
    metadata: sanitizeRecord(scope.metadata),
    debugInfo: sanitizeDebugInfo(scope.debugInfo),
    children: untrack(() =>
      Array.from(scope.children).map((child) => ({
        id: child.id,
        name: child.name,
      })),
    ),
    spaces: untrack(() =>
      scope.spaces.map((space) => ({
        key: space.key,
        symbols: Array.from(space).map((symbol) => ({
          id: symbol.id,
          name: symbol.name,
        })),
      })),
    ),
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
    metadata: sanitizeRecord(symbol.metadata),
    debugInfo: sanitizeDebugInfo(symbol.debugInfo),
    memberSpaces: symbol.memberSpaces.map((space) => ({
      key: space.key,
      symbols: Array.from(space).map((member) => ({
        id: member.id,
        name: member.name,
      })),
    })),
  };
}

export function registerScope(scope: OutputScope) {
  if (!isDevtoolsEnabled()) return;
  if (scopeWatchers.has(scope.id)) return;
  untrack(() => {
    const renderNodeId = getRenderNodeIdForCurrentContext();
    let previous = snapshotScope(scope, renderNodeId);
    emitDevtoolsMessage({
      type: traceType(TracePhase.scope.create),
      scope: previous,
    });
    const stop = watch(
      () => snapshotScope(scope, renderNodeId),
      (next) => {
        if (!shallowEqual(previous, next)) {
          previous = next;
          emitDevtoolsMessage({
            type: traceType(TracePhase.scope.update),
            scope: next,
          });
        }
      },
    );
    scopeWatchers.set(scope.id, stop);
  });
}

export function unregisterScope(scope: OutputScope) {
  if (!isDevtoolsEnabled()) return;
  const stop = scopeWatchers.get(scope.id);
  if (stop) stop();
  scopeWatchers.delete(scope.id);
  emitDevtoolsMessage({
    type: traceType(TracePhase.scope.delete),
    id: scope.id,
  });
}

export function registerSymbol(symbol: OutputSymbol) {
  if (!isDevtoolsEnabled()) return;
  if (symbolWatchers.has(symbol.id)) return;
  untrack(() => {
    const renderNodeId = getRenderNodeIdForCurrentContext();
    let previous = snapshotSymbol(symbol, renderNodeId);
    emitDevtoolsMessage({
      type: traceType(TracePhase.symbol.create),
      symbol: previous,
    });
    const stop = watch(
      () => snapshotSymbol(symbol, renderNodeId),
      (next) => {
        if (!shallowEqual(previous, next)) {
          previous = next;
          emitDevtoolsMessage({
            type: traceType(TracePhase.symbol.update),
            symbol: next,
          });
        }
      },
    );
    symbolWatchers.set(symbol.id, stop);
  });
}

export function unregisterSymbol(symbol: OutputSymbol) {
  if (!isDevtoolsEnabled()) return;
  const stop = symbolWatchers.get(symbol.id);
  if (stop) stop();
  symbolWatchers.delete(symbol.id);
  emitDevtoolsMessage({
    type: traceType(TracePhase.symbol.delete),
    id: symbol.id,
  });
}

/** Stop all watchers and clear tracked state. Called when a new render begins. */
export function reset() {
  for (const stop of scopeWatchers.values()) stop();
  for (const stop of symbolWatchers.values()) stop();
  scopeWatchers.clear();
  symbolWatchers.clear();
}
