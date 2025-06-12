<script setup lang="ts">
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable'
import MenuPane from './MenuPane.vue'
import ContentPane from './ContentPane.vue'

interface Props {}

const props = defineProps<Props>()
</script>

<template>
  <div class="flex-1 min-h-0 overflow-hidden">
    <ResizablePanelGroup direction="horizontal" class="h-full">
      <!-- Left Panel -->
      <ResizablePanel :default-size="20" :min-size="15">
        <MenuPane />
      </ResizablePanel>

      <!-- Resize Handle -->
      <ResizableHandle />

      <!-- Right Panel -->
      <ResizablePanel :default-size="80" :min-size="20">
        <ContentPane />
      </ResizablePanel>
    </ResizablePanelGroup>
  </div>
</template>
