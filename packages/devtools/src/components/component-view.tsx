import { ComponentDetails } from "@/components/detail-views";
import { useDebugConnectionContext } from "@/hooks/debug-connection-context";
import { findRenderNodeInTree } from "@/lib/render-tree-utils";

export interface ComponentViewProps {
  nodeId: string;
}

export function ComponentView({ nodeId }: ComponentViewProps) {
  const { renderTree, sendMessage } = useDebugConnectionContext();
  const node = findRenderNodeInTree(renderTree, nodeId);
  if (!node) {
    return (
      <div className="text-xs text-muted-foreground/70">
        No component details available.
      </div>
    );
  }
  const source = node.source;
  const sourceLabel =
    source ?
      `${source.fileName}:${source.lineNumber}:${source.columnNumber}`
    : undefined;
  const sendRerender = (withBreak: boolean) => {
    const id = Number(node.id);
    if (!Number.isFinite(id)) return;
    sendMessage({
      type: withBreak ? "renderTree:rerenderAndBreak" : "renderTree:rerender",
      id,
    });
  };

  return (
    <ComponentDetails
      node={node}
      sourceLabel={sourceLabel}
      onOpenSource={
        source ?
          async () => {
            const normalized = source.fileName.replace(/\\/g, "/");
            const command = `code -g ${normalized}:${source.lineNumber}:${source.columnNumber}`;
            try {
              await navigator.clipboard.writeText(command);
            } catch {
              // swallow; copy is best-effort
            }
          }
        : undefined
      }
      onRerender={() => sendRerender(false)}
      onRerenderAndBreak={() => sendRerender(true)}
    />
  );
}
