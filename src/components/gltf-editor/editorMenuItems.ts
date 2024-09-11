import { MenubarItem, MenubarLabel, MenubarSeparator } from '@/components/ui/menubar'

import {
  IconArrowBack,
  IconArrowBackUp,
  IconArrowForwardUp,
  IconBulb,
  IconCamera,
  IconClipboardCopy,
  IconCloudUp,
  IconColorFilter,
  IconCopy,
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
} from '@tabler/icons-vue'

export const menuItems = [
  {
    text: 'File',
    children: [
      {
        text: 'New Project...',
        component: MenubarItem,
        icon: IconFilePlus
      },
      // {
      //   text: 'Upload...',
      //   component: MenubarItem,
      //   icon: IconUpload
      // },
      // { component: MenubarSeparator },
      {
        text: 'Save Local...',
        component: MenubarItem,
        icon: IconDownload
      },
      {
        text: 'Save to Cloud...',
        component: MenubarItem,
        icon: IconCloudUp
      },
      {
        text: 'Snapshot...',
        component: MenubarItem,
        icon: IconCamera
      },
      { component: MenubarSeparator },
      {
        text: 'Return to Workspace',
        component: MenubarItem,
        icon: IconArrowBack
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
        icon: IconCopy
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
]
