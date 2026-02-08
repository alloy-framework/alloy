import { getRenderNodeId } from "./debug/index.js";
import { broadcastDevtoolsMessage } from "./devtools/devtools-server.js";
import { getContext } from "./reactivity.js";
import { getRenderStackSnapshot } from "./render-stack.js";
import type { SourceLocation } from "./runtime/component.js";

export interface DiagnosticStackEntry {
  name: string;
  renderNodeId?: number;
  source?: SourceLocation;
}

export type DiagnosticSeverity = "info" | "warning" | "error";

export interface Diagnostic {
  id: string;
  message: string;
  severity: DiagnosticSeverity;
  source?: SourceLocation;
  componentStack?: DiagnosticStackEntry[];
}

export interface DiagnosticInput {
  message: string;
  severity?: DiagnosticSeverity;
  source?: SourceLocation;
  componentStack?: DiagnosticStackEntry[];
}

export interface DiagnosticHandle {
  dismiss(): void;
}

export class DiagnosticsCollector {
  private entries = new Map<string, Diagnostic>();
  private order: string[] = [];

  emit(input: DiagnosticInput): DiagnosticHandle {
    const componentStack =
      input.componentStack ??
      getRenderStackSnapshot().map((entry) => ({
        name: entry.displayName,
        renderNodeId:
          entry.context?.meta?.renderNode ?
            getRenderNodeId(entry.context.meta.renderNode)
          : undefined,
        source: entry.source,
      }));
    const source = input.source ?? componentStack.at(-1)?.source ?? undefined;
    const id = `diag-${this.order.length + 1}-${Date.now()}`;
    const diagnostic: Diagnostic = {
      id,
      message: input.message,
      severity: input.severity ?? "warning",
      source,
      componentStack,
    };
    this.entries.set(id, diagnostic);
    this.order.push(id);

    // Broadcast updated diagnostics
    this.broadcast();

    return {
      dismiss: () => {
        this.entries.delete(id);
        // Broadcast updated diagnostics after dismissal
        this.broadcast();
      },
    };
  }

  getDiagnostics() {
    return this.order
      .map((id) => this.entries.get(id))
      .filter((entry): entry is Diagnostic => Boolean(entry));
  }

  private broadcast() {
    broadcastDevtoolsMessage({
      type: "diagnostics:report",
      diagnostics: this.getDiagnostics(),
    });
  }
}

const DIAGNOSTICS_META_KEY = "diagnostics";

export function attachDiagnosticsCollector(collector: DiagnosticsCollector) {
  const context = getContext();
  if (!context) return;
  context.meta ??= {};
  context.meta[DIAGNOSTICS_META_KEY] = collector;
}

function getDiagnosticsCollectorFromContext():
  | DiagnosticsCollector
  | undefined {
  let context = getContext();
  while (context) {
    const collector = context.meta?.[DIAGNOSTICS_META_KEY] as
      | DiagnosticsCollector
      | undefined;
    if (collector) return collector;
    context = context.owner;
  }
  return undefined;
}

export function emitDiagnostic(input: DiagnosticInput): DiagnosticHandle {
  const collector = getDiagnosticsCollectorFromContext();
  if (!collector) {
    return {
      dismiss: () => undefined,
    };
  }
  return collector.emit(input);
}

export function reportDiagnostics(collector: DiagnosticsCollector) {
  const diagnostics = collector.getDiagnostics();
  if (diagnostics.length === 0) return;

  for (const diagnostic of diagnostics) {
    const location =
      diagnostic.source ?
        ` (${diagnostic.source.fileName}:${diagnostic.source.lineNumber}:${diagnostic.source.columnNumber})`
      : "";
    const line = `${diagnostic.message}${location}`;
    if (diagnostic.severity === "error") {
      // eslint-disable-next-line no-console
      console.error(line);
    } else if (diagnostic.severity === "warning") {
      // eslint-disable-next-line no-console
      console.warn(line);
    } else {
      // eslint-disable-next-line no-console
      console.log(line);
    }
  }
}
