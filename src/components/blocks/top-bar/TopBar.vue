<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
const router = useRouter()

import { routes, type IRoute, type IRouteCategory } from '@/components/blocks/side-nav/navRoutes'
import { useWorkspacesStore } from '@/stores/workspaces'
import { cn } from '@/lib/utils'

import { useTestRolesStore } from '@/stores/testRoles'
const testRoles = useTestRolesStore().testRoles

import WorkspaceSelect from '@/components/blocks/side-nav/WorkspaceSelect.vue'

import { menuItems } from '@/components/gltf-editor/editorMenuItems'

import { Button } from '@/components/ui/button'
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger
} from '@/components/ui/menubar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

import BreadCrumbs from '@/components/blocks/breadcrumbs/BreadCrumbs.vue'
import UserDropdown from './UserDropdown.vue'

import { IconArrowNarrowLeft, IconArrowNarrowRight, IconCloudUp } from '@tabler/icons-vue'
import IconMenu from '@/assets/icons/menu.svg'
import IconTreeCorner from '@/assets/icons/tree-corner.svg'
import IconTreeSplit from '@/assets/icons/tree-split.svg'

import DoppleLogoIcon from '@/assets/img/dopple-logo-icon.svg'
import DoppleLogoStacked from '@/assets/img/dopple-logo-stacked.svg'

defineProps<{
  hideBreadcrumbs?: boolean
}>()

import { useNavHistoryStore } from '@/stores/navHistory'

function handleBack() {
  if (useNavHistoryStore().canGoBack) {
    router.back()
  }
}

function handleForward() {
  if (useNavHistoryStore().canGoForward) {
    router.forward()
  }
}

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

const route = useRoute()

function itemPath(path: string) {
  if (path.startsWith('/')) {
    return path
  } else {
    return `/w/${route.params.workspace}/${path}`
  }
}
</script>

<template>
  <div
    class="h-12 bg-background border-b flex gap-4 items-center px-8"
    :class="useRoute().meta.hideSideNav ? 'pl-3' : ''"
  >
    <div class="flex gap-2 h-full items-center" v-if="useRoute().meta.hideSideNav">
      <RouterLink to="/">
        <DoppleLogoIcon class="w-6 h-auto text-brand-500 dark:text-foreground" />
      </RouterLink>
      <Separator orientation="vertical" class="ml-1" />
      <Sheet>
        <SheetTrigger as-child>
          <Button variant="ghost" size="icon-sm">
            <IconMenu class="w-6 h-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" class="w-64 p-0">
          <TooltipProvider>
            <RouterLink to="/">
              <component
                :is="DoppleLogoStacked"
                class="max-w-24 mx-auto my-4 h-auto text-brand-500 dark:text-foreground"
              />
            </RouterLink>
            <div class="px-4 mb-4">
              <WorkspaceSelect />
            </div>
            <nav class="overflow-y-auto pb-4 px-4">
              <div
                v-for="(category, categoryIndex) in sideNavItems"
                :key="categoryIndex"
                class="grid grid-cols-1"
              >
                <h2
                  v-if="category.title !== ''"
                  class="mt-4 px-2 py-2 text-xs text-slate-500 dark:text-slate-400 font-bold uppercase"
                >
                  {{ category.title }}
                </h2>
                <template v-for="(item, itemIndex) in category.routes" :key="itemIndex">
                  <Tooltip>
                    <!-- <TooltipTrigger as-child v-show="!$props.isCollapsed">
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
                    </TooltipContent> -->
                    <component
                      :is="item.path.startsWith('http') ? 'a' : RouterLink"
                      :href="item.path"
                      :to="item.path.startsWith('http') ? undefined : itemPath(item.path)"
                      :target="item.path.startsWith('http') ? '_blank' : undefined"
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
                  <ul v-if="item.subroutes && item.subroutes.length" class="mb-4">
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
                            subrouteIndex === item.subroutes.length - 1
                              ? IconTreeCorner
                              : IconTreeSplit
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
        </SheetContent>
      </Sheet>
      <Separator orientation="vertical" />
      <Menubar class="border-none rounded-none">
        <MenubarMenu v-for="menu in menuItems" :key="menu.text">
          <MenubarTrigger>{{ menu.text }}</MenubarTrigger>
          <MenubarContent>
            <component v-for="(item, i) in menu.children" :key="i" :is="item.component">
              <component
                v-if="item.icon"
                :is="item.icon"
                class="w-5 h-5 mr-2 text-muted-foreground"
              />
              {{ item.text }}
            </component>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <Separator orientation="vertical" />
    </div>
    <TooltipProvider>
      <div class="flex gap-1 items-center">
        <Tooltip>
          <TooltipTrigger as-child>
            <Button
              variant="ghost"
              size="icon-sm"
              @click="handleBack"
              :disabled="!useNavHistoryStore().canGoBack"
            >
              <IconArrowNarrowLeft size="24" class="" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p class="text-sm">Back</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button
              variant="ghost"
              size="icon-sm"
              @click="handleForward"
              :disabled="!useNavHistoryStore().canGoForward"
            >
              <IconArrowNarrowRight size="24" class="" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p class="text-sm">Forward</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <Separator orientation="vertical" />
      <BreadCrumbs v-if="!hideBreadcrumbs" />
      <div class="flex gap-4 ml-auto">
        <!-- <div class="flex items-center gap-2">
          <span class="text-xs font-medium text-muted-foreground">Test role:</span>
          <Select v-model="useTestRolesStore().currentTestRole">
            <SelectTrigger class="w-24 lg:w-28 h-8">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="role in testRoles" :key="role" :value="role">
                {{ role }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div> -->
        <!-- <Button variant="outline" size="sm">
          <IconCloudUp size="20" class="mr-2" />
          Upload
        </Button> -->
        <UserDropdown />
      </div>
    </TooltipProvider>
  </div>
  <!-- <pre>{{ breadcrumbs }}</pre> -->
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
