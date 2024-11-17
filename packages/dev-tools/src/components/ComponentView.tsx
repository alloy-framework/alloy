import React, { useState } from "react";
import { AnnotatedNode } from "../types";
import { useAnnotatedNode } from "./AnnotatedNodeContext";

interface ComponentViewProps {
  item: AnnotatedNode;
  depth: number;
  index: number;
}

export const ComponentView: React.FC<ComponentViewProps> = ({
  item,
  depth,
  index,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const { selectedNode, setSelectedNode, hoveredNode, setHoveredNode } =
    useAnnotatedNode();

  if (typeof item === "string") {
    return null;
  }

  if (
    !item.component ||
    item.component === "Provider" ||
    item.component === "Indent"
  ) {
    return item.rendered.map((subItem, index) => (
      <ComponentView key={index} item={subItem} depth={depth} index={index} />
    ));
  }

  const isSelected = item === selectedNode;
  const isHovered = item === hoveredNode;
  const hasChildren = item.rendered.some((value) => typeof value !== "string");

  const DEPTH = [
    "#f0f4ff",
    "#fff0f4",
    "#f3fff0",
    "#fff0fc",
    "#fffaf0",
    "#f0fffc",
    "#fff0f0",
    "#f4f0ff",
    "#f0fff4",
  ];

  return (
    <div
      style={{
        backgroundColor: DEPTH[(depth * (index + 2)) % DEPTH.length],
        outline:
          isSelected ? "2px solid #007bff"
          : isHovered ? "1px solid #ccc"
          : "none",
        cursor: "pointer",
        padding: "4px 8px",
        borderRadius: "4px",
        border: "1px solid white",
        marginBottom: "4px",
        fontSize: "0.75rem",
        fontFamily: "monospace",
        minWidth: "max-content",
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (isSelected) {
          setSelectedNode(null);
        } else {
          setSelectedNode(item);
        }
      }}
      onMouseEnter={() => setHoveredNode(item)}
      onMouseLeave={() => setHoveredNode(null)}
    >
      <span style={{ userSelect: "none" }}>
        {hasChildren && (
          <span
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            style={{ marginRight: "8px", cursor: "pointer" }}
          >
            {isExpanded ? "▼" : "▶"}
          </span>
        )}
        <span style={{ color: "#881280" }}>&lt;{item.component}</span>
        {Object.entries(item.props || {}).map(([key, value]) => (
          <span key={key} style={{ marginLeft: "4px" }}>
            <span style={{ color: "#994500" }}>{key}</span>
            <span style={{ color: "#333" }}>=</span>
            <span style={{ color: "#448c27" }}>"{String(value)}"</span>
          </span>
        ))}
        <span style={{ color: "#881280" }}>{hasChildren ? ">" : " />"}</span>
      </span>

      {hasChildren && isExpanded && (
        <div style={{ marginLeft: 16 }}>
          {item.rendered.map((subItem, idx) => (
            <ComponentView
              key={idx}
              item={subItem}
              depth={depth + 1}
              index={idx}
            />
          ))}
        </div>
      )}
    </div>
  );
};
