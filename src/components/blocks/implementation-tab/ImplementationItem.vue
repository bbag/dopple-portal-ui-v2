<script setup lang="ts">
import { Checkbox } from '@/components/ui/checkbox'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

import { IconInfoCircle } from '@tabler/icons-vue'

defineProps<{
  title: string
}>()

const checkedModelValue = defineModel<boolean>()
</script>

<template>
  <li>
    <span class="flex gap-1.5 flex-wrap">
      <label class="inline-flex items-center gap-3 cursor-pointer select-none">
        <Checkbox
          v-model="checkedModelValue"
          class="size-5"
          @update:model-value="
            (newValue) => console.log('logChange(option.name, newValue as boolean)')
          "
        />
        {{ title }}
      </label>
      <Tooltip v-if="$slots.tooltip">
        <TooltipTrigger>
          <IconInfoCircle class="size-4 text-muted-foreground" />
        </TooltipTrigger>
        <TooltipContent class="max-w-64 text-sm">
          <slot name="tooltip" />
        </TooltipContent>
      </Tooltip>
    </span>
    <div class="ml-8 mt-2 mb-4 p-4 border rounded-md" v-if="$slots.settings && checkedModelValue">
      <slot name="settings" />
    </div>
  </li>
</template>
