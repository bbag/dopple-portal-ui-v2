<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useVModel } from '@vueuse/core'
import { cn } from '@/lib/utils'

const props = defineProps<{
  defaultValue?: string | number
  modelValue?: string | number
  class?: HTMLAttributes['class']
  size?: 'xs' | 'sm' | 'md' | 'lg'
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue
})
</script>

<template>
  <input
    v-model="modelValue"
    :class="
      cn(
        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-75',
        props.size === 'xs' &&
          'text-sm px-2 py-0 h-6 rounded-sm focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1',
        props.size === 'sm' &&
          'text-sm px-2 py-0 h-7 rounded-sm focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1',
        props.class
      )
    "
  />
</template>
