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

// Optimized caching system for incremental updates
interface ProcessedNode {
  id: number | string
  node: SerializedNode | { id: string; kind: 'text'; text: string }
  children: ProcessedNode[]
  depth: number
  canExpand: boolean
  parent: ProcessedNode | null
}

// Fast lookup maps
const nodeById = new Map<number, SerializedNode>()
const processedNodeById = new Map<number | string, ProcessedNode>()
const childrenByParentId = new Map<number, Set<number>>()

// Incremental tree state
const rootProcessedNodes = shallowRef<ProcessedNode[]>([])
const flattenedTree = shallowRef<
  Array<{
    node: SerializedNode | { id: string; kind: 'text'; text: string }
    depth: number
    canExpand: boolean
  }>
>([])

// Track what needs recomputation
const dirtyNodes = new Set<number | string>()
const dirtySubtrees = new Set<number | string>()

// Initialize and maintain fast lookup structures
const rebuildLookupMaps = (nodes: SerializedNode[]) => {
  nodeById.clear()
  childrenByParentId.clear()

  for (const node of nodes) {
    nodeById.set(node.id, node)

    if (node.parentId !== null) {
      if (!childrenByParentId.has(node.parentId)) {
        childrenByParentId.set(node.parentId, new Set())
      }
      childrenByParentId.get(node.parentId)!.add(node.id)
    }
  }
}

// Fast node retrieval
const getNode = (id: number): SerializedNode | undefined => nodeById.get(id)

// Helper functions for context detection (moved to top to avoid temporal dead zone)
const isContextProvider = (
  node: SerializedNode | { id: string; kind: 'text'; text: string },
): boolean => {
  return (
    node.kind === 'component' &&
    (node as SerializedComponentNode).component === 'Provider' &&
    !!(node as SerializedComponentNode).context
  )
}

const hasOnlyContextChildren = (
  node: SerializedNode | { id: string; kind: 'text'; text: string },
): boolean => {
  if (node.kind === 'text') return false

  // For this function, we need to check the actual node structure, not the processed cache
  // since we're checking the logical structure, not a specific depth
  if ('children' in node && node.children) {
    const nonEmptyChildren = node.children.filter((child) => {
      if (typeof child === 'string') {
        return child.trim() !== ''
      } else if (typeof child === 'number') {
        const childNode = getNode(child)
        return childNode && !(childNode as any).deleted
      }
      return false
    })

    if (nonEmptyChildren.length === 0) return false
    if (nonEmptyChildren.length === 1 && typeof nonEmptyChildren[0] === 'number') {
      const childNode = getNode(nonEmptyChildren[0])
      return childNode ? isContextProvider(childNode) : false
    }
  }

  return false
}

// Process a single node and its immediate children (non-recursive)
const processNode = (
  node: SerializedNode,
  parent: ProcessedNode | null = null,
  depth: number = 0,
): ProcessedNode => {
  // Use a cache key that includes depth to handle nodes at different levels
  const cacheKey = `${node.id}-${depth}`
  const existingProcessed = processedNodeById.get(cacheKey)
  if (existingProcessed) {
    return existingProcessed
  }

  const processedChildren: ProcessedNode[] = []
  const processedChildIds = new Set<number | string>() // Track processed children to avoid duplicates
  let canExpand = false

  // Process children from the node's children array
  if (node.children && node.children.length > 0) {
    for (let i = 0; i < node.children.length; i++) {
      const child = node.children[i]

      if (typeof child === 'string') {
        // Text node - skip empty ones
        if (child.trim() !== '') {
          const textNodeId = `${node.id}-text-${i}`
          if (!processedChildIds.has(textNodeId)) {
            const textNode = {
              id: textNodeId,
              kind: 'text' as const,
              text: child,
            }
            processedChildren.push({
              id: textNode.id,
              node: textNode,
              children: [],
              depth: depth + 1,
              canExpand: false,
              parent: null, // Will be set after creation
            })
            processedChildIds.add(textNodeId)
          }
        }
      } else if (typeof child === 'number') {
        // Node reference - avoid duplicates
        if (!processedChildIds.has(child)) {
          const childNode = getNode(child)
          if (childNode && !(childNode as any).deleted) {
            // Skip fragments - promote their children instead
            if (childNode.kind === 'fragment') {
              const fragmentChildren = processFragmentChildren(childNode, depth + 1)
              processedChildren.push(...fragmentChildren)
              canExpand = canExpand || fragmentChildren.length > 0
            } else {
              const processedChild = processNode(childNode, null, depth + 1)
              processedChildren.push(processedChild)
              canExpand = true
            }
            processedChildIds.add(child)
          }
        }
      }
    }
  }

  // Also include direct child nodes that might not be in the children array
  const directChildren = childrenByParentId.get(node.id) || new Set()
  for (const childId of directChildren) {
    // Skip if we already processed this child
    if (!processedChildIds.has(childId)) {
      const childNode = getNode(childId)
      if (childNode && !(childNode as any).deleted) {
        if (childNode.kind === 'fragment') {
          const fragmentChildren = processFragmentChildren(childNode, depth + 1)
          processedChildren.push(...fragmentChildren)
          canExpand = canExpand || fragmentChildren.length > 0
        } else {
          const processedChild = processNode(childNode, null, depth + 1)
          processedChildren.push(processedChild)
          canExpand = true
        }
        processedChildIds.add(childId)
      }
    }
  }

  const processed: ProcessedNode = {
    id: node.id,
    node,
    children: processedChildren,
    depth,
    canExpand,
    parent,
  }

  // Set parent references for children
  processedChildren.forEach((child) => {
    child.parent = processed
  })

  // Cache the processed node with depth-specific key
  processedNodeById.set(cacheKey, processed)

  return processed
}

// Handle fragment children specially - they get promoted to parent level
const processFragmentChildren = (fragmentNode: SerializedNode, depth: number): ProcessedNode[] => {
  const result: ProcessedNode[] = []
  const processedChildIds = new Set<number | string>() // Track processed children to avoid duplicates

  if (fragmentNode.children) {
    for (let i = 0; i < fragmentNode.children.length; i++) {
      const child = fragmentNode.children[i]

      if (typeof child === 'string') {
        if (child.trim() !== '') {
          const textNodeId = `${fragmentNode.id}-text-${i}`
          if (!processedChildIds.has(textNodeId)) {
            const textNode = {
              id: textNodeId,
              kind: 'text' as const,
              text: child,
            }
            result.push({
              id: textNode.id,
              node: textNode,
              children: [],
              depth,
              canExpand: false,
              parent: null, // Will be set by caller
            })
            processedChildIds.add(textNodeId)
          }
        }
      } else if (typeof child === 'number') {
        if (!processedChildIds.has(child)) {
          const childNode = getNode(child)
          if (childNode && !(childNode as any).deleted) {
            if (childNode.kind === 'fragment') {
              // Nested fragment - recursively process
              result.push(...processFragmentChildren(childNode, depth))
            } else {
              result.push(processNode(childNode, null, depth))
            }
            processedChildIds.add(child)
          }
        }
      }
    }
  }

  // Also check direct children
  const directChildren = childrenByParentId.get(fragmentNode.id) || new Set()
  for (const childId of directChildren) {
    if (!processedChildIds.has(childId)) {
      const childNode = getNode(childId)
      if (childNode && !(childNode as any).deleted) {
        if (childNode.kind === 'fragment') {
          result.push(...processFragmentChildren(childNode, depth))
        } else {
          result.push(processNode(childNode, null, depth))
        }
        processedChildIds.add(childId)
      }
    }
  }

  return result
}

// Build root nodes efficiently
const buildRootNodes = (): ProcessedNode[] => {
  const roots: ProcessedNode[] = []

  // Find root nodes (no parent)
  for (const [id, node] of nodeById) {
    if (node.parentId === null && !(node as any).deleted) {
      if (node.kind === 'fragment') {
        // Root fragment - promote children to root level
        roots.push(...processFragmentChildren(node, 0))
      } else {
        roots.push(processNode(node, null, 0))
      }
    }
  }

  return roots
}

// Flatten tree for display (only expanded nodes)
const flattenProcessedTree = (
  nodes: ProcessedNode[],
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

  const processNodes = (nodes: ProcessedNode[]) => {
    for (const processedNode of nodes) {
      // Handle context chains specially
      if (hasOnlyContextChildren(processedNode.node)) {
        const contextChain = buildContextChain(processedNode)
        result.push(...contextChain)
      } else {
        result.push({
          node: processedNode.node,
          depth: processedNode.depth,
          canExpand: processedNode.canExpand,
        })

        // Add children if expanded
        if (
          processedNode.canExpand &&
          typeof processedNode.id === 'number' &&
          expandedNodes.value.has(processedNode.id)
        ) {
          processNodes(processedNode.children)
        }
      }
    }
  }

  processNodes(nodes)
  return result
}

// Build context chain for flattened display
const buildContextChain = (
  startNode: ProcessedNode,
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

  let current = startNode
  let chainDepth = startNode.depth

  while (current && current.node.kind !== 'text') {
    result.push({
      node: current.node,
      depth: chainDepth,
      canExpand: false,
    })

    if (
      hasOnlyContextChildren(current.node) &&
      current.children.length === 1 &&
      isContextProvider(current.children[0].node)
    ) {
      current = current.children[0]
      // Context nodes stay at same depth
    } else {
      // End of context chain
      if (current.children.length > 0) {
        result[result.length - 1].canExpand = true

        // Add children if expanded
        if (typeof current.id === 'number' && expandedNodes.value.has(current.id)) {
          const flattenedChildren = flattenProcessedTree(current.children)
          result.push(
            ...flattenedChildren.map((item) => ({
              ...item,
              depth: item.depth + chainDepth + 1 - current.depth,
            })),
          )
        }
      }
      break
    }
  }

  return result
}

// Efficient update system - only recompute what changed
watch(
  visibleNodes,
  (newNodes, oldNodes) => {
    // Clear caches when nodes change
    processedNodeById.clear()

    // Rebuild lookup maps
    rebuildLookupMaps(newNodes)

    // Auto-expand new nodes
    newNodes.forEach((node) => {
      expandedNodes.value.add(node.id)
    })

    // Rebuild tree structure
    rootProcessedNodes.value = buildRootNodes()

    // Update flattened tree
    flattenedTree.value = flattenProcessedTree(rootProcessedNodes.value)
  },
  { immediate: true },
)

// Efficiently handle expansion changes
watch(
  expandedNodes,
  () => {
    // Only re-flatten the tree, don't rebuild structure
    flattenedTree.value = flattenProcessedTree(rootProcessedNodes.value)
  },
  { deep: true },
)

// Get root nodes efficiently
const rootNodes = computed(() => {
  return rootProcessedNodes.value.map((pn) => pn.node)
})

// Simple function for ComponentTreeNode compatibility (returns empty since we handle flattening differently)
const getNodeChildren = (
  nodeId: number | string,
): Array<SerializedNode | { id: string; kind: 'text'; text: string }> => {
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
