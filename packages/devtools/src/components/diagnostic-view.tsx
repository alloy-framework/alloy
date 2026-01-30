import { ComponentStack } from "@/components/component-stack";
import { useDebugConnectionContext } from "@/hooks/debug-connection-context";

export interface DiagnosticViewProps {
  diagnosticId: string;
}

export function DiagnosticView({ diagnosticId }: DiagnosticViewProps) {
  const { diagnostics, formatPath } = useDebugConnectionContext();
  const diagnostic = diagnostics.find((entry) => entry.id === diagnosticId);

  if (!diagnostic) {
    return (
      <div className="text-sm text-muted-foreground/70">
        No diagnostic details available.
      </div>
    );
  }

  const stackSource = diagnostic.componentStack
    ?.map((entry) => entry.source)
    .filter(Boolean)
    .at(-1);
  const locationSource = diagnostic.source ?? stackSource;
  const location =
    locationSource ?
      `${formatPath(locationSource.fileName)}:${locationSource.lineNumber}:${locationSource.columnNumber}`
    : undefined;

  return (
    <div className="p-4 text-sm space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-sm uppercase tracking-wide text-muted-foreground">
          {diagnostic.severity}
        </span>
        {location && (
          <span className="text-sm text-muted-foreground">{location}</span>
        )}
      </div>
      <div className="text-sm">{diagnostic.message}</div>
      <div>
        <div className="text-sm font-medium">Component stack</div>
        <ComponentStack entries={diagnostic.componentStack ?? []} />
      </div>
    </div>
  );
}
