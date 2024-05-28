<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
const router = useRouter()

import { useTestRolesStore } from '@/stores/testRoles'
const testRoles = useTestRolesStore().testRoles

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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

import BreadCrumbs from '@/components/blocks/breadcrumbs/BreadCrumbs.vue'
import UserDropdown from './UserDropdown.vue'

import { IconArrowNarrowLeft, IconArrowNarrowRight, IconCloudUp } from '@tabler/icons-vue'

import DoppleLogoIcon from '@/assets/img/dopple-logo-icon.svg'

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

<style scoped></style>
