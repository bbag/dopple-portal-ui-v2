<script setup lang="ts">
import { IconListTree, IconSettings } from '@tabler/icons-vue'
</script>

<template>
  <ul class="space-y-4">
    <li class="relative pl-6 sm:pl-8">
      <IconListTree
        class="absolute left-0 top-0.5 w-4 h-4 text-blue-500 dark:text-blue-400 sm:w-5 sm:h-5"
      />
      The <strong>Hierarchy</strong> panel on the left shows everything that has been added to your
      scene.
    </li>
    <li class="relative pl-6 sm:pl-8">
      <IconSettings
        class="absolute left-0 top-0.5 w-4 h-4 text-blue-500 dark:text-blue-400 sm:w-5 sm:h-5"
      />
      Click an item or node in the hierarchy to see and edit its <strong>settings</strong>.
    </li>
  </ul>
</template>
