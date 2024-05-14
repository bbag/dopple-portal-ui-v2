<script setup lang="ts">
// import { ref } from 'vue'
// import { useRouter } from 'vue-router'
// const router = useRouter()

// import { useTestRolesStore } from '@/stores/testRoles'
// const testRoles = useTestRolesStore().testRoles

// import { Button } from '@/components/ui/button'
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue
// } from '@/components/ui/select'
// import { Separator } from '@/components/ui/separator'

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
} from '@/components/ui/menubar';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import UserDropdown from './UserDropdown.vue';

import DoppleLogoIcon from '@/assets/img/dopple-logo-icon.svg';
import {
  IconArrowBackUp,
  IconArrowForwardUp,
  IconBulb,
  IconClipboardCopy,
  IconCloudUp,
  IconColorFilter,
  IconCube,
  IconDotsCircleHorizontal,
  IconDownload,
  IconFilePlus,
  IconMickey,
  IconPoint,
  IconRuler,
  IconScissors,
  IconSphere,
  IconSquare,
  IconUpload,
  IconVideo
} from '@tabler/icons-vue';
import IconMenu from '@/assets/icons/menu.svg';

const menuItems = [
  {
    text: 'File',
    children: [
      {
        text: 'New Project...',
        component: MenubarItem,
        icon: IconFilePlus
      },
      {
        text: 'Upload...',
        component: MenubarItem,
        icon: IconUpload
      },
      { component: MenubarSeparator },
      {
        text: 'Save to Cloud...',
        component: MenubarItem,
        icon: IconCloudUp
      },
      {
        text: 'Save Local...',
        component: MenubarItem,
        icon: IconDownload
      }
    ]
  },
  {
    text: 'Edit',
    children: [
      {
        text: 'Undo',
        component: MenubarItem,
        icon: IconArrowBackUp
      },
      {
        text: 'Redo',
        component: MenubarItem,
        icon: IconArrowForwardUp
      },
      { component: MenubarSeparator },
      {
        text: 'Copy',
        component: MenubarItem,
        icon: IconClipboardCopy
      },
      {
        text: 'Cut',
        component: MenubarItem,
        icon: IconScissors
      },
      {
        text: 'Paste',
        component: MenubarItem,
        icon: IconClipboardCopy
      }
    ]
  },
  {
    text: 'View',
    children: [
      {
        text: 'Show UI Stats',
        component: MenubarItem,
        icon: IconDotsCircleHorizontal
      },
      {
        text: 'Show Gizmos',
        component: MenubarItem,
        icon: IconDotsCircleHorizontal
      }
    ]
  },
  {
    text: 'Add',
    children: [
      {
        text: 'Meshes',
        component: MenubarLabel
      },
      {
        text: 'Plane',
        component: MenubarItem,
        icon: IconSquare
      },
      {
        text: 'Cube',
        component: MenubarItem,
        icon: IconCube
      },
      {
        text: 'Sphere',
        component: MenubarItem,
        icon: IconSphere
      },
      {
        text: 'Empty Node',
        component: MenubarItem,
        icon: IconPoint
      },
      { component: MenubarSeparator },
      {
        text: 'Lights',
        component: MenubarLabel
      },
      {
        text: 'Point Light',
        component: MenubarItem,
        icon: IconBulb
      },
      {
        text: 'Directional Light',
        component: MenubarItem,
        icon: IconBulb
      },
      {
        text: 'Spotlight',
        component: MenubarItem,
        icon: IconBulb
      },
      { component: MenubarSeparator },
      {
        text: 'Cameras',
        component: MenubarLabel
      },
      {
        text: 'Perspective Camera',
        component: MenubarItem,
        icon: IconVideo
      },
      { component: MenubarSeparator },
      {
        text: 'Prefabs',
        component: MenubarLabel
      },
      {
        text: 'Scale Checker',
        component: MenubarItem,
        icon: IconRuler
      },
      {
        text: 'Color Checker',
        component: MenubarItem,
        icon: IconColorFilter
      },
      {
        text: 'Suzanne',
        component: MenubarItem,
        icon: IconMickey
      }
    ]
  }
];
</script>

<template>
  <div class="h-12 bg-background border-b flex items-center justify-between gap-4 px-4">
    <TooltipProvider>
      <div class="flex gap-4 items-center">
        <Tooltip>
          <TooltipTrigger as-child>
            <DoppleLogoIcon class="w-6 h-6" />
          </TooltipTrigger>
          <TooltipContent> Home </TooltipContent>
        </Tooltip>
        <Separator orientation="vertical" class="h-12" />
        <Sheet>
          <Tooltip>
            <SheetTrigger>
              <TooltipTrigger as-child>
                <IconMenu class="w-5 h-5" />
              </TooltipTrigger>
            </SheetTrigger>
            <TooltipContent> Main Menu </TooltipContent>
          </Tooltip>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Are you sure absolutely sure?</SheetTitle>
              <SheetDescription>
                This action cannot be undone. This will permanently delete your account and remove
                your data from our servers.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
        <Menubar>
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
        <Separator orientation="vertical" class="h-12" />
        <div>Breadcrumbs...</div>
      </div>
    </TooltipProvider>
    <UserDropdown />
  </div>
</template>

<style scoped></style>
