<script setup lang="ts">
import { IconRocket, IconDeviceFloppy, IconGitBranch, IconGitMerge } from '@tabler/icons-vue'
</script>

<template>
  <ul class="space-y-4">
    <li class="relative pl-6 sm:pl-8">
      <IconGitBranch
        class="absolute left-0 top-0.5 w-4 h-4 text-blue-500 dark:text-blue-400 sm:w-5 sm:h-5"
      />
      Keep your own project changes safe by creating your own separate <strong>draft</strong> (a
      branch).
    </li>
    <li class="relative pl-6 sm:pl-8">
      <IconDeviceFloppy
        class="absolute left-0 top-0.5 w-4 h-4 text-blue-500 dark:text-blue-400 sm:w-5 sm:h-5"
      />
      <strong>Save</strong> changes locally as you go, then <strong>sync</strong> them to the server
      when you're ready for others to view it.
    </li>
    <li class="relative pl-6 sm:pl-8">
      <IconGitMerge
        class="absolute left-0 top-0.5 w-4 h-4 text-blue-500 dark:text-blue-400 sm:w-5 sm:h-5"
      />
      When you're done making changes, <strong>merge</strong> your draft back into your main project
      for others to work off of.
    </li>
    <li class="relative pl-6 sm:pl-8">
      <IconRocket
        class="absolute left-0 top-0.5 w-4 h-4 text-blue-500 dark:text-blue-400 sm:w-5 sm:h-5"
      />
      Ready for launch? Go to <strong>File > Publish</strong> to make it live!
    </li>
  </ul>
</template>
