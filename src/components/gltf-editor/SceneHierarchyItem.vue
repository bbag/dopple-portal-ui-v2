<script setup lang="ts">
import { ref } from 'vue'

import { useHierarchyItemsStore } from '@/stores/hierarchyItems'
const hierarchyItems = useHierarchyItemsStore()

import SceneHierarchyItem from './SceneHierarchyItem.vue'

import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

import {
  IconCaretRightFilled,
  IconCircleDot,
  IconCube,
  IconDots,
  IconEye,
  IconEyeOff,
  IconHaze,
  IconPencil,
  IconPlus,
  IconStack2,
  IconTrashX,
  IconVideo,
  IconWorld
} from '@tabler/icons-vue'

import IconMaterial from '@/assets/icons/material.svg'
import IconTexture from '@/assets/icons/texture.svg'

const props = defineProps({
  isLastChild: {
    type: Boolean,
    default: false
  },
  item: {
    type: Object,
    required: true
  }
})

const isOpen = ref(false)
const isVisible = ref(true)

function itemIcon(type: string) {
  switch (type) {
    case 'group':
      return IconStack2
    case 'mesh':
      return IconCube
    case 'environment':
      return IconHaze
    case 'texture':
      return IconTexture
    case 'material':
      return IconMaterial
    case 'camera':
      return IconVideo
    case 'global':
      return IconWorld
    default:
      return IconCircleDot
  }
}
</script>
<template>
  <Collapsible v-model:open="isOpen" class="relative pl-5">
    <!-- Tree lines on the left -->
    <div
      v-if="props.isLastChild"
      class="absolute top-0 left-3 border-l border-b rounded-bl border-muted-foreground/50 h-3.5"
      :class="props.item.children?.length ? 'w-2' : 'w-6'"
    ></div>
    <div v-else class="absolute top-0 left-3 w-2 border-l border-muted-foreground/50 h-full">
      <div
        class="absolute top-0 -left-px border-b border-muted-foreground/50 h-3.5"
        :class="props.item.children?.length ? 'w-2' : 'w-6'"
      ></div>
    </div>

    <!-- Main item bar -->
    <div
      class="flex items-center justify-between gap-4 rounded transition-colors hover:bg-muted"
      :class="props.item.children?.length ? '' : 'ml-6'"
    >
      <!-- 'Expand' caret button, item icon, and title button -->
      <div class="flex items-center">
        <CollapsibleTrigger v-if="props.item.children?.length" as-child>
          <Button variant="ghost" class="p-0.5 h-6 w-6">
            <IconCaretRightFilled
              class="w-3.5 h-3.5 text-muted-foreground transition-all"
              :class="{ 'rotate-90': isOpen, hidden: !props.item.children?.length }"
            />
          </Button>
        </CollapsibleTrigger>
        <button
          class="flex items-center gap-1.5 text-sm px-1 py-1 whitespace-nowrap"
          :class="
            hierarchyItems.activeItem === props.item ? 'text-blue-500 dark:text-blue-300' : ''
          "
          @click="hierarchyItems.activeItem = props.item"
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <component :is="itemIcon(item.type)" class="w-4 h-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent class="text-xs capitalize">{{ item.type }}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {{ props.item.title || 'Untitled' }}
        </button>
      </div>

      <!-- Right action buttons -->
      <div class="flex">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button class="p-0.5" @click="isVisible = !isVisible">
                <component
                  :is="isVisible ? IconEye : IconEyeOff"
                  class="w-4 h-4"
                  :class="isVisible ? 'text-muted-foreground' : 'text-muted-foreground/50'"
                />
              </button>
            </TooltipTrigger>
            <TooltipContent class="text-xs">Show/hide</TooltipContent>
          </Tooltip>
          <DropdownMenu>
            <DropdownMenuTrigger class="p-0.5">
              <IconDots class="w-4 h-4 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem v-if="$props.item.type === 'group'">
                <IconPlus class="w-4 h-4 mr-2" />
                Add
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconPencil class="w-4 h-4 mr-2" />
                Rename
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <IconTrashX class="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TooltipProvider>
      </div>
    </div>
    <CollapsibleContent v-if="props.item.children?.length">
      <SceneHierarchyItem
        v-for="(child, i) in props.item.children"
        :key="child.title"
        :item="child"
        :is-last-child="i === props.item.children.length - 1"
      >
      </SceneHierarchyItem>
    </CollapsibleContent>
  </Collapsible>
</template>
