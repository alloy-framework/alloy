import type { RenderTreeNode } from "@/components/render-tree";
import { useRenderTreeIndex } from "@/hooks/use-render-tree-index";
import { useRenderTreeQueries } from "@/hooks/use-render-tree-queries";
import { createContext, useContext, type ReactNode } from "react";

export interface RenderTreeServices {
  parentById: Map<string, string | null>;
  liftedFromMap: Map<string, string>;
  nodeById: Map<string, RenderTreeNode>;
  fileNodeToId: Map<string, string>;
  findFileIdForRenderNodeById: (nodeId: string) => string | undefined;
  findLiftedRootForNodeById: (nodeId: string) => string | undefined;
  findRenderNode: (nodeId: string) => RenderTreeNode | undefined;
  collectTextNodesForNode: (
    nodeId: string,
  ) => Array<{ id: string; text: string }>;
}

const RenderTreeServicesContext = createContext<RenderTreeServices | null>(
  null,
);

export interface RenderTreeServicesProviderProps {
  renderTree: RenderTreeNode[];
  fileToRenderNode: Map<string, string>;
  children: ReactNode;
}

export function RenderTreeServicesProvider({
  renderTree,
  fileToRenderNode,
  children,
}: RenderTreeServicesProviderProps) {
  const index = useRenderTreeIndex(renderTree, fileToRenderNode);
  const queries = useRenderTreeQueries(renderTree);

  const value: RenderTreeServices = {
    ...index,
    ...queries,
  };

  return (
    <RenderTreeServicesContext.Provider value={value}>
      {children}
    </RenderTreeServicesContext.Provider>
  );
}

export function useRenderTreeServices(): RenderTreeServices {
  const ctx = useContext(RenderTreeServicesContext);
  if (!ctx) {
    throw new Error(
      "useRenderTreeServices must be used within a RenderTreeServicesProvider",
    );
  }
  return ctx;
}
