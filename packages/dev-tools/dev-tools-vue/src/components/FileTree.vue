<script setup lang="ts">
import { computed } from 'vue'
import { files } from '@/lib/store'
import FileTreeNode from './FileTreeNode.vue'
import type { SerializedFileInfo } from '@/lib/types'

interface FileTreeItem {
  name: string
  isDirectory: boolean
  children?: Map<string, FileTreeItem>
  file?: SerializedFileInfo
}

interface Emits {
  (e: 'selectFile', file: SerializedFileInfo): void
}

const emit = defineEmits<Emits>()

// Build the file tree structure from the flat list of files
const fileTree = computed(() => {
  const root = new Map<string, FileTreeItem>()

  for (const file of files.value) {
    let currentLevel = root

    // Navigate/create directory structure
    for (let i = 0; i < file.path.length; i++) {
      const segment = file.path[i]

      if (!currentLevel.has(segment)) {
        currentLevel.set(segment, {
          name: segment,
          isDirectory: true,
          children: new Map<string, FileTreeItem>(),
        })
      }

      const item = currentLevel.get(segment)!
      if (item.children) {
        currentLevel = item.children
      }
    }

    // Add the file itself
    currentLevel.set(file.name, {
      name: file.name,
      isDirectory: false,
      file: file,
    })
  }

  return root
})

// Convert the map to sorted array for rendering
const rootItems = computed(() => {
  return Array.from(fileTree.value.entries()).sort(([nameA, itemA], [nameB, itemB]) => {
    // Directories first, then files
    if (itemA.isDirectory && !itemB.isDirectory) return -1
    if (!itemA.isDirectory && itemB.isDirectory) return 1
    return nameA.localeCompare(nameB)
  })
})
</script>

<template>
  <div class="h-full overflow-y-auto">
    <div v-if="rootItems.length === 0" class="p-4 text-sm text-gray-500 text-center">
      No files available
    </div>
    <FileTreeNode
      v-for="[name, item] in rootItems"
      :key="name"
      :name="name"
      :item="item"
      :level="0"
      :parent-path="[]"
      @select-file="emit('selectFile', $event)"
    />
  </div>
</template>
