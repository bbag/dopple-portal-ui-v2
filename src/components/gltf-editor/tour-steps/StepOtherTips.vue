<script setup lang="ts">
import { IconCamera, IconClick } from '@tabler/icons-vue'
</script>

<template>
  <ul class="space-y-4">
    <li class="relative pl-6 sm:pl-8">
      <IconCamera class="absolute left-0 top-0.5 w-4 h-4 text-blue-500 sm:w-5 sm:h-5" />
      Capture snapshots of your scene with <strong>File > Snapshot...</strong>
    </li>
    <li class="relative pl-6 sm:pl-8">
      <IconClick class="absolute left-0 top-0.5 w-4 h-4 text-blue-500 sm:w-5 sm:h-5" />
      Right-click on certain elements to see handy menus and options for them.
    </li>
  </ul>
</template>
