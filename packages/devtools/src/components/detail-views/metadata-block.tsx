export interface MetadataBlockProps {
  metadata?: Record<string, unknown>;
}

export function MetadataBlock({ metadata }: MetadataBlockProps) {
  if (!metadata || Object.keys(metadata).length === 0) return null;
  return (
    <div className="mt-3">
      <div className="font-medium">Metadata</div>
      <pre className="mt-1 p-2 rounded bg-muted/40 overflow-auto">
        {JSON.stringify(metadata, null, 2)}
      </pre>
    </div>
  );
}
