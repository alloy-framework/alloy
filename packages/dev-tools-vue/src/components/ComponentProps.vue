<script setup lang="ts">
import type { SerializedNode, SerializedComponentNode } from '@/lib/types'
import { getSymbolByRefkey, getScope, getSymbol } from '@/lib/store'
import { useTabs } from '@/composables/useTabs'
import { computed } from 'vue'
import { getPropValueInfo } from '@/utils/propHelpers'

interface Props {
  node: SerializedNode | { id: string; kind: 'text'; text: string }
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

// Get formatted props for the node
const getFormattedProps = () => {
  if (props.node.kind === 'fragment' || props.node.kind === 'text') {
    return []
  }

  const typedNode = props.node as SerializedNode
  if (typedNode.kind !== 'component' && typedNode.kind !== 'intrinsic') {
    return []
  }

  const nodeProps = typedNode.props
  const propsArray: {
    key: string
    valueInfo: ReturnType<typeof getPropValueInfo>
    isContext?: boolean
  }[] = []

  // Handle regular props
  if (nodeProps && Object.keys(nodeProps).length > 0) {
    // Filter out the 'children' prop
    const propEntries = Object.entries(nodeProps).filter(([key]) => key !== 'children')

    // Format each prop
    const formattedPropEntries = propEntries.map(([key, value]) => {
      return {
        key,
        valueInfo: getPropValueInfo(value),
        isContext: false,
      }
    })

    propsArray.push(...formattedPropEntries)
  }

  // Handle context for component nodes
  if (typedNode.kind === 'component') {
    const componentNode = typedNode as SerializedComponentNode
    if (componentNode.context) {
      if (componentNode.component === 'Provider') {
        // For Provider components, show context value only if there's no existing value prop
        const hasValueProp = nodeProps && 'value' in nodeProps
        if (!hasValueProp) {
          propsArray.push({
            key: 'value',
            valueInfo: getPropValueInfo(componentNode.context.value),
            isContext: true,
          })
        }
      } else {
        // For non-Provider components, show context as a special prop
        propsArray.push({
          key: '[[context]]',
          valueInfo: getPropValueInfo(componentNode.context.value),
          isContext: true,
        })
      }
    }
  }

  return propsArray
}

const formattedProps = computed(() => getFormattedProps())
</script>

<template>
  <span v-if="formattedProps.length > 0" class="text-xs text-gray-500">
    <template v-for="(prop, index) in formattedProps" :key="prop.key">
      <span v-if="index > 0" class="mr-2"></span>
      <span
        :class="{
          'text-purple-600': prop.isContext,
          'text-gray-500': !prop.isContext,
        }"
      >
        {{ prop.key }}=<template v-if="prop.valueInfo.isRefkey">
          <button
            @click.stop="handleRefkeyClick(prop.valueInfo.refkeyString!)"
            class="text-blue-600 hover:text-blue-800 underline cursor-pointer"
            :title="`Open symbol for refkey: ${prop.valueInfo.refkeyString}`"
          >
            {{ prop.valueInfo.formattedValue }}
          </button>
        </template>
        <template v-else-if="prop.valueInfo.isScope">
          <button
            @click.stop="handleScopeClick(prop.valueInfo.scopeId!, prop.valueInfo.scopeName!)"
            class="text-green-600 hover:text-green-800 underline cursor-pointer"
            :title="`Open scope: ${prop.valueInfo.scopeName}`"
          >
            {{ prop.valueInfo.formattedValue }}
          </button>
        </template>
        <template v-else-if="prop.valueInfo.isSymbol">
          <button
            @click.stop="handleSymbolClick(prop.valueInfo.symbolId!, prop.valueInfo.symbolName!)"
            class="text-orange-600 hover:text-orange-800 underline cursor-pointer"
            :title="`Open symbol: ${prop.valueInfo.symbolName}`"
          >
            {{ prop.valueInfo.formattedValue }}
          </button>
        </template>
        <template v-else>{{ prop.valueInfo.formattedValue }}</template>
      </span>
    </template>
  </span>
</template>
