import { useDebugConnectionContext } from "@/hooks/debug-connection-context";
import { useDevtoolsAppStateContext } from "@/hooks/devtools-app-state-context";
import { Filter } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

/**
 * Message type categories for filtering, aligned with ALLOY_TRACE phases
 * and devtools message types.
 */
const MESSAGE_CATEGORIES = {
  debugger: {
    label: "Debugger",
    types: ["debugger:info"],
  },
  render: {
    label: "Render",
    types: [
      "render:reset",
      "render:nodeAdded",
      "render:nodeUpdated",
      "render:nodeRemoved",
    ],
  },
  files: {
    label: "Files",
    types: [
      "files:directoryAdded",
      "files:directoryRemoved",
      "files:fileAdded",
      "files:fileRemoved",
      "files:fileUpdated",
    ],
  },
  symbols: {
    label: "Symbols",
    types: [
      "scope:create",
      "scope:update",
      "scope:delete",
      "symbol:create",
      "symbol:update",
      "symbol:delete",
    ],
  },
  effects: {
    label: "Effects",
    types: [
      "effect:effectAdded",
      "effect:effectUpdated",
      "effect:refAdded",
      "effect:track",
      "effect:trigger",
      "effect:schedule",
    ],
  },
  errors: {
    label: "Errors",
    types: ["render:error"],
  },
} as const;

type CategoryKey = keyof typeof MESSAGE_CATEGORIES;

export interface TraceViewProps {
  scrollToken?: number;
}

export function TraceView({ scrollToken }: TraceViewProps) {
  const { traceEntries, formatPath } = useDebugConnectionContext();
  const {
    requestFocusRenderNode,
    tabs: { openDetailTab, openTab },
  } = useDevtoolsAppStateContext();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  // Filter state - all categories enabled by default
  const [enabledCategories, setEnabledCategories] = useState<
    Record<CategoryKey, boolean>
  >(
    () =>
      Object.fromEntries(
        Object.keys(MESSAGE_CATEGORIES).map((key) => [key, true]),
      ) as Record<CategoryKey, boolean>,
  );

  // Build set of enabled message types for fast lookup
  const enabledTypes = useMemo(() => {
    const types = new Set<string>();
    for (const [category, enabled] of Object.entries(enabledCategories)) {
      if (enabled) {
        for (const type of MESSAGE_CATEGORIES[category as CategoryKey].types) {
          types.add(type);
        }
      }
    }
    return types;
  }, [enabledCategories]);

  // Filter trace entries based on enabled categories
  const filteredEntries = useMemo(() => {
    return traceEntries.filter((entry) => {
      const type = String(entry.message.type ?? "");
      return enabledTypes.has(type);
    });
  }, [traceEntries, enabledTypes]);

  const toggleCategory = (category: CategoryKey) => {
    setEnabledCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const enableAll = () => {
    setEnabledCategories(
      Object.fromEntries(
        Object.keys(MESSAGE_CATEGORIES).map((key) => [key, true]),
      ) as Record<CategoryKey, boolean>,
    );
  };

  const disableAll = () => {
    setEnabledCategories(
      Object.fromEntries(
        Object.keys(MESSAGE_CATEGORIES).map((key) => [key, false]),
      ) as Record<CategoryKey, boolean>,
    );
  };

  const enabledCount = Object.values(enabledCategories).filter(Boolean).length;
  const totalCount = Object.keys(MESSAGE_CATEGORIES).length;

  const openRenderNode = (id: number, name?: string) => {
    const nodeId = String(id);
    openDetailTab(nodeId, name ?? `Component #${id}`, "component");
    requestFocusRenderNode(nodeId);
  };

  const openFile = (path: string) => {
    const displayPath = formatPath(path);
    const label = displayPath.split("/").pop() ?? displayPath;
    openTab({ id: path, label, type: "file" });
  };

  const openSymbol = (id: number, name?: string) => {
    openDetailTab(`symbol:${id}`, name ?? `Symbol #${id}`, "symbol");
  };

  const openScope = (id: number, name?: string) => {
    openDetailTab(`scope:${id}`, name ?? `Scope #${id}`, "scope");
  };

  const openError = (id: number, name?: string) => {
    openDetailTab(`error:${id}`, name ?? `Error #${id}`, "error");
  };

  const renderLinksForMessage = (message: Record<string, unknown>) => {
    const type = String(message.type ?? "");
    const links: Array<{ label: string; onClick: () => void }> = [];

    if (type.startsWith("render:node")) {
      const node = message.node as
        | { id?: number; name?: string; kind?: string }
        | undefined;
      const id = message.id as number | undefined;
      if (node?.id !== undefined) {
        links.push({
          label: node.name ?? node.kind ?? `Render node #${node.id}`,
          onClick: () => openRenderNode(node.id!, node.name),
        });
      } else if (id !== undefined) {
        links.push({
          label: `Render node #${id}`,
          onClick: () => openRenderNode(id),
        });
      }
    }

    if (type.startsWith("files:")) {
      const path = (message as any).path as string | undefined;
      if (path) {
        links.push({
          label: formatPath(path),
          onClick: () => openFile(path),
        });
      }
    }

    if (type.startsWith("scope:") || type.startsWith("symbol:")) {
      const symbol = (message as any).symbol as
        | { id?: number; name?: string }
        | undefined;
      const scope = (message as any).scope as
        | { id?: number; name?: string }
        | undefined;
      const id = (message as any).id as number | undefined;
      if (symbol?.id !== undefined) {
        links.push({
          label: symbol.name ?? `Symbol #${symbol.id}`,
          onClick: () => openSymbol(symbol.id!, symbol.name),
        });
      } else if (scope?.id !== undefined) {
        links.push({
          label: scope.name ?? `Scope #${scope.id}`,
          onClick: () => openScope(scope.id!, scope.name),
        });
      } else if (id !== undefined) {
        links.push({
          label: `Entity #${id}`,
          onClick: () => openSymbol(id),
        });
      }
    }

    if (type === "render:error") {
      const id = (message as any).id as number | undefined;
      const name = (message as any).name as string | undefined;
      if (id !== undefined) {
        links.push({
          label: name ?? `Error #${id}`,
          onClick: () => openError(id, name),
        });
      }
      const stack = (message as any).componentStack as
        | Array<{ renderNodeId?: number; name?: string }>
        | undefined;
      if (Array.isArray(stack)) {
        for (const entry of stack) {
          if (entry.renderNodeId !== undefined) {
            links.push({
              label: entry.name ?? `Render node #${entry.renderNodeId}`,
              onClick: () =>
                openRenderNode(entry.renderNodeId!, entry.name ?? undefined),
            });
          }
        }
      }
    }

    return links;
  };

  const formatLocation = (location?: {
    fileName?: string;
    lineNumber?: number;
    columnNumber?: number;
  }) => {
    if (!location?.fileName) return "";
    const normalizedFileName = location.fileName.replace(/^file:\/\//, "");
    const path = formatPath(normalizedFileName);
    const line = location.lineNumber ?? "?";
    const column = location.columnNumber ?? "?";
    return `${path}:${line}:${column}`;
  };

  const summarizeMessage = (message: Record<string, unknown>) => {
    const type = String(message.type ?? "");

    if (type === "debugger:info") {
      const version = (message as any).version as string | undefined;
      return `Connected${version ? ` · Alloy v${version}` : ""}`;
    }

    if (type === "render:reset") {
      return "Render tree reset";
    }

    if (type === "render:nodeAdded") {
      return "Node added";
    }

    if (type === "render:nodeUpdated") {
      return "Node updated";
    }

    if (type === "render:nodeRemoved") {
      return "Node removed";
    }

    if (type === "files:directoryAdded") {
      return "Directory added";
    }

    if (type === "files:directoryRemoved") {
      return "Directory removed";
    }

    if (type === "files:fileAdded") {
      return "File added";
    }

    if (type === "files:fileRemoved") {
      return "File removed";
    }

    if (type === "files:fileUpdated") {
      return "File updated";
    }

    if (type === "scope:create") {
      return "Scope added";
    }

    if (type === "scope:update") {
      return "Scope updated";
    }

    if (type === "scope:delete") {
      return "Scope removed";
    }

    if (type === "symbol:create") {
      return "Symbol added";
    }

    if (type === "symbol:update") {
      return "Symbol updated";
    }

    if (type === "symbol:delete") {
      return "Symbol removed";
    }

    if (type === "render:error") {
      const name = (message as any).name as string | undefined;
      const msg = (message as any).message as string | undefined;
      return `${name ?? "Error"}${msg ? ` · ${msg}` : ""}`;
    }

    if (type === "effect:effectAdded") {
      const effect = (message as any).effect as
        | { id?: number; name?: string; type?: string; createdAt?: any }
        | undefined;
      const location = formatLocation(effect?.createdAt);
      const label = effect?.name ?? effect?.type ?? "effect";
      return `Effect #${effect?.id ?? "?"} · ${label}${location ? ` · ${location}` : ""}`;
    }

    if (type === "effect:effectUpdated") {
      const effect = (message as any).effect as
        | { id?: number; name?: string; type?: string; lastTriggeredAt?: any }
        | undefined;
      const location = formatLocation(effect?.lastTriggeredAt);
      const label = effect?.name ?? effect?.type ?? "effect";
      return `Effect #${effect?.id ?? "?"} · ${label}${location ? ` · ${location}` : ""}`;
    }

    if (type === "effect:refAdded") {
      const ref = (message as any).ref as
        | { id?: number; kind?: string; createdAt?: any }
        | undefined;
      const location = formatLocation(ref?.createdAt);
      const label = ref?.kind ?? "ref";
      return `${label} #${ref?.id ?? "?"}${location ? ` · ${location}` : ""}`;
    }

    if (type === "effect:track" || type === "effect:trigger") {
      const edge = (message as any).edge as
        | {
            type?: string;
            effectId?: number;
            refId?: number;
            targetId?: number;
            targetKind?: string;
            targetLabel?: string;
            targetKey?: string | number;
            location?: any;
          }
        | undefined;
      const messageText = (message as any).message as string | undefined;
      if (!edge) {
        return `${type}${messageText ? ` · ${messageText}` : ""}`;
      }
      const location = formatLocation(edge?.location);
      const edgeType = edge?.type ?? "edge";
      const targetId = edge?.targetId ?? edge?.refId;
      const targetKind = edge?.targetKind === "target" ? "target" : "ref";
      const baseTargetLabel =
        targetKind === "target" ?
          edge?.targetLabel && edge.targetLabel.length > 0 ?
            edge.targetLabel
          : "target"
        : `ref #${targetId ?? "?"}`;
      const targetKeySuffix =
        edge?.targetKey !== undefined ? `.${edge.targetKey}` : "";
      const targetLabel = `${baseTargetLabel}${targetKeySuffix}`;
      return `${edgeType} · effect #${edge?.effectId ?? "?"} · ${targetLabel}${location ? ` · ${location}` : ""}`;
    }

    return "Debug event";
  };

  const summarizeType = (message: Record<string, unknown>) => {
    const type = String(message.type ?? "");
    if (type === "render:nodeAdded") return "Node added";
    if (type === "render:nodeUpdated") return "Node updated";
    if (type === "render:nodeRemoved") return "Node removed";
    if (type === "render:reset") return "Render";
    if (type === "files:directoryAdded") return "Directory added";
    if (type === "files:directoryRemoved") return "Directory removed";
    if (type === "files:fileAdded") return "File added";
    if (type === "files:fileRemoved") return "File removed";
    if (type === "scope:create") return "Scope added";
    if (type === "scope:update") return "Scope updated";
    if (type === "scope:delete") return "Scope removed";
    if (type === "symbol:create") return "Symbol added";
    if (type === "symbol:update") return "Symbol updated";
    if (type === "symbol:delete") return "Symbol removed";
    if (type === "render:error") return "Error";
    if (type === "debugger:info") return "Debugger";
    if (type.startsWith("effect:")) return "Effects";
    return "Debug";
  };

  const scrollToBottom = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    container.scrollTop = container.scrollHeight;
  }, []);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const distanceToBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight;
    setIsAtBottom(distanceToBottom < 24);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [scrollToken, scrollToBottom]);

  useEffect(() => {
    if (isAtBottom) {
      scrollToBottom();
    }
  }, [filteredEntries.length, isAtBottom, scrollToBottom]);

  return (
    <div className="h-full flex flex-col">
      {/* Filter bar */}
      <div className="flex items-center gap-2 px-2 py-1.5 border-b bg-muted/30 shrink-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-1.5 px-2 py-1 text-xs rounded hover:bg-accent transition-colors">
              <Filter className="h-3.5 w-3.5" />
              <span>
                Filter
                {enabledCount < totalCount && (
                  <span className="ml-1 text-muted-foreground">
                    ({enabledCount}/{totalCount})
                  </span>
                )}
              </span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuLabel className="text-xs">
              Message Categories
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {(
              Object.entries(MESSAGE_CATEGORIES) as [
                CategoryKey,
                (typeof MESSAGE_CATEGORIES)[CategoryKey],
              ][]
            ).map(([key, category]) => (
              <DropdownMenuCheckboxItem
                key={key}
                checked={enabledCategories[key]}
                onCheckedChange={() => toggleCategory(key)}
                className="text-xs"
              >
                {category.label}
              </DropdownMenuCheckboxItem>
            ))}
            <DropdownMenuSeparator />
            <div className="flex gap-1 px-2 py-1">
              <button
                onClick={enableAll}
                className="flex-1 text-xs px-2 py-1 rounded hover:bg-accent transition-colors"
              >
                All
              </button>
              <button
                onClick={disableAll}
                className="flex-1 text-xs px-2 py-1 rounded hover:bg-accent transition-colors"
              >
                None
              </button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        <span className="text-xs text-muted-foreground">
          {filteredEntries.length} of {traceEntries.length} entries
        </span>
      </div>
      {/* Trace entries */}
      <div
        ref={containerRef}
        className="flex-1 overflow-auto p-2 text-xs"
        onScroll={handleScroll}
      >
        {filteredEntries.length === 0 ?
          <div className="text-muted-foreground">
            {traceEntries.length === 0 ?
              "No trace entries yet."
            : "No entries match the current filter."}
          </div>
        : <div className="space-y-1">
            {filteredEntries.map((entry) => {
              const links = renderLinksForMessage(entry.message);
              const summary = summarizeMessage(entry.message);
              const typeLabel = summarizeType(entry.message);
              return (
                <div key={entry.id} className="px-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
                      {typeLabel}
                    </span>
                    <span className="text-sm truncate">{summary}</span>
                    {links.length > 0 && (
                      <span className="flex items-center gap-2 flex-wrap">
                        {links.map((link, index) => (
                          <button
                            key={`${entry.id}-link-${index}`}
                            className="text-primary hover:underline"
                            onClick={link.onClick}
                          >
                            {link.label}
                          </button>
                        ))}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        }
      </div>{" "}
    </div>
  );
}
