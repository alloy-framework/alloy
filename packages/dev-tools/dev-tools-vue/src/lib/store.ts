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

// Track which node created each symbol and scope
const symbolCreatorNodes = reactive(new Map<number, number | null>())
const scopeCreatorNodes = reactive(new Map<number, number | null>())

// Selected node state for component tree navigation
export const selectedNodeId = ref<number | null>(null)

// WebSocket connection
let websocket: WebSocket | null = null
const wsUrl = ref('ws://localhost:8080') // Default WebSocket URL
let retryTimeout: ReturnType<typeof setTimeout> | null = null
const RETRY_DELAY = 2000 // 2 seconds

let initialConnectionSucceeded = false // Tracks if the first connection attempt sequence was successful
let currentConnectPromise: Promise<void> | null = null
let resolveCurrentConnectPromise: (() => void) | null = null

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

export function addSymbol(data: SerializedOutputSymbol, nodeId: number | null = null) {
  state.symbols.set(data.id, data)

  // Track which node created this symbol
  if (nodeId !== null) {
    symbolCreatorNodes.set(data.id, nodeId)
  }

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

export function updateSymbol(data: SerializedOutputSymbol, nodeId: number | null = null) {
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

    // Update creator node if provided
    if (nodeId !== null) {
      symbolCreatorNodes.set(data.id, nodeId)
    }

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
    addSymbol(data, nodeId)
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

export function addScope(data: SerializedOutputScope, nodeId: number | null = null) {
  state.scopes.set(data.id, data)

  // Track which node created this scope
  if (nodeId !== null) {
    scopeCreatorNodes.set(data.id, nodeId)
  }

  // Update the reactive ref if it exists
  const scopeRef = scopeRefs.get(data.id)
  if (scopeRef) {
    scopeRef.value = data
  }
}

export function updateScope(data: SerializedOutputScope, nodeId: number | null = null) {
  const existingScope = state.scopes.get(data.id)
  if (existingScope) {
    // Update properties of the existing object to maintain reactivity
    Object.assign(existingScope, data)

    // Update creator node if provided
    if (nodeId !== null) {
      scopeCreatorNodes.set(data.id, nodeId)
    }

    // Update the reactive ref if it exists
    const scopeRef = scopeRefs.get(data.id)
    if (scopeRef) {
      scopeRef.value = existingScope
    }
  } else {
    // If scope doesn't exist, add it
    addScope(data, nodeId)
  }
}

export function removeSymbol(symbolId: number) {
  const symbol = state.symbols.get(symbolId)
  if (symbol) {
    // Clear refkey mappings
    for (const refkey of symbol.refkeys) {
      if (refkeyToSymbolIndex.get(refkey.key) === symbolId) {
        refkeyToSymbolIndex.delete(refkey.key)
      }
    }

    // Remove from state
    state.symbols.delete(symbolId)
    symbolCreatorNodes.delete(symbolId)

    // Update the reactive ref if it exists
    const symbolRef = symbolRefs.get(symbolId)
    if (symbolRef) {
      symbolRef.value = undefined
    }
  }
}

export function removeScope(scopeId: number) {
  const scope = state.scopes.get(scopeId)
  if (scope) {
    // Remove from state
    state.scopes.delete(scopeId)
    scopeCreatorNodes.delete(scopeId)

    // Update the reactive ref if it exists
    const scopeRef = scopeRefs.get(scopeId)
    if (scopeRef) {
      scopeRef.value = undefined
    }
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

  if (initialConnectionSucceeded && websocket?.readyState === WebSocket.OPEN && state.isConnected) {
    return Promise.resolve()
  }

  if (currentConnectPromise && !initialConnectionSucceeded) {
    return currentConnectPromise
  }

  initialConnectionSucceeded = false
  if (retryTimeout) {
    clearTimeout(retryTimeout)
    retryTimeout = null
  }

  currentConnectPromise = new Promise<void>((resolve) => {
    resolveCurrentConnectPromise = () => {
      if (currentConnectPromise) {
        resolve()
      }
    }

    const attemptConnection = () => {
      if (initialConnectionSucceeded && state.connectionStatus === 'connected') {
        if (resolveCurrentConnectPromise) {
          resolveCurrentConnectPromise()
          resolveCurrentConnectPromise = null
        }
        return
      }

      state.connectionStatus = 'connecting'
      websocket = new WebSocket(wsUrl.value)

      websocket.onopen = () => {
        state.isConnected = true
        state.connectionStatus = 'connected'
        initialConnectionSucceeded = true

        // eslint-disable-next-line no-console
        console.log('WebSocket connected to', wsUrl.value)

        if (retryTimeout) {
          clearTimeout(retryTimeout)
          retryTimeout = null
        }

        if (resolveCurrentConnectPromise) {
          resolveCurrentConnectPromise()
          resolveCurrentConnectPromise = null
        }
      }

      websocket.onclose = () => {
        state.isConnected = false

        if (initialConnectionSucceeded) {
          state.connectionStatus = 'disconnected'
          // eslint-disable-next-line no-console
          console.log('WebSocket disconnected (was previously connected).')
          if (retryTimeout) {
            clearTimeout(retryTimeout)
            retryTimeout = null
          }
        } else {
          // state.connectionStatus remains 'connecting' (set at the start of attemptConnection)
          // eslint-disable-next-line no-console
          console.log(
            'WebSocket connection attempt failed or closed before initial success. Retrying...',
          )
          if (retryTimeout) clearTimeout(retryTimeout) // Clear previous, if any
          retryTimeout = setTimeout(attemptConnection, RETRY_DELAY)
        }
      }

      websocket.onerror = (error) => {
        // eslint-disable-next-line no-console
        console.error('WebSocket error:', error)

        if (initialConnectionSucceeded && state.connectionStatus === 'connected') {
          state.connectionStatus = 'error'
        }
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
    }

    attemptConnection()
  })

  return currentConnectPromise
}

export function disconnect(): void {
  if (retryTimeout) {
    clearTimeout(retryTimeout)
    retryTimeout = null
  }

  initialConnectionSucceeded = true

  if (websocket) {
    websocket.onopen = null
    websocket.onclose = null
    websocket.onerror = null
    websocket.onmessage = null

    if (websocket.readyState === WebSocket.OPEN || websocket.readyState === WebSocket.CONNECTING) {
      websocket.close()
    }
    websocket = null
  }

  state.isConnected = false
  state.connectionStatus = 'disconnected'

  currentConnectPromise = null
  resolveCurrentConnectPromise = null
}

// Send message to WebSocket server
export function sendMessage(message: WebSocketMessage): void {
  if (!websocket || websocket.readyState !== WebSocket.OPEN) {
    // eslint-disable-next-line no-console
    console.warn('WebSocket is not connected. Cannot send message:', message)
    return
  }

  try {
    websocket.send(JSON.stringify(message))
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to send WebSocket message:', error)
  }
}

// Send rerender message for a specific component
export function rerenderComponent(nodeId: number): void {
  sendMessage({
    type: 'rerender',
    data: { nodeId },
  })
}

function handleWebSocketMessage(message: WebSocketMessage): void {
  switch (message.type) {
    case 'symbol_added':
      addSymbol(message.data.symbol, message.data.nodeId)
      break

    case 'symbol_updated':
      updateSymbol(message.data.symbol, message.data.nodeId)
      break

    case 'scope_added':
      addScope(message.data.scope, message.data.nodeId)
      break

    case 'scope_updated':
      updateScope(message.data.scope, message.data.nodeId)
      break

    case 'symbol_deleted':
      removeSymbol(message.data.symbolId)
      break

    case 'scope_deleted':
      removeScope(message.data.scopeId)
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

// Get creator node for symbols and scopes
export function getSymbolCreatorNode(symbolId: number): number | null {
  return symbolCreatorNodes.get(symbolId) || null
}

export function getScopeCreatorNode(scopeId: number): number | null {
  return scopeCreatorNodes.get(scopeId) || null
}

// Get component name for a nodeId
export function getComponentName(nodeId: number | null): string | null {
  if (nodeId === null) return null
  const node = state.nodes.get(nodeId)
  if (!node) return null

  if (node.kind === 'component') {
    const componentNode = node as any // SerializedComponentNode
    return componentNode.component
  } else if (node.kind === 'intrinsic') {
    const intrinsicNode = node as any // SerializedIntrinsicElementNode
    return `<${intrinsicNode.tag}>`
  } else if (node.kind === 'fragment') {
    return 'Fragment'
  }

  return null
}
