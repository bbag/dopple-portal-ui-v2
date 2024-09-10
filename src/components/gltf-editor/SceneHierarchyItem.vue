<script setup lang="ts">
import { ref } from 'vue'

import { useHierarchyItemsStore } from '@/stores/hierarchyItems'
const hierarchyItems = useHierarchyItemsStore()

import SceneHierarchyItem from './SceneHierarchyItem.vue'

import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger
} from '@/components/ui/context-menu'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

import {
  IconBulb,
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
    <ContextMenu>
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
      <ContextMenuTrigger as-child>
        <div
          class="flex items-center justify-between rounded transition-colors hover:bg-muted"
          :class="props.item.children?.length ? '' : 'ml-6'"
        >
          <!-- 'Expand' caret button, item icon, and title button -->
          <div class="flex items-center min-w-0">
            <CollapsibleTrigger v-if="props.item.children?.length" as-child>
              <Button variant="ghost" class="shrink-0 p-0.5 h-6 w-6">
                <IconCaretRightFilled
                  class="w-3.5 h-3.5 text-muted-foreground transition-all"
                  :class="{ 'rotate-90': isOpen, hidden: !props.item.children?.length }"
                />
              </Button>
            </CollapsibleTrigger>
            <button
              class="flex items-center gap-1.5 text-sm px-1 py-1 shrink-1 min-w-0 truncate"
              :class="
                hierarchyItems.activeItem === props.item ? 'text-blue-500 dark:text-blue-300' : ''
              "
              @click="hierarchyItems.activeItem = props.item"
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <component
                      :is="itemIcon(item.type)"
                      class="w-4 h-4 shrink-0"
                      :class="
                        hierarchyItems.activeItem === props.item
                          ? 'text-blue-500 dark:text-blue-300'
                          : 'text-muted-foreground'
                      "
                    />
                  </TooltipTrigger>
                  <TooltipContent class="text-xs capitalize">{{ item.type }}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <span
                class="truncate"
                :class="
                  props.item.isHidden && hierarchyItems.activeItem !== props.item
                    ? 'opacity-50'
                    : ''
                "
              >
                {{ props.item.title || 'Untitled' }}
              </span>
            </button>
          </div>

          <!-- Right action buttons -->
          <div class="flex">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button class="p-0.5" @click="props.item.isHidden = !props.item.isHidden">
                    <component
                      :is="props.item.isHidden ? IconEyeOff : IconEye"
                      class="w-4 h-4"
                      :class="
                        props.item.isHidden ? 'text-muted-foreground/50' : 'text-muted-foreground'
                      "
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
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <IconPlus class="w-4 h-4 mr-2 text-muted-foreground" />
                      Add...
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent class="w-36">
                        <DropdownMenuItem>
                          <IconStack2 class="w-4 h-4 mr-2 text-muted-foreground" />
                          Group
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <IconBulb class="w-4 h-4 mr-2 text-muted-foreground" />
                          Light Node
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <IconCircleDot class="w-4 h-4 mr-2 text-muted-foreground" />
                          Empty Node
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                  <DropdownMenuItem v-if="$props.item.type === 'group'">
                    <IconPencil class="w-4 h-4 mr-2 text-muted-foreground" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem class="text-destructive dark:text-rose-400">
                    <IconTrashX class="w-4 h-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TooltipProvider>
          </div>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <!-- <ContextMenuItem v-if="$props.item.type === 'group'">
          <IconPlus class="w-4 h-4 mr-2 text-muted-foreground" />
          Add
        </ContextMenuItem> -->
        <ContextMenuSub v-if="$props.item.type === 'group'">
          <ContextMenuSubTrigger>
            <IconPlus class="w-4 h-4 mr-2 text-muted-foreground" />
            Add...
          </ContextMenuSubTrigger>
          <ContextMenuSubContent class="w-36">
            <ContextMenuItem>
              <IconStack2 class="w-4 h-4 mr-2 text-muted-foreground" />
              Group
            </ContextMenuItem>
            <ContextMenuItem>
              <IconBulb class="w-4 h-4 mr-2 text-muted-foreground" />
              Light Node
            </ContextMenuItem>
            <ContextMenuItem>
              <IconCircleDot class="w-4 h-4 mr-2 text-muted-foreground" />
              Empty Node
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuItem>
          <IconPencil class="w-4 h-4 mr-2 text-muted-foreground" />
          Edit
        </ContextMenuItem>
        <ContextMenuItem @click="props.item.isHidden = !props.item.isHidden">
          <component
            :is="props.item.isHidden ? IconEye : IconEyeOff"
            class="w-4 h-4 mr-2 text-muted-foreground"
          />
          {{ props.item.isHidden ? 'Unhide' : 'Hide' }}
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem class="text-destructive dark:text-rose-400">
          <IconTrashX class="w-4 h-4 mr-2" />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
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
