import { isReactive, isRef } from "@vue/reactivity";
import { insertEdge, insertEffect, insertRef } from "./trace-writer.js";
import {
  isDebugEnabled,
  isTraceEnabled,
  logDevtoolsMessage,
  TracePhase,
  traceType,
} from "./trace.js";

// ─────────────────────────────────────────────────────────────────────────────
// Effects debug
// ─────────────────────────────────────────────────────────────────────────────

export interface SourceLocation {
  fileName?: string;
  lineNumber?: number;
  columnNumber?: number;
  stack?: string;
}

export interface EffectDebugInfo {
  id: number;
  name?: string;
  type?: string;
  createdAt?: SourceLocation;
  contextId?: number;
  ownerContextId?: number | null;
  component?: string;
  lastTriggeredByRefId?: number;
  lastTriggeredAt?: SourceLocation;
}

export interface RefDebugInfo {
  id: number;
  kind?: string;
  createdAt?: SourceLocation;
  createdByEffectId?: number;
}

export interface EffectEdgeDebugInfo {
  id: number;
  type: "track" | "trigger" | "triggered-by";
  effectId: number;
  refId?: number;
  targetId?: number;
  targetKind?: "ref" | "target";
  targetLabel?: string;
  targetKey?: string | number;
  location?: SourceLocation;
}

const effects = new Map<number, EffectDebugInfo>();
const refs = new Map<number, RefDebugInfo>();
let effectIdCounter = 1;
let edgeEventIdCounter = 1;
let nonRefTargetIdCounter = 1;
const nonRefTargetIds = new WeakMap<object, number>();
const primitiveTargetIds = new Map<unknown, number>();

const STACK_SKIP = [
  "node:internal",
  "/node_modules/",
  "\\node_modules\\",
  "/@vue/",
  "\\@vue\\",
  "/@alloy-js/",
  "\\@alloy-js\\",
  "/packages/core/src/reactivity",
  "/packages/core/src/devtools/effects-debug",
  "/packages/core/dist/src/reactivity",
  "\\packages\\core\\dist\\src\\reactivity",
  "/packages/core/dist/src/devtools/effects-debug",
  "\\packages\\core\\dist\\src\\devtools\\effects-debug",
  "captureSourceLocation",
];

const VUE_REACTIVITY_MARKERS = [
  "@vue/reactivity",
  "reactivity.esm",
  "reactivity.cjs",
  "reactivity.global",
  "/@vue/",
  "\\@vue\\",
];

// ─────────────────────────────────────────────────────────────────────────────
// Fast source location capture using V8 structured CallSite API
// ─────────────────────────────────────────────────────────────────────────────

// Lazily loaded findSourceMap from node:module
let findSourceMap:
  | ((path: string) =>
      | {
          findEntry: (
            line: number,
            col: number,
          ) =>
            | {
                originalSource: string;
                originalLine: number;
                originalColumn: number;
              }
            | undefined;
        }
      | undefined)
  | undefined;
let findSourceMapLoaded = false;

function loadFindSourceMap() {
  if (findSourceMapLoaded) return;
  findSourceMapLoaded = true;
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const mod = require("node:module");
    if (typeof mod.findSourceMap === "function") {
      findSourceMap = mod.findSourceMap;
    }
  } catch {
    // not available
  }
}

function isSkipFile(fileName: string): boolean {
  for (const skip of STACK_SKIP) {
    if (fileName.includes(skip)) return true;
  }
  return false;
}

function isVueReactivityFile(fileName: string): boolean {
  for (const marker of VUE_REACTIVITY_MARKERS) {
    if (fileName.includes(marker)) return true;
  }
  return false;
}

function resolveSourceMap(
  fileName: string,
  line: number,
  col: number,
): { fileName: string; line: number; col: number } {
  if (!findSourceMap) return { fileName, line, col };
  const map = findSourceMap(fileName);
  if (!map) return { fileName, line, col };
  const entry = map.findEntry(line - 1, col - 1);
  if (!entry) return { fileName, line, col };
  return {
    fileName: entry.originalSource,
    line: entry.originalLine + 1,
    col: entry.originalColumn + 1,
  };
}

// V8 structured stack capture — avoids string formatting entirely
const structuredPrepare = (
  _err: Error,
  callSites: NodeJS.CallSite[],
): NodeJS.CallSite[] => callSites;

function captureCallSites(): NodeJS.CallSite[] {
  const orig = Error.prepareStackTrace;
  Error.prepareStackTrace = structuredPrepare;
  const obj: { stack?: NodeJS.CallSite[] } = {};
  Error.captureStackTrace(obj, captureCallSites);
  const sites = obj.stack ?? [];
  Error.prepareStackTrace = orig;
  return sites;
}

export function captureSourceLocation(
  skipReactives = true,
): SourceLocation | undefined {
  if (!isDebugEnabled()) return undefined;
  loadFindSourceMap();

  const sites = captureCallSites();

  // First pass: skip internal/framework frames
  for (const site of sites) {
    const fn = site.getFileName();
    if (!fn) continue;
    if (isSkipFile(fn)) continue;
    if (skipReactives && isVueReactivityFile(fn)) continue;

    const line = site.getLineNumber() ?? 0;
    const col = site.getColumnNumber() ?? 0;
    const resolved = resolveSourceMap(fn, line, col);
    return {
      fileName: resolved.fileName,
      lineNumber: resolved.line,
      columnNumber: resolved.col,
    };
  }

  // Second pass without reactive filter
  if (skipReactives) {
    for (const site of sites) {
      const fn = site.getFileName();
      if (!fn) continue;
      if (isSkipFile(fn)) continue;

      const line = site.getLineNumber() ?? 0;
      const col = site.getColumnNumber() ?? 0;
      const resolved = resolveSourceMap(fn, line, col);
      return {
        fileName: resolved.fileName,
        lineNumber: resolved.line,
        columnNumber: resolved.col,
      };
    }
  }

  return undefined;
}

function getNonRefTargetId(target: unknown): number {
  if (typeof target === "object" && target !== null) {
    const existing = nonRefTargetIds.get(target);
    if (existing) return existing;
    const id = nonRefTargetIdCounter++;
    nonRefTargetIds.set(target, id);
    return id;
  }
  if (typeof target === "function") {
    const existing = nonRefTargetIds.get(target as object);
    if (existing) return existing;
    const id = nonRefTargetIdCounter++;
    nonRefTargetIds.set(target as object, id);
    return id;
  }
  const existing = primitiveTargetIds.get(target);
  if (existing) return existing;
  const id = nonRefTargetIdCounter++;
  primitiveTargetIds.set(target, id);
  return id;
}

function formatNonRefTargetLabel(target: unknown): string {
  if (Array.isArray(target)) return "[]";
  try {
    return String(target);
  } catch {
    return "[Unserializable]";
  }
}

/**
 * Sanitize a Map/object key to ensure it's serializable.
 */
function sanitizeTargetKey(key: unknown): string | number | undefined {
  if (key === undefined) return undefined;
  if (typeof key === "string" || typeof key === "number") return key;
  if (typeof key === "symbol") return key.toString();
  if (typeof key === "object" || typeof key === "function") return "Object";
  return String(key);
}

function buildEffectTargetInfo(input: {
  target: unknown;
  refId?: number;
}): Pick<
  EffectEdgeDebugInfo,
  "refId" | "targetId" | "targetKind" | "targetLabel"
> {
  if (input.refId !== undefined) {
    return {
      refId: input.refId,
      targetId: input.refId,
      targetKind: "ref",
    };
  }

  const targetId = getNonRefTargetId(input.target);
  return {
    targetId,
    targetKind: "target",
    targetLabel: formatNonRefTargetLabel(input.target),
  };
}

function emitEffect(message: { type: string; [key: string]: unknown }) {
  logDevtoolsMessage(message);
}

export function update(input: Partial<EffectDebugInfo> & { id: number }) {
  if (!isDebugEnabled()) return;
  const existing = effects.get(input.id);
  if (!existing) return;
  const next: EffectDebugInfo = { ...existing, ...input };
  effects.set(input.id, next);
  emitEffect({
    type: traceType(TracePhase.effect.effectUpdated),
    effect: next,
  });
}

export function register(input: {
  name?: string;
  type?: string;
  createdAt?: SourceLocation;
  contextId?: number;
  ownerContextId?: number | null;
}): number {
  if (!isDebugEnabled()) return -1;
  const id = effectIdCounter++;
  const info: EffectDebugInfo = {
    id,
    name: input.name,
    type: input.type,
    createdAt: input.createdAt ?? captureSourceLocation(),
    contextId: input.contextId,
    ownerContextId: input.ownerContextId ?? null,
  };
  effects.set(id, info);
  emitEffect({ type: traceType(TracePhase.effect.effectAdded), effect: info });

  if (isTraceEnabled()) {
    insertEffect(
      id,
      input.name,
      input.type,
      input.contextId,
      input.ownerContextId ?? null,
      info.createdAt?.fileName,
      info.createdAt?.lineNumber,
      info.createdAt?.columnNumber,
    );
  }

  return id;
}

export function registerRef(input: {
  id: number;
  kind?: string;
  createdAt?: SourceLocation;
  createdByEffectId?: number;
  isInfrastructure?: boolean;
}) {
  if (!isDebugEnabled()) return;
  if (refs.has(input.id)) return;
  const info: RefDebugInfo = {
    id: input.id,
    kind: input.kind,
    createdAt: input.createdAt ?? captureSourceLocation(),
    createdByEffectId: input.createdByEffectId,
  };
  refs.set(input.id, info);
  emitEffect({ type: traceType(TracePhase.effect.refAdded), ref: info });

  if (isTraceEnabled()) {
    insertRef(
      input.id,
      input.kind,
      input.createdByEffectId,
      info.createdAt?.fileName,
      info.createdAt?.lineNumber,
      info.createdAt?.columnNumber,
    );
  }
}

export function ensureRef(input: { id: number; kind?: string }) {
  if (!isDebugEnabled()) return;
  if (refs.has(input.id)) return;
  registerRef({ id: input.id, kind: input.kind });
}

export function track(input: {
  effectId: number;
  target: unknown;
  refId?: number;
  targetKey?: unknown;
  location?: SourceLocation;
}) {
  if (!isDebugEnabled()) return;
  const edge: EffectEdgeDebugInfo = {
    id: edgeEventIdCounter++,
    type: "track",
    effectId: input.effectId,
    ...buildEffectTargetInfo({ target: input.target, refId: input.refId }),
    targetKey: sanitizeTargetKey(input.targetKey),
    location: input.location,
  };
  emitEffect({ type: traceType(TracePhase.effect.track), edge });

  if (isTraceEnabled()) {
    insertEdge(
      "track",
      input.effectId,
      edge.refId,
      edge.targetId,
      edge.targetKey,
      undefined,
    );
  }
}

export function trigger(input: {
  effectId: number;
  target: unknown;
  refId?: number;
  targetKey?: unknown;
  location?: SourceLocation;
  kind?: "trigger" | "triggered-by";
  causedBy?: number;
}) {
  if (!isDebugEnabled()) return;
  const edge: EffectEdgeDebugInfo = {
    id: edgeEventIdCounter++,
    type: input.kind ?? "trigger",
    effectId: input.effectId,
    ...buildEffectTargetInfo({ target: input.target, refId: input.refId }),
    targetKey: sanitizeTargetKey(input.targetKey),
    location: input.location,
  };
  emitEffect({ type: traceType(TracePhase.effect.trigger), edge });

  if (isTraceEnabled()) {
    insertEdge(
      edge.type,
      input.effectId,
      edge.refId,
      edge.targetId,
      edge.targetKey,
      input.causedBy,
    );
  }

  update({
    id: input.effectId,
    ...(input.refId !== undefined ? { lastTriggeredByRefId: input.refId } : {}),
    lastTriggeredAt: input.location,
  });
}

export function reset() {
  effects.clear();
  refs.clear();
  primitiveTargetIds.clear();
  effectIdCounter = 1;
  edgeEventIdCounter = 1;
  nonRefTargetIdCounter = 1;
}

// Utilities used by other debug sections
export function isRefTarget(value: unknown) {
  return isRef(value);
}

export function isReactiveTarget(value: unknown) {
  return isReactive(value);
}
