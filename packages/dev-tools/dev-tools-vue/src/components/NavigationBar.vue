<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu'

interface Tab {
  id: string
  label: string
}

interface Props {
  tabs: Tab[]
  activeTab: string
}

interface Emits {
  (e: 'update:activeTab', value: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

function setActiveTab(tabId: string) {
  emit('update:activeTab', tabId)
}
</script>

<template>
  <nav class="bg-gray-800 border-b border-gray-700 px-4 py-2 flex-shrink-0">
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem v-for="tab in props.tabs" :key="tab.id">
          <NavigationMenuLink
            @click="setActiveTab(tab.id)"
            :class="[
              'group inline-flex h-10 w-max items-center justify-center px-4 py-2 text-base font-medium text-gray-300 hover:text-white focus:text-white disabled:pointer-events-none disabled:opacity-50 outline-none transition-colors cursor-pointer hover:bg-gray-700',
              props.activeTab === tab.id ? 'text-white bg-gray-700' : '',
            ]"
          >
            {{ tab.label }}
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  </nav>
</template>
