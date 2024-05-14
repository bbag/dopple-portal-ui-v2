<script setup lang="ts">
import { ref } from 'vue';

import EditorTopBar from '@/components/blocks/top-bar/EditorTopBar.vue';

const isCollapsed = ref(false);

function toggleCollapsed() {
  isCollapsed.value = !isCollapsed.value;
}
</script>

<template>
  <div class="grid h-screen w-full">
    <main class="bg-muted grid grid-rows-[3rem_minmax(0,_1fr)]">
      <EditorTopBar />
      <div class="h-[calc(100vh-3rem)] overflow-x-hidden overflow-y-auto">
        <slot />
      </div>
    </main>
  </div>
  <!-- <div class="grid h-screen w-full" :class="hideSidebar ? '' : [isCollapsed ? 'pl-16' : 'pl-64']">
    <SideNav v-if="!hideSidebar" @toggle-collapsed="toggleCollapsed" :is-collapsed="isCollapsed" />
    <main class="bg-muted grid grid-rows-[3rem_minmax(0,_1fr)]">
      <TopBar :hide-breadcrumbs="hideBreadcrumbs" />
      <div class="h-[calc(100vh-3rem)] overflow-x-hidden overflow-y-auto">
        <slot />
      </div>
    </main>
  </div> -->
</template>
