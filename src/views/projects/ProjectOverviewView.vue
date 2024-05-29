<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useProjectsStore } from '@/stores/projects'

import { Card } from '@/components/ui/card'

const { project, workspace } = useRoute().params

const projectData = useProjectsStore().projects.find((p) => p.slug === project)
</script>

<template>
  <div class="p-8 overflow-x-hidden overflow-y-auto">
    <div class="max-w-5xl mx-auto space-y-4">
      <h1 class="text-3xl font-bold">{{ projectData?.title }}</h1>
      <Card class="p-4">
        <p>Project overview stuff will go here...</p>
      </Card>
    </div>
  </div>
</template>

<style scoped></style>
