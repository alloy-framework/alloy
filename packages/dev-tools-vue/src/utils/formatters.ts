import { OutputSymbolFlags, OutputScopeFlags } from '@alloy-js/core/symbols'

/**
 * Format symbol flags as human-readable flag names
 */
export function formatSymbolFlags(flags: number): string[] {
  const flagNames: string[] = []

  if (flags === OutputSymbolFlags.None) {
    return ['None']
  }

  if (flags & OutputSymbolFlags.InstanceMemberContainer) {
    flagNames.push('InstanceMemberContainer')
  }
  if (flags & OutputSymbolFlags.StaticMemberContainer) {
    flagNames.push('StaticMemberContainer')
  }
  if (flags & OutputSymbolFlags.InstanceMember) {
    flagNames.push('InstanceMember')
  }
  if (flags & OutputSymbolFlags.StaticMember) {
    flagNames.push('StaticMember')
  }
  if (flags & OutputSymbolFlags.Transient) {
    flagNames.push('Transient')
  }
  if (flags & OutputSymbolFlags.Alias) {
    flagNames.push('Alias')
  }

  return flagNames
}

/**
 * Format scope flags as human-readable flag names
 */
export function formatScopeFlags(flags: number): string[] {
  const flagNames: string[] = []

  if (flags === OutputScopeFlags.None) {
    return ['None']
  }

  if (flags & OutputScopeFlags.StaticMemberScope) {
    flagNames.push('StaticMemberScope')
  }
  if (flags & OutputScopeFlags.InstanceMemberScope) {
    flagNames.push('InstanceMemberScope')
  }
  if (flags & OutputScopeFlags.Transient) {
    flagNames.push('Transient')
  }

  return flagNames
}
