import { GripHorizontalIcon, GripVerticalIcon } from "lucide-react";
import {
  Group,
  Panel,
  Separator,
  type GroupProps,
  type PanelProps,
  type SeparatorProps,
} from "react-resizable-panels";

import { cn } from "@/lib/utils";

interface ResizablePanelGroupProps extends Omit<GroupProps, "orientation"> {
  direction: "horizontal" | "vertical";
}

function ResizablePanelGroup({
  className,
  direction,
  ...props
}: ResizablePanelGroupProps) {
  return (
    <Group
      data-slot="resizable-panel-group"
      data-panel-group-direction={direction}
      orientation={direction}
      className={cn(
        "flex h-full w-full",
        direction === "vertical" && "flex-col",
        className,
      )}
      {...props}
    />
  );
}

function ResizablePanel(props: PanelProps) {
  return <Panel data-slot="resizable-panel" {...props} />;
}

interface ResizableHandleProps extends Omit<SeparatorProps, "children"> {
  withHandle?: boolean;
  direction?: "horizontal" | "vertical";
}

function ResizableHandle({
  withHandle,
  direction = "horizontal",
  className,
  ...props
}: ResizableHandleProps) {
  const isVertical = direction === "vertical";

  return (
    <Separator
      data-slot="resizable-handle"
      className={cn(
        "bg-border focus-visible:ring-ring relative flex items-center justify-center focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-hidden",
        isVertical ?
          "h-px w-full cursor-row-resize after:absolute after:inset-x-0 after:h-4 after:-translate-y-1/2 after:top-1/2"
        : "w-px h-full cursor-col-resize after:absolute after:inset-y-0 after:w-4 after:-translate-x-1/2 after:left-1/2",
        className,
      )}
      {...props}
    >
      {withHandle && (
        <div
          className={cn(
            "bg-border z-10 flex items-center justify-center rounded-xs border",
            isVertical ? "h-3 w-4" : "h-4 w-3",
          )}
        >
          {isVertical ?
            <GripHorizontalIcon className="size-2.5" />
          : <GripVerticalIcon className="size-2.5" />}
        </div>
      )}
    </Separator>
  );
}

export { ResizableHandle, ResizablePanel, ResizablePanelGroup };
