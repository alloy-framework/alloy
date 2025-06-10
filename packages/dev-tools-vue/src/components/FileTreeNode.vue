<script setup lang="ts">
import { ref, computed } from 'vue'
import { File, Folder, FolderOpen } from 'lucide-vue-next'
import TreeNode from './TreeNode.vue'
import { useMenuHighlight } from '@/composables/useMenuHighlight'
import type { SerializedFileInfo } from '@/lib/types'

interface FileTreeItem {
  name: string
  isDirectory: boolean
  children?: Map<string, FileTreeItem>
  file?: SerializedFileInfo
}

interface Props {
  item: FileTreeItem
  name: string
  level?: number
  parentPath?: string[]
}

interface Emits {
  (e: 'selectFile', file: SerializedFileInfo): void
}

const props = withDefaults(defineProps<Props>(), {
  level: 0,
  parentPath: () => [],
})

const emit = defineEmits<Emits>()

const {
  isFileHighlighted,
  isFilePathExpanded,
  toggleFilePathExpanded
} = useMenuHighlight()

const hasChildren = computed(() => {
  return !!(props.item.isDirectory && props.item.children && props.item.children.size > 0)
})

const childItems = computed(() => {
  if (!props.item.children) return []
  return Array.from(props.item.children.entries()).sort(([nameA, itemA], [nameB, itemB]) => {
    // Directories first, then files
    if (itemA.isDirectory && !itemB.isDirectory) return -1
    if (!itemA.isDirectory && itemB.isDirectory) return 1
    return nameA.localeCompare(nameB)
  })
})

const toggleExpand = () => {
  if (hasChildren.value) {
    // Build the full path for this directory
    const fullPath = [...props.parentPath, props.name]
    toggleFilePathExpanded(fullPath)
  }
}

// Check if this node should be expanded based on the highlight system
const shouldBeExpanded = computed(() => {
  if (props.item.isDirectory) {
    // Build the full path for this directory
    const fullPath = [...props.parentPath, props.name]
    return isFilePathExpanded(fullPath)
  }
  return false
})

// Check if this node is highlighted
const isHighlighted = computed(() => {
  if (!props.item.isDirectory && props.item.file) {
    return isFileHighlighted(props.item.file)
  }
  return false
})

const handleSelect = () => {
  if (!props.item.isDirectory && props.item.file) {
    emit('selectFile', props.item.file)
  }
}

const getIcon = () => {
  if (props.item.isDirectory) {
    return shouldBeExpanded.value ? FolderOpen : Folder
  }
  return File
}

const iconColor = computed(() => {
  return 'text-gray-600'
})
</script>

<template>
  <TreeNode
    :title="name"
    :icon="getIcon()"
    :icon-color="iconColor"
    :expanded="shouldBeExpanded"
    :has-children="hasChildren"
    :depth="level"
    :data="item"
    :indent-size="12"
    :click-to-select="!item.isDirectory"
    :highlighted="isHighlighted"
    @toggle="toggleExpand"
    @select="handleSelect"
  >
    <FileTreeNode
      v-for="[childName, childItem] in childItems"
      :key="childName"
      :name="childName"
      :item="childItem"
      :level="level + 1"
      :parent-path="[...parentPath, name]"
      @select-file="emit('selectFile', $event)"
    />
  </TreeNode>
</template>
