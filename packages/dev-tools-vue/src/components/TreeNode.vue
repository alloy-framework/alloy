<script setup lang="ts" generic="T">
import { computed } from 'vue'
import { ChevronRight, ChevronDown } from 'lucide-vue-next'

interface TreeNodeProps {
  // Required props
  title: string
  expanded: boolean
  hasChildren: boolean

  // Optional props
  icon?: any // Vue component for the icon
  subtitle?: string
  depth?: number
  data?: T // Generic data associated with this node

  // Styling props
  iconColor?: string
  hoverBgColor?: string
  indentSize?: number
  showIdSuffix?: string | number // Shows as "#id" at the end
  highlighted?: boolean // Whether this node is highlighted

  // Behavior props
  selectable?: boolean
  clickToSelect?: boolean // Click anywhere to select vs only on content
}

interface TreeNodeEmits {
  toggle: []
  select: [data?: T]
}

const props = withDefaults(defineProps<TreeNodeProps>(), {
  depth: 0,
  indentSize: 16,
  hoverBgColor: 'hover:bg-gray-100',
  selectable: true,
  clickToSelect: false,
  highlighted: false,
})

const emit = defineEmits<TreeNodeEmits>()

const paddingLeft = computed(() => `${props.depth * props.indentSize + 8}px`)

const handleToggle = () => {
  if (props.hasChildren) {
    emit('toggle')
  }
}

const handleSelect = (event?: Event) => {
  if (props.selectable) {
    if (event) {
      event.stopPropagation()
    }
    emit('select', props.data)
  }
}

const handleClick = (event: Event) => {
  if (props.clickToSelect) {
    handleSelect(event)
  } else {
    handleToggle()
  }
}
</script>

<template>
  <div class="select-none">
    <div
      class="flex items-center gap-1 py-1 px-2 rounded cursor-pointer group"
      :class="[
        hoverBgColor,
        highlighted ? 'bg-blue-200 border-l-4 border-blue-500' : ''
      ]"
      :style="{ paddingLeft }"
      :data-tree-node-id="showIdSuffix"
      @click="handleClick"
    >
      <!-- Expand/collapse chevron -->
      <div class="w-4 h-4 flex items-center justify-center flex-shrink-0">
        <ChevronDown
          v-if="hasChildren && expanded"
          class="h-3 w-3 text-gray-500 transition-transform"
        />
        <ChevronRight v-else-if="hasChildren" class="h-3 w-3 text-gray-500 transition-transform" />
      </div>

      <!-- Node icon (optional) -->
      <component v-if="icon" :is="icon" class="h-4 w-4 flex-shrink-0" :class="iconColor" />

      <!-- Content area -->
      <div
        class="flex-1 min-w-0"
        :class="{ 'cursor-pointer': selectable && !clickToSelect }"
        @click="!clickToSelect ? handleSelect($event) : undefined"
      >
        <!-- Title and subtitle on same line, wrapping when needed -->
        <div class="break-words">
          <span class="font-mono text-sm text-gray-900">{{ title }}</span>
          <!-- Use slot for subtitle if provided, otherwise fall back to subtitle prop -->
          <span v-if="$slots.subtitle" class="text-xs text-gray-500 ml-2">
            <slot name="subtitle" />
          </span>
          <span v-else-if="subtitle" class="text-xs text-gray-500 ml-2">{{ subtitle }}</span>
        </div>
      </div>

      <!-- ID suffix (optional) -->
      <span v-if="showIdSuffix !== undefined" class="text-xs text-gray-400 font-mono flex-shrink-0">
        #{{ showIdSuffix }}
      </span>
    </div>

    <!-- Children slot -->
    <div v-if="hasChildren && expanded">
      <slot />
    </div>
  </div>
</template>
