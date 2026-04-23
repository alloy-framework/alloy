import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight } from "lucide-react";

export interface SidebarSectionProps {
  title: string;
  children?: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

export function SidebarSection({
  title,
  children,
  isOpen,
  onToggle,
  className,
}: SidebarSectionProps) {
  return (
    <div className={cn("flex flex-col min-h-0", isOpen && "flex-1", className)}>
      <button
        onClick={onToggle}
        className="flex items-center gap-1 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-sidebar-foreground hover:bg-sidebar-accent w-full text-left shrink-0 border-b border-sidebar-border"
      >
        {isOpen ?
          <ChevronDown className="size-4" />
        : <ChevronRight className="size-4" />}
        {title}
      </button>
      {isOpen && <div className="flex-1 overflow-auto min-h-0">{children}</div>}
    </div>
  );
}
