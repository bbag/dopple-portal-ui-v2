<script setup lang="ts">
import { IconAlertTriangle, IconPackageImport, IconFileUpload } from '@tabler/icons-vue'
import { RouterLink } from 'vue-router'

import { buttonVariants } from '../../ui/button'
</script>

<template>
  <ul class="space-y-4">
    <li class="relative pl-6 sm:pl-8">
      <IconPackageImport
        class="absolute left-0 top-0.5 w-4 h-4 text-blue-500 dark:text-blue-400 sm:w-5 sm:h-5"
      />
      Add new glTFs from your workspace files into your scene using the
      <span class="align-middle" :class="buttonVariants({ size: 'xs', variant: 'blue' })"
        ><IconPackageImport class="w-4 h-4 mr-2 inline-block" />Import to Scene</span
      >
      button.
    </li>
    <li class="relative pl-6 sm:pl-8">
      <IconFileUpload
        class="absolute left-0 top-0.5 w-4 h-4 text-blue-500 dark:text-blue-400 sm:w-5 sm:h-5"
      />
      Need to upload new files to your workspace for this project? Click
      <RouterLink
        class="text-blue-500 dark:text-blue-300 underline"
        :to="{ name: 'Workspace Files' }"
        >here</RouterLink
      >
      to manage your workspace files.
    </li>
  </ul>
  <div
    class="relative rounded-md mt-4 y-4 p-4 pl-10 sm:pl-12 bg-yellow-50 border border-yellow-500 text-yellow-800 dark:bg-yellow-200/5 dark:text-yellow-200 dark:border-yellow-200/20"
  >
    <IconAlertTriangle
      class="w-4 h-4 text-yellow-500 dark:text-yellow-200 sm:w-5 sm:h-5 absolute left-4 top-[1.125rem]"
    />
    <strong>Note:</strong> all assets (glTF files, texture files, etc.) are scoped to your workspace
    — <em>not your project</em>. Changing them will affect everywhere they are used.
  </div>
</template>
