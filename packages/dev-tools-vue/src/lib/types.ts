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
  data: SerializedOutputSymbol
}

export interface WebSocketSymbolUpdated {
  type: 'symbol_updated'
  data: SerializedOutputSymbol
}

export interface WebSocketScopeAdded {
  type: 'scope_added'
  data: SerializedOutputScope
}

export interface WebSocketScopeUpdated {
  type: 'scope_updated'
  data: SerializedOutputScope
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

export type WebSocketMessage =
  | WebSocketScopeAdded
  | WebSocketScopeUpdated
  | WebSocketSymbolAdded
  | WebSocketSymbolUpdated
  | WebSocketFileAdded
  | WebSocketFileUpdated
  | WebSocketNodeAdded
  | WebSocketNodeUpdated
  | WebSocketNodeDeleted
  | WebSocketErrorAdded
