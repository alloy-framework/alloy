<script setup lang="ts">
import type { SplitterPanelEmits, SplitterPanelProps } from 'reka-ui'
import { SplitterPanel, useForwardPropsEmits } from 'reka-ui'
import { ref, defineExpose } from 'vue'
const props = defineProps<SplitterPanelProps>()
const emits = defineEmits<SplitterPanelEmits>()

const forwarded = useForwardPropsEmits(props, emits)

// Create a ref to the SplitterPanel
const splitterPanelRef = ref<InstanceType<typeof SplitterPanel>>()

// Expose the ref so parent components can access it
defineExpose({
  splitterPanel: splitterPanelRef,
})
</script>

<template>
  <SplitterPanel data-slot="resizable-panel" v-bind="forwarded" ref="splitterPanelRef">
    <slot />
  </SplitterPanel>
</template>
