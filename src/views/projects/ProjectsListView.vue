<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'

import { Card } from '@/components/ui/card'

const { workspace } = useRoute().params

import { useProjectsStore } from '@/stores/projects'
const { projects } = useProjectsStore()

const projectsForCurrentWorkspace = projects.filter((p) => p.workspace === workspace)

import Button from '@/components/ui/button/Button.vue'
// import ProjectTable from '@/components/blocks/project-table/ProjectTable.vue'
// import { columns } from '@/components/blocks/project-table/columns'

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
    <Card class="p-4">
      <p class="mb-4">(Placeholder for now... proper table/list of projects is coming soon...)</p>
      <ul>
        <li v-for="project in projectsForCurrentWorkspace" :key="project.id">
          <RouterLink
            :to="`/w/${workspace}/projects/${project.slug}`"
            class="text-blue-500 dark:text-blue-400"
          >
            &bull; {{ project.title }}
          </RouterLink>
        </li>
      </ul>
    </Card>
    <!-- <ProjectTable :data="projectsForCurrentWorkspace" :columns="columns" /> -->
  </div>
  <RouterView />
</template>

<style scoped></style>
