<script setup lang="ts">
import { computed } from 'vue'
import type { SerializedFileInfo } from '@/lib/types'
import { useContentMapping } from '@/composables/useContentMapping'
import { selectNode, visibleNodes } from '@/lib/store'

interface Props {
  file: SerializedFileInfo
}

const props = defineProps<Props>()

// Use content mapping to link file contents back to tree nodes
const { mappings, getWrappedContent } = useContentMapping(props.file.contents, props.file.nodeId)

// Get the content with node ID spans
const wrappedContent = computed(() => getWrappedContent())

// Handle node clicking for selection
const handleNodeClick = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  const nodeSpan = target.closest('[data-node-id]') as HTMLElement
  const nodeId = nodeSpan?.getAttribute('data-node-id')

  if (nodeId) {
    const nodeIdNumber = parseInt(nodeId, 10)

    // Find the nearest non-fragment ancestor to highlight
    const nearestSelectableNode = findNearestSelectableNode(nodeIdNumber)
    if (nearestSelectableNode) {
      selectNode(nearestSelectableNode)
    }
  }
}

// Find the nearest non-fragment ancestor that can be selected in the tree
const findNearestSelectableNode = (nodeId: number): number | null => {
  let currentNodeId: number | null = nodeId

  while (currentNodeId !== null) {
    const currentNode = visibleNodes.value.find((node) => node.id === currentNodeId)

    if (!currentNode) {
      break
    }

    // If this node is not a fragment, it's selectable
    if (currentNode.kind !== 'fragment') {
      return currentNodeId
    }

    // Move to parent if current node is a fragment
    currentNodeId = currentNode.parentId
  }

  return null
}
</script>

<template>
  <div class="h-full flex flex-col">
    <!-- File Content -->
    <div class="flex-1 min-h-0 border rounded-lg overflow-hidden bg-gray-50">
      <div class="h-full overflow-auto">
        <pre
          class="p-4 text-sm font-mono leading-relaxed whitespace-pre-wrap break-words"
          @click="handleNodeClick"
        ><code v-html="wrappedContent"></code></pre>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.node-content) {
  position: relative;
  border-radius: 2px;
  transition: all 0.2s ease;
  cursor: pointer;
  padding: 1px 2px;
  margin: -1px -2px;
}

:deep(.node-content:hover) {
  background-color: rgba(59, 130, 246, 0.15);
  box-shadow: 0 0 0 1px rgba(59, 130, 246, 0.4);
}

/* Mapped content styling - different colors for different node types */
:deep(.node-content.mapped[data-node-id]) {
  background-color: rgba(34, 197, 94, 0.05);
}

:deep(.node-content.mapped[data-node-id]:nth-child(2n)) {
  background-color: rgba(168, 85, 247, 0.05);
}

:deep(.node-content.mapped[data-node-id]:nth-child(3n)) {
  background-color: rgba(236, 72, 153, 0.05);
}

:deep(.node-content.mapped[data-node-id]:nth-child(4n)) {
  background-color: rgba(251, 146, 60, 0.05);
}

:deep(.node-content.mapped[data-node-id]:nth-child(5n)) {
  background-color: rgba(14, 165, 233, 0.05);
}
</style>
