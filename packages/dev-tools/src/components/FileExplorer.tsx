import React, { useState } from "react";
import { OutputDirectory, OutputFile } from "../types";

interface FileExplorerProps {
  directory: OutputDirectory;
  onFileSelect: (file: OutputFile) => void;
  selectedFile?: OutputFile;
}

interface FileItemProps {
  item: OutputDirectory | OutputFile;
  depth: number;
  onFileSelect: (file: OutputFile) => void;
  selectedFile?: OutputFile;
}

const FileItem: React.FC<FileItemProps> = ({
  item,
  depth,
  onFileSelect,
  selectedFile,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const indent = depth * 16;

  if (item.kind === "file") {
    return (
      <div
        className="explorer-item"
        style={{
          paddingLeft: `${indent}px`,
          cursor: "pointer",
          padding: "4px 8px",
          backgroundColor: selectedFile === item ? "#e3e8ff" : "transparent",
        }}
        onClick={() => onFileSelect(item)}
      >
        📄 {item.path}
      </div>
    );
  }

  return (
    <div>
      <div
        className="explorer-item"
        style={{
          paddingLeft: `${indent}px`,
          cursor: "pointer",
          padding: "4px 8px",
          userSelect: "none",
        }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? "📂" : "📁"} {item.path}
      </div>
      {isExpanded && (
        <div>
          {item.contents.map((child, index) => (
            <FileItem
              key={index}
              item={child}
              depth={depth + 1}
              onFileSelect={onFileSelect}
              selectedFile={selectedFile}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const FileExplorer: React.FC<FileExplorerProps> = ({
  directory,
  onFileSelect,
  selectedFile,
}) => {
  return (
    <div style={{ fontFamily: "monospace", fontSize: "14px" }}>
      <FileItem
        item={directory}
        depth={0}
        onFileSelect={onFileSelect}
        selectedFile={selectedFile}
      />
    </div>
  );
};
