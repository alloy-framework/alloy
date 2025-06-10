<script setup lang="ts">
import { computed } from 'vue'
import { Type } from 'lucide-vue-next'
import TreeNode from './TreeNode.vue'
import ComponentProps from './ComponentProps.vue'
import type { SerializedNode } from '@/lib/types'

interface TreeNodeProps {
  node: SerializedNode | { id: string; kind: 'text'; text: string }
  depth: number
  expandedNodes: Set<number>
  getAllChildren: (
    nodeId: number | string,
  ) => Array<SerializedNode | { id: string; kind: 'text'; text: string }>
  getNodeIcon: (node: SerializedNode | { id: string; kind: 'text'; text: string }) => any
  getNodeDisplayName: (node: SerializedNode | { id: string; kind: 'text'; text: string }) => string
  isExpandable?: boolean
}

interface TreeNodeEmits {
  toggle: [nodeId: number]
}

const props = defineProps<TreeNodeProps>()
const emit = defineEmits<TreeNodeEmits>()

const allChildren = computed(() => {
  // Text nodes don't have children
  if (props.node.kind === 'text') return []

  return props.getAllChildren(props.node.id)
})
const hasChildren = computed(() => {
  // If isExpandable is explicitly set to false, this node can't expand
  if (props.isExpandable === false) {
    return false
  }

  // If isExpandable is explicitly set to true, use that with actual children check
  if (props.isExpandable === true) {
    return allChildren.value.length > 0
  }

  // Default behavior - check if there are children
  return allChildren.value.length > 0
})
const isExpanded = computed(() => {
  // Text nodes can't be expanded
  if (props.node.kind === 'text') return false

  return props.expandedNodes.has(props.node.id as number)
})

const nodeIcon = computed(() => props.getNodeIcon(props.node))
const displayName = computed(() => props.getNodeDisplayName(props.node))

const iconColor = computed(() => {
  switch (props.node.kind) {
    case 'component':
      return 'text-blue-600'
    case 'intrinsic':
      return 'text-green-600'
    case 'fragment':
      return 'text-gray-500'
    case 'text':
      return 'text-gray-400'
    default:
      return 'text-gray-500'
  }
})

const handleToggle = () => {
  if (hasChildren.value && props.node.kind !== 'text') {
    emit('toggle', props.node.id as number)
  }
}
</script>

<template>
  <!-- Text content node - render as simple text -->
  <div
    v-if="node.kind === 'text'"
    class="flex items-center gap-1 py-1 px-2"
    :style="{ paddingLeft: `${depth * 16 + 8}px` }"
    :data-tree-node-id="node.id"
  >
    <div class="w-4 h-4 flex-shrink-0"></div>
    <Type class="h-3 w-3 flex-shrink-0 text-gray-400" />
    <span class="text-xs text-gray-600 italic font-mono">{{ displayName }}</span>
  </div>

  <!-- Component/element node - render as tree node -->
  <TreeNode
    v-else
    :title="displayName"
    :icon="nodeIcon"
    :icon-color="iconColor"
    :expanded="isExpanded"
    :has-children="hasChildren"
    :depth="depth"
    :data="node"
    :show-id-suffix="node.id"
    @toggle="handleToggle"
  >
    <template #subtitle>
      <ComponentProps :node="node" compact />
    </template>
    <!-- Only show children if this node is expandable and not part of a flattened chain -->
    <template v-if="isExpandable !== false" v-for="child in allChildren" :key="child.id">
      <!-- Recursive render -->
      <ComponentTreeNode
        :node="child"
        :depth="depth + 1"
        :expanded-nodes="expandedNodes"
        :get-all-children="getAllChildren"
        :get-node-icon="getNodeIcon"
        :get-node-display-name="getNodeDisplayName"
        @toggle="$emit('toggle', $event)"
      />
    </template>
  </TreeNode>
</template>
