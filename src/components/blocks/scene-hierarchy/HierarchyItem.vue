<script setup lang="ts">
import { computed, onMounted, nextTick, ref, useTemplateRef } from 'vue'
import HierarchyItem from './HierarchyItem.vue'
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

async function handleAccordionClick() {
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
  <div class="relative pl-4 z-[1]" :data-item-state="itemContainerState">
    <ContextMenu>
      <ContextMenuTrigger as-child>
        <div
          class="sticky top-[calc(var(--i,0)*1.5rem)] z-[2] flex items-center justify-between rounded transition-colors bg-background hover:bg-muted"
          :style="`--i: ${currentIndent}`"
        >
          <button @click="handleAccordionClick">
            <span v-if="props.item.children?.length">
              {{ isContentOpen ? 'v' : '>' }}
            </span>
            <span v-else>o</span>
            {{ props.item.title }}
          </button>
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
