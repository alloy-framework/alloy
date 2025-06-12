import type { SerializedNode } from '@/lib/types'
import { getNode } from '@/lib/store'
import { computed } from 'vue'

export interface ContentMapping {
  nodeId: number
  start: number
  end: number
  content: string
  nodeKind?: string
}

/**
 * Maps file contents to their corresponding tree nodes.
 * This function walks the tree starting from the root node and maps each node's
 * content to regions in the file contents.
 */
export function useContentMapping(fileContents: string, rootNodeId: number) {
  const mappings = computed(() => {
    const result: ContentMapping[] = []

    try {
      // eslint-disable-next-line no-console
      console.log('[Content Mapping] Starting content mapping for file:', {
        fileLength: fileContents.length,
        rootNodeId,
        filePreview:
          JSON.stringify(fileContents.substring(0, 100)) + (fileContents.length > 100 ? '...' : ''),
      })

      // Walk the tree and map content sequentially
      walkTreeForContent(rootNodeId, fileContents, 0, result)

      // eslint-disable-next-line no-console
      console.log('[Content Mapping] Completed mapping:', {
        totalMappings: result.length,
        mappings: result.map((m) => ({
          nodeId: m.nodeId,
          nodeKind: m.nodeKind,
          start: m.start,
          end: m.end,
          content: JSON.stringify(m.content),
        })),
      })
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('[Content Mapping] Error during content mapping:', error)
    }

    return result
  })

  return {
    mappings,
    getWrappedContent: () => wrapContentWithSpans(fileContents, mappings.value),
  }
}

function walkTreeForContent(
  nodeId: number,
  fileContents: string,
  startPosition: number,
  mappings: ContentMapping[],
): number {
  const nodeRef = getNode(nodeId)
  const node = nodeRef.value

  if (!node) {
    // eslint-disable-next-line no-console
    console.log('[Content Mapping] Node not found:', nodeId)
    return startPosition
  }

  // Skip deleted nodes - they shouldn't be mapped to any content
  if (node.deleted) {
    // eslint-disable-next-line no-console
    console.log('[Content Mapping] Skipping deleted node:', { nodeId, nodeKind: node.kind })
    return startPosition
  }

  // eslint-disable-next-line no-console
  console.log('[Content Mapping] Processing node:', {
    nodeId: node.id,
    nodeKind: node.kind,
    tag: (node as any).tag,
    childrenCount: node.children.length,
    startPosition,
  })

  let currentPosition = startPosition

  // Process children in order - this is crucial for sequential mapping
  for (const child of node.children) {
    if (typeof child === 'string') {
      // eslint-disable-next-line no-console
      console.log('[Content Mapping] Processing text child:', {
        parentNodeId: node.id,
        text: JSON.stringify(child),
        currentPosition,
      })

      // Text content - find this text in the file contents starting from current position
      const textMatch = findTextInContent(child, fileContents, currentPosition)
      if (textMatch) {
        // Add mapping for this text content
        mappings.push({
          nodeId: node.id,
          start: textMatch.start,
          end: textMatch.end,
          content: child,
          nodeKind: node.kind,
        })
        currentPosition = textMatch.end

        // eslint-disable-next-line no-console
        console.log('[Content Mapping] Mapped text content:', {
          nodeId: node.id,
          content: JSON.stringify(child),
          start: textMatch.start,
          end: textMatch.end,
          newPosition: currentPosition,
          actualContent: JSON.stringify(fileContents.substring(textMatch.start, textMatch.end)),
        })
      } else {
        // eslint-disable-next-line no-console
        console.log('[Content Mapping] Failed to map text content:', {
          nodeId: node.id,
          content: JSON.stringify(child),
          currentPosition,
          fileRemainder: JSON.stringify(
            fileContents.substring(currentPosition, currentPosition + 50),
          ),
          searchContext: {
            beforePosition: JSON.stringify(
              fileContents.substring(Math.max(0, currentPosition - 10), currentPosition),
            ),
            atPosition: JSON.stringify(
              fileContents.substring(currentPosition, currentPosition + 20),
            ),
          },
        })

        // For failed text mappings, still advance position to avoid getting stuck
        // This is a fallback to prevent infinite loops
        if (child.length > 0) {
          const fallbackIndex = fileContents.indexOf(child, currentPosition)
          if (fallbackIndex !== -1) {
            // eslint-disable-next-line no-console
            console.log('[Content Mapping] Fallback: Found text at different position:', {
              nodeId: node.id,
              content: JSON.stringify(child),
              expectedPosition: currentPosition,
              actualPosition: fallbackIndex,
              gap: fallbackIndex - currentPosition,
            })
            currentPosition = fallbackIndex + child.length
          }
        }
      }
    } else if (typeof child === 'number') {
      // eslint-disable-next-line no-console
      console.log('[Content Mapping] Processing node child:', {
        parentNodeId: node.id,
        childNodeId: child,
        currentPosition,
      })

      // Node reference - recursively process the child node
      // Check if the child node is deleted before processing
      const childNodeRef = getNode(child)
      const childNode = childNodeRef.value

      if (!childNode) {
        // eslint-disable-next-line no-console
        console.log('[Content Mapping] Child node not found in store:', {
          parentNodeId: node.id,
          childNodeId: child,
          currentPosition,
        })
        // Continue with current position - don't advance for missing nodes
        continue
      }

      if (childNode.deleted) {
        // eslint-disable-next-line no-console
        console.log('[Content Mapping] Skipping deleted child node:', {
          childNodeId: child,
          currentPosition,
        })
        // Skip deleted nodes entirely
        continue
      }

      currentPosition = walkTreeForContent(child, fileContents, currentPosition, mappings)
    }
  }

  // Special handling for intrinsic elements that render without children
  // These are elements like "br", "line", "hardline", etc. that render as whitespace/breaks
  // but don't have text children
  if (node.kind === 'intrinsic' && node.children.length === 0) {
    const intrinsicNode = node as any // Cast to access tag property
    const intrinsicMapping = handleIntrinsicElement(intrinsicNode, fileContents, currentPosition)
    if (intrinsicMapping) {
      mappings.push({
        nodeId: node.id,
        start: intrinsicMapping.start,
        end: intrinsicMapping.end,
        content: intrinsicMapping.content,
        nodeKind: node.kind,
      })
      currentPosition = intrinsicMapping.end
    }
  }

  return currentPosition
}

function findTextInContent(
  text: string,
  fileContents: string,
  startPosition: number,
): { start: number; end: number } | null {
  // Handle empty strings specially - they should be zero-width mappings
  if (text === '') {
    return {
      start: startPosition,
      end: startPosition,
    }
  }

  // Skip whitespace-only text that isn't an empty string
  if (text.trim() === '' && text !== '') {
    // For whitespace, try to find exact match first
    const index = fileContents.indexOf(text, startPosition)
    if (index !== -1) {
      return {
        start: index,
        end: index + text.length,
      }
    }
    return null
  }

  // Find the text starting from the current position
  const index = fileContents.indexOf(text, startPosition)
  if (index !== -1) {
    return {
      start: index,
      end: index + text.length,
    }
  }

  // If exact match not found, try to find it with flexible whitespace matching
  // This is especially important for handling spaces and line breaks
  if (text.trim().length > 0) {
    const trimmedText = text.trim()
    const trimmedIndex = fileContents.indexOf(trimmedText, startPosition)
    if (trimmedIndex !== -1) {
      // eslint-disable-next-line no-console
      console.log('[Content Mapping] Found text with trimmed matching:', {
        originalText: JSON.stringify(text),
        trimmedText: JSON.stringify(trimmedText),
        startPosition,
        foundAt: trimmedIndex,
      })
      return {
        start: trimmedIndex,
        end: trimmedIndex + trimmedText.length,
      }
    }
  }

  // For single character content, look for it more broadly
  if (text.length === 1) {
    for (let i = startPosition; i < Math.min(fileContents.length, startPosition + 20); i++) {
      if (fileContents[i] === text) {
        // eslint-disable-next-line no-console
        console.log('[Content Mapping] Found single character with lookahead:', {
          character: JSON.stringify(text),
          expectedPosition: startPosition,
          actualPosition: i,
          gap: i - startPosition,
        })
        return {
          start: i,
          end: i + 1,
        }
      }
    }
  }

  return null
}

function handleIntrinsicElement(
  node: SerializedNode,
  fileContents: string,
  currentPosition: number,
): { start: number; end: number; content: string } | null {
  if (node.kind !== 'intrinsic') {
    return null
  }

  const intrinsicNode = node as any // Cast to access tag property

  // Handle intrinsic elements that render as whitespace or breaks
  // These elements typically don't have children and render as specific characters
  switch (intrinsicNode.tag) {
    case 'br':
    case 'line': {
      // These might render as line breaks or spaces
      const match = findLineBreakOrSpace(fileContents, currentPosition)
      if (match) {
        return {
          start: match.start,
          end: match.end,
          content: fileContents.substring(match.start, match.end),
        }
      }
      break
    }
    case 'sbr':
    case 'softline': {
      // Soft breaks might render as nothing or as a line break
      const match = findSoftBreak(fileContents, currentPosition)
      if (match) {
        return {
          start: match.start,
          end: match.end,
          content: fileContents.substring(match.start, match.end),
        }
      }
      break
    }
    case 'hardline':
    case 'hbr':
    case 'literalline':
    case 'lbr': {
      // Hard breaks should always render as line breaks
      const match = findHardBreak(fileContents, currentPosition)
      if (match) {
        return {
          start: match.start,
          end: match.end,
          content: fileContents.substring(match.start, match.end),
        }
      }
      break
    }
    // Container elements like 'indent', 'dedent', 'group', 'align', etc.
    // don't render content themselves - their children do
    default:
      // For other intrinsic elements, don't map specific content
      break
  }

  return null
}

function findLineBreakOrSpace(
  fileContents: string,
  startPosition: number,
): { start: number; end: number } | null {
  // Look for line break first
  if (startPosition < fileContents.length && fileContents[startPosition] === '\n') {
    return { start: startPosition, end: startPosition + 1 }
  }

  // Look for carriage return + line feed
  if (
    startPosition < fileContents.length - 1 &&
    fileContents.substring(startPosition, startPosition + 2) === '\r\n'
  ) {
    return { start: startPosition, end: startPosition + 2 }
  }

  // Look for space
  if (startPosition < fileContents.length && fileContents[startPosition] === ' ') {
    return { start: startPosition, end: startPosition + 1 }
  }

  return null
}

function findSoftBreak(
  fileContents: string,
  startPosition: number,
): { start: number; end: number } | null {
  // Soft breaks might be nothing (zero-width) or a line break
  if (startPosition < fileContents.length && fileContents[startPosition] === '\n') {
    return { start: startPosition, end: startPosition + 1 }
  }

  // If no line break, soft break might be zero-width
  return { start: startPosition, end: startPosition }
}

function findHardBreak(
  fileContents: string,
  startPosition: number,
): { start: number; end: number } | null {
  if (startPosition < fileContents.length && fileContents[startPosition] === '\n') {
    return { start: startPosition, end: startPosition + 1 }
  }

  if (
    startPosition < fileContents.length - 1 &&
    fileContents.substring(startPosition, startPosition + 2) === '\r\n'
  ) {
    return { start: startPosition, end: startPosition + 2 }
  }

  return null
}

function wrapContentWithSpans(fileContents: string, mappings: ContentMapping[]): string {
  if (mappings.length === 0) {
    return escapeHtml(fileContents)
  }

  // Sort mappings by start position and handle overlaps
  const sortedMappings = [...mappings]
    .sort((a, b) => a.start - b.start)
    .filter((mapping, index, array) => {
      // Remove duplicate or overlapping mappings
      if (index === 0) return true
      const prev = array[index - 1]
      return mapping.start >= prev.end
    })

  let result = ''
  let lastEnd = 0

  for (const mapping of sortedMappings) {
    // Add any content between the last mapping and this one
    if (mapping.start > lastEnd) {
      const unmappedContent = fileContents.substring(lastEnd, mapping.start)
      if (unmappedContent.length > 0) {
        // Just add unmapped content as plain text without special styling
        result += escapeHtml(unmappedContent)
      }
    }

    // Add the mapped content wrapped in a span with additional metadata
    const content = fileContents.substring(mapping.start, mapping.end)
    const nodeType = getNodeTypeFromMapping(mapping)
    result += `<span data-node-id="${mapping.nodeId}" data-node-type="${nodeType}" class="node-content mapped">${escapeHtml(content)}</span>`

    lastEnd = mapping.end
  }

  // Add any remaining content
  if (lastEnd < fileContents.length) {
    const remainingContent = fileContents.substring(lastEnd)
    result += escapeHtml(remainingContent)
  }

  return result
}

function getNodeTypeFromMapping(mapping: ContentMapping): string {
  // This could be enhanced to determine node type from the mapping
  // For now, just return a generic type based on content
  if (mapping.content.trim() === '') {
    return 'whitespace'
  } else if (mapping.content.includes('\n')) {
    return 'multiline'
  } else if (mapping.content.length === 1) {
    return 'char'
  } else {
    return 'text'
  }
}

function escapeHtml(text: string): string {
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}
