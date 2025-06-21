<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import TreeNode from './TreeNode.vue'
import { getScope, getSymbol } from '@/lib/store'
import { useTabs } from '@/composables/useTabs'
import { useMenuHighlight } from '@/composables/useMenuHighlight'
import { OutputSymbolFlags } from '@alloy-js/core/symbols'
import type { SerializedOutputScope, SerializedOutputSymbol } from '@alloy-js/core/symbols'
import { formatRefkeys } from '@/utils/formatters'

interface Props {
  scope: SerializedOutputScope
  depth?: number
}

const props = withDefaults(defineProps<Props>(), {
  depth: 0,
})

const { addTab } = useTabs()
const {
  isScopeHighlighted,
  isSymbolHighlighted,
  isScopeExpanded,
  isSymbolExpanded,
  toggleScopeExpanded,
  toggleSymbolExpanded,
} = useMenuHighlight()

// Get symbols in this scope
const scopeSymbols = computed(() => {
  return props.scope.symbols
    .map((id) => getSymbol(id).value)
    .filter(Boolean) as SerializedOutputSymbol[]
})

// Get child scopes
const childScopes = computed(() => {
  return props.scope.children
    .map((id) => getScope(id).value)
    .filter(Boolean) as SerializedOutputScope[]
})

// Auto-expand this scope and its symbols by default (similar to ComponentTree approach)
watch(
  [() => props.scope, () => scopeSymbols.value, () => childScopes.value],
  ([scope, symbols, children]) => {
    if (scope) {
      // Always expand scopes by default (only if not already expanded)
      if (!isScopeExpanded(scope.id)) {
        toggleScopeExpanded(scope.id)
      }

      // Auto-expand all symbols in this scope (only if not already expanded)
      symbols.forEach((symbol) => {
        if (!isSymbolExpanded(symbol.id)) {
          toggleSymbolExpanded(symbol.id)
        }
      })

      // Note: Child scopes will auto-expand themselves when their own SymbolTreeNode is mounted
    }
  },
  { immediate: true },
)

const hasChildren = computed(() => scopeSymbols.value.length > 0 || childScopes.value.length > 0)

// Helper function to get instance member scope
const getInstanceMemberScope = (symbol: SerializedOutputSymbol): SerializedOutputScope | null => {
  if (!symbol.instanceMemberScope) return null
  return getScope(symbol.instanceMemberScope).value || null
}

// Helper function to get static member scope
const getStaticMemberScope = (symbol: SerializedOutputSymbol): SerializedOutputScope | null => {
  if (!symbol.staticMemberScope) return null
  return getScope(symbol.staticMemberScope).value || null
}

// Helper function to check if symbol has member scopes
const hasInstanceMembers = (symbol: SerializedOutputSymbol): boolean => {
  return (
    !!(symbol.flags & OutputSymbolFlags.InstanceMemberContainer) && !!symbol.instanceMemberScope
  )
}

const hasStaticMembers = (symbol: SerializedOutputSymbol): boolean => {
  return !!(symbol.flags & OutputSymbolFlags.StaticMemberContainer) && !!symbol.staticMemberScope
}

const handleScopeToggle = () => {
  if (hasChildren.value) {
    toggleScopeExpanded(props.scope.id)
  }
}

// Check if this scope should be expanded based on highlight system
const shouldScopeBeExpanded = computed(() => {
  return isScopeExpanded(props.scope.id)
})

// Check if this scope is highlighted
const isScopeHighlightedComputed = computed(() => {
  return isScopeHighlighted(props.scope)
})

// Check if a symbol should be expanded
const shouldSymbolBeExpanded = (symbolId: number) => {
  return isSymbolExpanded(symbolId)
}

// Check if a symbol is highlighted
const isSymbolHighlightedComputed = (symbol: SerializedOutputSymbol) => {
  return isSymbolHighlighted(symbol)
}

const handleScopeSelect = () => {
  // Don't pass a fake event - just open the tab directly
  addTab({
    id: `scope-${props.scope.id}`,
    title: props.scope.name,
    type: 'scope',
    content: props.scope,
    closable: true,
  })
}

const handleSymbolToggle = (symbolId: number) => {
  toggleSymbolExpanded(symbolId)
}

const handleSymbolSelect = (symbol: SerializedOutputSymbol) => {
  // Don't pass a fake event - just open the tab directly
  addTab({
    id: `symbol-${symbol.id}`,
    title: symbol.flags & OutputSymbolFlags.Transient ? 'transient' : symbol.name,
    type: 'symbol',
    content: symbol,
    closable: true,
  })
}
</script>

<template>
  <TreeNode
    :title="`📁 ${scope.name}`"
    :subtitle="`(${scope.kind})`"
    :expanded="shouldScopeBeExpanded"
    :has-children="hasChildren"
    :depth="depth"
    :data="scope"
    :selectable="true"
    :click-to-select="false"
    :highlighted="isScopeHighlightedComputed"
    hover-bg-color="hover:bg-blue-50"
    @toggle="handleScopeToggle"
    @select="handleScopeSelect"
  >
    <!-- Content that shows when scope is expanded -->
    <template v-if="shouldScopeBeExpanded">
      <!-- Render symbols in this scope -->
      <div v-for="symbol in scopeSymbols" :key="symbol.id" class="symbol-entry">
        <!-- Symbol itself -->
        <TreeNode
          :subtitle="formatRefkeys(symbol.refkeys)"
          :expanded="shouldSymbolBeExpanded(symbol.id)"
          :has-children="hasInstanceMembers(symbol) || hasStaticMembers(symbol)"
          :depth="depth + 1"
          :data="symbol"
          :selectable="true"
          :click-to-select="false"
          :highlighted="isSymbolHighlightedComputed(symbol)"
          hover-bg-color="hover:bg-green-50"
          @toggle="() => handleSymbolToggle(symbol.id)"
          @select="() => handleSymbolSelect(symbol)"
        >
          <template #title>
            🔷
            <span :class="{ italic: symbol.flags & OutputSymbolFlags.Transient }">
              {{ symbol.flags & OutputSymbolFlags.Transient ? 'transient' : symbol.name }}
            </span>
          </template>
          <!-- Member scopes for this symbol -->
          <template v-if="shouldSymbolBeExpanded(symbol.id)">
            <!-- Instance member scope -->
            <SymbolTreeNode
              v-if="hasInstanceMembers(symbol)"
              :key="`${symbol.id}-instance`"
              :scope="getInstanceMemberScope(symbol)!"
              :depth="depth + 2"
            />

            <!-- Static member scope -->
            <SymbolTreeNode
              v-if="hasStaticMembers(symbol)"
              :key="`${symbol.id}-static`"
              :scope="getStaticMemberScope(symbol)!"
              :depth="depth + 2"
            />
          </template>
        </TreeNode>
      </div>

      <!-- Render child scopes -->
      <SymbolTreeNode
        v-for="childScope in childScopes"
        :key="childScope.id"
        :scope="childScope"
        :depth="depth + 1"
      />
    </template>
  </TreeNode>
</template>
