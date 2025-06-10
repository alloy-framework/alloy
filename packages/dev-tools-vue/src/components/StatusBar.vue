<script setup lang="ts">
import { connectionStatus, isConnected, hasError, currentError } from '@/lib/store'
import { computed } from 'vue'
import { useTabs } from '@/composables/useTabs'

const { addTab } = useTabs()

// Computed properties for connection display
const statusText = computed(() => {
  switch (connectionStatus.value) {
    case 'connected':
      return 'Connected'
    case 'connecting':
      return 'Connecting...'
    case 'error':
      return 'Connection Error'
    case 'disconnected':
    default:
      return 'Disconnected'
  }
})

const statusClass = computed(() => {
  switch (connectionStatus.value) {
    case 'connected':
      return 'text-green-400'
    case 'connecting':
      return 'text-yellow-400'
    case 'error':
      return 'text-red-400'
    case 'disconnected':
    default:
      return 'text-gray-400'
  }
})

const connectionIcon = computed(() => {
  switch (connectionStatus.value) {
    case 'connected':
      return '🟢'
    case 'connecting':
      return '🟡'
    case 'error':
      return '🔴'
    case 'disconnected':
    default:
      return '⚫'
  }
})

// Handle error indicator click
const handleErrorClick = () => {
  if (currentError.value) {
    addTab({
      id: `error-${Date.now()}`,
      title: 'Runtime Error',
      type: 'error' as any,
      content: currentError.value,
      closable: true,
    })
  }
}
</script>

<template>
  <footer
    class="bg-gray-800 text-gray-300 px-4 py-2 flex items-center justify-between flex-shrink-0"
  >
    <div class="flex items-center space-x-3">
      <span class="text-sm">Alloy Dev Tools</span>
    </div>
    <div class="flex items-center space-x-3">
      <!-- Error Indicator -->
      <button
        v-if="hasError"
        @click="handleErrorClick"
        class="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs transition-colors cursor-pointer"
        title="Click to view error details"
      >
        <span>⚠️</span>
        <span>Error</span>
      </button>

      <span class="text-xs">{{ connectionIcon }}</span>
      <span class="text-xs" :class="statusClass">{{ statusText }}</span>
      <span class="text-xs text-gray-500">WebSocket: ws://localhost:8080</span>
    </div>
  </footer>
</template>
