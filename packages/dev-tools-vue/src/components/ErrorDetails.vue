<script setup lang="ts">
import { computed } from 'vue'
import { Button } from '@/components/ui/button'
import { selectNode, getComponentStack } from '@/lib/store'
import ComponentProps from './ComponentProps.vue'
import type { ErrorInfo } from '@/lib/types'

interface Props {
  error: ErrorInfo
}

const props = defineProps<Props>()

// Get component stack by walking up from error node
const componentStack = computed(() => {
  return getComponentStack(props.error.nodeId).filter((node) => node.kind !== 'fragment')
})

// Handle clicking on a component in the stack
const handleComponentClick = (nodeId: number) => {
  selectNode(nodeId)
}

// Parse error stack for better display
const parseStack = (stack: string) => {
  return stack.split('\n').filter((line) => line.trim())
}

// Get component name for display
const getComponentName = (node: any) => {
  if (node.kind === 'component') {
    // If this is a Provider component with context, show as Context node
    if (node.component === 'Provider' && node.context) {
      return `Context: ${node.context.name}`
    }
    return node.component
  } else if (node.kind === 'intrinsic') {
    return node.tag
  } else {
    return 'Fragment'
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Error Header -->
    <div class="border-l-4 border-red-500 bg-red-50 p-4 rounded-r-lg">
      <div>
        <h3 class="text-lg font-medium text-red-800">Error</h3>
        <p class="mt-1 text-sm text-red-700">{{ error.message }}</p>
      </div>
    </div>

    <!-- Component Stack -->
    <div class="space-y-3">
      <h4 class="text-md font-semibold text-gray-800">Component Stack</h4>
      <div class="bg-gray-50 border border-gray-200 rounded-lg p-2">
        <ul class="space-y-1">
          <li v-for="(node, index) in componentStack" :key="node.id" class="group">
            <Button
              variant="ghost"
              class="w-full justify-start p-1 h-auto hover:bg-blue-50 transition-colors cursor-pointer"
              @click="handleComponentClick(node.id)"
            >
              <div class="flex items-center space-x-3 w-full">
                <!-- Component info -->
                <div class="flex-1 text-left">
                  <div class="flex items-center space-x-2">
                    <span class="font-mono text-sm text-blue-600 group-hover:text-blue-800">
                      {{ getComponentName(node) }}
                    </span>
                    <ComponentProps :node="node" compact />
                  </div>
                </div>

                <!-- Click indicator -->
                <div class="text-gray-400 group-hover:text-blue-600 transition-colors">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </div>
              </div>
            </Button>
          </li>
        </ul>
      </div>
    </div>

    <!-- JavaScript Stack Trace -->
    <div class="space-y-3">
      <h4 class="text-md font-semibold text-gray-800">Stack Trace</h4>
      <div class="bg-black text-green-400 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <div v-for="(line, index) in parseStack(error.stack)" :key="index" class="leading-relaxed">
          <span
            :class="{
              'text-red-400': line.includes('Error:') || index === 0,
              'text-yellow-400':
                (line.includes('at ') && line.includes('.tsx')) || line.includes('.ts'),
              'text-gray-400': !line.includes('Error:') && !line.includes('at '),
            }"
          >
            {{ line }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
