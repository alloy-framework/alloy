import { ComponentView } from "@/components/component-view";
import { FileTreePanel } from "@/components/file-tree-panel";
import { FileView } from "@/components/file-view";
import { RenderTree, type RenderTreeHandle } from "@/components/render-tree";
import { SidebarSection } from "@/components/sidebar-section";
import { StatusBar, type DebugStatus } from "@/components/status-bar";
import { SymbolTreePanel } from "@/components/symbol-tree-panel";
import { SymbolView } from "@/components/symbol-view";
import { TabBar } from "@/components/tab-bar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { DebugConnectionContext } from "@/hooks/debug-connection-context";
import { useDebugConnection } from "@/hooks/use-debug-connection";
import { useDevtoolsAppState } from "@/hooks/use-devtools-app-state";
import { DevtoolsAppStateProvider } from "@/hooks/use-devtools-app-state-context";
import { useCallback, useRef, useState } from "react";

function App() {
  const [filesOpen, setFilesOpen] = useState(true);
  const [symbolsOpen, setSymbolsOpen] = useState(true);
  const [sidebarSplit, setSidebarSplit] = useState(50); // percentage for files section
  const resizeRef = useRef<{ startY: number; startSplit: number } | null>(null);
  const renderTreeRef = useRef<RenderTreeHandle>(null);
  const debugConnection = useDebugConnection();
  const { status: debugStatus, renderTree } = debugConnection;
  const appState = useDevtoolsAppState(renderTreeRef, renderTree);
  const {
    focusRenderNodeById,
    tabs: { activeTab },
  } = appState;

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
                      className="h-1 bg-border hover:bg-primary/50 cursor-row-resize shrink-0"
                      onMouseDown={handleResizeStart}
                    />
                  )}
                  <div
                    className="flex flex-col min-h-0"
                    style={{
                      flex:
                        filesOpen && symbolsOpen ? `0 0 ${100 - sidebarSplit}%`
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
                      {activeTab ?
                        activeTab.type === "file" ?
                          <FileView />
                        : activeTab.type === "component" ?
                          <ComponentView nodeId={activeTab.id} />
                        : (
                          activeTab.type === "symbol" ||
                          activeTab.type === "scope"
                        ) ?
                          <SymbolView
                            tabId={activeTab.id}
                            tabType={activeTab.type}
                            focusRenderNodeById={focusRenderNodeById}
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
                  <div className="h-full border-t border-border flex flex-col">
                    <div className="p-2 text-sm font-medium border-b border-border bg-muted/50 shrink-0">
                      Render Tree
                    </div>
                    <div className="flex-1 overflow-auto p-1">
                      <RenderTree ref={renderTreeRef} />
                    </div>
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>
          </ResizablePanelGroup>

          {/* Status Bar */}
          <StatusBar
            status={debugStatus as DebugStatus}
            versionLabel="Alloy v0.0.0"
          />
        </div>
      </DevtoolsAppStateProvider>
    </DebugConnectionContext.Provider>
  );
}

export default App;
