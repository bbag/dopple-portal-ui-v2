<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { Button } from '@/components/ui/button'

const { workspace } = useRoute().params

const tabs = [
  {
    name: 'Overview',
    path: `/w/${workspace}/analytics`
  },
  {
    name: 'Sessions',
    path: `/w/${workspace}/analytics/sessions`
  },
  {
    name: 'Conversions',
    path: `/w/${workspace}/analytics/conversions`
  },
  {
    name: 'Products',
    path: `/w/${workspace}/analytics/products`
  },
  {
    name: 'Configurations',
    path: `/w/${workspace}/analytics/configurations`
  },
  {
    name: 'Preferences',
    path: `/w/${workspace}/analytics/preferences`
  },
  {
    name: 'Hotspots',
    path: `/w/${workspace}/analytics/hotspots`
  },
  {
    name: 'Custom Events',
    path: `/w/${workspace}/analytics/custom-events`
  }
]
</script>

<template>
  <div class="h-full grid grid-rows-[auto_minmax(0,_1fr)]">
    <ul class="bg-background border-b flex items-center px-4">
      <li v-for="{ name, path } in tabs" :key="name">
        <RouterLink :to="path" class="tab-link text-sm">
          {{ name }}
        </RouterLink>
      </li>
    </ul>
    <div class="p-8 w-full max-w-[104rem] mx-auto">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.tab-link {
  @apply py-3 px-4 block cursor-pointer relative overflow-hidden;
}

.tab-link::after {
  @apply content-[''] absolute left-0 bottom-0 h-1 bg-blue-500 dark:bg-blue-300 rounded-t-lg w-full transition duration-500 translate-y-[calc(100%+1px)];
}

.tab-link.router-link-exact-active {
  @apply text-blue-500 dark:text-blue-300;
}

.tab-link.router-link-exact-active::after {
  @apply translate-y-0;
}
</style>
