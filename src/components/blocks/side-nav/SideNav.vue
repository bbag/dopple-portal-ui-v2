<script lang="ts" setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { routes, type IRoute, type IRouteCategory } from './navRoutes'
import { useWorkspacesStore } from '@/stores/workspaces'

import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import WorkspaceSelect from './WorkspaceSelect.vue'

import DoppleLogoStacked from '@/assets/img/dopple-logo-stacked.svg'
import DoppleLogoIcon from '@/assets/img/dopple-logo-icon.svg'
import IconTreeCorner from '@/assets/icons/tree-corner.svg'
import IconTreeSplit from '@/assets/icons/tree-split.svg'

defineProps<{
  isCollapsed: boolean
}>()

const route = useRoute()

// Forgive me for this abomination...
// I wrote this at like 3 AM and my brain is now oozing out of my ears
// The final prod code should probably be done way better... we hope...
const sideNavItems = computed(() => {
  const filteredCategories: IRouteCategory[] = []
  for (const category of routes) {
    if (!category.categoryDisplayFn || category.categoryDisplayFn(route)) {
      let filteredRoutes: IRoute[] = []
      for (const routeItem of category.routes) {
        if (!routeItem.routeDisplayFn || routeItem.routeDisplayFn(route)) {
          let filteredSubroutes: IRoute[] = []
          if (
            routeItem.subroutes &&
            (!routeItem.subroutesDisplayFn || routeItem.subroutesDisplayFn(route))
          ) {
            for (const subroute of routeItem.subroutes) {
              filteredSubroutes.push({ ...subroute })
            }
          }
          filteredRoutes.push({ ...routeItem, subroutes: filteredSubroutes })
        }
      }
      filteredCategories.push({ ...category, routes: filteredRoutes })
    }
  }
  return filteredCategories
})

function itemPath(path: string) {
  if (path.startsWith('/')) {
    return path
  } else {
    return `/w/${route.params.workspace}/${path}`
  }
}
</script>

<template>
  <aside
    :class="
      cn(
        'inset-y fixed left-0 z-2 flex h-full flex-col border-r',
        $props.isCollapsed ? 'w-16' : 'w-64'
      )
    "
  >
    <TooltipProvider>
      <RouterLink to="/">
        <component
          :is="DoppleLogoStacked"
          v-show="!isCollapsed"
          class="max-w-24 mx-auto my-4 h-auto text-brand-500 dark:text-foreground"
        />
        <component
          :is="DoppleLogoIcon"
          v-show="isCollapsed"
          class="w-6 mx-auto my-4 h-auto text-brand-500 dark:text-foreground"
        />
      </RouterLink>
      <Tooltip>
        <TooltipTrigger as-child>
          <button
            @click="$emit('toggle-collapsed')"
            class="w-6 h-6 absolute top-3 -right-3 border bg-background rounded-lg p-1"
          >
            <svg
              viewBox="0 0 16 16"
              class="line-icon"
              :class="$props.isCollapsed ? 'rotate-180' : ''"
            >
              <path d="M10 3l-5 5 5 5" />
            </svg>
          </button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p class="text-sm">{{ $props.isCollapsed ? 'Expand' : 'Collapse' }} Sidebar</p>
        </TooltipContent>
      </Tooltip>
      <div v-show="!isCollapsed" class="px-4 mb-4">
        <WorkspaceSelect />
      </div>
      <nav :class="cn('overflow-y-auto pb-4', $props.isCollapsed ? 'px-3' : 'px-4')">
        <div
          v-for="(category, categoryIndex) in sideNavItems"
          :key="categoryIndex"
          class="grid grid-cols-1"
        >
          <h2
            v-if="category.title !== '' && !isCollapsed"
            class="mt-4 px-2 py-2 text-xs text-slate-500 dark:text-slate-400 font-bold uppercase"
          >
            {{ category.title }}
          </h2>
          <hr
            v-if="category.title && isCollapsed"
            class="bg-slate-200 dark:bg-slate-700 w-8 h-1 mx-auto my-4 rounded-lg"
          />
          <template v-for="(item, itemIndex) in category.routes" :key="itemIndex">
            <Tooltip>
              <TooltipTrigger as-child v-show="!$props.isCollapsed">
                <component
                  :is="item.path.startsWith('http') ? 'a' : RouterLink"
                  :href="item.path"
                  :to="item.path.startsWith('http') ? undefined : itemPath(item.path)"
                  :target="item.path.startsWith('http') ? '_blank' : undefined"
                  v-show="$props.isCollapsed"
                  class="inline-flex items-center justify-start gap-2 h-10 px-2 w-full transition-colors relative rounded-lg bg-blue-500 bg-opacity-0 hover:text-blue-500 after:-left-3"
                >
                  <component :is="item.icon" class="size-6 shrink-0" />
                </component>
              </TooltipTrigger>
              <TooltipContent side="right" :side-offset="5">
                {{ item.name }}
              </TooltipContent>
              <component
                :is="item.path.startsWith('http') ? 'a' : RouterLink"
                :href="item.path"
                :to="item.path.startsWith('http') ? undefined : itemPath(item.path)"
                :target="item.path.startsWith('http') ? '_blank' : undefined"
                v-show="!$props.isCollapsed"
                :class="
                  cn(
                    'inline-flex items-center justify-start gap-2 h-10 px-2 w-full transition-colors relative rounded-lg bg-blue-500 dark:bg-blue-300 bg-opacity-0 dark:bg-opacity-0 hover:text-blue-500 dark:hover:text-blue-300 select-none after:-left-4',
                    { 'has-subroutes': item.subroutes && item.subroutes.length }
                  )
                "
              >
                <component :is="item.icon" class="size-6 shrink-0" />
                <span class="truncate">{{ item.name }}</span>
              </component>
            </Tooltip>
            <ul v-if="item.subroutes && item.subroutes.length && !$props.isCollapsed" class="mb-4">
              <li
                v-for="(subroute, subrouteIndex) in item.subroutes"
                :key="subrouteIndex"
                class="h-8"
              >
                <RouterLink
                  :to="itemPath(subroute.path)"
                  :class="
                    cn(
                      'inline-flex items-center justify-start gap-2 px-2 w-full transition-colors relative rounded-lg bg-blue-500 dark:bg-blue-300 bg-opacity-0 dark:bg-opacity-0 hover:text-blue-500 dark:hover:text-blue-300 select-none after:-left-4',
                      { 'sidenav-workspace-name': subroute.name === 'Workspace Overview' }
                    )
                  "
                >
                  <component
                    :is="
                      subrouteIndex === item.subroutes.length - 1 ? IconTreeCorner : IconTreeSplit
                    "
                    class="w-6 h-8 shrink-0 text-slate-300"
                  />
                  <span class="truncate">
                    {{
                      subroute.name === 'Workspace Overview'
                        ? useWorkspacesStore().currentWorkspace
                        : subroute.name
                    }}
                  </span>
                </RouterLink>
              </li>
            </ul>
          </template>
        </div>
      </nav>
    </TooltipProvider>
  </aside>
</template>

<style scoped>
nav a::after {
  @apply content-[''] absolute top-0 h-full bg-blue-500 dark:bg-blue-300 rounded-r-lg w-1 transition duration-500 -translate-x-[calc(100%+1px)];
}

nav a.router-link-exact-active,
nav a.router-link-active:not(:is(.has-subroutes, .sidenav-workspace-name)) {
  @apply text-blue-500 dark:text-blue-300 bg-opacity-5;
}

nav a.router-link-exact-active::after,
nav a.router-link-active:not(:is(.has-subroutes, .sidenav-workspace-name))::after {
  @apply translate-x-0;
}
</style>
