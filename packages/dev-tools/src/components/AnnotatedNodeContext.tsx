import React, { createContext, useContext, useState } from "react";
import { AnnotatedNode } from "../types";

interface AnnotatedNodeContextType {
  selectedNode: AnnotatedNode | null;
  setSelectedNode: (node: AnnotatedNode | null) => void;
  hoveredNode: AnnotatedNode | null;
  setHoveredNode: (node: AnnotatedNode | null) => void;
}

const AnnotatedNodeContext = createContext<AnnotatedNodeContextType>({
  selectedNode: null,
  setSelectedNode: () => {},
  hoveredNode: null,
  setHoveredNode: () => {},
});

export const AnnotatedNodeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedNode, setSelectedNode] = useState<AnnotatedNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<AnnotatedNode | null>(null);

  return (
    <AnnotatedNodeContext.Provider
      value={{
        selectedNode,
        setSelectedNode,
        hoveredNode,
        setHoveredNode,
      }}
    >
      {children}
    </AnnotatedNodeContext.Provider>
  );
};

export const useAnnotatedNode = () => useContext(AnnotatedNodeContext);
