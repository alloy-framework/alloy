import type { SerializedOutputScope, SerializedOutputSymbol } from '@alloy-js/core/symbols'

// Check if an object is a refkey (has only a 'key' property with string value)
export const isRefkeyObject = (value: any): value is { key: string } => {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const keys = Object.keys(value)
  return keys.length === 1 && keys[0] === 'key' && typeof value.key === 'string'
}

// Check if an object is a scope (has id, flags, symbols, and children properties)
export const isScopeObject = (value: any): value is SerializedOutputScope => {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  return (
    typeof value.id === 'number' &&
    typeof value.flags === 'number' &&
    Array.isArray(value.symbols) &&
    Array.isArray(value.children)
  )
}

// Check if an object is a symbol (has id, name, originalName, and flags properties)
export const isSymbolObject = (value: any): value is SerializedOutputSymbol => {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  return (
    typeof value.id === 'number' &&
    typeof value.name === 'string' &&
    typeof value.originalName === 'string' &&
    typeof value.flags === 'number'
  )
}

export interface PropValueInfo {
  formattedValue: string
  isRefkey: boolean
  refkeyString?: string
  isScope: boolean
  scopeId?: number
  scopeName?: string
  isSymbol: boolean
  symbolId?: number
  symbolName?: string
}

// Get comprehensive information about a prop value
export const getPropValueInfo = (value: any): PropValueInfo => {
  // Check for refkey
  if (isRefkeyObject(value)) {
    return {
      formattedValue: `Refkey(${value.key})`,
      isRefkey: true,
      refkeyString: value.key,
      isScope: false,
      isSymbol: false,
    }
  }

  // Check for scope
  if (isScopeObject(value)) {
    return {
      formattedValue: `Scope(${value.name})`,
      isRefkey: false,
      isScope: true,
      scopeId: value.id,
      scopeName: value.name,
      isSymbol: false,
    }
  }

  // Check for symbol
  if (isSymbolObject(value)) {
    return {
      formattedValue: `Symbol(${value.name})`,
      isRefkey: false,
      isScope: false,
      isSymbol: true,
      symbolId: value.id,
      symbolName: value.name,
    }
  }

  // Format regular values
  let formattedValue: string
  if (typeof value === 'string') {
    formattedValue = JSON.stringify(value)
  } else if (typeof value === 'number' || typeof value === 'boolean') {
    formattedValue = String(value)
  } else if (value === null) {
    formattedValue = 'null'
  } else if (value === undefined) {
    formattedValue = 'undefined'
  } else if (Array.isArray(value)) {
    formattedValue = '[array]'
  } else {
    formattedValue = '{object}'
  }

  return {
    formattedValue,
    isRefkey: false,
    isScope: false,
    isSymbol: false,
  }
}
