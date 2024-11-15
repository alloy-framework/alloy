import JsonView from "@uiw/react-json-view";
import React from "react";
import { AnnotatedNode, OutputDirectory, OutputFile } from "../types";
import { ComponentView } from "./ComponentView";
import { AnnotatedNodeProvider, useAnnotatedNode } from "./AnnotatedNodeContext";
import { FileExplorer } from "./FileExplorer";

interface AnnotatedNodeViewerProps {
  node: OutputDirectory;
  depth?: number;
}

const DEPTH = [
  "#f0f4ff", // Level 1 - Very light blue
  "#fff0f4", // Level 2 - Very light pink
  "#f3fff0", // Level 3 - Very light green
  "#fff0fc", // Level 4 - Very light purple
  "#fffaf0", // Level 5 - Very light orange
  "#f0fffc", // Level 6 - Very light cyan
  "#fff0f0", // Level 7 - Very light red
  "#f4f0ff", // Level 8 - Very light violet
  "#f0fff4", // Level 9 - Very light mint
];

// TODO: Reactive contexts
// TODO: Source maps (babel transform)
// TODO: Live transform

const NodeContent: React.FC<{
  item: AnnotatedNode;
  depth: number;
  index: number;
}> = React.memo(({ item, depth, index }) => {
  const { selectedNode, setSelectedNode, hoveredNode, setHoveredNode } =
    useAnnotatedNode();

  if (typeof item === "string") {
    return item;
  }

  if (
    !item.component ||
    item.component === "Provider" ||
    item.component === "Indent"
  ) {
    return item.rendered.map((subItem, index) => (
      <NodeContent key={index} item={subItem} depth={depth} index={index} />
    ));
  }

  const isSelected = item === selectedNode;
  const isHovered = item === hoveredNode;

  return (
    <span
      className="content"
      style={{
        backgroundColor: DEPTH[(depth * (index + 2)) % DEPTH.length],
        outline:
          isSelected ? "2px solid #007bff"
          : isHovered ? "1px solid #ccc"
          : "none",
        cursor: "pointer",
        display: "inline",
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
      {item.rendered.map((subItem, index) => (
        <NodeContent
          key={index}
          item={subItem}
          depth={depth + 1}
          index={index}
        />
      ))}
    </span>
  );
});

const NodeDetails: React.FC = () => {
  const { selectedNode, hoveredNode } = useAnnotatedNode();
  const nodeToShow = selectedNode || hoveredNode;

  if (!nodeToShow) {
    return <div>No element selected</div>;
  }

  if (typeof nodeToShow === "string") {
    return (
      <div>
        <h3 style={{ fontSize: "1em", fontFamily: "monospace" }}>Text Node</h3>
        <pre
          style={{
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            borderRadius: "4px",
          }}
        >
          {nodeToShow}
        </pre>
      </div>
    );
  }

  let jsonView = null;
  // @ts-expect-error
  globalThis.__temp = nodeToShow.props;
  try {
    JSON.stringify(nodeToShow.props);
    jsonView = <JsonView value={nodeToShow.props as any} />;
  } catch {
    jsonView = "Circular references detected, access __temp in dev tools";
  }

  return (
    <div>
      <h3 style={{ fontSize: "1em", fontFamily: "monospace" }}>
        {nodeToShow.component}
      </h3>
      <p className="label">props</p>
      {jsonView}
      <p className="label">context</p>
      <p className="label">source</p>
      <pre>{nodeToShow.implementation}</pre>
    </div>
  );
};

export const AnnotatedNodeViewer: React.FC<AnnotatedNodeViewerProps> = ({
  node,
  depth = 0,
}) => {
  const [selectedFile, setSelectedFile] = React.useState<
    OutputFile | undefined
  >();

  return (
    <AnnotatedNodeProvider>
      <div
        className="element-node-viewer"
        style={{
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <div
          style={{
            display: "flex",
            overflowY: "auto",
            flex: "3",
            padding: "1rem",
            gap: "1rem",
            minHeight: "100px", // Ensure minimum height
          }}
        >
          <div
            className="fileExplorer"
            style={{
              margin: 0,
              minWidth: 300,
              fontFamily: "monospace",
              flex: 0,
              overflowY: "auto",
            }}
          >
            <FileExplorer
              directory={node}
              onFileSelect={setSelectedFile}
              selectedFile={selectedFile}
            />
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            {selectedFile && (
              <div
                style={{
                  padding: "0.5rem",
                  borderBottom: "1px solid #ccc",
                  fontFamily: "monospace",
                  fontSize: "14px",
                  color: "#666",
                }}
              >
                📄 {selectedFile.path}
              </div>
            )}
            <pre
              style={{
                margin: 0,
                padding: "0.5rem",
                border: "1px solid #ccc",
                borderTop: "none",
                overflow: "auto",
                fontFamily: "monospace",
                flex: 1,
              }}
            >
              {selectedFile?.contents.map((item, index) => (
                <React.Fragment key={index}>
                  <NodeContent item={item} depth={depth} index={index} />
                </React.Fragment>
              )) ?? "Select a file!"}
            </pre>
          </div>
        </div>
        <div
          className="gutter"
          style={{
            height: "4px",
            backgroundColor: "#ccc",
            cursor: "row-resize",
            position: "relative",
          }}
          onMouseDown={(e) => {
            const startY = e.clientY;
            const bottomPane = e.currentTarget
              .nextElementSibling as HTMLElement;
            const startHeight = bottomPane.offsetHeight;

            const handleMouseMove = (e: MouseEvent) => {
              const delta = e.clientY - startY;
              const newHeight = Math.max(100, startHeight - delta);
              bottomPane.style.height = `${newHeight}px`;
              bottomPane.style.flex = "none";
            };

            const handleMouseUp = () => {
              document.removeEventListener("mousemove", handleMouseMove);
              document.removeEventListener("mouseup", handleMouseUp);
            };

            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
          }}
        />
        <div
          style={{
            display: "flex",
            minHeight: "100px",
            height: "300px",
            overflowY: "auto",
            borderTop: "1px solid #ccc",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "1rem",
              overflowY: "auto",
              borderRight: "1px solid #dee2e6",
              flex: "1",
            }}
          >
            {selectedFile?.contents.map((item, index) => (
              <ComponentView key={index} item={item} depth={0} index={index} />
            ))}
          </div>
          <div
            style={{
              width: 300,
              padding: "1rem",
              overflowY: "auto",
            }}
          >
            <NodeDetails />
          </div>
        </div>
      </div>
    </AnnotatedNodeProvider>
  );
};
