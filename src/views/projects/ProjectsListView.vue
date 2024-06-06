<script setup lang="ts">
import { useRoute } from 'vue-router'

const { workspace } = useRoute().params

import { useProjectsStore } from '@/stores/projects'
const { projects } = useProjectsStore()

const projectsForCurrentWorkspace = projects.filter((p) => p.workspace === workspace)

import Button from '@/components/ui/button/Button.vue'
import ProjectTable from '@/components/blocks/project-table/ProjectTable.vue'
import { columns } from '@/components/blocks/project-table/columns'

import IconPlusSmall from '@/assets/icons/plus-small.svg'
</script>

<template>
  <div class="p-8 max-w-[104rem] mx-auto">
    <header class="flex justify-between mb-2">
      <h1 class="text-3xl mb-4 font-bold">Projects</h1>
      <Button>
        <IconPlusSmall class="mr-2 w-5 h-5" />
        New Project
      </Button>
    </header>
    <ProjectTable :data="projectsForCurrentWorkspace" :columns="columns" />
  </div>
</template>

<style scoped></style>
