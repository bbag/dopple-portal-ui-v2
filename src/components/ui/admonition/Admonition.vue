<script setup lang="ts">
import { IconAlertSquare, IconAlertTriangle, IconInfoCircle } from '@tabler/icons-vue'

const props = defineProps<{
  title?: string
  type: 'info' | 'caution' | 'destructive'
}>()

function icon() {
  switch (props.type) {
    case 'caution':
      return IconAlertTriangle
    case 'destructive':
      return IconAlertSquare
    case 'info':
    default:
      return IconInfoCircle
  }
}
</script>

<template>
  <div class="bg-blue-500/10 rounded border-l border-l-4 border-l-blue-500 p-4 text-sm">
    <p v-if="title" class="relative pl-8 text-base font-bold">
      <component :is="icon()" class="absolute left-0 top-0.5 size-5" />
      {{ title || 'Note' }}
    </p>
    <slot />
  </div>
</template>
