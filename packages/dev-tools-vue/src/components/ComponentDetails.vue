<script setup lang="ts">
import { computed } from 'vue'
import type {
  SerializedComponentNode,
  SerializedIntrinsicElementNode,
  SerializedNode,
} from '@/lib/types'
import { getPropValueInfo } from '@/utils/propHelpers'
import { useTabs } from '@/composables/useTabs'
import { getSymbolByRefkey, getScope, getSymbol, rerenderComponent } from '@/lib/store'

interface Props {
  component: SerializedNode
}

const props = defineProps<Props>()
const { addTab } = useTabs()

// Handle refkey click to open symbol information
const handleRefkeyClick = (refkeyString: string) => {
  const symbolRef = getSymbolByRefkey(refkeyString)
  const symbol = symbolRef.value

  if (symbol) {
    addTab({
      id: `symbol-${symbol.id}`,
      title: symbol.name,
      type: 'symbol',
      content: symbol,
      closable: true,
    })
  }
}

// Handle scope click to open scope information
const handleScopeClick = (scopeId: number, scopeName: string) => {
  const scopeRef = getScope(scopeId)
  const scope = scopeRef.value

  if (scope) {
    addTab({
      id: `scope-${scope.id}`,
      title: scopeName || `Scope ${scope.id}`,
      type: 'scope',
      content: scope,
      closable: true,
    })
  }
}

// Handle symbol click to open symbol information
const handleSymbolClick = (symbolId: number, symbolName: string) => {
  const symbolRef = getSymbol(symbolId)
  const symbol = symbolRef.value

  if (symbol) {
    addTab({
      id: `symbol-${symbol.id}`,
      title: symbolName,
      type: 'symbol',
      content: symbol,
      closable: true,
    })
  }
}

// Handle rerender button click
const handleRerenderClick = () => {
  rerenderComponent(props.component.id)
}

// Format props for display in a table
const formattedProps = computed(() => {
  if (props.component.kind !== 'component' && props.component.kind !== 'intrinsic') {
    return []
  }

  const componentProps = props.component.props || {}

  return Object.entries(componentProps)
    .filter(([key]) => key !== 'children') // Filter out children prop
    .map(([key, value]) => {
      const propInfo = getPropValueInfo(value)
      return {
        key,
        value,
        ...propInfo,
      }
    })
})

// Format a value for JSON display
const formatValue = (value: any): string => {
  if (value === null) return 'null'
  if (value === undefined) return 'undefined'
  if (typeof value === 'string') return JSON.stringify(value)
  if (typeof value === 'boolean' || typeof value === 'number') return String(value)

  try {
    return JSON.stringify(value, null, 2)
  } catch (error) {
    return String(value)
  }
}

// Get component display name
const componentName = computed(() => {
  if (props.component.kind === 'component') {
    const componentNode = props.component as SerializedComponentNode
    if (componentNode.component === 'Provider' && componentNode.context) {
      return `Context: ${componentNode.context.name}`
    }
    return componentNode.component
  } else if (props.component.kind === 'intrinsic') {
    const intrinsicNode = props.component as SerializedIntrinsicElementNode
    return `<${intrinsicNode.tag}>`
  } else {
    return 'Component'
  }
})

// Get component type description
const componentType = computed(() => {
  switch (props.component.kind) {
    case 'component':
      return 'Component'
    case 'intrinsic':
      return 'Formatting intrinsic'
    case 'fragment':
      return 'Fragment'
    default:
      return 'Node'
  }
})
</script>

<template>
  <div class="space-y-4">
    <div class="bg-gray-50 rounded-lg p-4">
      <table class="text-sm" style="width: auto; margin: 0">
        <tr>
          <td class="font-bold text-right pr-4 py-1 align-top">Name:</td>
          <td class="py-1">{{ componentName }}</td>
        </tr>
        <tr>
          <td class="font-bold text-right pr-4 py-1 align-top">Type:</td>
          <td class="py-1">{{ componentType }}</td>
        </tr>

        <!-- Context Information (for Provider components) -->
        <tr v-if="component.kind === 'component' && (component as SerializedComponentNode).context">
          <td class="font-bold text-right pr-4 py-1 align-top">Context:</td>
          <td class="py-1">{{ (component as SerializedComponentNode).context.name }}</td>
        </tr>

        <!-- Rerender button (only for component nodes) -->
        <tr v-if="component.kind === 'component'">
          <td class="font-bold text-right pr-4 py-1 align-top">Actions:</td>
          <td class="py-1">
            <button
              @click="handleRerenderClick"
              class="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
              title="Trigger a rerender of this component"
            >
              Rerender
            </button>
          </td>
        </tr>
      </table>
    </div>

    <!-- Props Table -->
    <div v-if="formattedProps.length > 0" class="space-y-3">
      <h4 class="text-md font-semibold text-gray-800">Props</h4>

      <div class="bg-gray-50 rounded-lg p-4">
        <table class="w-full">
          <tbody class="divide-y divide-gray-200">
            <tr v-for="prop in formattedProps" :key="prop.key" class="hover:bg-gray-50">
              <td class="px-4 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900 font-mono">{{ prop.key }}</div>
              </td>
              <td class="px-4 py-4">
                <div class="text-sm text-gray-900">
                  <!-- Clickable refkey -->
                  <template v-if="prop.isRefkey">
                    <button
                      @click="handleRefkeyClick(prop.refkeyString!)"
                      class="text-blue-600 hover:text-blue-800 underline cursor-pointer font-mono text-xs"
                      :title="`Open symbol for refkey: ${prop.refkeyString}`"
                    >
                      {{ prop.formattedValue }}
                    </button>
                  </template>

                  <!-- Clickable scope -->
                  <template v-else-if="prop.isScope">
                    <button
                      @click="handleScopeClick(prop.scopeId!, prop.scopeName!)"
                      class="text-green-600 hover:text-green-800 underline cursor-pointer font-mono text-xs"
                      :title="`Open scope: ${prop.scopeName}`"
                    >
                      {{ prop.formattedValue }}
                    </button>
                  </template>

                  <!-- Clickable symbol -->
                  <template v-else-if="prop.isSymbol">
                    <button
                      @click="handleSymbolClick(prop.symbolId!, prop.symbolName!)"
                      class="text-orange-600 hover:text-orange-800 underline cursor-pointer font-mono text-xs"
                      :title="`Open symbol: ${prop.symbolName}`"
                    >
                      {{ prop.formattedValue }}
                    </button>
                  </template>

                  <!-- Regular value -->
                  <template v-else>
                    <pre
                      class="whitespace-pre-wrap font-mono text-xs bg-gray-100 p-2 rounded border max-h-32 overflow-y-auto"
                      >{{ prop.formattedValue }}</pre
                    >
                  </template>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Provided Context (for Provider components) -->
    <div
      v-if="component.kind === 'component' && (component as SerializedComponentNode).context"
      class="space-y-3"
    >
      <h4 class="text-md font-semibold text-gray-800">Provided Context</h4>
      <div class="bg-gray-50 rounded-lg p-4">
        <template v-if="(component as SerializedComponentNode).context">
          <!-- Use prop detection logic for context value -->
          <template
            v-if="getPropValueInfo((component as SerializedComponentNode).context.value).isRefkey"
          >
            <button
              @click="
                handleRefkeyClick(
                  getPropValueInfo((component as SerializedComponentNode).context.value)
                    .refkeyString!,
                )
              "
              class="text-blue-600 hover:text-blue-800 underline cursor-pointer font-mono text-xs"
              :title="`Open symbol for refkey: ${getPropValueInfo((component as SerializedComponentNode).context.value).refkeyString}`"
            >
              {{
                getPropValueInfo((component as SerializedComponentNode).context.value)
                  .formattedValue
              }}
            </button>
          </template>
          <template
            v-else-if="
              getPropValueInfo((component as SerializedComponentNode).context.value).isScope
            "
          >
            <button
              @click="
                handleScopeClick(
                  getPropValueInfo((component as SerializedComponentNode).context.value).scopeId!,
                  getPropValueInfo((component as SerializedComponentNode).context.value).scopeName!,
                )
              "
              class="text-green-600 hover:text-green-800 underline cursor-pointer font-mono text-xs"
              :title="`Open scope: ${getPropValueInfo((component as SerializedComponentNode).context.value).scopeName}`"
            >
              {{
                getPropValueInfo((component as SerializedComponentNode).context.value)
                  .formattedValue
              }}
            </button>
          </template>
          <template
            v-else-if="
              getPropValueInfo((component as SerializedComponentNode).context.value).isSymbol
            "
          >
            <button
              @click="
                handleSymbolClick(
                  getPropValueInfo((component as SerializedComponentNode).context.value).symbolId!,
                  getPropValueInfo((component as SerializedComponentNode).context.value)
                    .symbolName!,
                )
              "
              class="text-orange-600 hover:text-orange-800 underline cursor-pointer font-mono text-xs"
              :title="`Open symbol: ${getPropValueInfo((component as SerializedComponentNode).context.value).symbolName}`"
            >
              {{
                getPropValueInfo((component as SerializedComponentNode).context.value)
                  .formattedValue
              }}
            </button>
          </template>
          <template v-else>
            <pre
              class="whitespace-pre-wrap font-mono text-xs text-gray-900 max-h-32 overflow-y-auto"
              >{{ formatValue((component as SerializedComponentNode).context.value) }}</pre
            >
          </template>
        </template>
      </div>
    </div>
  </div>
</template>
