<script lang="ts" setup>
// import { ref } from 'vue'
// import { useRouter } from 'vue-router'
// const router = useRouter()

// import { useTestRolesStore } from '@/stores/testRoles'
// const testRoles = useTestRolesStore().testRoles

import { Button } from '@/components/ui/button';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue
// } from '@/components/ui/select'
// import { Separator } from '@/components/ui/separator'
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

// import BreadCrumbs from '@/components/blocks/breadcrumbs/BreadCrumbs.vue'
// import UserDropdown from './UserDropdown.vue'

// import { IconArrowNarrowLeft, IconArrowNarrowRight, IconCloudUp } from '@tabler/icons-vue'

// defineProps<{
//   hideBreadcrumbs?: boolean
// }>()

// import { useNavHistoryStore } from '@/stores/navHistory'

// function handleBack() {
//   if (useNavHistoryStore().canGoBack) {
//     router.back()
//   }
// }

// function handleForward() {
//   if (useNavHistoryStore().canGoForward) {
//     router.forward()
//   }
// }

import UserDropdown from './UserDropdown.vue';
</script>

<template>
  <div class="h-12 bg-background border-b flex items-center gap-4 px-8">
    <p>TopBar</p>
    <Button>Button</Button>
    <UserDropdown />
  </div>
  <!-- <div class="h-12 bg-white border-b flex items-center gap-4 px-8">
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
        <Button variant="outline" size="sm">
          <IconCloudUp size="20" class="mr-2" />
          Upload
        </Button>
        <UserDropdown />
      </div>
    </TooltipProvider>
  </div> -->
</template>

<style scoped></style>
