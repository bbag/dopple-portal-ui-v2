<script setup lang="ts">
import { Checkbox } from '@/components/ui/checkbox'
import TooltipInfo from './TooltipInfo.vue'

defineProps<{
  title: string
}>()

const checkedModelValue = defineModel<boolean>()
</script>

<template>
  <li>
    <span class="flex gap-1.5 flex-wrap">
      <label class="inline-flex items-center gap-3 cursor-pointer select-none">
        <Checkbox v-model="checkedModelValue" class="size-5" />
        {{ title }}
      </label>
      <TooltipInfo v-if="$slots.tooltip">
        <slot name="tooltip" />
      </TooltipInfo>
    </span>
    <div class="ml-8 mt-2 mb-4 p-4 border rounded-md" v-if="$slots.settings && checkedModelValue">
      <slot name="settings" />
    </div>
  </li>
</template>
