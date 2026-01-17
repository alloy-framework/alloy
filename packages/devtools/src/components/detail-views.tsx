import type { RenderTreeNode } from "@/components/render-tree";
import type { ReactNode } from "react";

export interface ComponentDetailsProps {
  node: RenderTreeNode;
  onRerender: () => void;
  onRerenderAndBreak: () => void;
  sourceLabel?: string;
  onOpenSource?: () => void;
}

export function ComponentDetails({
  node,
  onRerender,
  onRerenderAndBreak,
  sourceLabel,
  onOpenSource,
}: ComponentDetailsProps) {
  return (
    <div className="p-4">
      <div className="text-sm font-medium">{node.name}</div>
      <div className="text-xs text-muted-foreground">
        Render node #{node.id}
      </div>
      {sourceLabel ?
        <div className="text-xs mt-2">
          {onOpenSource ?
            <button
              className="text-primary hover:underline"
              onClick={onOpenSource}
            >
              {sourceLabel}
            </button>
          : <span>{sourceLabel}</span>}
        </div>
      : <div className="text-xs text-muted-foreground/70 mt-2">
          No source info available.
        </div>
      }
      {node.props && (
        <div className="mt-3 text-xs">
          <div className="font-medium">Props</div>
          <pre className="text-xs mt-1 p-2 rounded bg-muted/40 overflow-auto">
            {typeof node.props === "string" ?
              node.props
            : JSON.stringify(node.props, null, 2)}
          </pre>
        </div>
      )}
      <div className="mt-3 flex gap-2">
        <button
          className="text-xs px-2 py-1 rounded border border-border hover:bg-accent"
          onClick={onRerender}
        >
          Rerender
        </button>
        <button
          className="text-xs px-2 py-1 rounded border border-border hover:bg-accent"
          onClick={onRerenderAndBreak}
        >
          Rerender + Break
        </button>
      </div>
    </div>
  );
}

export interface SymbolDetailsData {
  id: number;
  name?: string;
  originalName?: string;
  renderNodeId?: number | null;
  scopeId?: number | null;
  ownerSymbolId?: number | null;
  isMemberSymbol?: boolean;
  isTransient?: boolean;
  isAlias?: boolean;
  movedToId?: number | null;
  metadata?: Record<string, unknown>;
}

export interface SymbolDetailsProps {
  details: SymbolDetailsData;
  onGoToRenderNode?: () => void;
  onOpenSymbol?: (id: number) => void;
  onOpenScope?: (id: number) => void;
  resolveSymbolName?: (id: number | null | undefined) => string | undefined;
  resolveScopeName?: (id: number | null | undefined) => string | undefined;
}

export function SymbolDetails({
  details,
  onGoToRenderNode,
  onOpenSymbol,
  onOpenScope,
  resolveSymbolName,
  resolveScopeName,
}: SymbolDetailsProps) {
  const scopeName = resolveScopeName?.(details.scopeId);
  const ownerName = resolveSymbolName?.(details.ownerSymbolId);
  const movedName = resolveSymbolName?.(details.movedToId);
  return (
    <div className="p-4">
      <div className="text-sm font-medium">{details.name ?? "(anonymous)"}</div>
      <div className="text-xs text-muted-foreground">Symbol #{details.id}</div>
      <div className="mt-3 text-xs space-y-1">
        {details.originalName && (
          <div>
            <span className="font-medium">Original:</span>{" "}
            {details.originalName}
          </div>
        )}
        {details.isAlias && <div>Alias symbol</div>}
        {details.isTransient && <div>Transient symbol</div>}
        {details.renderNodeId != null && (
          <div>
            Render node #{details.renderNodeId}
            {onGoToRenderNode && (
              <button
                className="ml-2 underline text-xs"
                onClick={onGoToRenderNode}
              >
                Show
              </button>
            )}
          </div>
        )}
        {details.ownerSymbolId != null && (
          <div>
            Owner symbol {ownerName ?? `#${details.ownerSymbolId}`}
            {onOpenSymbol && (
              <button
                className="ml-2 underline text-xs"
                onClick={() => onOpenSymbol(details.ownerSymbolId!)}
              >
                Open
              </button>
            )}
          </div>
        )}
        {details.scopeId != null && (
          <div>
            Scope {scopeName ?? `#${details.scopeId}`}
            {onOpenScope && (
              <button
                className="ml-2 underline text-xs"
                onClick={() => onOpenScope(details.scopeId!)}
              >
                Open
              </button>
            )}
          </div>
        )}
        {details.movedToId != null && (
          <div>
            Moved to {movedName ?? `#${details.movedToId}`}
            {onOpenSymbol && (
              <button
                className="ml-2 underline text-xs"
                onClick={() => onOpenSymbol(details.movedToId!)}
              >
                Open
              </button>
            )}
          </div>
        )}
      </div>
      {details.metadata && (
        <div className="mt-3 text-xs">
          <div className="font-medium">Metadata</div>
          <pre className="text-xs mt-1 p-2 rounded bg-muted/40 overflow-auto">
            {JSON.stringify(details.metadata, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export interface ScopeDetailsData {
  id: number;
  name?: string;
  parentId?: number | null;
  ownerSymbolId?: number | null;
  renderNodeId?: number | null;
  isMemberScope?: boolean;
  isTransient?: boolean;
  metadata?: Record<string, unknown>;
}

export interface ScopeDetailsProps {
  details: ScopeDetailsData;
  onGoToRenderNode?: () => void;
  onOpenSymbol?: (id: number) => void;
  onOpenScope?: (id: number) => void;
  resolveSymbolName?: (id: number | null | undefined) => string | undefined;
  resolveScopeName?: (id: number | null | undefined) => string | undefined;
}

export function ScopeDetails({
  details,
  onGoToRenderNode,
  onOpenSymbol,
  onOpenScope,
  resolveSymbolName,
  resolveScopeName,
}: ScopeDetailsProps) {
  const ownerName = resolveSymbolName?.(details.ownerSymbolId);
  const parentName = resolveScopeName?.(details.parentId);
  return (
    <div className="p-4">
      <div className="text-sm font-medium">
        {details.name ?? `Scope #${details.id}`}
      </div>
      <div className="mt-3 text-xs space-y-1">
        {details.isMemberScope && <div>Member scope</div>}
        {details.isTransient && <div>Transient scope</div>}
        {details.renderNodeId != null && (
          <div>
            Render node #{details.renderNodeId}
            {onGoToRenderNode && (
              <button
                className="ml-2 underline text-xs"
                onClick={onGoToRenderNode}
              >
                Show
              </button>
            )}
          </div>
        )}
        {details.ownerSymbolId != null && (
          <div>
            Owner symbol {ownerName ?? `#${details.ownerSymbolId}`}
            {onOpenSymbol && (
              <button
                className="ml-2 underline text-xs"
                onClick={() => onOpenSymbol(details.ownerSymbolId!)}
              >
                Open
              </button>
            )}
          </div>
        )}
        {details.parentId != null && (
          <div>
            Parent scope {parentName ?? `#${details.parentId}`}
            {onOpenScope && (
              <button
                className="ml-2 underline text-xs"
                onClick={() => onOpenScope(details.parentId!)}
              >
                Open
              </button>
            )}
          </div>
        )}
      </div>
      {details.metadata && (
        <div className="mt-3 text-xs">
          <div className="font-medium">Metadata</div>
          <pre className="text-xs mt-1 p-2 rounded bg-muted/40 overflow-auto">
            {JSON.stringify(details.metadata, null, 2)}
          </pre>
        </div>
      )}
      {onOpenScope && (
        <div className="mt-3">
          <button
            className="text-xs px-2 py-1 rounded border border-border hover:bg-accent"
            onClick={() => onOpenScope(details.id)}
          >
            Open scope
          </button>
        </div>
      )}
    </div>
  );
}

export interface FileViewerProps {
  content: ReactNode;
}

export function FileViewer({ content }: FileViewerProps) {
  return <div className="h-full overflow-auto">{content}</div>;
}
