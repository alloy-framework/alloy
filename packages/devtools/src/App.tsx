import { ComponentView } from "@/components/component-view";
import { DiagnosticView } from "@/components/diagnostic-view";
import { EffectsView } from "@/components/effects-view";
import { ErrorBoundary } from "@/components/error-boundary";
import { FileTreePanel } from "@/components/file-tree-panel";
import { FileView } from "@/components/file-view";
import { ProblemsView } from "@/components/problems-view";
import { RenderErrorView } from "@/components/render-error-view";
import { RenderTree, type RenderTreeHandle } from "@/components/render-tree";
import { SidebarSection } from "@/components/sidebar-section";
import { StatusBar, type DebugStatus } from "@/components/status-bar";
import { SymbolTreePanel } from "@/components/symbol-tree-panel";
import { SymbolView } from "@/components/symbol-view";
import { TabBar } from "@/components/tab-bar";
import { Toaster } from "@/components/toaster";
import { TraceView } from "@/components/trace-view";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DebugConnectionContext } from "@/hooks/debug-connection-context";
import { RenderTreeServicesProvider } from "@/hooks/render-tree-services-context";
import { ToastStateProvider } from "@/hooks/toast-state-provider";
import { useDebugConnection } from "@/hooks/use-debug-connection";
import { useDevtoolsAppState } from "@/hooks/use-devtools-app-state";
import { DevtoolsAppStateProvider } from "@/hooks/use-devtools-app-state-context";
import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [filesOpen, setFilesOpen] = useState(true);
  const [symbolsOpen, setSymbolsOpen] = useState(true);
  const [sidebarSplit, setSidebarSplit] = useState(50); // percentage for files section
  const [bottomTab, setBottomTab] = useState<
    "render" | "problems" | "effects" | "trace"
  >("render");
  const [traceScrollToken, setTraceScrollToken] = useState(0);
  const resizeRef = useRef<{ startY: number; startSplit: number } | null>(null);
  const renderTreeRef = useRef<RenderTreeHandle>(null);
  const debugConnection = useDebugConnection();
  const {
    status: debugStatus,
    renderTree,
    renderErrors,
    latestRenderErrorId,
    versionLabel,
    cwd,
  } = debugConnection;
  const appState = useDevtoolsAppState(renderTreeRef, renderTree, setBottomTab);
  const {
    tabs: { activeTab },
  } = appState;
  const {
    tabs: { openDetailTab },
  } = appState;

  useEffect(() => {
    if (!latestRenderErrorId) return;
    const error = renderErrors.get(latestRenderErrorId);
    if (!error) return;
    openDetailTab(latestRenderErrorId, error.name ?? "Error", "error");
  }, [latestRenderErrorId, renderErrors, openDetailTab]);

  const handleResizeStart = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      resizeRef.current = { startY: e.clientY, startSplit: sidebarSplit };

      const handleMouseMove = (e: MouseEvent) => {
        if (!resizeRef.current) return;
        const container = (e.target as HTMLElement).closest(
          "[data-sidebar-sections]",
        )?.parentElement;
        if (!container) return;
        const rect = container.getBoundingClientRect();
        const deltaY = e.clientY - resizeRef.current.startY;
        const deltaPercent = (deltaY / rect.height) * 100;
        const newSplit = Math.min(
          85,
          Math.max(15, resizeRef.current.startSplit + deltaPercent),
        );
        setSidebarSplit(newSplit);
      };

      const handleMouseUp = () => {
        resizeRef.current = null;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [sidebarSplit],
  );

  return (
    <DebugConnectionContext.Provider value={debugConnection}>
      <RenderTreeServicesProvider
        renderTree={renderTree}
        fileToRenderNode={debugConnection.fileToRenderNode}
      >
        <ToastStateProvider>
          <DevtoolsAppStateProvider value={appState}>
            <div className="h-screen w-screen bg-background text-foreground flex flex-col">
              <ResizablePanelGroup direction="horizontal" className="flex-1">
                {/* Left Panel - File Explorer */}
                <ResizablePanel
                  defaultSize="20%"
                  minSize="10%"
                  maxSize="40%"
                  collapsible
                  collapsedSize="0%"
                >
                  <div className="h-full border-r border-border bg-sidebar flex flex-col">
                    <div className="p-2 text-sm font-medium text-sidebar-foreground border-b border-sidebar-border shrink-0">
                      Explorer
                    </div>
                    <div
                      className="flex-1 flex flex-col min-h-0"
                      data-sidebar-sections
                    >
                      <div
                        className="flex flex-col min-h-0"
                        style={{
                          flex:
                            filesOpen && symbolsOpen ? `0 0 ${sidebarSplit}%`
                            : filesOpen ? "1 1 auto"
                            : "0 0 auto",
                        }}
                      >
                        <SidebarSection
                          title="Files"
                          isOpen={filesOpen}
                          onToggle={() => setFilesOpen(!filesOpen)}
                        >
                          <FileTreePanel />
                        </SidebarSection>
                      </div>
                      {filesOpen && symbolsOpen && (
                        <div
                          className="h-0.5 w-full bg-border hover:bg-primary/50 cursor-row-resize shrink-0 relative after:absolute after:inset-x-0 after:h-4 after:-translate-y-1/2 after:top-1/2"
                          onMouseDown={handleResizeStart}
                        />
                      )}
                      <div
                        className="flex flex-col min-h-0"
                        style={{
                          flex:
                            filesOpen && symbolsOpen ?
                              `0 0 ${100 - sidebarSplit}%`
                            : symbolsOpen ? "1 1 auto"
                            : "0 0 auto",
                        }}
                      >
                        <SidebarSection
                          title="Symbols"
                          isOpen={symbolsOpen}
                          onToggle={() => setSymbolsOpen(!symbolsOpen)}
                        >
                          <SymbolTreePanel />
                        </SidebarSection>
                      </div>
                    </div>
                  </div>
                </ResizablePanel>

                <ResizableHandle direction="horizontal" />

                {/* Right Panel - Editor and Tree View */}
                <ResizablePanel defaultSize="80%">
                  <ResizablePanelGroup direction="vertical" className="h-full">
                    {/* Top - File Contents with Tabs */}
                    <ResizablePanel defaultSize="60%" minSize="20%">
                      <div className="h-full flex flex-col">
                        {/* Tab Bar */}
                        <TabBar />
                        {/* Tab Content */}
                        <div className="flex-1 p-4 overflow-auto">
                          <ErrorBoundary>
                            {activeTab ?
                              activeTab.type === "file" ?
                                <FileView />
                              : activeTab.type === "component" ?
                                <ComponentView nodeId={activeTab.id} />
                              : activeTab.type === "error" ?
                                <RenderErrorView errorId={activeTab.id} />
                              : activeTab.type === "diagnostic" ?
                                <DiagnosticView diagnosticId={activeTab.id} />
                              : (
                                activeTab.type === "symbol" ||
                                activeTab.type === "scope"
                              ) ?
                                <SymbolView
                                  tabId={activeTab.id}
                                  tabType={activeTab.type}
                                />
                              : <div className="text-muted-foreground">
                                  <p className="text-sm">
                                    Content for {activeTab.type}: {activeTab.id}
                                  </p>
                                </div>

                            : <div className="text-muted-foreground">
                                Open a file or symbol to view its contents
                              </div>
                            }
                          </ErrorBoundary>
                        </div>
                      </div>
                    </ResizablePanel>

                    <ResizableHandle direction="vertical" />

                    {/* Bottom - Render Tree View */}
                    <ResizablePanel
                      defaultSize="40%"
                      minSize="10%"
                      collapsible
                      collapsedSize="0%"
                    >
                      <Tabs
                        value={bottomTab}
                        onValueChange={(value) => {
                          setBottomTab(
                            value as
                              | "render"
                              | "problems"
                              | "effects"
                              | "trace",
                          );
                          if (value === "trace") {
                            setTraceScrollToken((token) => token + 1);
                          }
                        }}
                        className="h-full border-t border-border flex flex-col gap-0"
                      >
                        <TabsList className="border-b border-border bg-muted/50 rounded-none h-9 px-0 py-0 w-full justify-start">
                          <TabsTrigger
                            value="render"
                            className="flex-none h-9 rounded-none border-none border-r border-border px-3 text-sm font-medium text-muted-foreground hover:bg-accent/50 data-[state=active]:bg-background data-[state=active]:border-b-2 data-[state=active]:border-b-primary data-[state=active]:text-foreground"
                          >
                            Render Tree
                          </TabsTrigger>
                          <TabsTrigger
                            value="problems"
                            className="flex-none h-9 rounded-none border-none border-r border-border px-3 text-sm font-medium text-muted-foreground hover:bg-accent/50 data-[state=active]:bg-background data-[state=active]:border-b-2 data-[state=active]:border-b-primary data-[state=active]:text-foreground"
                          >
                            Problems
                          </TabsTrigger>
                          <TabsTrigger
                            value="effects"
                            className="flex-none h-9 rounded-none border-none border-r border-border px-3 text-sm font-medium text-muted-foreground hover:bg-accent/50 data-[state=active]:bg-background data-[state=active]:border-b-2 data-[state=active]:border-b-primary data-[state=active]:text-foreground"
                          >
                            Effects
                          </TabsTrigger>
                          <TabsTrigger
                            value="trace"
                            className="flex-none h-9 rounded-none border-none border-r border-border px-3 text-sm font-medium text-muted-foreground hover:bg-accent/50 data-[state=active]:bg-background data-[state=active]:border-b-2 data-[state=active]:border-b-primary data-[state=active]:text-foreground"
                          >
                            Trace
                          </TabsTrigger>
                        </TabsList>
                        <TabsContent
                          value="render"
                          className="flex-1 overflow-auto p-1"
                        >
                          <ErrorBoundary>
                            <RenderTree ref={renderTreeRef} />
                          </ErrorBoundary>
                        </TabsContent>
                        <TabsContent
                          value="problems"
                          className="flex-1 overflow-auto"
                        >
                          <ErrorBoundary>
                            <ProblemsView />
                          </ErrorBoundary>
                        </TabsContent>
                        <TabsContent
                          value="effects"
                          className="flex-1 overflow-hidden"
                        >
                          <ErrorBoundary>
                            <EffectsView />
                          </ErrorBoundary>
                        </TabsContent>
                        <TabsContent
                          value="trace"
                          className="flex-1 overflow-auto p-1"
                        >
                          <ErrorBoundary>
                            <TraceView scrollToken={traceScrollToken} />
                          </ErrorBoundary>
                        </TabsContent>
                      </Tabs>
                    </ResizablePanel>
                  </ResizablePanelGroup>
                </ResizablePanel>
              </ResizablePanelGroup>

              {/* Status Bar */}
              <StatusBar
                status={debugStatus as DebugStatus}
                versionLabel={versionLabel}
                cwd={cwd}
              />
              <Toaster />
            </div>
          </DevtoolsAppStateProvider>
        </ToastStateProvider>
      </RenderTreeServicesProvider>
    </DebugConnectionContext.Provider>
  );
}

export default App;
