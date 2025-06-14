import type { SerializedOutputScope, SerializedOutputSymbol } from '@alloy-js/core/symbols'

export interface StoreState {
  symbols: Map<number, SerializedOutputSymbol>
  scopes: Map<number, SerializedOutputScope>
  files: Map<number, SerializedFileInfo>
  nodes: Map<number, SerializedNode>
  isConnected: boolean
  connectionStatus: 'disconnected' | 'connecting' | 'connected' | 'error'
  currentError: ErrorInfo | null // Add error state
}

export interface ErrorInfo {
  message: string
  stack: string // JavaScript error stack
  nodeId: number | null // The component node where the error occurred
}

export interface WebSocketSymbolAdded {
  type: 'symbol_added'
  data: {
    symbol: SerializedOutputSymbol
    nodeId: number | null
  }
}

export interface WebSocketSymbolUpdated {
  type: 'symbol_updated'
  data: {
    symbol: SerializedOutputSymbol
    nodeId: number | null
  }
}

export interface WebSocketSymbolDeleted {
  type: 'symbol_deleted'
  data: {
    symbolId: number
  }
}

export interface WebSocketScopeAdded {
  type: 'scope_added'
  data: {
    scope: SerializedOutputScope
    nodeId: number | null
  }
}

export interface WebSocketScopeUpdated {
  type: 'scope_updated'
  data: {
    scope: SerializedOutputScope
    nodeId: number | null
  }
}

export interface WebSocketScopeDeleted {
  type: 'scope_deleted'
  data: {
    scopeId: number
  }
}

export interface SerializedFileInfo {
  id: number
  path: string[]
  name: string
  contents: string
  nodeId: number
}

export interface WebSocketFileAdded {
  type: 'file_added'
  data: SerializedFileInfo
}

export interface WebSocketFileUpdated {
  type: 'file_updated'
  data: SerializedFileInfo
}

// Component tree node types
export interface SerializedNodeBase {
  id: number
  kind: string
  parentId: number | null
  children: SerializedNodeContent[]
  deleted?: boolean // Mark nodes as deleted but keep them in the tree
}

export type SerializedNodeContent =
  | string // text content
  | number // a node reference

export interface SerializedFragmentNode extends SerializedNodeBase {
  kind: 'fragment'
}

export interface SerializedIntrinsicElementNode extends SerializedNodeBase {
  kind: 'intrinsic'
  tag: string
  props: Record<string, any>
}

export interface SerializedComponentNode extends SerializedNodeBase {
  kind: 'component'
  component: string
  props: Record<string, any>
  context: {
    name: string
    value: unknown
  }
}

export type SerializedNode =
  | SerializedIntrinsicElementNode
  | SerializedComponentNode
  | SerializedFragmentNode

export interface WebSocketNodeAdded {
  type: 'node_added'
  data: SerializedNode
}

export interface WebSocketNodeUpdated {
  type: 'node_updated'
  data: SerializedNode
}

export interface WebSocketNodeDeleted {
  type: 'node_deleted'
  data: {
    nodeId: number
  }
}

// Error WebSocket message
export interface WebSocketErrorAdded {
  type: 'error_added'
  data: ErrorInfo
}

export interface WebSocketRerender {
  type: 'rerender'
  data: {
    nodeId: number
  }
}

export type WebSocketMessage =
  | WebSocketScopeAdded
  | WebSocketScopeUpdated
  | WebSocketScopeDeleted
  | WebSocketSymbolAdded
  | WebSocketSymbolUpdated
  | WebSocketSymbolDeleted
  | WebSocketFileAdded
  | WebSocketFileUpdated
  | WebSocketNodeAdded
  | WebSocketNodeUpdated
  | WebSocketNodeDeleted
  | WebSocketErrorAdded
  | WebSocketRerender
