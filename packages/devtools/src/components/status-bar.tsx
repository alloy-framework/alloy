import { cn } from "@/lib/utils";
import { Circle } from "lucide-react";

export type DebugStatus = "connected" | "connecting" | "error" | "disconnected";

export interface StatusBarProps {
  status: DebugStatus;
  versionLabel?: string;
  cwd?: string;
}

const statusLabels: Record<DebugStatus, string> = {
  connected: "Connected",
  connecting: "Connecting",
  error: "Connection Error",
  disconnected: "Disconnected",
};

export function StatusBar({ status, versionLabel, cwd }: StatusBarProps) {
  return (
    <div className="h-6 bg-muted/50 border-t border-border flex items-center justify-between px-3 text-xs text-muted-foreground">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <Circle
            className={cn(
              "size-2.5",
              status === "connected" && "fill-emerald-500 text-emerald-500",
              status === "connecting" && "fill-amber-500 text-amber-500",
              status === "error" && "fill-destructive text-destructive",
              status === "disconnected" &&
                "fill-muted-foreground text-muted-foreground",
            )}
          />
          <span>{statusLabels[status]}</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        {cwd ?
          <span className="truncate max-w-[45vw]">{cwd}</span>
        : null}
        <span>{versionLabel ?? "Alloy v0.0.0"}</span>
      </div>
    </div>
  );
}
