import { buildRenderTreeView } from "@/lib/debug-tree";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  BATCH_FLUSH_INTERVAL,
  BATCH_FLUSH_INTERVAL_HEAVY,
  createAllDirtyFlags,
  createCleanFlags,
  HEAVY_LOAD_THRESHOLD,
  INITIAL_STATE,
  type DebugConnectionInternalState,
  type DebugConnectionState,
  type DebugConnectionStatus,
  type DirtyFlags,
} from "./debug-connection-types";
import {
  buildFileTree,
  buildSymbolTree,
  createDebugStore,
  processMessage,
  resetDebugStore,
  type PendingState,
} from "./debug-state";
import { createDebugTransport, type DebugTransport } from "./debug-transport";

// Re-export public types so existing consumers keep working
export type {
  DebugConnectionState,
  DebugConnectionStatus,
  EffectDebugInfo,
  EffectEdgeDebugInfo,
  RefDebugInfo,
  RenderErrorComponentStackEntry,
  RenderErrorDetails,
  SourceLocation,
} from "./debug-connection-types";

export function useDebugConnection(): DebugConnectionState {
  // ── React state (one object, one setState per flush) ────────────────────
  const [state, setState] =
    useState<DebugConnectionInternalState>(INITIAL_STATE);

  // ── Mutable data store (lives in a ref, never triggers re-renders) ──────
  const storeRef = useRef(createDebugStore());

  // ── Batching infrastructure ─────────────────────────────────────────────
  const dirtyFlagsRef = useRef<DirtyFlags>(createCleanFlags());
  const pendingRef = useRef<PendingState>({});
  const batchTimerRef = useRef<number | null>(null);
  const isMountedRef = useRef(true);
  const msgCountRef = useRef(0);
  const transportRef = useRef<DebugTransport | null>(null);

  // ── Path formatting (depends on cwd from store) ─────────────────────────
  const normalizeCwd = (value: string) =>
    value.replace(/\\/g, "/").replace(/\/+$/, "");

  const formatPath = useCallback((rawPath: string) => {
    const normalized = rawPath.replace(/^\.\/?/, "").replace(/\\/g, "/");
    const cwdValue =
      storeRef.current.cwd ? normalizeCwd(storeRef.current.cwd) : undefined;
    if (cwdValue) {
      if (normalized === cwdValue) return ".";
      if (normalized.startsWith(`${cwdValue}/`)) {
        return normalized.slice(cwdValue.length + 1);
      }
    }
    return normalized;
  }, []);

  // ── Flush batched state to React ────────────────────────────────────────
  const flushBatchedState = useCallback(() => {
    if (!isMountedRef.current) return;

    const dirty = dirtyFlagsRef.current;
    const pending = pendingRef.current;
    const store = storeRef.current;

    const hasDirty = Object.values(dirty).some(Boolean);
    if (!hasDirty) return;

    msgCountRef.current = 0;

    setState((prev) => {
      const updates: Partial<DebugConnectionInternalState> = {};

      if (dirty.status && pending.status !== undefined) {
        updates.status = pending.status;
      }
      if (dirty.error) {
        updates.error = pending.error;
      }
      if (dirty.renderTree) {
        updates.renderTree = buildRenderTreeView(store.treeState);
      }
      if (dirty.fileTree) {
        updates.fileTree = buildFileTree(store, formatPath);
      }
      if (dirty.symbolTree) {
        updates.symbolTree = buildSymbolTree(store);
      }
      if (dirty.symbolDetails) {
        const next = new Map(prev.symbolDetails);
        for (const [id, symbol] of store.symbols) {
          next.set(`symbol:${id}`, symbol);
        }
        updates.symbolDetails = next;
      }
      if (dirty.scopeDetails) {
        const next = new Map(prev.scopeDetails);
        for (const [id, scope] of store.scopes) {
          next.set(`scope:${id}`, scope);
        }
        updates.scopeDetails = next;
      }
      if (dirty.fileContents) {
        updates.fileContentsVersion = prev.fileContentsVersion + 1;
      }
      if (dirty.fileToRenderNode) {
        updates.fileToRenderNodeVersion = prev.fileToRenderNodeVersion + 1;
      }
      if (dirty.effects) {
        updates.effectsVersion = prev.effectsVersion + 1;
      }
      if (dirty.refs) {
        updates.refsVersion = prev.refsVersion + 1;
      }
      if (dirty.effectEdges) {
        updates.effectEdgesVersion = prev.effectEdgesVersion + 1;
      }
      if (dirty.effectLifecycle) {
        updates.effectLifecycleVersion = prev.effectLifecycleVersion + 1;
      }
      if (dirty.diagnostics && pending.diagnostics !== undefined) {
        updates.diagnostics = pending.diagnostics;
      }
      if (dirty.renderErrors && pending.renderErrors) {
        const merged = new Map(prev.renderErrors);
        for (const [id, error] of pending.renderErrors) {
          merged.set(id, error);
        }
        updates.renderErrors = merged;
      }
      if (dirty.latestRenderErrorId) {
        updates.latestRenderErrorId = pending.latestRenderErrorId;
      }
      if (dirty.versionLabel && pending.versionLabel !== undefined) {
        updates.versionLabel = pending.versionLabel;
      }
      if (dirty.cwd && pending.cwd !== undefined) {
        updates.cwd = pending.cwd;
      }
      if (dirty.sourceMapEnabled && pending.sourceMapEnabled !== undefined) {
        updates.sourceMapEnabled = pending.sourceMapEnabled;
      }

      return { ...prev, ...updates };
    });

    dirtyFlagsRef.current = createCleanFlags();
    pendingRef.current = {};
  }, [formatPath]);

  // ── Schedule a flush ────────────────────────────────────────────────────
  const scheduleBatchFlush = useCallback(() => {
    if (batchTimerRef.current !== null) return;

    const isHeavy = msgCountRef.current > HEAVY_LOAD_THRESHOLD;
    const interval =
      isHeavy ? BATCH_FLUSH_INTERVAL_HEAVY : BATCH_FLUSH_INTERVAL;

    if (typeof requestIdleCallback !== "undefined") {
      batchTimerRef.current = requestIdleCallback(
        () => {
          batchTimerRef.current = null;
          flushBatchedState();
        },
        { timeout: interval * 2 },
      ) as unknown as number;
    } else {
      batchTimerRef.current = window.setTimeout(() => {
        batchTimerRef.current = null;
        flushBatchedState();
      }, interval);
    }
  }, [flushBatchedState]);

  // ── Mark state as dirty and schedule flush ──────────────────────────────
  const markDirty = useCallback(
    (flags: Partial<DirtyFlags>) => {
      msgCountRef.current += 1;
      Object.assign(dirtyFlagsRef.current, flags);
      scheduleBatchFlush();
    },
    [scheduleBatchFlush],
  );

  // ── Effect: create transport, wire callbacks, manage lifecycle ──────────
  useEffect(() => {
    isMountedRef.current = true;

    const transport = createDebugTransport({
      onStatusChange(status: DebugConnectionStatus, error?: string) {
        pendingRef.current.status = status;
        if (error !== undefined) {
          pendingRef.current.error = error;
          markDirty({ status: true, error: true });
        } else {
          markDirty({ status: true });
        }
      },

      onConnected() {
        // Cancel any pending flush from a previous connection
        if (batchTimerRef.current !== null) {
          window.clearTimeout(batchTimerRef.current);
          batchTimerRef.current = null;
        }

        // Reset mutable store
        resetDebugStore(storeRef.current);

        // Reset React state to initial so stale data from previous
        // connection is fully cleared before new messages arrive.
        setState({ ...INITIAL_STATE, status: "connected" });

        // Request initial state for all channels (server auto-subscribes on connect,
        // so this only triggers sending existing SQLite rows for the current state).
        transport.send({
          type: "subscribe",
          channels: [
            "render",
            "effects",
            "refs",
            "edges",
            "symbols",
            "scopes",
            "files",
            "directories",
            "scheduler",
            "diagnostics",
            "errors",
            "lifecycle",
          ],
        });

        // Reset pending state and mark everything dirty
        pendingRef.current = { status: "connected" };
        dirtyFlagsRef.current = createAllDirtyFlags();
        scheduleBatchFlush();
      },

      onMessage(message) {
        const dirtyKeys = processMessage(
          storeRef.current,
          pendingRef.current,
          message,
        );
        if (dirtyKeys.length > 0) {
          const flags: Partial<DirtyFlags> = {};
          for (const key of dirtyKeys) {
            (flags as any)[key] = true;
          }
          markDirty(flags);
        }
      },
    });

    transportRef.current = transport;
    transport.connect();

    return () => {
      isMountedRef.current = false;
      transport.disconnect();
      transportRef.current = null;

      if (batchTimerRef.current !== null) {
        if (typeof cancelIdleCallback !== "undefined") {
          cancelIdleCallback(batchTimerRef.current);
        } else {
          window.clearTimeout(batchTimerRef.current);
        }
        batchTimerRef.current = null;
      }
    };
  }, [markDirty, scheduleBatchFlush]);

  // ── sendMessage (stable reference) ──────────────────────────────────────
  const sendMessage = useMemo(() => {
    return (
      message: import("@alloy-js/core/devtools").ClientToServerMessage,
    ) => {
      transportRef.current?.send(message);
    };
  }, []);

  // ── Return memoized public state ────────────────────────────────────────
  return useMemo(
    () => ({
      ...state,
      fileContents: storeRef.current.files,
      fileToRenderNode: storeRef.current.fileToRenderNode,
      effects: storeRef.current.effects,
      refs: storeRef.current.refs,
      effectEdges: storeRef.current.effectEdges,
      effectLifecycleEvents: storeRef.current.effectLifecycleEvents,
      formatPath,
      sendMessage,
    }),
    [state, formatPath, sendMessage],
  );
}
