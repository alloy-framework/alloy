<script setup lang="ts">
import { formatSymbolFlags, formatRefkeys } from '@/utils/formatters'
import { OutputSymbolFlags } from '@alloy-js/core/symbols'
import type { SerializedOutputSymbol } from '@alloy-js/core/symbols'
import { getSymbolCreatorNode, getComponentName, getNode } from '@/lib/store'
import { useTabs } from '@/composables/useTabs'

const { addTab } = useTabs()

interface Props {
  symbol: SerializedOutputSymbol
  onOpenSymbol: (symbolId: number) => void
  onOpenScope: (scopeId: number) => void
  getSymbolName: (symbolId: number) => string
  getScopeName: (scopeId: number) => string
}

const props = defineProps<Props>()

// Get creator node information
const creatorNodeId = getSymbolCreatorNode(props.symbol.id)
const creatorComponentName = getComponentName(creatorNodeId)

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
        <tr v-if="!(symbol.flags & OutputSymbolFlags.Transient)">
          <td class="font-bold text-right pr-4 py-1 align-top">Name:</td>
          <td class="py-1">{{ symbol.name }}</td>
        </tr>
        <tr v-if="!(symbol.flags & OutputSymbolFlags.Transient)">
          <td class="font-bold text-right pr-4 py-1 align-top">Original Name:</td>
          <td class="py-1">{{ symbol.originalName }}</td>
        </tr>

        <!-- Flags with human-readable names -->
        <tr>
          <td class="font-bold text-right pr-4 py-1 align-top">Flags:</td>
          <td class="py-1">
            <div class="flex flex-wrap gap-1">
              <span
                v-for="flagName in formatSymbolFlags(symbol.flags || 0)"
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

        <!-- Refkeys -->
        <tr v-if="symbol.refkeys && symbol.refkeys.length > 0">
          <td class="font-bold text-right pr-4 py-1 align-top">Refkeys:</td>
          <td class="py-1">
            <div class="font-mono text-sm text-gray-700 bg-gray-100 p-2 rounded">
              {{ formatRefkeys(symbol.refkeys) }}
            </div>
          </td>
        </tr>

        <!-- Linked scope -->
        <tr v-if="symbol.scope">
          <td class="font-bold text-right pr-4 py-1 align-top">Scope:</td>
          <td class="py-1">
            <button
              @click="onOpenScope(symbol.scope)"
              class="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
            >
              {{ getScopeName(symbol.scope) }}
            </button>
          </td>
        </tr>

        <!-- Instance member scope -->
        <tr v-if="symbol.instanceMemberScope">
          <td class="font-bold text-right pr-4 py-1 align-top">Instance Member Scope:</td>
          <td class="py-1">
            <button
              @click="onOpenScope(symbol.instanceMemberScope)"
              class="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
            >
              {{ getScopeName(symbol.instanceMemberScope) }}
            </button>
          </td>
        </tr>

        <!-- Static member scope -->
        <tr v-if="symbol.staticMemberScope">
          <td class="font-bold text-right pr-4 py-1 align-top">Static Member Scope:</td>
          <td class="py-1">
            <button
              @click="onOpenScope(symbol.staticMemberScope)"
              class="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
            >
              {{ getScopeName(symbol.staticMemberScope) }}
            </button>
          </td>
        </tr>

        <!-- Alias target -->
        <tr v-if="symbol.aliasTarget">
          <td class="font-bold text-right pr-4 py-1 align-top">Alias Target:</td>
          <td class="py-1">
            <button
              @click="onOpenSymbol(symbol.aliasTarget)"
              class="text-green-600 hover:text-green-800 hover:underline cursor-pointer"
            >
              {{ getSymbolName(symbol.aliasTarget) }}
            </button>
          </td>
        </tr>

        <!-- Metadata -->
        <tr v-if="symbol.metadata && Object.keys(symbol.metadata).length > 0">
          <td class="font-bold text-right pr-4 py-1 align-top">Metadata:</td>
          <td class="py-1">
            <pre class="text-xs bg-gray-100 p-2 rounded overflow-x-auto">{{
              JSON.stringify(symbol.metadata, null, 2)
            }}</pre>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
