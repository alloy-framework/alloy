<script setup lang="ts">
import { formatScopeFlags } from '@/utils/formatters'
import type { SerializedOutputScope } from '@alloy-js/core/symbols'
import { getScopeCreatorNode, getComponentName, getNode } from '@/lib/store'
import { useTabs } from '@/composables/useTabs'

interface Props {
  scope: SerializedOutputScope
  onOpenSymbol: (symbolId: number) => void
  onOpenScope: (scopeId: number) => void
  getSymbolName: (symbolId: number) => string
  getScopeName: (scopeId: number) => string
}

const props = defineProps<Props>()

// Get creator node information
const creatorNodeId = getScopeCreatorNode(props.scope.id)
const creatorComponentName = getComponentName(creatorNodeId)

// Use tabs to open component details
const { addTab } = useTabs()

// Handle clicking on the creator component: open its component details tab
const handleCreatorClick = () => {
  if (creatorNodeId !== null) {
    const node = getNode(creatorNodeId).value
    if (node) {
      addTab({
        id: `component-${creatorNodeId}`,
        title: creatorComponentName || `Component ${creatorNodeId}`,
        type: 'component',
        content: node,
        closable: true,
      })
    }
  }
}
</script>

<template>
  <div class="space-y-4">
    <div class="bg-gray-50 rounded-lg p-4">
      <table class="text-sm" style="width: auto; margin: 0">
        <tr>
          <td class="font-bold text-right pr-4 py-1 align-top">Name:</td>
          <td class="py-1">{{ scope.name }}</td>
        </tr>
        <tr>
          <td class="font-bold text-right pr-4 py-1 align-top">Kind:</td>
          <td class="py-1">{{ scope.kind }}</td>
        </tr>
        <tr>
          <td class="font-bold text-right pr-4 py-1 align-top">Symbols Count:</td>
          <td class="py-1">{{ scope.symbols?.length || 0 }}</td>
        </tr>
        <tr>
          <td class="font-bold text-right pr-4 py-1 align-top">Child Scopes:</td>
          <td class="py-1">{{ scope.children?.length || 0 }}</td>
        </tr>

        <!-- Flags with human-readable names -->
        <tr>
          <td class="font-bold text-right pr-4 py-1 align-top">Flags:</td>
          <td class="py-1">
            <div class="flex flex-wrap gap-1">
              <span
                v-for="flagName in formatScopeFlags(scope.flags || 0)"
                :key="flagName"
                class="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs"
              >
                {{ flagName }}
              </span>
            </div>
          </td>
        </tr>

        <!-- Created by -->
        <tr v-if="creatorComponentName">
          <td class="font-bold text-right pr-4 py-1 align-top">Created by:</td>
          <td class="py-1">
            <button
              @click="handleCreatorClick"
              class="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
            >
              {{ creatorComponentName }}
            </button>
          </td>
        </tr>

        <!-- Parent scope -->
        <tr v-if="scope.parent">
          <td class="font-bold text-right pr-4 py-1 align-top">Parent Scope:</td>
          <td class="py-1">
            <button
              @click="onOpenScope(scope.parent)"
              class="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
            >
              {{ getScopeName(scope.parent) }}
            </button>
          </td>
        </tr>

        <!-- Owner symbol -->
        <tr v-if="scope.owner">
          <td class="font-bold text-right pr-4 py-1 align-top">Owner Symbol:</td>
          <td class="py-1">
            <button
              @click="onOpenSymbol(scope.owner)"
              class="text-green-600 hover:text-green-800 hover:underline cursor-pointer"
            >
              {{ getSymbolName(scope.owner) }}
            </button>
          </td>
        </tr>
      </table>

      <!-- Symbols in this scope with clickable links -->
      <div v-if="scope.symbols?.length" class="mt-4">
        <h4 class="font-medium text-gray-700 mb-2">Symbols in this scope:</h4>
        <div class="flex flex-wrap gap-1">
          <button
            v-for="symbolId in scope.symbols"
            :key="symbolId"
            @click="onOpenSymbol(symbolId)"
            class="px-2 py-1 bg-green-100 hover:bg-green-200 text-green-800 rounded text-xs cursor-pointer transition-colors"
          >
            {{ getSymbolName(symbolId) }}
          </button>
        </div>
      </div>

      <!-- Child scopes with clickable links -->
      <div v-if="scope.children?.length" class="mt-4">
        <h4 class="font-medium text-gray-700 mb-2">Child scopes:</h4>
        <div class="flex flex-wrap gap-1">
          <button
            v-for="childId in scope.children"
            :key="childId"
            @click="onOpenScope(childId)"
            class="px-2 py-1 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded text-xs cursor-pointer transition-colors"
          >
            {{ getScopeName(childId) }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
