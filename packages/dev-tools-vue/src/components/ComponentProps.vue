<script setup lang="ts">
import type { SerializedNode, SerializedComponentNode } from '@/lib/types'
import { getSymbolByRefkey } from '@/lib/store'
import { useTabs } from '@/composables/useTabs'
import { computed } from 'vue'

interface Props {
  node: SerializedNode | { id: string; kind: 'text'; text: string }
}

const props = defineProps<Props>()
const { addTab } = useTabs()

// Check if an object is a refkey (has only a 'key' property with string value)
const isRefkeyObject = (value: any): value is { key: string } => {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const keys = Object.keys(value)
  return keys.length === 1 && keys[0] === 'key' && typeof value.key === 'string'
}

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

// Format a single prop value for display
const formatPropValue = (
  value: any,
): { formatted: string; isRefkey: boolean; refkeyString?: string } => {
  // Check if value is a refkey object
  if (isRefkeyObject(value)) {
    return {
      formatted: `Refkey(${value.key})`,
      isRefkey: true,
      refkeyString: value.key,
    }
  }

  if (typeof value === 'string') {
    return { formatted: `"${value}"`, isRefkey: false }
  } else if (
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    value === null ||
    value === undefined
  ) {
    return { formatted: String(value), isRefkey: false }
  } else if (Array.isArray(value)) {
    return { formatted: '[array]', isRefkey: false }
  } else {
    // Objects - show simplified representation
    return { formatted: '{object}', isRefkey: false }
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
    formatted: string
    isRefkey: boolean
    refkeyString?: string
    isContext?: boolean
  }[] = []

  // Handle regular props
  if (nodeProps && Object.keys(nodeProps).length > 0) {
    // Filter out the 'children' prop
    const propEntries = Object.entries(nodeProps).filter(([key]) => key !== 'children')

    // Format each prop
    const formattedPropEntries = propEntries.map(([key, value]) => {
      const result = formatPropValue(value)
      return {
        key,
        formatted: result.formatted,
        isRefkey: result.isRefkey,
        refkeyString: result.refkeyString,
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
          const result = formatPropValue(componentNode.context.value)
          propsArray.push({
            key: 'value',
            formatted: result.formatted,
            isRefkey: result.isRefkey,
            refkeyString: result.refkeyString,
            isContext: true,
          })
        }
      } else {
        // For non-Provider components, show context as a special prop
        const result = formatPropValue(componentNode.context.value)
        propsArray.push({
          key: '[[context]]',
          formatted: result.formatted,
          isRefkey: result.isRefkey,
          refkeyString: result.refkeyString,
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
        {{ prop.key }}=<template v-if="prop.isRefkey">
          <button
            @click="handleRefkeyClick(prop.refkeyString!)"
            class="text-blue-600 hover:text-blue-800 underline cursor-pointer"
            :title="`Open symbol for refkey: ${prop.refkeyString}`"
          >
            {{ prop.formatted }}
          </button>
        </template>
        <template v-else>{{ prop.formatted }}</template>
      </span>
    </template>
  </span>
</template>
