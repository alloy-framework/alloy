import { useDebugConnectionContext } from "@/hooks/debug-connection-context";
import { useDevtoolsAppStateContext } from "@/hooks/devtools-app-state-context";
import {
  MESSAGE_CATEGORIES,
  summarizeMessage,
  summarizeType,
} from "@/lib/trace-utils";
import type { CategoryKey } from "@/lib/trace-utils";
import type { ServerToClientMessage } from "@alloy-js/core/devtools";
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

  const renderLinksForMessage = (message: ServerToClientMessage) => {
    const msg = message as unknown as Record<string, unknown>;
    const type = String(msg.type ?? "");
    const links: Array<{ label: string; onClick: () => void }> = [];

    if (type.startsWith("render:node")) {
      const node = msg.node as
        | { id?: number; name?: string; kind?: string }
        | undefined;
      const id = msg.id as number | undefined;
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
      const path = msg.path as string | undefined;
      if (path) {
        links.push({
          label: formatPath(path),
          onClick: () => openFile(path),
        });
      }
    }

    if (type.startsWith("scope:") || type.startsWith("symbol:")) {
      const symbol = msg.symbol as { id?: number; name?: string } | undefined;
      const scope = msg.scope as { id?: number; name?: string } | undefined;
      const id = msg.id as number | undefined;
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
      const id = msg.id as number | undefined;
      const name = msg.name as string | undefined;
      if (id !== undefined) {
        links.push({
          label: name ?? `Error #${id}`,
          onClick: () => openError(id, name),
        });
      }
      const stack = msg.componentStack as
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
              const summary = summarizeMessage(entry.message, formatPath);
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
