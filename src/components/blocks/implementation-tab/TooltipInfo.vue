<script setup lang="ts">
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { IconInfoCircle } from '@tabler/icons-vue'
</script>

<template>
  <Tooltip>
    <TooltipTrigger>
      <IconInfoCircle class="size-4 text-muted-foreground" />
    </TooltipTrigger>
    <TooltipContent class="max-w-64 text-sm">
      <slot />
    </TooltipContent>
  </Tooltip>
</template>
