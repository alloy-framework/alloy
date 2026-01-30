import { isReactive, isRef } from "@vue/reactivity";
import {
  emitDevtoolsMessage,
  isDebugEnabled,
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

const STACK_LINE = /\s*at\s+(?:.+?\s+\()?(.+?):(\d+):(\d+)\)?$/;
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

function isVueReactivityLine(line: string) {
  return VUE_REACTIVITY_MARKERS.some((marker) => line.includes(marker));
}

function parseStackLine(
  line: string,
  stack?: string,
): SourceLocation | undefined {
  const match = STACK_LINE.exec(line);
  if (!match) return undefined;
  const [, fileName, lineNumber, columnNumber] = match;
  return {
    fileName,
    lineNumber: Number(lineNumber),
    columnNumber: Number(columnNumber),
    stack,
  };
}

export function captureSourceLocation(
  skipReactives = true,
): SourceLocation | undefined {
  const stack = new Error().stack;
  if (!stack) {
    if (process.env.ALLOY_DEBUG_STRICT === "1") {
      // eslint-disable-next-line no-console
      console.error("Alloy debug: missing stack for source location.");
    }
    return { stack: "" };
  }
  const lines = stack.split("\n").slice(1);
  for (const line of lines) {
    if (STACK_SKIP.some((skip) => line.includes(skip))) continue;
    const parsed = parseStackLine(line, stack);
    if (parsed) return parsed;
  }

  if (skipReactives) {
    for (const line of lines) {
      if (STACK_SKIP.some((skip) => line.includes(skip))) continue;
      if (isVueReactivityLine(line)) continue;
      const parsed = parseStackLine(line, stack);
      if (parsed) return parsed;
    }
  }

  if (process.env.ALLOY_DEBUG_STRICT === "1") {
    // eslint-disable-next-line no-console
    console.error(
      "Alloy debug: unable to resolve source location. Stack:\n",
      stack,
    );
  }
  return { stack };
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
  emitDevtoolsMessage(message);
}

export function updateDebugEffect(
  input: Partial<EffectDebugInfo> & { id: number },
) {
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

export function registerDebugEffect(input: {
  name?: string;
  type?: string;
  createdAt?: SourceLocation;
}): number {
  if (!isDebugEnabled()) return -1;
  const id = effectIdCounter++;
  const info: EffectDebugInfo = {
    id,
    name: input.name,
    type: input.type,
    createdAt: input.createdAt ?? captureSourceLocation(),
  };
  effects.set(id, info);
  emitEffect({ type: traceType(TracePhase.effect.effectAdded), effect: info });
  return id;
}

export function registerDebugRef(input: {
  id: number;
  kind?: string;
  createdAt?: SourceLocation;
  createdByEffectId?: number;
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
}

export function ensureDebugRef(input: { id: number; kind?: string }) {
  if (!isDebugEnabled()) return;
  if (refs.has(input.id)) return;
  registerDebugRef({ id: input.id, kind: input.kind });
}

export function recordEffectTrack(input: {
  effectId: number;
  target: unknown;
  refId?: number;
  targetKey?: string | number;
  location?: SourceLocation;
}) {
  if (!isDebugEnabled()) return;
  const edge: EffectEdgeDebugInfo = {
    id: edgeEventIdCounter++,
    type: "track",
    effectId: input.effectId,
    ...buildEffectTargetInfo({ target: input.target, refId: input.refId }),
    targetKey: input.targetKey,
    location: input.location ?? captureSourceLocation(),
  };
  emitEffect({ type: traceType(TracePhase.effect.track), edge });
}

export function recordEffectTrigger(input: {
  effectId: number;
  target: unknown;
  refId?: number;
  targetKey?: string | number;
  location?: SourceLocation;
  kind?: "trigger" | "triggered-by";
}) {
  if (!isDebugEnabled()) return;
  const edge: EffectEdgeDebugInfo = {
    id: edgeEventIdCounter++,
    type: input.kind ?? "triggered-by",
    effectId: input.effectId,
    ...buildEffectTargetInfo({ target: input.target, refId: input.refId }),
    targetKey: input.targetKey,
    location: input.location ?? captureSourceLocation(),
  };
  emitEffect({ type: traceType(TracePhase.effect.trigger), edge });

  updateDebugEffect({
    id: input.effectId,
    ...(input.refId !== undefined ? { lastTriggeredByRefId: input.refId } : {}),
    lastTriggeredAt: input.location ?? captureSourceLocation(),
  });
}

export function resetEffectsDebugState() {
  effects.clear();
  refs.clear();
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
