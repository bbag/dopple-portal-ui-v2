<script setup lang="ts">
import {
  IconAlertTriangle,
  IconListTree,
  IconPackageImport,
  IconPointFilled,
  IconSettings
} from '@tabler/icons-vue'

import { buttonVariants } from '../../ui/button'
</script>

<template>
  <ul class="space-y-4">
    <li class="relative pl-6 sm:pl-8">
      <IconListTree class="absolute left-0 top-0.5 w-4 h-4 text-blue-500 sm:w-5 sm:h-5" />
      The <strong>Hierarchy</strong> panel on the left shows everything that has been added to your
      scene.
    </li>
    <li class="relative pl-6 sm:pl-8">
      <IconSettings class="absolute left-0 top-0.5 w-4 h-4 text-blue-500 sm:w-5 sm:h-5" />
      Click an item or node in the hierarchy to see and edit its <strong>settings</strong>.
    </li>
    <!-- <li class="relative pl-6 sm:pl-8">
      <IconPackageImport class="absolute left-0 top-0.5 w-4 h-4 text-blue-500 sm:w-5 sm:h-5" />
      Add new glTFs to your scene using the
      <span class="align-middle" :class="buttonVariants({ size: 'xs', variant: 'blue' })"
        ><IconPackageImport class="w-4 h-4 mr-2 inline-block" />Import to Scene</span
      >
      button.
    </li> -->
  </ul>
  <!-- <div
    class="relative rounded-md mt-4 y-4 p-4 pl-10 sm:pl-12 bg-yellow-50 border border-yellow-500 text-yellow-800 dark:bg-yellow-200/5 dark:text-yellow-200 dark:border-yellow-200/20"
  >
    <IconAlertTriangle
      class="w-4 h-4 text-yellow-500 dark:text-yellow-200 sm:w-5 sm:h-5 absolute left-4 top-[1.125rem]"
    />
    <strong>Note:</strong> all assets (glTF files, texture files, etc.) are scoped to your workspace
    — <em>not your project</em>. Changing them will affect everywhere they are used.
  </div> -->
</template>
