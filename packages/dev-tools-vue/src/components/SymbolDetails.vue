<script setup lang="ts">
import { formatSymbolFlags } from '@/utils/formatters'
import type { SerializedOutputSymbol } from '@alloy-js/core/symbols'

interface Props {
  symbol: SerializedOutputSymbol
  onOpenSymbol: (symbolId: number) => void
  onOpenScope: (scopeId: number) => void
  getSymbolName: (symbolId: number) => string
  getScopeName: (scopeId: number) => string
}

const props = defineProps<Props>()
</script>

<template>
  <div class="space-y-4">
    <div class="grid grid-cols-2 gap-4 text-sm">
      <div><strong>Name:</strong> {{ symbol.name }}</div>
      <div><strong>Original Name:</strong> {{ symbol.originalName }}</div>

      <!-- Flags with human-readable names -->
      <div class="col-span-2">
        <strong>Flags:</strong>
        <div class="flex flex-wrap gap-1 mt-1">
          <span
            v-for="flagName in formatSymbolFlags(symbol.flags || 0)"
            :key="flagName"
            class="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs"
          >
            {{ flagName }}
          </span>
        </div>
      </div>

      <!-- Linked scope -->
      <div v-if="symbol.scope" class="col-span-2">
        <strong>Scope:</strong>
        <button
          @click="onOpenScope(symbol.scope)"
          class="ml-2 text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
        >
          {{ getScopeName(symbol.scope) }}
        </button>
      </div>

      <!-- Instance member scope -->
      <div v-if="symbol.instanceMemberScope" class="col-span-2">
        <strong>Instance Member Scope:</strong>
        <button
          @click="onOpenScope(symbol.instanceMemberScope)"
          class="ml-2 text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
        >
          {{ getScopeName(symbol.instanceMemberScope) }}
        </button>
      </div>

      <!-- Static member scope -->
      <div v-if="symbol.staticMemberScope" class="col-span-2">
        <strong>Static Member Scope:</strong>
        <button
          @click="onOpenScope(symbol.staticMemberScope)"
          class="ml-2 text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
        >
          {{ getScopeName(symbol.staticMemberScope) }}
        </button>
      </div>

      <!-- Alias target -->
      <div v-if="symbol.aliasTarget" class="col-span-2">
        <strong>Alias Target:</strong>
        <button
          @click="onOpenSymbol(symbol.aliasTarget)"
          class="ml-2 text-green-600 hover:text-green-800 hover:underline cursor-pointer"
        >
          {{ getSymbolName(symbol.aliasTarget) }}
        </button>
      </div>

      <!-- Metadata -->
      <div v-if="symbol.metadata && Object.keys(symbol.metadata).length > 0" class="col-span-2">
        <strong>Metadata:</strong>
        <pre class="mt-2 text-xs bg-gray-100 p-2 rounded overflow-x-auto">{{
          JSON.stringify(symbol.metadata, null, 2)
        }}</pre>
      </div>
    </div>
  </div>
</template>
