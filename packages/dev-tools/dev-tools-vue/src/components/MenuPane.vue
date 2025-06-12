<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Button } from '@/components/ui/button'
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable'
import { ChevronDownIcon, ChevronRightIcon } from 'lucide-vue-next'
import { getScope } from '@/lib/store'
import { useTabs } from '@/composables/useTabs'
import { useMenuHighlight } from '@/composables/useMenuHighlight'
import SymbolTreeNode from './SymbolTreeNode.vue'
import FileTree from './FileTree.vue'
import type { SerializedFileInfo } from '@/lib/types'

interface Props {}

const props = defineProps<Props>()

const symbolPaneRef = ref<InstanceType<typeof ResizablePanel>>()
const symbolPanelRef = computed(() => symbolPaneRef.value?.splitterPanel)
const filePaneRef = ref<InstanceType<typeof ResizablePanel>>()
const filePanelRef = computed(() => filePaneRef.value?.splitterPanel)

// Find the global scope
const globalScope = computed(() => getScope(0).value)

// Tab management
const { addTab } = useTabs()
const { initializeExpandedState } = useMenuHighlight()

// Initialize expanded state when the component mounts - expand global scope (id: 0)
initializeExpandedState(0)

// Handle file selection
const handleFileSelect = (file: SerializedFileInfo) => {
  addTab({
    id: `file-${file.id}`,
    title: file.name,
    type: 'file',
    content: file,
    closable: true,
  })
}
</script>

<template>
  <ResizablePanelGroup direction="vertical" class="h-full">
    <ResizablePanel :min-size="20" collapsible :collapsed-size="12" ref="filePaneRef">
      <div class="flex flex-col h-full">
        <div
          class="flex items-center justify-between p-2 bg-gray-100 border-b"
          @click="filePanelRef?.isCollapsed ? filePanelRef?.expand() : filePanelRef?.collapse()"
        >
          <div class="flex items-center">
            <Button variant="ghost" size="icon" class="ml-2">
              <ChevronDownIcon v-if="!filePanelRef?.isCollapsed" class="w-4 h-4 text-gray-600" />
              <ChevronRightIcon v-else class="w-4 h-4 text-gray-600" />
            </Button>
            <span class="font-semibold">Files</span>
          </div>
        </div>
        <div class="flex-1 overflow-hidden">
          <FileTree @select-file="handleFileSelect" />
        </div>
      </div>
    </ResizablePanel>
    <ResizableHandle />
    <ResizablePanel :min-size="20" collapsible :collapsed-size="12" ref="symbolPaneRef">
      <div class="flex flex-col h-full">
        <div
          class="flex items-center justify-between p-2 bg-gray-100 border-b"
          @click="
            symbolPanelRef?.isCollapsed ? symbolPanelRef?.expand() : symbolPanelRef?.collapse()
          "
        >
          <div class="flex items-center">
            <Button variant="ghost" size="icon" class="ml-2">
              <ChevronDownIcon v-if="!symbolPanelRef?.isCollapsed" class="w-4 h-4 text-gray-600" />
              <ChevronRightIcon v-else class="w-4 h-4 text-gray-600" />
            </Button>
            <span class="font-semibold">Symbols</span>
          </div>
        </div>
        <div class="overflow-y-auto flex-1">
          <div v-if="globalScope" class="p-2">
            <SymbolTreeNode :scope="globalScope" />
          </div>
          <div v-else class="p-4 text-sm text-gray-500 text-center">No symbols available</div>
        </div>
      </div>
    </ResizablePanel>
  </ResizablePanelGroup>
</template>
