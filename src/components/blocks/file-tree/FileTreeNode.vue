<script lang="ts" setup>
import { ref } from 'vue'

import FileTreeNode from '../file-tree/FileTreeNode.vue'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet'

import {
  IconDots,
  IconFile,
  IconFile3d,
  IconFileDigit,
  IconFileInfo,
  IconFolder,
  IconFolderOpen,
  IconFolderPlus,
  IconHdr,
  IconPhoto,
  IconTrash,
  IconUpload
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
    isSheetOpen.value = !isSheetOpen.value
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

function fileType(type: string) {
  switch (type) {
    case 'folder':
      return 'Folder'
    case '.bin':
      return 'Binary'
    case '.gltf':
      return 'glTF'
    case '.hdr':
      return 'HDR'
    case '.png':
      return 'Image'
    default:
      return 'File'
  }
}

const isSheetOpen = ref(false)

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hour12: true
})
</script>

<template>
  <li>
    <Sheet :open="isSheetOpen" @update:open="() => (isSheetOpen = !isSheetOpen)">
      <div
        class="px-1 py-0.5 rounded flex items-center gap-2 justify-between hover:bg-muted/75 focus-within:bg-muted/75 transition-colors"
      >
        <button
          @click="handleClick"
          class="inline-flex items-center gap-2 cursor-pointer text-sm lg:text-base lg:p-0.5"
        >
          <component :is="iconType(node.type)" class="w-5 h-5" />
          {{ node.title }}
        </button>
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="ghost" size="icon-xs">
              <IconDots class="w-4 h-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <template v-if="node.type === 'folder'">
              <DropdownMenuItem>
                <IconFolderPlus class="w-4 h-4 mr-2" />
                New Folder
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconUpload class="w-4 h-4 mr-2" />
                Upload Files
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem class="text-red-600">
                <IconTrash class="w-4 h-4 mr-2" />
                Delete Folder
              </DropdownMenuItem>
            </template>
            <template v-else>
              <DropdownMenuItem @click="isSheetOpen = true">
                <IconFileInfo class="w-4 h-4 mr-2" />
                View File Info
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem class="text-red-600">
                <IconTrash class="w-4 h-4 mr-2" />
                Delete File
              </DropdownMenuItem>
            </template>
          </DropdownMenuContent>
        </DropdownMenu>
        <SheetContent class="max-w-sm md:max-w-[32rem]">
          <SheetHeader>
            <SheetTitle>File Info</SheetTitle>
          </SheetHeader>
          <div class="grid gap-4 py-4">
            <table class="text-sm">
              <tbody>
                <tr class="border-b border-t">
                  <td class="pr-4 py-2 font-medium">Filename:</td>
                  <td class="py-2 w-full">{{ node.title }}</td>
                </tr>
                <tr class="border-b">
                  <td class="pr-4 py-2 font-medium">Type:</td>
                  <td class="py-2 w-full">{{ fileType(node.type) }}</td>
                </tr>
                <tr class="border-b">
                  <td class="pr-4 py-2 font-medium whitespace-nowrap">Date Created:</td>
                  <td class="py-2 w-full">{{ dateFormatter.format(node.dateCreated) }}</td>
                </tr>
                <template v-if="node.type === '.png'">
                  <tr class="border-b">
                    <td class="pr-4 py-2 font-medium">Width:</td>
                    <td class="py-2 w-full">2048 px</td>
                  </tr>
                  <tr class="border-b">
                    <td class="pr-4 py-2 font-medium">Height:</td>
                    <td class="py-2 w-full">2048 px</td>
                  </tr>
                </template>
              </tbody>
            </table>
            <div v-if="node.type === '.png'">
              Preview:
              <div class="border rounded aspect-square mt-2 placeholder-image"></div>
            </div>
          </div>
          <SheetFooter>
            <SheetClose as-child>
              <Button @click="isSheetOpen = false" variant="outline"> Close </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </div>
    </Sheet>
    <ul v-if="isOpen && node.children" class="ml-3.5 pl-3 border-l border-muted-foreground/25">
      <FileTreeNode v-for="(child, index) in node.children" :key="index" :node="child" />
    </ul>
  </li>
</template>

<style scoped>
.placeholder-image {
  background-image: conic-gradient(
    from 90deg at 50% 50%,
    #e2e8f0,
    #e2e8f0 25%,
    #f9fafc 25%,
    #f9fafc 50%,
    #e2e8f0 50%,
    #e2e8f0 75%,
    #f9fafc 75%,
    #f9fafc
  );
  background-size: 2.5rem 2.5rem;
  background-repeat: repeat;
}
</style>
