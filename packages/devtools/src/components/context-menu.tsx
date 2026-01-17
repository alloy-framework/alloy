import { cn } from "@/lib/utils";
import { useMemo } from "react";

export interface ContextMenuItem {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export interface ContextMenuPosition {
  x: number;
  y: number;
}

export interface ContextMenuProps {
  menu: ContextMenuPosition | null;
  items: ContextMenuItem[];
  onClose: () => void;
}

export function ContextMenu({ menu, items, onClose }: ContextMenuProps) {
  const visibleItems = useMemo(
    () => items.filter((item) => item.label.trim().length > 0),
    [items],
  );
  if (!menu || visibleItems.length === 0) return null;

  return (
    <div
      className="fixed inset-0 z-50"
      onClick={onClose}
      onContextMenu={(e) => {
        e.preventDefault();
        onClose();
      }}
    >
      <div
        className="absolute bg-popover text-popover-foreground border border-border rounded shadow text-xs py-1"
        style={{ top: menu.y, left: menu.x }}
        onClick={(e) => e.stopPropagation()}
      >
        {visibleItems.map((item) => (
          <button
            key={item.label}
            className={cn(
              "w-full text-left px-3 py-1 hover:bg-accent",
              item.disabled && "opacity-50 pointer-events-none",
            )}
            onClick={() => {
              if (!item.disabled) {
                item.onClick();
              }
              onClose();
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
