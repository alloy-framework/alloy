import { reactive, computed, ref, shallowRef } from '@vue/reactivity'
import type {
  StoreState,
  WebSocketMessage,
  SerializedFileInfo,
  SerializedNode,
  ErrorInfo,
} from './types'
import type { SerializedOutputScope, SerializedOutputSymbol } from '@alloy-js/core/symbols'

// Create reactive store state
const state = reactive<StoreState>({
  symbols: new Map(),
  scopes: new Map(),
  files: new Map(),
  nodes: new Map(),
  isConnected: false,
  connectionStatus: 'disconnected',
  currentError: null, // Add error state
}) as StoreState

// Refkey-to-symbol index for efficient lookups
const refkeyToSymbolIndex = reactive(new Map<string, number>())

// Selected node state for component tree navigation
export const selectedNodeId = ref<number | null>(null)

// WebSocket connection
let websocket: WebSocket | null = null
const wsUrl = ref('ws://localhost:8080') // Default WebSocket URL

// Reactive symbol and scope refs - these update when symbols/scopes become available
const symbolRefs = new Map<
  number,
  ReturnType<typeof shallowRef<SerializedOutputSymbol | undefined>>
>()
const scopeRefs = new Map<
  number,
  ReturnType<typeof shallowRef<SerializedOutputScope | undefined>>
>()
const fileRefs = new Map<number, ReturnType<typeof shallowRef<SerializedFileInfo | undefined>>>()
const nodeRefs = new Map<number, ReturnType<typeof shallowRef<SerializedNode | undefined>>>()

// Computed getters for commonly used data
export const symbols = computed(() => Array.from(state.symbols.values()))
export const scopes = computed(() => Array.from(state.scopes.values()))
export const files = computed(() => Array.from(state.files.values()))
export const nodes = computed(() => Array.from(state.nodes.values()))
export const visibleNodes = computed(() =>
  Array.from(state.nodes.values()).filter((node) => !node.deleted),
)
export const isConnected = computed(() => state.isConnected)
export const connectionStatus = computed(() => state.connectionStatus)
export const currentError = computed(() => state.currentError)
export const hasError = computed(() => state.currentError !== null)

// OutputSymbol operations
export function getSymbol(id: number) {
  if (!symbolRefs.has(id)) {
    const symbolRef = shallowRef<SerializedOutputSymbol | undefined>(state.symbols.get(id))
    symbolRefs.set(id, symbolRef)
    return symbolRef
  }
  return symbolRefs.get(id)!
}

export function addSymbol(data: SerializedOutputSymbol) {
  state.symbols.set(data.id, data)

  // Update refkey-to-symbol index
  for (const refkey of data.refkeys) {
    refkeyToSymbolIndex.set(refkey.key, data.id)
  }

  // Update the reactive ref if it exists
  const symbolRef = symbolRefs.get(data.id)
  if (symbolRef) {
    symbolRef.value = data
  }
}

export function updateSymbol(data: SerializedOutputSymbol) {
  const existingSymbol = state.symbols.get(data.id)
  if (existingSymbol) {
    // Clear old refkey mappings before updating
    for (const refkey of existingSymbol.refkeys) {
      if (refkeyToSymbolIndex.get(refkey.key) === data.id) {
        refkeyToSymbolIndex.delete(refkey.key)
      }
    }

    // Update properties of the existing object to maintain reactivity
    Object.assign(existingSymbol, data)

    // Update refkey-to-symbol index with new mappings
    for (const refkey of data.refkeys) {
      refkeyToSymbolIndex.set(refkey.key, data.id)
    }

    // Update the reactive ref if it exists
    const symbolRef = symbolRefs.get(data.id)
    if (symbolRef) {
      symbolRef.value = existingSymbol
    }
  } else {
    // If symbol doesn't exist, add it
    addSymbol(data)
  }
}

export function getSymbolByRefkey(refkeyString: string) {
  const symbolId = refkeyToSymbolIndex.get(refkeyString)
  if (symbolId !== undefined) {
    return getSymbol(symbolId)
  }
  return shallowRef<SerializedOutputSymbol | undefined>(undefined)
}

// OutputScope operations
export function getScope(id: number) {
  if (!scopeRefs.has(id)) {
    const scopeRef = shallowRef<SerializedOutputScope | undefined>(state.scopes.get(id))
    scopeRefs.set(id, scopeRef)
    return scopeRef
  }
  return scopeRefs.get(id)!
}

export function addScope(data: SerializedOutputScope) {
  state.scopes.set(data.id, data)

  // Update the reactive ref if it exists
  const scopeRef = scopeRefs.get(data.id)
  if (scopeRef) {
    scopeRef.value = data
  }
}

export function updateScope(data: SerializedOutputScope) {
  const existingScope = state.scopes.get(data.id)
  if (existingScope) {
    // Update properties of the existing object to maintain reactivity
    Object.assign(existingScope, data)

    // Update the reactive ref if it exists
    const scopeRef = scopeRefs.get(data.id)
    if (scopeRef) {
      scopeRef.value = existingScope
    }
  } else {
    // If scope doesn't exist, add it
    addScope(data)
  }
}

// File operations
export function getFile(id: number) {
  if (!fileRefs.has(id)) {
    const fileRef = shallowRef<SerializedFileInfo | undefined>(state.files.get(id))
    fileRefs.set(id, fileRef)
    return fileRef
  }
  return fileRefs.get(id)!
}

export function addFile(data: SerializedFileInfo) {
  state.files.set(data.id, data)

  // Update the reactive ref if it exists
  const fileRef = fileRefs.get(data.id)
  if (fileRef) {
    fileRef.value = data
  }
}

export function updateFile(data: SerializedFileInfo) {
  const existingFile = state.files.get(data.id)
  if (existingFile) {
    // Update properties of the existing object to maintain reactivity
    Object.assign(existingFile, data)

    // Update the reactive ref if it exists
    const fileRef = fileRefs.get(data.id)
    if (fileRef) {
      fileRef.value = existingFile
    }
  } else {
    // If file doesn't exist, add it
    addFile(data)
  }
}

// Node operations for component tree
export function getNode(id: number) {
  if (!nodeRefs.has(id)) {
    const nodeRef = shallowRef<SerializedNode | undefined>(state.nodes.get(id))
    nodeRefs.set(id, nodeRef)
    return nodeRef
  }
  return nodeRefs.get(id)!
}

export function addNode(data: SerializedNode) {
  state.nodes.set(data.id, data)

  // If this node has a parent, ensure the parent has this node in its children
  if (data.parentId !== null) {
    const parent = state.nodes.get(data.parentId)
    if (parent && !parent.children.includes(data.id)) {
      // eslint-disable-next-line no-console
      console.log('Node ' + data.id + " doesn't have parent " + data.parentId)
      parent.children.push(data.id)

      // Update the parent's reactive ref if it exists
      const parentRef = nodeRefs.get(data.parentId)
      if (parentRef) {
        parentRef.value = parent
      }
    }
  }

  // Update the reactive ref if it exists
  const nodeRef = nodeRefs.get(data.id)
  if (nodeRef) {
    nodeRef.value = data
  }
}

export function updateNode(data: SerializedNode) {
  const existingNode = state.nodes.get(data.id)
  if (existingNode) {
    // Update properties of the existing object to maintain reactivity
    Object.assign(existingNode, data)

    // If this node has a parent, ensure the parent has this node in its children
    if (data.parentId !== null) {
      const parent = state.nodes.get(data.parentId)
      if (parent && !parent.children.includes(data.id)) {
        parent.children.push(data.id)

        // Update the parent's reactive ref if it exists
        const parentRef = nodeRefs.get(data.parentId)
        if (parentRef) {
          parentRef.value = parent
        }
      }
    }

    // Update the reactive ref if it exists
    const nodeRef = nodeRefs.get(data.id)
    if (nodeRef) {
      nodeRef.value = existingNode
    }
  } else {
    // If node doesn't exist, add it
    addNode(data)
  }
}

export function removeNode(id: number) {
  // Instead of removing the node, mark it as deleted
  const existingNode = state.nodes.get(id)
  if (existingNode) {
    existingNode.deleted = true

    // Update the reactive ref if it exists
    const nodeRef = nodeRefs.get(id)
    if (nodeRef) {
      nodeRef.value = existingNode
    }
  }
}

// Error operations
export function setError(error: ErrorInfo) {
  state.currentError = error

  // Auto-open error tab when error occurs
  // We need to import useTabs here, but to avoid circular dependency,
  // we'll emit an event instead and handle it in the component
  window.dispatchEvent(new CustomEvent('error-occurred', { detail: error }))
}

export function clearError() {
  state.currentError = null
}

// Helper function to build component stack from a node ID
export function getComponentStack(nodeId: number | null): SerializedNode[] {
  const stack: SerializedNode[] = []
  let currentNodeId: number | null = nodeId

  while (currentNodeId !== null) {
    const node = state.nodes.get(currentNodeId)
    if (node) {
      stack.push(node)
      currentNodeId = node.parentId
    } else {
      break
    }
  }

  return stack
}

// WebSocket connection management
export function connect(url?: string): Promise<void> {
  if (url) {
    wsUrl.value = url
  }

  return new Promise((resolve, reject) => {
    if (websocket?.readyState === WebSocket.OPEN) {
      resolve()
      return
    }

    state.connectionStatus = 'connecting'
    websocket = new WebSocket(wsUrl.value)

    websocket.onopen = () => {
      state.isConnected = true
      state.connectionStatus = 'connected'
      // eslint-disable-next-line no-console
      console.log('WebSocket connected to', wsUrl.value)
      resolve()
    }

    websocket.onclose = () => {
      state.isConnected = false
      state.connectionStatus = 'disconnected'
      // eslint-disable-next-line no-console
      console.log('WebSocket disconnected')
    }

    websocket.onerror = (error) => {
      state.connectionStatus = 'error'
      // eslint-disable-next-line no-console
      console.error('WebSocket error:', error)
      reject(error)
    }

    websocket.onmessage = (event) => {
      try {
        const message: WebSocketMessage = JSON.parse(event.data)
        handleWebSocketMessage(message)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to parse WebSocket message:', error)
      }
    }
  })
}

export function disconnect(): void {
  if (websocket) {
    websocket.close()
    websocket = null
  }
  state.isConnected = false
  state.connectionStatus = 'disconnected'
}

function handleWebSocketMessage(message: WebSocketMessage): void {
  switch (message.type) {
    case 'symbol_added':
      addSymbol(message.data)
      break

    case 'symbol_updated':
      updateSymbol(message.data)
      break

    case 'scope_added':
      addScope(message.data)
      break

    case 'scope_updated':
      updateScope(message.data)
      break

    case 'file_added':
      addFile(message.data)
      break

    case 'file_updated':
      updateFile(message.data)
      break

    case 'node_added':
      addNode(message.data)
      break

    case 'node_updated':
      updateNode(message.data)
      break

    case 'node_deleted':
      removeNode(message.data.nodeId)
      break

    case 'error_added':
      setError(message.data)
      break

    /*
    case 'symbol_removed':
      removeSymbol((message.data as { id: string }).id)
      break

    case 'scope_removed':
      removeScope((message.data as { id: string }).id)
      break
      */

    default:
      // eslint-disable-next-line no-console
      console.warn('Unknown message type:', (message as any).type)
  }
}

// Utility functions for debugging and testing
export function clearStore(): void {
  state.symbols.clear()
  state.scopes.clear()
  state.files.clear()
  state.nodes.clear()
  symbolRefs.clear()
  scopeRefs.clear()
  fileRefs.clear()
  nodeRefs.clear()
}

// Export the raw state for advanced use cases
export { state as storeState }

// Node selection functionality
export function selectNode(nodeId: number | null) {
  selectedNodeId.value = nodeId
}
