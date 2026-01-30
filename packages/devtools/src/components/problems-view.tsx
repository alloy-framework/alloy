import { SourceLocationLink } from "@/components/source-location-link";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useDebugConnectionContext } from "@/hooks/debug-connection-context";
import { useDevtoolsAppStateContext } from "@/hooks/devtools-app-state-context";
import { useRenderTreeIndex } from "@/hooks/use-render-tree-index";
import { useState } from "react";

export function ProblemsView() {
  const {
    diagnostics,
    renderErrors,
    formatPath,
    renderTree,
    fileToRenderNode,
  } = useDebugConnectionContext();
  const {
    tabs: { openDetailTab, openTab },
    requestFocusRenderNode,
  } = useDevtoolsAppStateContext();
  const { findFileIdForRenderNodeById } = useRenderTreeIndex(
    renderTree,
    fileToRenderNode,
  );
  const [menuProblem, setMenuProblem] = useState<{
    id: string;
    componentRenderNodeId?: number;
    componentName?: string;
    sourceFileId?: string;
  } | null>(null);

  const renderErrorList = Array.from(renderErrors.values());
  const renderErrorMessages = new Set(
    renderErrorList.map(
      (error) => `${error.name ?? "Error"}: ${error.message ?? ""}`,
    ),
  );
  const filteredDiagnostics = diagnostics.filter((diagnostic) => {
    if (diagnostic.severity === "error") {
      return !renderErrorMessages.has(diagnostic.message);
    }
    return true;
  });
  const problems = [
    ...renderErrorList.map((error) => {
      const source = error.componentStack
        .map((entry) => entry.source)
        .filter(Boolean)
        .find((source) => !source.fileName.includes("@alloy-js"));
      const componentEntry = [...error.componentStack]
        .reverse()
        .find((entry) => entry.renderNodeId !== undefined);
      const sourceFileId =
        componentEntry?.renderNodeId !== undefined ?
          findFileIdForRenderNodeById(String(componentEntry.renderNodeId))
        : undefined;
      return {
        id: error.id,
        kind: "error" as const,
        severity: "error",
        label: error.name ?? "Error",
        message: `${error.name ?? "Error"}: ${error.message ?? ""}`,
        source,
        sourceFileId,
        componentName: componentEntry?.name,
        componentRenderNodeId: componentEntry?.renderNodeId,
      };
    }),
    ...filteredDiagnostics.map((diagnostic) => {
      const stackSource = diagnostic.componentStack
        ?.map((entry) => entry.source)
        .filter(Boolean)
        .find((source) => !source.fileName.includes("@alloy-js"));
      const componentEntry = [...(diagnostic.componentStack ?? [])]
        .reverse()
        .find((entry) => entry.renderNodeId !== undefined);
      const sourceFileId =
        componentEntry?.renderNodeId !== undefined ?
          findFileIdForRenderNodeById(String(componentEntry.renderNodeId))
        : undefined;
      return {
        id: diagnostic.id,
        kind: "diagnostic" as const,
        severity: diagnostic.severity,
        label: "Diagnostic",
        message: diagnostic.message,
        source: diagnostic.source ?? stackSource,
        sourceFileId,
        componentName: componentEntry?.name,
        componentRenderNodeId: componentEntry?.renderNodeId,
      };
    }),
  ];

  return (
    <ContextMenu
      onOpenChange={(open: boolean) => {
        if (!open) setMenuProblem(null);
      }}
    >
      <ContextMenuTrigger asChild>
        <div className="h-full overflow-auto p-3 text-sm">
          {problems.length === 0 ?
            <div className="text-muted-foreground">No problems reported.</div>
          : <div className="rounded border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 text-xs uppercase text-muted-foreground">
                  <tr>
                    <th className="px-3 py-2 text-left">Severity</th>
                    <th className="px-3 py-2 text-left">Message</th>
                    <th className="px-3 py-2 text-left">Component</th>
                    <th className="px-3 py-2 text-left">Source File</th>
                    <th className="px-3 py-2 text-left">Location</th>
                  </tr>
                </thead>
                <tbody>
                  {problems.map((problem) => {
                    const location =
                      problem.source ?
                        `${formatPath(problem.source.fileName)}:${problem.source.lineNumber}:${problem.source.columnNumber}`
                      : "";
                    const sourceFileName =
                      problem.sourceFileId ?
                        (formatPath(problem.sourceFileId).split("/").pop() ??
                        problem.sourceFileId)
                      : "";
                    const severityClass =
                      problem.severity === "error" ? "text-destructive"
                      : problem.severity === "warning" ? "text-amber-600"
                      : "text-muted-foreground";
                    return (
                      <tr
                        key={problem.id}
                        className="border-t border-border hover:bg-muted/30"
                        onContextMenu={() => {
                          setMenuProblem({
                            id: problem.id,
                            componentRenderNodeId:
                              problem.componentRenderNodeId,
                            componentName: problem.componentName,
                            sourceFileId: problem.sourceFileId,
                          });
                        }}
                      >
                        <td
                          className={`px-3 py-2 text-xs uppercase ${severityClass}`}
                        >
                          {problem.severity}
                        </td>
                        <td
                          className="px-3 py-2 cursor-pointer"
                          onClick={() => {
                            if (problem.kind === "error") {
                              openDetailTab(problem.id, problem.label, "error");
                            } else {
                              openDetailTab(
                                problem.id,
                                problem.label,
                                "diagnostic",
                              );
                            }
                          }}
                        >
                          {problem.message}
                        </td>
                        <td className="px-3 py-2">
                          {(
                            problem.componentName &&
                            problem.componentRenderNodeId !== undefined
                          ) ?
                            <button
                              className="text-primary hover:underline text-left"
                              onClick={() => {
                                openDetailTab(
                                  String(problem.componentRenderNodeId),
                                  problem.componentName!,
                                  "component",
                                );
                              }}
                            >
                              {problem.componentName}
                            </button>
                          : <span className="text-muted-foreground">—</span>}
                        </td>
                        <td className="px-3 py-2">
                          {problem.sourceFileId ?
                            <button
                              className="text-primary hover:underline text-left"
                              onClick={() => {
                                const label =
                                  sourceFileName || problem.sourceFileId!;
                                openTab({
                                  id: problem.sourceFileId!,
                                  label,
                                  type: "file",
                                });
                              }}
                            >
                              {sourceFileName}
                            </button>
                          : <span className="text-muted-foreground">—</span>}
                        </td>
                        <td className="px-3 py-2 text-xs">
                          {problem.source ?
                            <SourceLocationLink source={problem.source}>
                              {location}
                            </SourceLocationLink>
                          : <span className="text-muted-foreground">—</span>}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          }
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem
          disabled={!menuProblem?.componentRenderNodeId}
          onSelect={() => {
            if (menuProblem?.componentRenderNodeId !== undefined) {
              requestFocusRenderNode(String(menuProblem.componentRenderNodeId));
            }
          }}
        >
          Go to render tree node
        </ContextMenuItem>
        <ContextMenuItem
          disabled={!menuProblem?.componentRenderNodeId}
          onSelect={() => {
            if (
              menuProblem?.componentRenderNodeId !== undefined &&
              menuProblem?.componentName
            ) {
              openDetailTab(
                String(menuProblem.componentRenderNodeId),
                menuProblem.componentName,
                "component",
              );
              requestFocusRenderNode(String(menuProblem.componentRenderNodeId));
            }
          }}
        >
          Open node
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
