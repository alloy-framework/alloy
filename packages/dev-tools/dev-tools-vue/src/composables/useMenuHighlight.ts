import { ref, computed } from 'vue'
import type { SerializedFileInfo } from '@/lib/types'
import type { SerializedOutputScope, SerializedOutputSymbol } from '@alloy-js/core/symbols'

// State for highlighted items in the menu pane
const highlightedFile = ref<SerializedFileInfo | null>(null)
const highlightedSymbol = ref<SerializedOutputSymbol | null>(null)
const highlightedScope = ref<SerializedOutputScope | null>(null)

// State for expanded items (to reveal the highlighted item)
const expandedFilePaths = ref<Set<string>>(new Set())
const expandedScopeIds = ref<Set<number>>(new Set())
const expandedSymbolIds = ref<Set<number>>(new Set())

// State for manually collapsed items (user override)
const manuallyCollapsedFilePaths = ref<Set<string>>(new Set())
const manuallyCollapsedScopeIds = ref<Set<number>>(new Set())
const manuallyCollapsedSymbolIds = ref<Set<number>>(new Set())

export function useMenuHighlight() {
  // Clear all highlights
  function clearHighlight() {
    highlightedFile.value = null
    highlightedSymbol.value = null
    highlightedScope.value = null
  }

  // Highlight a file and expand its parent directories
  function highlightFile(file: SerializedFileInfo) {
    // Clear previous highlights but preserve manual expansion state
    clearHighlight()

    // Set new highlight
    highlightedFile.value = file

    // Expand all parent directories
    const path = file.path
    for (let i = 0; i < path.length; i++) {
      const partialPath = path.slice(0, i + 1).join('/')
      expandedFilePaths.value.add(partialPath)
    }
  }

  // Highlight a symbol and expand its parent scopes
  function highlightSymbol(
    symbol: SerializedOutputSymbol,
    parentScopes: SerializedOutputScope[] = [],
  ) {
    // Clear previous highlights but preserve manual expansion state
    clearHighlight()

    // Set new highlight
    highlightedSymbol.value = symbol

    // Expand all parent scopes
    parentScopes.forEach((scope) => {
      expandedScopeIds.value.add(scope.id)
    })

    // If the symbol has member scopes, ensure they can be expanded too
    if (symbol.instanceMemberScope) {
      expandedSymbolIds.value.add(symbol.id)
    }
    if (symbol.staticMemberScope) {
      expandedSymbolIds.value.add(symbol.id)
    }
  }

  // Highlight a scope and expand its parent scopes
  function highlightScope(
    scope: SerializedOutputScope,
    parentScopes: SerializedOutputScope[] = [],
  ) {
    // Clear previous highlights but preserve manual expansion state
    clearHighlight()

    // Set new highlight
    highlightedScope.value = scope

    // Expand all parent scopes
    parentScopes.forEach((parentScope) => {
      expandedScopeIds.value.add(parentScope.id)
    })
  }

  // Check if a file is highlighted
  function isFileHighlighted(file: SerializedFileInfo): boolean {
    return highlightedFile.value?.id === file.id
  }

  // Check if a symbol is highlighted
  function isSymbolHighlighted(symbol: SerializedOutputSymbol): boolean {
    return highlightedSymbol.value?.id === symbol.id
  }

  // Check if a scope is highlighted
  function isScopeHighlighted(scope: SerializedOutputScope): boolean {
    return highlightedScope.value?.id === scope.id
  }

  // Check if a file path should be expanded (respecting manual overrides)
  function isFilePathExpanded(path: string[]): boolean {
    const pathString = path.join('/')
    // If manually collapsed, don't expand even if highlight system wants it
    if (manuallyCollapsedFilePaths.value.has(pathString)) {
      return false
    }
    return expandedFilePaths.value.has(pathString)
  }

  // Check if a scope should be expanded (respecting manual overrides)
  function isScopeExpanded(scopeId: number): boolean {
    // If manually collapsed, don't expand even if highlight system wants it
    if (manuallyCollapsedScopeIds.value.has(scopeId)) {
      return false
    }
    return expandedScopeIds.value.has(scopeId)
  }

  // Check if a symbol should be expanded (respecting manual overrides)
  function isSymbolExpanded(symbolId: number): boolean {
    // If manually collapsed, don't expand even if highlight system wants it
    if (manuallyCollapsedSymbolIds.value.has(symbolId)) {
      return false
    }
    return expandedSymbolIds.value.has(symbolId)
  }

  // Manually expand/collapse file path
  function toggleFilePathExpanded(path: string[]) {
    const pathString = path.join('/')
    if (expandedFilePaths.value.has(pathString)) {
      // If currently expanded, collapse it and mark as manually collapsed
      expandedFilePaths.value.delete(pathString)
      manuallyCollapsedFilePaths.value.add(pathString)
    } else {
      // If currently collapsed, expand it and remove from manually collapsed
      expandedFilePaths.value.add(pathString)
      manuallyCollapsedFilePaths.value.delete(pathString)
    }
  }

  // Manually expand/collapse scope
  function toggleScopeExpanded(scopeId: number) {
    if (expandedScopeIds.value.has(scopeId)) {
      // If currently expanded, collapse it and mark as manually collapsed
      expandedScopeIds.value.delete(scopeId)
      manuallyCollapsedScopeIds.value.add(scopeId)
    } else {
      // If currently collapsed, expand it and remove from manually collapsed
      expandedScopeIds.value.add(scopeId)
      manuallyCollapsedScopeIds.value.delete(scopeId)
    }
  }

  // Manually expand/collapse symbol
  function toggleSymbolExpanded(symbolId: number) {
    if (expandedSymbolIds.value.has(symbolId)) {
      // If currently expanded, collapse it and mark as manually collapsed
      expandedSymbolIds.value.delete(symbolId)
      manuallyCollapsedSymbolIds.value.add(symbolId)
    } else {
      // If currently collapsed, expand it and remove from manually collapsed
      expandedSymbolIds.value.add(symbolId)
      manuallyCollapsedSymbolIds.value.delete(symbolId)
    }
  }

  // Initialize expanded state for default tree expansion
  function initializeExpandedState(scopeId: number) {
    // Add scope to expanded set if not manually collapsed
    if (!manuallyCollapsedScopeIds.value.has(scopeId)) {
      expandedScopeIds.value.add(scopeId)
    }
  }

  return {
    // State
    highlightedFile: computed(() => highlightedFile.value),
    highlightedSymbol: computed(() => highlightedSymbol.value),
    highlightedScope: computed(() => highlightedScope.value),

    // Actions
    clearHighlight,
    highlightFile,
    highlightSymbol,
    highlightScope,
    initializeExpandedState,

    // Checkers
    isFileHighlighted,
    isSymbolHighlighted,
    isScopeHighlighted,
    isFilePathExpanded,
    isScopeExpanded,
    isSymbolExpanded,

    // Manual toggles
    toggleFilePathExpanded,
    toggleScopeExpanded,
    toggleSymbolExpanded,
  }
}
