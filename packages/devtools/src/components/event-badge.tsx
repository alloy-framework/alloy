import { useState } from "react";

const EVENT_DESCRIPTIONS: Record<string, string> = {
  track: "This effect read from this ref (dependency tracking)",
  trigger: "A ref change caused this effect to re-run",
  "triggered by": "A ref change caused this effect to re-run",
  ran: "This effect executed",
  skipped: "This effect was skipped (no longer active)",
};

const EVENT_COLORS: Record<string, string> = {
  track: "bg-blue-500/15 text-blue-400",
  trigger: "bg-red-500/15 text-red-400",
  "triggered by": "bg-red-500/15 text-red-400",
  ran: "bg-green-500/15 text-green-400",
  skipped: "bg-zinc-500/15 text-zinc-400",
};

export interface EventBadgeProps {
  type: string;
  label: string;
}

export function EventBadge({ type, label }: EventBadgeProps) {
  const [showHelp, setShowHelp] = useState(false);
  const color = EVENT_COLORS[type] ?? "bg-muted text-foreground";
  const description = EVENT_DESCRIPTIONS[type];

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => description && setShowHelp(true)}
      onMouseLeave={() => setShowHelp(false)}
    >
      <span
        className={`inline-block rounded px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide ${color}`}
      >
        {label}
      </span>
      {showHelp && description && (
        <span className="absolute left-0 top-full z-50 mt-1 w-max max-w-[250px] rounded border border-border bg-popover px-2 py-1 text-[10px] text-popover-foreground shadow-md">
          {description}
        </span>
      )}
    </span>
  );
}
