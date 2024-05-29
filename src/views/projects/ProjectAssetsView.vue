<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useProjectsStore } from '@/stores/projects'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

import { IconFileUpload } from '@tabler/icons-vue'
import FileTree from '@/components/blocks/file-tree/FileTree.vue'

const project = useProjectsStore().projects.find((p) => p.slug === useRoute().params.project)
</script>

<template>
  <div class="bg-muted overflow-x-auto p-8">
    <div class="max-w-5xl mx-auto space-y-4">
      <h1 class="text-3xl font-bold flex justify-between">
        Project Assets
        <Button variant="outline">
          <IconFileUpload class="w-5 h-5 mr-2 text-muted-foreground" />
          Upload Files
        </Button>
      </h1>
      <Card class="p-4">
        <FileTree :nodes="project?.assets" />
      </Card>
    </div>
  </div>
</template>

<style scoped></style>
