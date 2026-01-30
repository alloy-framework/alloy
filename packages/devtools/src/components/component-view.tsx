import { ComponentDetails } from "@/components/detail-views/component-details.tsx";
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
      <div className="text-sm text-muted-foreground/70">
        No component details available.
      </div>
    );
  }
  const sendRerender = (withBreak: boolean) => {
    const id = Number(node.id);
    if (!Number.isFinite(id)) return;
    sendMessage({
      type: withBreak ? "render:rerenderAndBreak" : "render:rerender",
      id,
    });
  };

  return (
    <ComponentDetails
      node={node}
      onRerender={() => sendRerender(false)}
      onRerenderAndBreak={() => sendRerender(true)}
    />
  );
}
