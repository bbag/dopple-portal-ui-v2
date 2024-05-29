<script setup lang="ts">
import type { Column } from '@tanstack/vue-table'
import { IconArrowDown, IconArrowUp, IconSelector, IconEyeOff } from '@tabler/icons-vue'

import { type IProduct } from '@/stores/products'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

interface ProductTableColumnHeaderProps {
  column: Column<IProduct, any>
  title: string
}

defineProps<ProductTableColumnHeaderProps>()
</script>

<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<template>
  <div v-if="column.getCanSort()" :class="cn('flex items-center space-x-2', $attrs.class ?? '')">
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="ghost" size="sm" class="-ml-3 h-8 data-[state=open]:bg-accent">
          <span>{{ title }}</span>
          <IconArrowDown v-if="column.getIsSorted() === 'desc'" class="ml-2 h-4 w-4" />
          <IconArrowUp v-else-if="column.getIsSorted() === 'asc'" class="ml-2 h-4 w-4" />
          <IconSelector v-else class="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem @click="column.toggleSorting(false)">
          <IconArrowUp class="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Asc
        </DropdownMenuItem>
        <DropdownMenuItem @click="column.toggleSorting(true)">
          <IconArrowDown class="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Desc
        </DropdownMenuItem>
        <DropdownMenuSeparator v-if="column.getCanHide()" />
        <DropdownMenuItem @click="column.toggleVisibility(false)" v-if="column.getCanHide()">
          <IconEyeOff class="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Hide
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>

  <div v-else :class="$attrs.class">
    {{ title }}
  </div>
</template>
