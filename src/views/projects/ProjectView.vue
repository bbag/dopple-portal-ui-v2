<script setup lang="ts">
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
const router = useRouter()

import { Button, buttonVariants } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

const { project, workspace } = useRoute().params

import { IconSlideshow } from '@tabler/icons-vue'
import IconGltfEditor from '@/assets/icons/gltf-editor.svg'
import IconUiBuilder from '@/assets/icons/ui-builder.svg'

const tabs = [
  {
    name: 'Overview',
    path: `/w/${workspace}/projects/${project}`
  },
  {
    name: 'Assets',
    path: `/w/${workspace}/projects/${project}/assets`
  }
]

const actions = [
  {
    name: 'glTF Editor',
    path: `/w/${workspace}/ui-builder/${project}`,
    icon: IconGltfEditor
  }
]
</script>

<template>
  <RouterView />
  <!-- <div class="h-full grid grid-rows-[auto_minmax(0,_1fr)]">
    <div class="bg-background border-b flex items-center px-4 gap-4">
      <ul class="flex items-center">
        <li v-for="{ name, path } in tabs" :key="name">
          <RouterLink :to="path" class="tab-link text-sm">
            {{ name }}
          </RouterLink>
        </li>
      </ul>
      <ul class="flex items-center gap-2 ml-auto">
        <li v-for="{ name, path, icon } in actions" :key="name">
          <RouterLink :to="path" :class="buttonVariants({ variant: 'outline', size: 'sm' })">
            <component :is="icon" class="w-5 h-5 mr-2 text-muted-foreground" />
            Open in {{ name }}
          </RouterLink>
        </li>
        <li>
          <Button size="sm"> Publish </Button>
        </li>
      </ul>
    </div>
    <RouterView />
  </div> -->
</template>

<style scoped>
/* .tab-link {
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
} */
</style>
