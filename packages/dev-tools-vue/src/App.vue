<script setup lang="ts">
import NavigationBar from '@/components/NavigationBar.vue'
import MainContentArea from '@/components/MainContentArea.vue'
import StatusBar from '@/components/StatusBar.vue'
import { ref, onMounted, onUnmounted } from 'vue'
import { connect, disconnect } from './lib/store'
import { useTabs } from './composables/useTabs'
import type { ErrorInfo } from './lib/types'

const activeTab = ref('Inspector')
const { addTab } = useTabs()

const tabs = [
  { id: 'Inspector', label: 'Inspector' },
  { id: 'Trace', label: 'Trace' },
]

// Handle error events from store
const handleErrorOccurred = (event: CustomEvent<ErrorInfo>) => {
  const error = event.detail
  addTab({
    id: `error-${Date.now()}`,
    title: 'Runtime Error',
    type: 'error' as any,
    content: error,
    closable: true,
  })
}

// Connect to WebSocket on mount
onMounted(async () => {
  try {
    await connect()
    console.log('Connected to symbol server')
  } catch (error) {
    console.error('Failed to connect to symbol server:', error)
  }

  // Listen for error events
  window.addEventListener('error-occurred', handleErrorOccurred as EventListener)
})

// Disconnect on unmount
onUnmounted(() => {
  disconnect()
  window.removeEventListener('error-occurred', handleErrorOccurred as EventListener)
})
</script>

<template>
  <div class="h-screen w-screen flex flex-col bg-gray-50">
    <NavigationBar :tabs="tabs" :active-tab="activeTab" @update:active-tab="activeTab = $event" />
    <MainContentArea />
    <StatusBar />
  </div>
</template>
