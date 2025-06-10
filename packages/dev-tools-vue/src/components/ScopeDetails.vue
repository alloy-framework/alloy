<script setup lang="ts">
import { formatScopeFlags } from '@/utils/formatters'
import type { SerializedOutputScope } from '@alloy-js/core/symbols'

interface Props {
  scope: SerializedOutputScope
  onOpenSymbol: (symbolId: number) => void
  onOpenScope: (scopeId: number) => void
  getSymbolName: (symbolId: number) => string
  getScopeName: (scopeId: number) => string
}

const props = defineProps<Props>()
</script>

<template>
  <div class="space-y-4">
    <h3 class="text-lg font-semibold text-gray-800">Scope: {{ scope.name }}</h3>
    <p class="text-sm text-gray-600">Scope information and contents</p>
    <div class="bg-gray-50 rounded-lg p-4">
      <div class="grid grid-cols-2 gap-4 text-sm">
        <div><strong>Name:</strong> {{ scope.name }}</div>
        <div><strong>Kind:</strong> {{ scope.kind }}</div>
        <div><strong>Symbols Count:</strong> {{ scope.symbols?.length || 0 }}</div>
        <div><strong>Child Scopes:</strong> {{ scope.children?.length || 0 }}</div>

        <!-- Flags with human-readable names -->
        <div class="col-span-2">
          <strong>Flags:</strong>
          <div class="flex flex-wrap gap-1 mt-1">
            <span
              v-for="flagName in formatScopeFlags(scope.flags || 0)"
              :key="flagName"
              class="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs"
            >
              {{ flagName }}
            </span>
          </div>
        </div>

        <!-- Parent scope -->
        <div v-if="scope.parent" class="col-span-2">
          <strong>Parent Scope:</strong>
          <button
            @click="onOpenScope(scope.parent)"
            class="ml-2 text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
          >
            {{ getScopeName(scope.parent) }}
          </button>
        </div>

        <!-- Owner symbol -->
        <div v-if="scope.owner" class="col-span-2">
          <strong>Owner Symbol:</strong>
          <button
            @click="onOpenSymbol(scope.owner)"
            class="ml-2 text-green-600 hover:text-green-800 hover:underline cursor-pointer"
          >
            {{ getSymbolName(scope.owner) }}
          </button>
        </div>
      </div>

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
