<script setup lang="ts">
import { useAssetsStore } from '@/stores/assets'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

import { IconFileUpload, IconFolderPlus } from '@tabler/icons-vue'
import FileTree from '@/components/blocks/file-tree/FileTree.vue'

const assets = useAssetsStore().assets
</script>

<template>
  <div class="bg-muted overflow-x-auto p-8">
    <div class="max-w-5xl mx-auto space-y-4">
      <h1 class="text-3xl font-bold flex justify-between">
        Workspace Assets
        <Button variant="outline">
          <IconFileUpload class="w-5 h-5 mr-2 text-muted-foreground" />
          Upload Files
        </Button>
      </h1>
      <Card class="p-4">
        <FileTree :nodes="assets" />
        <Button variant="outline" size="sm" class="mt-4">
          <IconFolderPlus class="w-5 h-5 mr-2 text-muted-foreground" />
          New folder
        </Button>
      </Card>
    </div>
  </div>
</template>

<style scoped></style>
