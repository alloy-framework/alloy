<script setup lang="ts">
import { computed, ref, watch, shallowRef, nextTick } from 'vue'
import { Component, FileCode, Box, Database } from 'lucide-vue-next'
import { visibleNodes, selectedNodeId } from '@/lib/store'
import type {
  SerializedNode,
  SerializedNodeBase,
  SerializedComponentNode,
  SerializedIntrinsicElementNode,
} from '@/lib/types'
import ComponentTreeNode from './ComponentTreeNode.vue'
import ComponentProps from './ComponentProps.vue'

// Component tree visualization - default to all nodes expanded
const expandedNodes = ref(new Set<number>())

// Cache for memoizing expensive operations
const nodeChildrenCache = new Map<
  number | string,
  Array<SerializedNode | { id: string; kind: 'text'; text: string }>
>()
const flatTreeCache = shallowRef<
  Array<{
    node: SerializedNode | { id: string; kind: 'text'; text: string }
    depth: number
    canExpand: boolean
  }>
>([])

// Track the version of visible nodes to invalidate cache when needed
let visibleNodesVersion = 0
let lastCachedVersion = -1

// Initialize expanded state when nodes change
const initializeExpandedState = () => {
  const allNodeIds = visibleNodes.value.map((node) => node.id)
  expandedNodes.value = new Set(allNodeIds)
}

// Watch for new nodes and auto-expand them
watch(
  visibleNodes,
  (newNodes) => {
    // Increment version to invalidate caches
    visibleNodesVersion++
    nodeChildrenCache.clear()

    newNodes.forEach((node) => {
      expandedNodes.value.add(node.id)
    })
  },
  { immediate: true },
)

// Get root nodes (nodes without parents), skipping fragments
const rootNodes = computed(() => {
  const roots = visibleNodes.value.filter((node) => node.parentId === null)
  return skipFragments(roots)
})

// Helper function to skip fragments and promote their children
const skipFragments = (
  nodes: Array<SerializedNode | { id: string; kind: 'text'; text: string }>,
): Array<SerializedNode | { id: string; kind: 'text'; text: string }> => {
  const result: Array<SerializedNode | { id: string; kind: 'text'; text: string }> = []

  for (const node of nodes) {
    if ('kind' in node && node.kind === 'fragment') {
      // For fragments, add their children instead of the fragment itself
      const fragmentChildren = getAllChildrenSkippingFragments(node.id as number)
      result.push(...fragmentChildren)
    } else if ('kind' in node && node.kind === 'text') {
      // Skip empty text nodes
      if ((node as { id: string; kind: 'text'; text: string }).text.trim() !== '') {
        result.push(node)
      }
    } else {
      result.push(node)
    }
  }

  return result
}

// Get all children of a node, skipping fragments and promoting their children (with caching)
const getAllChildrenSkippingFragments = (
  nodeId: number | string,
): Array<SerializedNode | { id: string; kind: 'text'; text: string }> => {
  // Check cache first
  if (nodeChildrenCache.has(nodeId)) {
    return nodeChildrenCache.get(nodeId)!
  }

  // Text nodes don't have children
  if (typeof nodeId === 'string') {
    const result: Array<SerializedNode | { id: string; kind: 'text'; text: string }> = []
    nodeChildrenCache.set(nodeId, result)
    return result
  }

  // Get direct node children
  const nodeChildren = visibleNodes.value.filter((node) => node.parentId === nodeId)

  // Get the parent node to access its children array
  const parentNode = visibleNodes.value.find((node) => node.id === nodeId)
  const result: Array<SerializedNode | { id: string; kind: 'text'; text: string }> = []

  if (parentNode) {
    // Process the children array which contains both text content and node references
    parentNode.children.forEach((child, index) => {
      if (typeof child === 'string') {
        // Skip empty text nodes
        if (child.trim() !== '') {
          // Text content - create a virtual text node
          result.push({
            id: `${nodeId}-text-${index}`,
            kind: 'text',
            text: child,
          })
        }
      } else if (typeof child === 'number') {
        // Node reference - find the actual node
        const childNode = visibleNodes.value.find((node) => node.id === child)
        if (childNode) {
          result.push(childNode)
        }
      }
    })
  }

  // Also include any direct child nodes that might not be referenced in the children array
  nodeChildren.forEach((node) => {
    if (!result.some((item) => 'id' in item && item.id === node.id)) {
      result.push(node)
    }
  })

  // Skip fragments and promote their children
  const finalResult = skipFragments(result)

  // Cache the result
  nodeChildrenCache.set(nodeId, finalResult)
  return finalResult
}

// Get all children of a node (both node children and text content)
const getAllChildren = (
  nodeId: number | string,
): Array<SerializedNode | { id: string; kind: 'text'; text: string }> => {
  return getAllChildrenSkippingFragments(nodeId)
}

// Check if a node is a context provider
const isContextProvider = (
  node: SerializedNode | { id: string; kind: 'text'; text: string },
): boolean => {
  return (
    node.kind === 'component' &&
    (node as SerializedComponentNode).component === 'Provider' &&
    !!(node as SerializedComponentNode).context
  )
}

// Check if a node only has context providers as children (directly or through a chain)
const hasOnlyContextChildren = (
  node: SerializedNode | { id: string; kind: 'text'; text: string },
): boolean => {
  if (node.kind === 'text') return false

  const children = getAllChildrenSkippingFragments(node.id)

  // No children means this is a leaf
  if (children.length === 0) return false

  // If this node has exactly one child that is a context provider, check recursively
  if (children.length === 1 && isContextProvider(children[0])) {
    return true
  }

  return false
}

// Get a flattened view of the tree starting from the given nodes
const getFlattenedTreeRecursive = (
  nodes: Array<SerializedNode | { id: string; kind: 'text'; text: string }>,
  currentDepth: number = 0,
): Array<{
  node: SerializedNode | { id: string; kind: 'text'; text: string }
  depth: number
  canExpand: boolean
}> => {
  const result: Array<{
    node: SerializedNode | { id: string; kind: 'text'; text: string }
    depth: number
    canExpand: boolean
  }> = []

  for (const node of nodes) {
    if (node.kind === 'text') {
      result.push({ node, depth: currentDepth, canExpand: false })
      continue
    }

    const children = getAllChildrenSkippingFragments(node.id)

    // Check if this node starts a context chain
    if (hasOnlyContextChildren(node)) {
      // Follow the context chain and flatten it
      let current: SerializedNode | { id: string; kind: 'text'; text: string } = node
      let chainDepth = currentDepth

      while (current && current.kind !== 'text') {
        const currentChildren = getAllChildrenSkippingFragments(current.id)

        // Add current node to result
        result.push({ node: current, depth: chainDepth, canExpand: false })

        // If this node has only context children, continue the chain
        if (
          hasOnlyContextChildren(current) &&
          currentChildren.length === 1 &&
          isContextProvider(currentChildren[0])
        ) {
          current = currentChildren[0]
          // Context nodes stay at the same depth
        } else {
          // End of context chain
          // Mark the last node as expandable if it has children
          if (currentChildren.length > 0) {
            result[result.length - 1].canExpand = true

            // Add the children of the last node in the chain, but only if it's expanded
            if (expandedNodes.value.has((current as SerializedNode).id)) {
              const flattenedChildren = getFlattenedTreeRecursive(currentChildren, chainDepth + 1)
              result.push(...flattenedChildren)
            }
          }
          break
        }
      }
    } else {
      // Normal node - add it and its children
      const canExpand = children.length > 0
      result.push({ node, depth: currentDepth, canExpand })

      // Only show children if this node is expanded
      if (canExpand && expandedNodes.value.has(node.id as number)) {
        const flattenedChildren = getFlattenedTreeRecursive(children, currentDepth + 1)
        result.push(...flattenedChildren)
      }
    }
  }

  return result
}

// Computed property for the flattened tree - only recalculates when dependencies change
const flattenedTree = computed(() => {
  // Check if we need to recalculate based on version changes
  const needsRecalc = lastCachedVersion !== visibleNodesVersion || flatTreeCache.value.length === 0

  if (needsRecalc) {
    // Only access rootNodes.value once to minimize reactive dependencies
    const roots = rootNodes.value
    flatTreeCache.value = getFlattenedTreeRecursive(roots)
    lastCachedVersion = visibleNodesVersion
  }

  return flatTreeCache.value
})

// Watch for expansion changes and only invalidate the flattened tree cache
watch(
  expandedNodes,
  () => {
    // When expansion state changes, we need to recalculate the flattened tree
    // but we don't need to clear the children cache
    flatTreeCache.value = getFlattenedTreeRecursive(rootNodes.value)
  },
  { deep: true },
)

// Get children for a specific node (used by ComponentTreeNode for expansion logic)
const getNodeChildren = (
  nodeId: number | string,
): Array<SerializedNode | { id: string; kind: 'text'; text: string }> => {
  // For flattened context chains, we don't show children at the ComponentTreeNode level
  // because they're handled by the flattened tree logic
  return []
}

// Watch for node selection and scroll to selected node
watch(selectedNodeId, async (newSelectedId) => {
  if (newSelectedId !== null) {
    // Ensure the selected node is expanded (along with its ancestors)
    const selectedNode = visibleNodes.value.find((node) => node.id === newSelectedId)
    if (selectedNode) {
      // Expand all ancestors of the selected node
      let currentNode = selectedNode
      while (currentNode.parentId !== null) {
        expandedNodes.value.add(currentNode.parentId)
        currentNode =
          visibleNodes.value.find((node) => node.id === currentNode.parentId) || currentNode
        if (!currentNode || currentNode.parentId === null) break
      }

      // Trigger reactivity for expansion changes
      expandedNodes.value = new Set(expandedNodes.value)

      // Wait for DOM update then scroll to the node
      await nextTick()

      const nodeElement = document.querySelector(`[data-tree-node-id="${newSelectedId}"]`)
      if (nodeElement) {
        nodeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        })

        // Add a temporary highlight class
        nodeElement.classList.add('selected-highlight')
        setTimeout(() => {
          nodeElement.classList.remove('selected-highlight')
        }, 2000)
      }
    }
  }
})

// Toggle node expansion
const toggleExpanded = (nodeId: number) => {
  if (expandedNodes.value.has(nodeId)) {
    expandedNodes.value.delete(nodeId)
  } else {
    expandedNodes.value.add(nodeId)
  }
  // Trigger reactivity manually since Set mutation doesn't trigger watchers
  expandedNodes.value = new Set(expandedNodes.value)
}

// Get node icon based on type
const getNodeIcon = (node: SerializedNode | { id: string; kind: 'text'; text: string }) => {
  switch (node.kind) {
    case 'component': {
      const componentNode = node as SerializedComponentNode
      // If this is a Provider component with context, show as Database icon for Context
      if (componentNode.component === 'Provider' && componentNode.context) {
        return Database
      }
      return Component
    }
    case 'intrinsic':
      return FileCode
    case 'fragment':
      return Box
    case 'text':
      return null // Text nodes will use a different icon in the template
    default:
      return Box
  }
}

// Get node display name
const getNodeDisplayName = (node: SerializedNode | { id: string; kind: 'text'; text: string }) => {
  switch (node.kind) {
    case 'component': {
      const componentNode = node as SerializedComponentNode
      // If this is a Provider component with context, show as Context node
      if (componentNode.component === 'Provider' && componentNode.context) {
        return `Context: ${componentNode.context.name}`
      }
      return componentNode.component
    }
    case 'intrinsic':
      return `<${(node as SerializedNode & { kind: 'intrinsic' }).tag}>`
    case 'fragment':
      return 'Fragment'
    case 'text':
      return `"${(node as { id: string; kind: 'text'; text: string }).text}"`
    default:
      // Type assertion since all SerializedNode types have id
      return `Node ${(node as SerializedNodeBase).id}`
  }
}
</script>

<template>
  <div class="component-tree h-full flex flex-col">
    <!-- Tree content -->
    <div class="flex-1 overflow-y-auto p-3">
      <!-- Empty state -->
      <div v-if="rootNodes.length === 0" class="h-full flex items-center justify-center">
        <div class="text-center space-y-3">
          <Component class="h-12 w-12 text-gray-300 mx-auto" />
          <div>
            <p class="text-sm font-medium text-gray-500">No component tree</p>
            <p class="text-xs text-gray-400 mt-1">
              Component nodes will appear here when your Alloy application renders components
            </p>
          </div>
        </div>
      </div>

      <!-- Tree nodes -->
      <div v-else class="space-y-1">
        <template v-for="{ node, depth, canExpand } in flattenedTree" :key="node.id">
          <ComponentTreeNode
            :node="node"
            :depth="depth"
            :expanded-nodes="expandedNodes"
            :get-all-children="getNodeChildren"
            :get-node-icon="getNodeIcon"
            :get-node-display-name="getNodeDisplayName"
            :is-expandable="canExpand"
            @toggle="toggleExpanded"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.component-tree {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

:deep(.selected-highlight) {
  background-color: rgba(59, 130, 246, 0.2) !important;
  border: 2px solid rgba(59, 130, 246, 0.5);
  border-radius: 4px;
  animation: pulse 1s ease-in-out;
}

@keyframes pulse {
  0%,
  100% {
    background-color: rgba(59, 130, 246, 0.2);
  }
  50% {
    background-color: rgba(59, 130, 246, 0.3);
  }
}
</style>
