<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { Button } from '@/components/ui/button'

const { shortId, workspace } = useRoute().params

const tabs = [
  {
    name: 'Overview',
    path: `/w/${workspace}/models/${shortId}`
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
      <li class="ml-auto">
        <Button size="sm" variant="default"> Save </Button>
      </li>
    </ul>
    <RouterView />
  </div>
</template>

<style scoped>
.tab-link {
  @apply py-3 px-4 block cursor-pointer relative overflow-hidden;
}

.tab-link::after {
  @apply content-[''] absolute left-0 bottom-0 h-1 bg-blue-500 rounded-t-lg w-full transition duration-500 translate-y-[calc(100%+1px)];
}

.tab-link.router-link-exact-active {
  @apply text-blue-500;
}

.tab-link.router-link-exact-active::after {
  @apply translate-y-0;
}
</style>
