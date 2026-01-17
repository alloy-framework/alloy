import type { TreeNode } from "@/components/tree-view";
import type { MouseEvent } from "react";
import { useCallback, useMemo, useState } from "react";

export interface OpenTab {
  id: string;
  label: string;
  type: "file" | "symbol" | "scope" | "component";
}

export interface UseTabsOptions {
  onActivateComponentTab?: (tabId: string) => void;
  onClearSelection?: () => void;
}

export function useTabs(options: UseTabsOptions = {}) {
  const [openTabs, setOpenTabs] = useState<OpenTab[]>([]);
  const [activeTabId, setActiveTabId] = useState<string | null>(null);
  const [tabMenu, setTabMenu] = useState<{
    x: number;
    y: number;
    tabId: string | null;
  } | null>(null);

  const openTab = useCallback((tab: OpenTab) => {
    setOpenTabs((prev) => {
      if (prev.some((existing) => existing.id === tab.id)) return prev;
      return [...prev, tab];
    });
    setActiveTabId(tab.id);
  }, []);

  const handleNodeSelect = useCallback(
    (node: TreeNode, type: "file" | "symbol") => {
      // Only open tabs for leaf nodes (files or symbols, not folders)
      if (node.icon === "folder") return;
      const resolvedType =
        node.icon === "scope" ? "scope" : (type as OpenTab["type"]);

      openTab({ id: node.id, label: node.label, type: resolvedType });
    },
    [openTab],
  );

  const handleTabActivate = useCallback(
    (tabId: string | null) => {
      setActiveTabId(tabId);

      if (!tabId) {
        options.onClearSelection?.();
        return;
      }

      const tab = openTabs.find((t) => t.id === tabId);
      if (!tab) return;

      if (tab.type === "component") {
        options.onActivateComponentTab?.(tab.id);
      }
    },
    [openTabs, options],
  );

  const handleCloseTab = useCallback(
    (tabId: string, e: MouseEvent) => {
      e.stopPropagation();
      const tabIndex = openTabs.findIndex((tab) => tab.id === tabId);
      const newTabs = openTabs.filter((tab) => tab.id !== tabId);
      setOpenTabs(newTabs);

      // If closing the active tab, activate an adjacent one
      if (activeTabId === tabId) {
        if (newTabs.length === 0) {
          handleTabActivate(null);
        } else if (tabIndex >= newTabs.length) {
          handleTabActivate(newTabs[newTabs.length - 1].id);
        } else {
          handleTabActivate(newTabs[tabIndex].id);
        }
      }
    },
    [activeTabId, handleTabActivate, openTabs],
  );

  const closeAllTabs = useCallback(() => {
    setOpenTabs([]);
    setActiveTabId(null);
    options.onClearSelection?.();
  }, [options]);

  const closeOtherTabs = useCallback(() => {
    if (!tabMenu?.tabId) return;
    setOpenTabs((tabs) => tabs.filter((tab) => tab.id === tabMenu.tabId));
    setActiveTabId(tabMenu.tabId);
  }, [tabMenu]);

  const closeTabsToRight = useCallback(() => {
    if (!tabMenu?.tabId) return;
    setOpenTabs((tabs) => {
      const index = tabs.findIndex((tab) => tab.id === tabMenu.tabId);
      if (index === -1) return tabs;
      return tabs.slice(0, index + 1);
    });
    setActiveTabId(tabMenu.tabId);
  }, [tabMenu]);

  const handleTabBarContextMenu = useCallback((e: MouseEvent) => {
    e.preventDefault();
    const target = (e.target as HTMLElement).closest("[data-tab-id]");
    const tabId = target?.getAttribute("data-tab-id") ?? null;
    setTabMenu({ x: e.clientX, y: e.clientY, tabId });
  }, []);

  const openDetailTab = useCallback(
    (id: string, label: string, type: OpenTab["type"]) => {
      openTab({ id, label, type });
    },
    [openTab],
  );

  const activeTab = useMemo(
    () => (activeTabId ? openTabs.find((tab) => tab.id === activeTabId) : null),
    [activeTabId, openTabs],
  );

  return {
    openTabs,
    setOpenTabs,
    activeTabId,
    setActiveTabId,
    tabMenu,
    setTabMenu,
    activeTab,
    openTab,
    handleNodeSelect,
    handleTabActivate,
    handleCloseTab,
    closeAllTabs,
    closeOtherTabs,
    closeTabsToRight,
    handleTabBarContextMenu,
    openDetailTab,
  };
}
