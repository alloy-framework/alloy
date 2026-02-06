import { ComponentStack, type ComponentStackEntry } from "@/components/component-stack";
import { useDebugConnectionContext } from "@/hooks/debug-connection-context";

export interface RenderErrorViewProps {
  errorId: string;
}

export function RenderErrorView({ errorId }: RenderErrorViewProps) {
  const { renderErrors } = useDebugConnectionContext();
  const error = renderErrors.get(errorId);

  if (!error) {
    return (
      <div className="text-xs text-muted-foreground/70">
        No error details available.
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4 text-sm">
      <div className="text-sm text-muted-foreground break-words">
        {error.message}
      </div>

      <div>
        <div className="text-sm font-medium">Code stack</div>
        {error.stack ?
          <pre className="text-sm mt-1 p-2 rounded bg-muted/40 overflow-auto">
            {error.stack}
          </pre>
        : <div className="text-sm text-muted-foreground/70 mt-1">
            No stack available.
          </div>
        }
      </div>

      <div>
        <div className="text-sm font-medium">Component stack</div>
        <ComponentStack entries={error.componentStack.map((entry): ComponentStackEntry => ({
          name: entry.name,
          renderNodeId: entry.renderNodeId,
          props: entry.props,
          source: entry.source?.fileName ? {
            fileName: entry.source.fileName,
            lineNumber: entry.source.lineNumber ?? 0,
            columnNumber: entry.source.columnNumber ?? 0,
          } : undefined,
        }))} />
      </div>
    </div>
  );
}
