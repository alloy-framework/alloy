import { ref, computed } from 'vue'
import { useMenuHighlight } from './useMenuHighlight'
import { getScope, selectedNodeId } from '@/lib/store'
import type { SerializedOutputScope, SerializedOutputSymbol } from '@alloy-js/core/symbols'

export interface Tab {
  id: string
  title: string
  type: 'symbol' | 'scope' | 'file' | 'output' | 'error' | 'component' | 'custom'
  content?: any
  closable?: boolean
}

// Global tab state
const tabs = ref<Tab[]>([])
const activeTabId = ref<string | null>(null)

export function useTabs() {
  const { highlightFile, highlightSymbol, highlightScope, clearHighlight } = useMenuHighlight()

  const activeTab = computed(() => {
    return tabs.value.find((tab) => tab.id === activeTabId.value) || null
  })

  function addTab(tab: Tab) {
    // Check if tab already exists
    const existingTab = tabs.value.find((t) => t.id === tab.id)
    if (existingTab) {
      // Update existing tab and make it active
      Object.assign(existingTab, tab)
      activeTabId.value = tab.id
      highlightTabContent(tab)
      return
    }

    // Add new tab
    tabs.value.push(tab)
    activeTabId.value = tab.id
    highlightTabContent(tab)
  }

  function highlightTabContent(tab: Tab) {
    // Highlight the corresponding item in the menu pane based on tab type
    if (tab.type === 'file' && tab.content) {
      highlightFile(tab.content)
    } else if (tab.type === 'symbol' && tab.content) {
      // For symbols, we need to find the parent scopes to expand them
      const parentScopes = findParentScopes(tab.content)
      highlightSymbol(tab.content, parentScopes)
    } else if (tab.type === 'scope' && tab.content) {
      // For scopes, we need to find the parent scopes to expand them
      const parentScopes = findParentScopes(tab.content)
      highlightScope(tab.content, parentScopes)
    } else if (tab.type === 'component' && tab.content) {
      // Highlight component in the tree by selecting its node
      selectedNodeId.value = tab.content.id
    }
  }

  // Helper function to find parent scopes for a given symbol or scope
  function findParentScopes(
    item: SerializedOutputSymbol | SerializedOutputScope,
  ): SerializedOutputScope[] {
    const parentScopes: SerializedOutputScope[] = []

    // Find the parent scope ID from the item
    let parentScopeId: number | null = null

    if ('scope' in item) {
      // For symbols, get their scope
      parentScopeId = item.scope
    } else if ('parent' in item) {
      // For scopes, get their parent
      parentScopeId = item.parent
    }

    // Traverse up the scope hierarchy
    while (parentScopeId !== null && parentScopeId !== 0) {
      const parentScope = getScope(parentScopeId).value
      if (parentScope) {
        parentScopes.unshift(parentScope) // Add to beginning to maintain order
        parentScopeId = parentScope.parent
      } else {
        break
      }
    }

    return parentScopes
  }

  function setActiveTab(tabId: string) {
    if (tabs.value.find((tab) => tab.id === tabId)) {
      activeTabId.value = tabId
      // Highlight the content when switching tabs
      const tab = tabs.value.find((t) => t.id === tabId)
      if (tab) {
        highlightTabContent(tab)
      }
    }
  }

  function removeTab(tabId: string) {
    const index = tabs.value.findIndex((tab) => tab.id === tabId)
    if (index === -1) return
    const removedTab = tabs.value[index]

    tabs.value.splice(index, 1)
    // If a component tab was closed, clear its highlight
    if (removedTab.type === 'component') {
      selectedNodeId.value = null
    }

    // If the closed tab was active, switch to another tab
    if (activeTabId.value === tabId) {
      if (tabs.value.length > 0) {
        // Switch to the next tab, or the previous one if it was the last
        const newIndex = index < tabs.value.length ? index : index - 1
        activeTabId.value = tabs.value[newIndex]?.id || null
        // Highlight the content of the new active tab
        const newActiveTab = tabs.value[newIndex]
        if (newActiveTab) {
          highlightTabContent(newActiveTab)
        }
      } else {
        activeTabId.value = null
        // Clear highlights and highlight-driven expansion when no tabs are open
        clearHighlight()
      }
    }
  }

  function clearTabs() {
    tabs.value = []
    activeTabId.value = null
  }

  return {
    tabs: computed(() => tabs.value),
    activeTab,
    activeTabId: computed(() => activeTabId.value),
    addTab,
    removeTab,
    setActiveTab,
    clearTabs,
  }
}
