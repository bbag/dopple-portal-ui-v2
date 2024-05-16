<script lang="ts" setup>
import { IconLock, IconLockOpen } from '@tabler/icons-vue'

defineProps<{
  isLocked?: boolean
}>()
</script>

<template>
  <div class="relative px-4 mt-2 -mb-2" :class="isLocked ? '' : 'text-foreground/30'">
    <svg
      fill="none"
      style="width: 100%"
      stroke="currentColor"
      stroke-dasharray="2 4"
      stroke-width="1"
      viewBox="0 0 100 6"
    >
      <path
        d="M 1 0 V 1 C 1 2 2 3 3 3 H 94 C 95 3 96 2 96 1 V 0"
        vector-effect="non-scaling-stroke"
      />
    </svg>
    <template v-if="isLocked">
      <IconLock class="bg-background w-6 h-4 absolute left-12 top-1/2 -translate-y-1/2 px-1" />
      <IconLock class="bg-background w-6 h-4 absolute right-12 top-1/2 -translate-y-1/2 px-1" />
    </template>
    <template v-else>
      <IconLockOpen class="bg-background w-6 h-4 absolute left-12 top-1/2 -translate-y-1/2 px-1" />
      <IconLockOpen class="bg-background w-6 h-4 absolute right-12 top-1/2 -translate-y-1/2 px-1" />
    </template>
  </div>
</template>
