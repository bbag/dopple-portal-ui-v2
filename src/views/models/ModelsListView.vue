<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'

const { workspace } = useRoute().params

import { useModelsStore } from '@/stores/models'
const { models } = useModelsStore()

const modelsForCurrentWorkspace = models.filter((p) => p.workspace === workspace)

import Button from '@/components/ui/button/Button.vue'
import ModelTable from '@/components/blocks/model-table/ModelTable.vue'
import { columns } from '@/components/blocks/model-table/columns'

import IconPlusSmall from '@/assets/icons/plus-small.svg'
</script>

<template>
  <div class="p-8 max-w-[104rem] mx-auto">
    <header class="flex justify-between mb-2">
      <h1 class="text-3xl mb-4 font-bold">Models</h1>
      <Button>
        <IconPlusSmall class="mr-2 w-5 h-5" />
        New Model
      </Button>
    </header>
    <ModelTable :data="modelsForCurrentWorkspace" :columns="columns" />
  </div>
  <RouterView />
</template>

<style scoped></style>
