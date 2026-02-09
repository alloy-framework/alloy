import { NoneText } from "./none-text";
import { SymbolTable } from "./symbol-table.tsx";

export interface DebugInfoRow {
  label: string;
  value: unknown;
  rawLabel?: boolean;
}

export interface DebugLinkValue {
  type?: string;
  kind?: string;
  id?: number | null;
  label?: string;
  name?: string;
}

export interface DebugLinkOptions {
  onOpenSymbol?: (id: number) => void;
  onOpenScope?: (id: number) => void;
  onOpenRenderNode?: (id: number) => void;
}

export interface DebugSymbolListItem {
  id: number;
  name?: string;
}

export interface DebugScopeListItem {
  id: number;
  name?: string;
}

export function formatDebugLabel(label: string) {
  const formatted = label
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_:]+/g, " ")
    .replace(/-/g, " ")
    .trim();
  if (!formatted) return label;
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

export function buildDebugInfoRows(
  debugInfo: Record<string, unknown> | undefined,
): DebugInfoRow[] {
  if (!debugInfo) return [];
  return Object.entries(debugInfo).map(([label, value]) => ({
    label,
    value,
  }));
}

function isDebugLinkValue(value: unknown): value is DebugLinkValue {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  const type = record.type ?? record.kind;
  if (typeof type !== "string") return false;
  if (!("id" in record)) return false;
  const id = record.id;
  return typeof id === "number" || id === null;
}

function isDebugSymbolList(value: unknown): value is DebugSymbolListItem[] {
  if (!Array.isArray(value)) return false;
  return value.every(
    (entry) =>
      entry &&
      typeof entry === "object" &&
      typeof (entry as { id?: unknown }).id === "number",
  );
}

export function renderDebugLink(
  value: DebugLinkValue,
  options: DebugLinkOptions,
) {
  const id = value.id ?? null;
  const label = value.label ?? value.name ?? (id != null ? `#${id}` : "None");
  if (id === null) {
    return <NoneText />;
  }
  const kind = value.type ?? value.kind;
  const onOpen =
    kind === "symbol" ? options.onOpenSymbol
    : kind === "scope" ? options.onOpenScope
    : kind === "renderNode" ? options.onOpenRenderNode
    : undefined;

  if (!onOpen) return <span>{label}</span>;
  return (
    <a
      className="text-primary underline"
      href="#"
      onClick={(event) => {
        event.preventDefault();
        onOpen(id);
      }}
    >
      {label}
    </a>
  );
}

export function renderDebugValue(value: unknown, options: DebugLinkOptions) {
  if (value === null || value === undefined) return <NoneText />;

  if (isDebugLinkValue(value)) {
    return renderDebugLink(value, options);
  }

  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return <span>{String(value)}</span>;
  }

  if (
    Array.isArray(value) &&
    value.every(
      (entry) =>
        typeof entry === "string" ||
        typeof entry === "number" ||
        typeof entry === "boolean",
    )
  ) {
    return <span>{value.map(String).join(", ")}</span>;
  }

  if (isDebugSymbolList(value)) {
    return <SymbolTable symbols={value} onOpenSymbol={options.onOpenSymbol} />;
  }

  return (
    <pre className="whitespace-pre-wrap break-words">
      {JSON.stringify(value, null, 2)}
    </pre>
  );
}
