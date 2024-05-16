<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

import { useTestRolesStore } from '@/stores/testRoles'
const testRoles = useTestRolesStore().testRoles

import { Button } from '@/components/ui/button'
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
  <div class="h-12 bg-background border-b flex items-center gap-4 px-8">
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
