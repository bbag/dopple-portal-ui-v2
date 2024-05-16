<script setup lang="ts">
import { ref } from 'vue'

import SideNav from '@/components/blocks/side-nav/SideNav.vue'
import TopBar from '@/components/blocks/top-bar/TopBar.vue'

defineProps<{
  hideSidebar?: boolean
  hideBreadcrumbs?: boolean
}>()

const isCollapsed = ref(false)

function toggleCollapsed() {
  isCollapsed.value = !isCollapsed.value
}
</script>

<template>
  <div class="grid h-screen w-full" :class="hideSidebar ? '' : [isCollapsed ? 'pl-16' : 'pl-64']">
    <SideNav v-if="!hideSidebar" @toggle-collapsed="toggleCollapsed" :is-collapsed="isCollapsed" />
    <main class="bg-muted grid grid-rows-[3rem_minmax(0,_1fr)]">
      <TopBar :hide-breadcrumbs="hideBreadcrumbs" />
      <div class="h-[calc(100vh-3rem)] overflow-x-hidden overflow-y-auto">
        <slot />
      </div>
    </main>
  </div>
</template>
