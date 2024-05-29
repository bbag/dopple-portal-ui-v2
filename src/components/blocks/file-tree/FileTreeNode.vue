<script lang="ts" setup>
import { ref } from 'vue'
import FileTreeNode from '../file-tree/FileTreeNode.vue'

import {
  IconFile,
  IconFile3d,
  IconFileDigit,
  IconFolder,
  IconFolderOpen,
  IconHdr,
  IconPhoto
} from '@tabler/icons-vue'

const props = defineProps({
  node: {
    type: Object,
    required: true
  }
})

const isOpen = ref(false)

function handleClick() {
  if (props.node.type === 'folder') {
    isOpen.value = !isOpen.value
  } else {
    console.log('opening file')
  }
}

function iconType(type: string) {
  switch (type) {
    case 'folder':
      return isOpen.value ? IconFolderOpen : IconFolder
    case '.bin':
      return IconFileDigit
    case '.gltf':
      return IconFile3d
    case '.hdr':
      return IconHdr
    case '.png':
      return IconPhoto
    default:
      return IconFile
  }
}
</script>

<template>
  <li>
    <div>
      <button @click="handleClick" class="inline-flex items-center gap-2 cursor-pointer">
        <component :is="iconType(node.type)" class="w-5 h-5" />
        {{ node.title }}
      </button>
    </div>
    <ul v-if="isOpen && node.children" class="ml-2.5 pl-5 border-l border-muted-foreground/25">
      <FileTreeNode v-for="(child, index) in node.children" :key="index" :node="child" />
    </ul>
  </li>
</template>
