<script setup lang="ts">
import type { Table } from '@tanstack/vue-table'
import { computed } from 'vue'
import { type IModel } from '@/stores/models'

import { favorites, workspaces, statuses } from './data'
import ModelTableFacetedFilter from './ModelTableFacetedFilter.vue'
import ModelTableViewOptions from './ModelTableViewOptions.vue'
import { IconSearch, IconX } from '@tabler/icons-vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface ModelTableToolbarProps {
  table: Table<IModel>
}

const props = defineProps<ModelTableToolbarProps>()

const isFiltered = computed(() => props.table.getState().columnFilters.length > 0)
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="flex flex-1 items-center space-x-2">
      <div class="relative">
        <Input
          placeholder="Filter by name..."
          :model-value="(table.getColumn('name')?.getFilterValue() as string) ?? ''"
          class="h-8 w-[150px] lg:w-[250px] pl-10"
          @input="table.getColumn('name')?.setFilterValue($event.target.value)"
        />
        <IconSearch
          class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        />
      </div>
      <ModelTableFacetedFilter
        v-if="table.getColumn('isFavorite')"
        :column="table.getColumn('isFavorite')"
        title="Favorites"
        :options="favorites"
      />
      <!-- <ModelTableFacetedFilter
        v-if="table.getColumn('workspace')"
        :column="table.getColumn('workspace')"
        title="Workspace"
        :options="workspaces"
      /> -->
      <!-- <ModelTableFacetedFilter
        v-if="table.getColumn('status')"
        :column="table.getColumn('status')"
        title="Status"
        :options="statuses"
      /> -->
      <Button
        v-if="isFiltered"
        variant="ghost"
        class="h-8 px-2 lg:px-3"
        @click="table.resetColumnFilters()"
      >
        Reset
        <IconX class="ml-2 h-4 w-4" />
      </Button>
    </div>
    <ModelTableViewOptions :table="table" />
  </div>
</template>
