<script setup lang="ts">
import { computed, onMounted, nextTick, ref, useTemplateRef } from 'vue'
import HierarchyItem from './HierarchyItem.vue'

import { Button } from '@/components/ui/button'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
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
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

// import { Button } from '@/components/ui/button'

import {
  IconBulb,
  IconCaretRightFilled,
  IconCheck,
  IconCircleDot,
  IconColorFilter,
  IconCube,
  IconDots,
  IconEye,
  IconEyeOff,
  IconHaze,
  IconMickey,
  IconPencil,
  IconPlus,
  IconPoint,
  IconRuler,
  IconSphere,
  IconSquare,
  IconStack2,
  IconTrashX,
  IconVideo,
  IconWorld,
  IconX
} from '@tabler/icons-vue'
import IconMaterial from '@/assets/icons/material.svg'
import IconTexture from '@/assets/icons/texture.svg'

import {
  useHierarchyItemsStore,
  type HierarchyItem as HierarchyItemType
} from '@/stores/hierarchyItems'
const hierarchyItems = useHierarchyItemsStore()

const props = defineProps<{
  item: HierarchyItemType
  isHidden?: boolean
  isLastChild?: boolean
  indent?: number
}>()

const itemContentRef = useTemplateRef('item-content')
const itemContainerState = ref<'open' | 'opening' | 'closed' | 'closing'>('closed')
const currentIndent = props.indent ?? 0

const isContentOpen = computed(
  () => itemContainerState.value === 'open' || itemContainerState.value === 'opening'
)

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

async function handleToggleOpen() {
  if (!itemContentRef.value) return

  // Closed --> Open
  if (itemContainerState.value === 'closed') {
    itemContainerState.value = 'opening'
    itemContentRef.value.style.maxHeight = `${itemContentRef.value?.scrollHeight}px`

    setTimeout(() => {
      itemContentRef.value?.removeAttribute('style')
      itemContainerState.value = 'open'
    }, 200)
  }

  // Open --> Closed
  if (itemContainerState.value === 'open') {
    itemContainerState.value = 'closing'
    itemContentRef.value.style.maxHeight = `${itemContentRef.value.scrollHeight}px`

    await nextTick()

    // Force a reflow by reading the computed style
    const _ = itemContentRef.value.offsetHeight

    itemContentRef.value.style.maxHeight = '0px'

    setTimeout(() => {
      itemContentRef.value?.removeAttribute('style')
      itemContainerState.value = 'closed'
    }, 200)
  }
}

const isRenaming = ref(false)
const renameValue = ref('')

onMounted(() => {
  renameValue.value = props.item.title
})

function handleRename() {
  props.item.title = renameValue.value
  isRenaming.value = false
}

function handleStartRename() {
  isRenaming.value = true
  // nextTick(() => {
  //   renameInput.value?.$el.focus()
  // })
}

function handleCancelRename() {
  isRenaming.value = false
  renameValue.value = props.item.title
}

const addNodeItems = [
  {
    text: 'Meshes',
    component: 'menu-label'
  },
  {
    text: 'Plane',
    component: 'menu-item',
    icon: IconSquare
  },
  {
    text: 'Cube',
    component: 'menu-item',
    icon: IconCube
  },
  {
    text: 'Sphere',
    component: 'menu-item',
    icon: IconSphere
  },
  {
    text: 'Empty Node',
    component: 'menu-item',
    icon: IconCircleDot
  },
  { component: 'menu-separator' },
  {
    text: 'Lights',
    component: 'menu-label'
  },
  {
    text: 'Point Light',
    component: 'menu-item',
    icon: IconBulb
  },
  {
    text: 'Directional Light',
    component: 'menu-item',
    icon: IconBulb
  },
  {
    text: 'Spotlight',
    component: 'menu-item',
    icon: IconBulb
  },
  { component: 'menu-separator' },
  {
    text: 'Cameras',
    component: 'menu-label'
  },
  {
    text: 'Perspective Camera',
    component: 'menu-item',
    icon: IconVideo
  },
  { component: 'menu-separator' },
  {
    text: 'Prefabs',
    component: 'menu-label'
  },
  {
    text: 'Scale Checker',
    component: 'menu-item',
    icon: IconRuler
  },
  {
    text: 'Color Checker',
    component: 'menu-item',
    icon: IconColorFilter
  },
  {
    text: 'Suzanne',
    component: 'menu-item',
    icon: IconMickey
  }
]
</script>

<template>
  <div class="relative pl-5 z-[1]" :data-item-state="itemContainerState">
    <!-- Tree lines on the left -->
    <div
      v-if="props.isLastChild"
      class="absolute top-0 left-3 border-l border-b rounded-bl border-slate-400 dark:border-slate-600 h-3.5"
      :class="props.item.children?.length ? 'w-2' : 'w-6'"
    ></div>
    <div
      v-else
      class="absolute top-0 left-3 w-2 border-l border-slate-400 dark:border-slate-600 h-full"
    >
      <div
        class="absolute top-0 -left-px border-b border-slate-400 dark:border-slate-600 h-3.5"
        :class="props.item.children?.length ? 'w-2' : 'w-6'"
      ></div>
    </div>

    <ContextMenu>
      <ContextMenuTrigger as-child>
        <div
          class="sticky top-[calc(var(--i,0)*1.75rem)] z-[2] flex items-center justify-between rounded transition-colors bg-background hover:bg-muted"
          :class="props.item.children?.length ? '' : 'ml-6'"
          :style="`--i: ${currentIndent}`"
        >
          <!-- Caret expand button, title, and item icon -->
          <div class="flex items-center min-w-0">
            <Button
              v-if="props.item.children?.length"
              @click="handleToggleOpen"
              variant="ghost"
              class="shrink-0 p-0.5 h-6 w-6"
            >
              <IconCaretRightFilled
                class="w-3.5 h-3.5 text-muted-foreground transition-all"
                :class="{ 'rotate-90': isContentOpen, hidden: !props.item.children?.length }"
              />
            </Button>
            <div v-if="isRenaming" class="h-7 grid items-center">
              <Input
                type="text"
                size="xs"
                v-model="renameValue"
                class="w-full pr-11 col-start-1 col-end-2 row-start-1 row-end-2"
                ref="rename-input"
                @keyup.enter="handleRename"
                @keyup.esc="handleCancelRename"
              />
              <div
                class="pr-1 justify-self-end col-start-1 col-end-2 row-start-1 row-end-2 flex gap-1 items-center justify-end"
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger as-child>
                      <Button
                        size="icon-xs"
                        variant="success"
                        class="h-4 w-4"
                        @click="handleRename"
                      >
                        <IconCheck class="w-3 h-3" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent class="text-sm">
                      <p>Rename</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger as-child>
                      <Button
                        size="icon-xs"
                        variant="outline"
                        class="h-4 w-4 text-destructive hover:text-destructive/80 dark:text-red-400 dark:hover:text-red-400/80"
                        @click="handleCancelRename"
                      >
                        <IconX class="w-3 h-3" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent class="text-sm">
                      <p>Cancel</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            <button
              v-else
              class="h-7 flex items-center gap-1.5 text-sm px-1 shrink-1 min-w-0 truncate"
              :class="
                hierarchyItems.activeItem === props.item ? 'text-blue-500 dark:text-blue-300' : ''
              "
              @click="hierarchyItems.activeItem = props.item"
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div class="relative">
                      <component
                        :is="itemIcon(item.type)"
                        class="w-4 h-4 shrink-0"
                        :class="
                          hierarchyItems.activeItem === props.item
                            ? 'text-blue-500 dark:text-blue-300'
                            : 'text-muted-foreground'
                        "
                      />
                    </div>
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
                  <DropdownMenuItem
                    v-if="props.item.canRename !== false"
                    @click="handleStartRename"
                  >
                    <IconPencil class="w-4 h-4 mr-2 text-muted-foreground" />
                    Rename
                  </DropdownMenuItem>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <IconPlus class="w-4 h-4 mr-2 text-muted-foreground" />
                      Add...
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent class="min-w-48">
                        <component
                          :is="
                            menuItem.component === 'menu-separator'
                              ? DropdownMenuSeparator
                              : menuItem.component === 'menu-label'
                                ? DropdownMenuLabel
                                : DropdownMenuItem
                          "
                          v-for="menuItem in addNodeItems"
                          :key="menuItem.text"
                        >
                          <component
                            :is="menuItem.icon"
                            class="w-4 h-4 mr-2 text-muted-foreground"
                          />
                          {{ menuItem.text }}
                        </component>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
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
        <ContextMenuItem v-if="props.item.canRename !== false" @click="handleStartRename">
          <IconPencil class="w-4 h-4 mr-2 text-muted-foreground" />
          Rename
        </ContextMenuItem>
        <ContextMenuSub v-if="$props.item.type === 'group'">
          <ContextMenuSubTrigger>
            <IconPlus class="w-4 h-4 mr-2 text-muted-foreground" />
            Add...
          </ContextMenuSubTrigger>
          <ContextMenuSubContent class="min-w-48">
            <component
              :is="
                menuItem.component === 'menu-separator'
                  ? ContextMenuSeparator
                  : menuItem.component === 'menu-label'
                    ? ContextMenuLabel
                    : ContextMenuItem
              "
              v-for="menuItem in addNodeItems"
              :key="menuItem.text"
            >
              <component :is="menuItem.icon" class="w-4 h-4 mr-2 text-muted-foreground" />
              {{ menuItem.text }}
            </component>
          </ContextMenuSubContent>
        </ContextMenuSub>
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
    <div
      class="overflow-clip transition-max-height duration-200 ease-in-out"
      ref="item-content"
      :class="isContentOpen ? 'max-h-[initial]' : 'max-h-0'"
    >
      <HierarchyItem
        v-for="(child, i) in props.item.children"
        :key="child.title"
        :item="child"
        :is-last-child="i === props.item.children.length - 1"
        :indent="currentIndent + 1"
      />
    </div>
  </div>
</template>

<style scoped>
.item-container {
  margin: 0;
  padding-left: 1rem;
  position: relative;
  z-index: 1;
}
/* .item-title {
	@apply bg-background;
} */

/* .item-content {
	max-height: 0;
	overflow: clip;
	transition: max-height 300ms cubic-bezier(0.19, 1, 0.22, 1);
} */

/* .item-title {
	position: sticky;
	top: calc(var(--i, 0) * 1.5rem);
	z-index: 2;
} */

/* .item-title.expanded + .item-content {
	max-height: initial;
} */
</style>
