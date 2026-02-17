import { isReactive, isRef } from "@vue/reactivity";
import {
  formatReactivePropertyLabel,
  getReactiveCreationLocation,
  nextReactiveId,
} from "../reactivity.js";
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
}

export interface RefDebugInfo {
  id: number;
  kind?: string;
  label?: string;
  createdAt?: SourceLocation;
  createdByEffectId?: number;
  isApproxLocation?: boolean;
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
}

const effects = new Map<number, EffectDebugInfo>();
const refs = new Map<number, RefDebugInfo>();
let effectIdCounter = 1;
let edgeEventIdCounter = 1;
const nonRefTargetIds = new WeakMap<object, number>();
const primitiveTargetIds = new Map<unknown, number>();

// Alloy-internal paths to skip when capturing source locations.
// We skip core infrastructure (reactivity, render, debug, scheduler, etc.)
// but allow component and symbol frames through so the location points at
// the component/symbol that created the effect.
// These patterns match both src/ and dist/src/ paths.
const CORE_INTERNAL_PATHS = [
  "/core/src/reactivity",
  "/core/src/render",
  "/core/src/scheduler",
  "/core/src/debug/",
  "/core/src/devtools/",
  "/core/src/resource",
  "/core/src/context",
  "/core/src/tracer",
  "/core/src/reactive-union-set",
  "/core/src/utils",
  "/core/dist/src/reactivity",
  "/core/dist/src/render",
  "/core/dist/src/scheduler",
  "/core/dist/src/debug/",
  "/core/dist/src/devtools/",
  "/core/dist/src/resource",
  "/core/dist/src/context",
  "/core/dist/src/tracer",
  "/core/dist/src/reactive-union-set",
  "/core/dist/src/utils",
];

const STACK_SKIP = [
  "node:internal",
  "/@vue/",
  "\\@vue\\",
  "captureSourceLocation",
  ...CORE_INTERNAL_PATHS,
  ...CORE_INTERNAL_PATHS.map((p) => p.replace(/\//g, "\\")),
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
let realpathSync: ((path: string) => string) | undefined;
// Cache realpath lookups to avoid repeated fs calls
const realpathCache = new Map<string, string>();

function loadFindSourceMap() {
  if (findSourceMapLoaded) return;
  findSourceMapLoaded = true;
  // process.getBuiltinModule works in both ESM and CJS contexts
  try {
    const mod = process.getBuiltinModule?.("node:module") as
      | typeof import("node:module")
      | undefined;
    if (mod && typeof mod.findSourceMap === "function") {
      findSourceMap = mod.findSourceMap as typeof findSourceMap;
    }
  } catch {
    // not available
  }
  try {
    const fs = process.getBuiltinModule?.("node:fs") as
      | typeof import("node:fs")
      | undefined;
    if (fs) {
      realpathSync = fs.realpathSync;
    }
  } catch {
    // not available
  }
}

function getRealPath(fileName: string): string {
  if (!realpathSync) return fileName;
  let real = realpathCache.get(fileName);
  if (real === undefined) {
    try {
      real = realpathSync(fileName);
    } catch {
      real = fileName;
    }
    realpathCache.set(fileName, real);
  }
  return real;
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
  // pnpm uses symlinks; findSourceMap only matches the real path
  const real = getRealPath(fileName);
  const map = findSourceMap(real);
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
    const id = nextReactiveId();
    nonRefTargetIds.set(target, id);
    return id;
  }
  if (typeof target === "function") {
    const existing = nonRefTargetIds.get(target as object);
    if (existing) return existing;
    const id = nextReactiveId();
    nonRefTargetIds.set(target as object, id);
    return id;
  }
  const existing = primitiveTargetIds.get(target);
  if (existing) return existing;
  const id = nextReactiveId();
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
  isApproxLocation?: boolean;
  label?: string;
}) {
  if (!isDebugEnabled()) return;
  if (refs.has(input.id)) return;
  const info: RefDebugInfo = {
    id: input.id,
    kind: input.kind,
    createdAt: input.createdAt ?? captureSourceLocation(),
    createdByEffectId: input.createdByEffectId,
    label: input.label,
    isApproxLocation: input.isApproxLocation,
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
      input.label,
      input.isApproxLocation,
    );
  }
}

export function ensureRef(input: { id: number; kind?: string }) {
  if (!isDebugEnabled()) return;
  if (refs.has(input.id)) return;
  registerRef({ id: input.id, kind: input.kind });
}

export function ensureReactivePropertyRef(input: {
  id: number;
  target: object;
  key: string | number;
}) {
  if (!isDebugEnabled()) return;
  if (refs.has(input.id)) return;
  const label = formatReactivePropertyLabel(input.target, input.key);
  const createdAt = getReactiveCreationLocation(input.target);
  // If the reactive wasn't created via alloy's shallowReactive wrapper,
  // createdAt is undefined and registerRef falls back to captureSourceLocation
  // (the first track site). Flag this as approximate.
  const isApproxLocation = !createdAt;
  registerRef({
    id: input.id,
    kind: "reactive-property",
    label,
    createdAt,
    isApproxLocation,
  });
}

export function track(input: {
  effectId: number;
  target: unknown;
  refId?: number;
  targetKey?: unknown;
}) {
  if (!isDebugEnabled()) return;
  const edge: EffectEdgeDebugInfo = {
    id: edgeEventIdCounter++,
    type: "track",
    effectId: input.effectId,
    ...buildEffectTargetInfo({ target: input.target, refId: input.refId }),
    targetKey: sanitizeTargetKey(input.targetKey),
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
  });
}

export function reset() {
  effects.clear();
  refs.clear();
  primitiveTargetIds.clear();
  effectIdCounter = 1;
  edgeEventIdCounter = 1;
}

// Utilities used by other debug sections
export function isRefTarget(value: unknown) {
  return isRef(value);
}

export function isReactiveTarget(value: unknown) {
  return isReactive(value);
}
