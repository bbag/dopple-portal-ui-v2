<script setup lang="ts">
import { Card } from '@/components/ui/card'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
</script>

<template>
  <div>
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel class="bg-background flex flex-col items-center justify-center">
        <h1 class="text-3xl font-bold p-8">Live preview</h1>
        <p>Code snippets will show here... coming soon!</p>
        <p class="text-slate-500 text-sm">
          (In the meantime, try dragging and resizing these panels.)
        </p>
      </ResizablePanel>
      <ResizableHandle with-handle />
      <ResizablePanel class="flex items-center justify-center">
        3D model will show here... also coming soon!
      </ResizablePanel>
    </ResizablePanelGroup>
  </div>
</template>

<style scoped></style>
