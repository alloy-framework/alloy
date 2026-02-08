import { formatSourceLocation } from "@/lib/format-source-location";
import type { ServerToClientMessage } from "@alloy-js/core/devtools";

/**
 * Message type categories for filtering, aligned with ALLOY_TRACE phases
 * and devtools message types.
 */
export const MESSAGE_CATEGORIES = {
  debugger: {
    label: "Debugger",
    types: ["debugger:info"],
  },
  render: {
    label: "Render",
    types: [
      "render:reset",
      "render:nodeAdded",
      "render:nodeUpdated",
      "render:nodeRemoved",
    ],
  },
  files: {
    label: "Files",
    types: [
      "files:directoryAdded",
      "files:directoryRemoved",
      "files:fileAdded",
      "files:fileRemoved",
      "files:fileUpdated",
    ],
  },
  symbols: {
    label: "Symbols",
    types: [
      "scope:create",
      "scope:update",
      "scope:delete",
      "symbol:create",
      "symbol:update",
      "symbol:delete",
    ],
  },
  effects: {
    label: "Effects",
    types: [
      "effect:effectAdded",
      "effect:effectUpdated",
      "effect:refAdded",
      "effect:track",
      "effect:trigger",
      "effect:schedule",
    ],
  },
  errors: {
    label: "Errors",
    types: ["render:error"],
  },
} as const;

export type CategoryKey = keyof typeof MESSAGE_CATEGORIES;

export const MESSAGE_LABELS: Record<
  string,
  { summary: string; typeLabel: string }
> = {
  "debugger:info": { summary: "Connected", typeLabel: "Debugger" },
  "render:reset": { summary: "Render tree reset", typeLabel: "Render" },
  "render:nodeAdded": { summary: "Node added", typeLabel: "Node added" },
  "render:nodeUpdated": {
    summary: "Node updated",
    typeLabel: "Node updated",
  },
  "render:nodeRemoved": {
    summary: "Node removed",
    typeLabel: "Node removed",
  },
  "files:directoryAdded": {
    summary: "Directory added",
    typeLabel: "Directory added",
  },
  "files:directoryRemoved": {
    summary: "Directory removed",
    typeLabel: "Directory removed",
  },
  "files:fileAdded": { summary: "File added", typeLabel: "File added" },
  "files:fileRemoved": {
    summary: "File removed",
    typeLabel: "File removed",
  },
  "files:fileUpdated": {
    summary: "File updated",
    typeLabel: "File updated",
  },
  "scope:create": { summary: "Scope added", typeLabel: "Scope added" },
  "scope:update": { summary: "Scope updated", typeLabel: "Scope updated" },
  "scope:delete": { summary: "Scope removed", typeLabel: "Scope removed" },
  "symbol:create": { summary: "Symbol added", typeLabel: "Symbol added" },
  "symbol:update": {
    summary: "Symbol updated",
    typeLabel: "Symbol updated",
  },
  "symbol:delete": {
    summary: "Symbol removed",
    typeLabel: "Symbol removed",
  },
};

export function summarizeMessage(
  message: ServerToClientMessage,
  formatPath: (p: string) => string,
) {
  const msg = message as unknown as Record<string, unknown>;
  const type = String(message.type ?? "");

  const formatLocation = (location?: {
    fileName?: string;
    lineNumber?: number;
    columnNumber?: number;
  }) => formatSourceLocation(location, formatPath);

  // Static labels
  const staticEntry = MESSAGE_LABELS[type];
  if (staticEntry) {
    if (type === "debugger:info") {
      const version = msg.version as string | undefined;
      return `Connected${version ? ` · Alloy v${version}` : ""}`;
    }
    return staticEntry.summary;
  }

  if (type === "render:error") {
    const name = msg.name as string | undefined;
    const errorMsg = msg.message as string | undefined;
    return `${name ?? "Error"}${errorMsg ? ` · ${errorMsg}` : ""}`;
  }

  if (type === "effect:effectAdded") {
    const effect = msg.effect as
      | { id?: number; name?: string; type?: string; createdAt?: any }
      | undefined;
    const location = formatLocation(effect?.createdAt);
    const label = effect?.name ?? effect?.type ?? "effect";
    return `Effect #${effect?.id ?? "?"} · ${label}${location ? ` · ${location}` : ""}`;
  }

  if (type === "effect:effectUpdated") {
    const effect = msg.effect as
      | { id?: number; name?: string; type?: string; lastTriggeredAt?: any }
      | undefined;
    const location = formatLocation(effect?.lastTriggeredAt);
    const label = effect?.name ?? effect?.type ?? "effect";
    return `Effect #${effect?.id ?? "?"} · ${label}${location ? ` · ${location}` : ""}`;
  }

  if (type === "effect:refAdded") {
    const ref = msg.ref as
      | { id?: number; kind?: string; createdAt?: any }
      | undefined;
    const location = formatLocation(ref?.createdAt);
    const label = ref?.kind ?? "ref";
    return `${label} #${ref?.id ?? "?"}${location ? ` · ${location}` : ""}`;
  }

  if (type === "effect:track" || type === "effect:trigger") {
    const edge = msg.edge as
      | {
          type?: string;
          effectId?: number;
          refId?: number;
          targetId?: number;
          targetKind?: string;
          targetLabel?: string;
          targetKey?: string | number;
          location?: any;
        }
      | undefined;
    const messageText = msg.message as string | undefined;
    if (!edge) {
      return `${type}${messageText ? ` · ${messageText}` : ""}`;
    }
    const location = formatLocation(edge?.location);
    const edgeType = edge?.type ?? "edge";
    const targetId = edge?.targetId ?? edge?.refId;
    const targetKind = edge?.targetKind === "target" ? "target" : "ref";
    const baseTargetLabel =
      targetKind === "target" ?
        edge?.targetLabel && edge.targetLabel.length > 0 ?
          edge.targetLabel
        : "target"
      : `ref #${targetId ?? "?"}`;
    const targetKeySuffix =
      edge?.targetKey !== undefined ? `.${edge.targetKey}` : "";
    const targetLabel = `${baseTargetLabel}${targetKeySuffix}`;
    return `${edgeType} · effect #${edge?.effectId ?? "?"} · ${targetLabel}${location ? ` · ${location}` : ""}`;
  }

  return "Debug event";
}

export function summarizeType(message: ServerToClientMessage) {
  const type = String(message.type ?? "");
  const staticEntry = MESSAGE_LABELS[type];
  if (staticEntry) return staticEntry.typeLabel;
  if (type === "render:error") return "Error";
  if (type.startsWith("effect:")) return "Effects";
  return "Debug";
}
