import {
  debug,
  getRenderNodeId,
  type RenderTreeNodeInfo,
} from "./debug/index.js";
import {
  emitDiagnostic,
  type DiagnosticInput,
  type DiagnosticsCollector,
} from "./diagnostics.js";
import { getRenderStackSnapshot, printRenderStack } from "./render-stack.js";

const notifiedErrors = new WeakSet<object>();

let lastRenderError: {
  error: { name: string; message: string; stack?: string };
  componentStack: Array<{
    name: string;
    props?: Record<string, unknown> | undefined;
    propsSerialized?: string;
    renderNodeId?: number;
    source?: RenderTreeNodeInfo["source"];
  }>;
} | null = null;

function normalizeRenderError(error: unknown): {
  name: string;
  message: string;
  stack?: string;
} {
  if (error instanceof Error) {
    return {
      name: error.name || error.constructor?.name || "Error",
      message: error.message || "",
      stack: error.stack,
    };
  }
  if (error && typeof error === "object") {
    const anyError = error as {
      name?: string;
      message?: string;
      stack?: string;
    };
    return {
      name: anyError.name || "Error",
      message: anyError.message || String(error),
      stack: anyError.stack,
    };
  }
  return {
    name: "Error",
    message: String(error),
  };
}

export function notifyRenderError(
  error: unknown,
  collector?: DiagnosticsCollector,
) {
  if (error && typeof error === "object") {
    if (notifiedErrors.has(error)) return;
    notifiedErrors.add(error);
  }
  if (lastRenderError) return;

  const { name, message, stack } = normalizeRenderError(error);
  const componentStack = getRenderStackSnapshot().map((entry) => {
    const renderNode = entry.context?.meta?.renderNode;
    const renderNodeId = renderNode ? getRenderNodeId(renderNode) : undefined;
    return {
      name: entry.displayName,
      props: entry.props as Record<string, unknown> | undefined,
      renderNodeId,
      source: entry.source,
    };
  });

  // Output to console
  printRenderStack(error);

  // Send to devtools if enabled
  debug.render.error({ name, message, stack }, componentStack);

  // Store for diagnostics
  lastRenderError = { error: { name, message, stack }, componentStack };
  const lastEntry = componentStack.at(-1);
  const diagnostic: DiagnosticInput = {
    severity: "error",
    message: `${name}: ${message}`,
    source: lastEntry?.source,
  };
  if (collector) collector.emit(diagnostic);
  else emitDiagnostic(diagnostic);
}

export function resetRenderErrorState() {
  lastRenderError = null;
}
