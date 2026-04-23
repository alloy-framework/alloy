import { cn } from "@/lib/utils";
import {
  Braces,
  ChevronDown,
  ChevronRight,
  File,
  Folder,
  FolderOpen,
  Tag,
} from "lucide-react";
import { memo, useCallback, useState } from "react";

export interface TreeNode {
  id: string;
  label: string;
  icon?: "file" | "folder" | "symbol" | "scope";
  children?: TreeNode[];
}

export interface TreeViewProps {
  data: TreeNode[];
  className?: string;
  selectedId?: string | null;
  onSelect?: (node: TreeNode) => void;
  onContextMenu?: (node: TreeNode, event: React.MouseEvent) => void;
}

export const TreeView = memo(function TreeView({
  data,
  className,
  selectedId,
  onSelect,
  onContextMenu,
}: TreeViewProps) {
  return (
    <div className={cn("text-sm", className)}>
      {data.map((node) => (
        <TreeNodeItem
          key={node.id}
          node={node}
          level={0}
          selectedId={selectedId}
          onSelect={onSelect}
          onContextMenu={onContextMenu}
        />
      ))}
    </div>
  );
});

interface TreeNodeItemProps {
  node: TreeNode;
  level: number;
  selectedId?: string | null;
  onSelect?: (node: TreeNode) => void;
  onContextMenu?: (node: TreeNode, event: React.MouseEvent) => void;
}

const TreeNodeItem = memo(function TreeNodeItem({
  node,
  level,
  selectedId,
  onSelect,
  onContextMenu,
}: TreeNodeItemProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasChildren = node.children && node.children.length > 0;
  const isSelected = node.id === selectedId;

  const handleClick = useCallback(() => {
    onSelect?.(node);
  }, [node, onSelect]);

  const handleContextMenu = useCallback(
    (event: React.MouseEvent) => {
      onContextMenu?.(node, event);
    },
    [node, onContextMenu],
  );

  const handleToggle = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (hasChildren) {
        setIsExpanded((prev) => !prev);
      }
    },
    [hasChildren],
  );

  const getIcon = () => {
    switch (node.icon) {
      case "folder":
        return isExpanded ?
            <FolderOpen className="size-4 text-yellow-500" />
          : <Folder className="size-4 text-yellow-500" />;
      case "file":
        return <File className="size-4 text-muted-foreground" />;
      case "scope":
        return <Braces className="size-4 text-purple-500" />;
      case "symbol":
        return <Tag className="size-4 text-blue-500" />;
      default:
        return (
          hasChildren ?
            isExpanded ? <FolderOpen className="size-4 text-yellow-500" />
            : <Folder className="size-4 text-yellow-500" />
          : <File className="size-4 text-muted-foreground" />
        );
    }
  };

  return (
    <div>
      <div
        className={cn(
          "flex items-center gap-1 py-0.5 px-1 cursor-pointer hover:bg-sidebar-accent rounded-sm",
          "select-none",
          isSelected && "bg-sidebar-accent text-sidebar-accent-foreground",
        )}
        style={{ paddingLeft: `${level * 12 + 4}px` }}
        onClick={handleClick}
        onContextMenu={handleContextMenu}
      >
        <span
          className="shrink-0 w-4 flex items-center justify-center"
          onClick={handleToggle}
        >
          {hasChildren ?
            isExpanded ?
              <ChevronDown className="size-3" />
            : <ChevronRight className="size-3" />
          : null}
        </span>
        <span className="shrink-0">{getIcon()}</span>
        <span className="truncate">{node.label}</span>
      </div>
      {hasChildren && isExpanded && (
        <div>
          {node.children!.map((child) => (
            <TreeNodeItem
              key={child.id}
              node={child}
              level={level + 1}
              selectedId={selectedId}
              onSelect={onSelect}
              onContextMenu={onContextMenu}
            />
          ))}
        </div>
      )}
    </div>
  );
});
