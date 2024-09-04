<script lang="ts" setup>
import { type Component, onMounted, ref } from 'vue'

import FileTreeNode from '../file-tree/FileTreeNode.vue'

import { Button } from '@/components/ui/button'
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger
} from '@/components/ui/context-menu'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { ScrollArea } from '@/components/ui/scroll-area'
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
  // IconFile,
  IconFile3d,
  IconFileArrowRight,
  IconFileDigit,
  IconFileInfo,
  // IconFolder,
  // IconFolderOpen,
  IconFolderPlus,
  // IconHdr,
  IconPencil,
  // IconPhoto,
  IconTrash,
  IconUpload
} from '@tabler/icons-vue'

import IconFolder from '@/assets/icons/icon-file-folder.svg'
import IconFolderOpen from '@/assets/icons/icon-file-folder-open.svg'
import IconFile from '@/assets/icons/icon-file.svg'
import IconFileBin from '@/assets/icons/icon-file-bin.svg'
import IconFileGltf from '@/assets/icons/icon-file-gltf.svg'
import IconFileHdr from '@/assets/icons/icon-file-hdr.svg'
import IconFileJpg from '@/assets/icons/icon-file-jpg.svg'
import IconFilePng from '@/assets/icons/icon-file-png.svg'

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
      return IconFileBin
    case '.jpg':
      return IconFileJpg
    case '.gltf':
      return IconFileGltf
    case '.hdr':
      return IconFileHdr
    case '.png':
      return IconFilePng
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

const open = ref(false)

const actionItems = [
  {
    text: 'Upload Files',
    icon: IconUpload,
    onClick: () => {
      isSheetOpen.value = !isSheetOpen.value
    }
  },
  {
    text: 'Rename',
    icon: IconPencil,
    onClick: () => {
      isSheetOpen.value = !isSheetOpen.value
    }
  },
  {
    text: 'New Folder',
    icon: IconFolderPlus,
    onClick: () => {
      isSheetOpen.value = !isSheetOpen.value
    }
  },
  {
    text: 'Delete Folder',
    icon: IconTrash,
    onClick: () => {
      isSheetOpen.value = !isSheetOpen.value
    }
  }
]

const rightClickOpen = ref(false)

function handleRightClick(e: MouseEvent) {
  // Need to add right click check on root <html> element to close context menu
  // console.log('1')
  // if (rightClickOpen.value === true) {
  //   console.log('2')
  //   e.preventDefault()
  //   rightClickOpen.value = false
  // }
}
</script>

<template>
  <ContextMenu v-model:open="rightClickOpen" @contextmenu="handleRightClick">
    <ContextMenuTrigger>
      <li>
        <Sheet :open="isSheetOpen" @update:open="() => (isSheetOpen = !isSheetOpen)">
          <div
            class="px-1 py-0.5 rounded flex items-center gap-2 hover:bg-muted focus-within:bg-muted/75 transition-colors"
          >
            <input type="checkbox" class="w-4 h-4" />
            <button
              @click="handleClick"
              class="text-left truncate inline-flex shrink-1 items-center gap-2 cursor-pointer text-sm lg:p-0.5 mr-auto"
            >
              <component :is="iconType(node.type)" class="w-5 h-5 shrink-0" />
              {{ node.title }}
            </button>
            <DropdownMenu v-model:open="open">
              <DropdownMenuTrigger as-child>
                <Button variant="ghost" size="icon-xs">
                  <IconDots class="w-4 h-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" :align-offset="0" :side-offset="0">
                <template v-if="node.type === 'folder'">
                  <DropdownMenuItem>
                    <IconUpload class="w-4 h-4 mr-2" />
                    Upload Files
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <IconPencil class="w-4 h-4 mr-2" />
                    Rename
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <IconFolderPlus class="w-4 h-4 mr-2" />
                    New Folder
                  </DropdownMenuItem>
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
            <SheetContent class="flex flex-col max-w-sm md:max-w-[32rem]">
              <SheetHeader>
                <SheetTitle>File Info</SheetTitle>
              </SheetHeader>
              <ScrollArea class="flex-1">
                <div class="grid gap-4 pb-4">
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
                      <tr class="border-b">
                        <td class="pr-4 py-2 font-medium whitespace-nowrap">Date Created:</td>
                        <td class="py-2 w-full">{{ dateFormatter.format(node.dateCreated) }}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div v-if="node.type === '.png'">
                    Preview:
                    <div
                      class="border rounded aspect-square mt-2 placeholder-image flex items-center justify-center text-slate-900"
                    >
                      (Preview image will be here...)
                    </div>
                  </div>
                </div>
              </ScrollArea>
              <SheetFooter class="gap-4 sm:justify-between">
                <Button variant="destructive" size="sm"> Delete File </Button>
                <SheetClose as-child>
                  <Button @click="isSheetOpen = false" variant="outline" size="sm"> Close </Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </div>
        </Sheet>
        <ul v-if="isOpen && node.children" class="ml-3 pl-3.5 border-l border-muted-foreground/25">
          <FileTreeNode v-for="(child, index) in node.children" :key="index" :node="child" />
        </ul>
      </li>
    </ContextMenuTrigger>
    <ContextMenuContent>
      <ContextMenuItem>
        <IconFileInfo class="w-4 h-4 mr-2" />
        View
      </ContextMenuItem>
      <ContextMenuItem>
        <IconPencil class="w-4 h-4 mr-2" />
        Rename
      </ContextMenuItem>
      <ContextMenuItem>
        <IconFileArrowRight class="w-4 h-4 mr-2" />
        Move...
      </ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuItem class="text-red-600">
        <IconTrash class="w-4 h-4 mr-2" />
        Delete
      </ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>
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
