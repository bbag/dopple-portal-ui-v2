<script setup lang="ts">
import { IconMoodConfuzed, IconPhotoSensor } from '@tabler/icons-vue'
</script>

<template>
  <ul class="space-y-4">
    <li class="relative pl-6 sm:pl-8">
      <IconPhotoSensor
        class="absolute left-0 top-0.5 w-4 h-4 text-blue-500 dark:text-blue-400 sm:w-5 sm:h-5"
      />
      The <strong>Viewport</strong> on the right shows your current 3D scene.
    </li>
    <li class="relative pl-6 sm:pl-8">
      <IconMoodConfuzed
        class="absolute left-0 top-0.5 w-4 h-4 text-blue-500 dark:text-blue-400 sm:w-5 sm:h-5"
      />
      I need more ideas for stuff about the viewport here...
    </li>
  </ul>
</template>
