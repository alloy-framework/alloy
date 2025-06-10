<script setup lang="ts">
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-vue-next'
import { useTabs } from '@/composables/useTabs'
import { getScope, getSymbol } from '@/lib/store'
import SymbolDetails from '@/components/SymbolDetails.vue'
import ScopeDetails from '@/components/ScopeDetails.vue'
import FileDetails from '@/components/FileDetails.vue'
import ErrorDetails from '@/components/ErrorDetails.vue'
import ComponentTree from '@/components/ComponentTree.vue'
import type { SerializedOutputSymbol, SerializedOutputScope } from '@alloy-js/core/symbols'
import { ref } from 'vue'

// Resizable panel state
const topPanelHeight = ref(60) // percentage

// Content pane component - right panel with tabbed interface
const { tabs, activeTab, activeTabId, setActiveTab, removeTab, addTab } = useTabs()

// Helper functions to open related symbols and scopes
const openSymbolTab = (symbolId: number) => {
  const symbol = getSymbol(symbolId).value
  if (symbol) {
    addTab({
      id: `symbol-${symbol.id}`,
      title: symbol.name,
      type: 'symbol',
      content: symbol,
      closable: true,
    })
  }
}

const openScopeTab = (scopeId: number) => {
  const scope = getScope(scopeId).value
  if (scope) {
    addTab({
      id: `scope-${scope.id}`,
      title: scope.name,
      type: 'scope',
      content: scope,
      closable: true,
    })
  }
}

// Helper to get symbol name by ID
const getSymbolName = (symbolId: number): string => {
  const symbol = getSymbol(symbolId).value
  return symbol?.name || `Symbol ${symbolId}`
}

// Helper to get scope name by ID
const getScopeName = (scopeId: number): string => {
  const scope = getScope(scopeId).value
  return scope?.name || `Scope ${scopeId}`
}

// Demo function to add some sample tabs for testing
function addDemoTabs() {
  addTab({
    id: 'symbol-example',
    title: 'ExampleFunction',
    type: 'symbol',
    content: { name: 'ExampleFunction', type: 'function' },
    closable: true,
  })

  addTab({
    id: 'file-main',
    title: 'main.ts',
    type: 'file',
    content: { path: 'src/main.ts' },
    closable: true,
  })

  addTab({
    id: 'output-build',
    title: 'Build Output',
    type: 'output',
    content: { logs: ['Build started...', 'Build completed'] },
    closable: true,
  })
}

// Add demo tabs on component mount for testing
import { onMounted } from 'vue'
onMounted(() => {
  // Uncomment to add demo tabs for testing
  // addDemoTabs()
})

// Resizer functionality
const isResizing = ref(false)

const startResize = (event: MouseEvent) => {
  isResizing.value = true
  document.addEventListener('mousemove', handleResize)
  document.addEventListener('mouseup', stopResize)
  event.preventDefault()
}

const handleResize = (event: MouseEvent) => {
  if (!isResizing.value) return

  const container = document.querySelector('.content-pane-container') as HTMLElement
  if (!container) return

  const rect = container.getBoundingClientRect()
  const newHeight = ((event.clientY - rect.top) / rect.height) * 100

  // Constrain between 20% and 80%
  topPanelHeight.value = Math.max(20, Math.min(80, newHeight))
}

const stopResize = () => {
  isResizing.value = false
  document.removeEventListener('mousemove', handleResize)
  document.removeEventListener('mouseup', stopResize)
}
</script>

<template>
  <div class="h-full flex flex-col bg-white content-pane-container">
    <!-- Top Panel - Original Tabs Content -->
    <div
      class="flex flex-col bg-white border-b border-gray-200"
      :style="{ height: `${topPanelHeight}%` }"
    >
      <!-- Tabs Interface -->
      <Tabs
        v-if="tabs.length > 0"
        :model-value="activeTabId || undefined"
        @update:model-value="(value: string | number) => setActiveTab(String(value))"
        class="h-full flex flex-col"
      >
        <!-- Tab List with Close Buttons -->
        <div class="border-b border-gray-200 px-4 py-2 flex-shrink-0">
          <TabsList class="h-auto p-1 bg-gray-100">
            <div v-for="tab in tabs" :key="tab.id" class="flex items-center gap-1">
              <TabsTrigger :value="tab.id" class="relative pr-8">
                {{ tab.title }}
                <!-- Close button for closable tabs -->
                <Button
                  v-if="tab.closable !== false"
                  variant="ghost"
                  size="icon"
                  class="absolute right-1 top-1/2 -translate-y-1/2 h-4 w-4 rounded-full hover:bg-gray-300"
                  @click.stop="removeTab(tab.id)"
                >
                  <X class="h-3 w-3" />
                </Button>
              </TabsTrigger>
            </div>
          </TabsList>
        </div>

        <!-- Tab Content -->
        <div class="flex-1 min-h-0">
          <TabsContent
            v-for="tab in tabs"
            :key="tab.id"
            :value="tab.id"
            class="h-full p-6 overflow-y-auto"
          >
            <!-- Content based on tab type -->
            <SymbolDetails
              v-if="tab.type === 'symbol' && tab.content"
              :symbol="tab.content"
              :on-open-symbol="openSymbolTab"
              :on-open-scope="openScopeTab"
              :get-symbol-name="getSymbolName"
              :get-scope-name="getScopeName"
            />

            <ScopeDetails
              v-else-if="tab.type === 'scope' && tab.content"
              :scope="tab.content"
              :on-open-symbol="openSymbolTab"
              :on-open-scope="openScopeTab"
              :get-symbol-name="getSymbolName"
              :get-scope-name="getScopeName"
            />

            <FileDetails v-else-if="tab.type === 'file' && tab.content" :file="tab.content" />

            <ErrorDetails v-else-if="tab.type === 'error' && tab.content" :error="tab.content" />

            <div v-else-if="tab.type === 'output'" class="space-y-4">
              <h3 class="text-lg font-semibold text-gray-800">{{ tab.title }}</h3>
              <div class="bg-black text-gray-300 rounded p-4 font-mono text-sm">
                <p class="text-sm text-gray-400 mb-2">Output content will be displayed here</p>
              </div>
            </div>

            <div v-else class="space-y-4">
              <h3 class="text-lg font-semibold text-gray-800">{{ tab.title }}</h3>
              <p class="text-sm text-gray-600">Custom content for this tab</p>
              <!-- Custom content based on tab.content -->
            </div>
          </TabsContent>
        </div>
      </Tabs>

      <!-- Empty State for Top Panel -->
      <div v-else class="h-full flex items-center justify-center bg-gray-50">
        <div class="text-center space-y-4">
          <div class="text-gray-400 text-6xl">📝</div>
          <h3 class="text-lg font-medium text-gray-600">No content to display</h3>
          <p class="text-sm text-gray-500 max-w-sm">
            Click on symbols, files, or other items in the left panel to open them in tabs here.
          </p>
        </div>
      </div>
    </div>

    <!-- Horizontal Resizer -->
    <div
      class="h-1 bg-gray-200 hover:bg-gray-300 cursor-row-resize flex-shrink-0 relative group"
      @mousedown="startResize"
    >
      <!-- Resize indicator -->
      <div
        class="absolute inset-x-0 top-1/2 -translate-y-1/2 h-0.5 bg-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
      ></div>
    </div>

    <!-- Bottom Panel - Component Tree -->
    <div class="flex flex-col bg-gray-50" :style="{ height: `${100 - topPanelHeight}%` }">
      <div class="border-b border-gray-200 px-4 py-2 bg-white">
        <h3 class="text-sm font-medium text-gray-700">Component Tree</h3>
      </div>
      <div class="flex-1 min-h-0 overflow-hidden">
        <ComponentTree />
      </div>
    </div>
  </div>
</template>
