<script setup lang="ts">
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { Button } from '@/components/ui/button'
import { Tour, TourTrigger } from '@/components/ui/tour-dialog'

import EditorSidePanel from '@/components/gltf-editor/EditorSidePanel.vue'

import StepWelcome from '../../components/gltf-editor/tour-steps/StepWelcome.vue'
import StepOtherTips from '../../components/gltf-editor/tour-steps/StepOtherTips.vue'
import StepCollaboration from '../../components/gltf-editor/tour-steps/StepCollaboration.vue'
import StepWorkingWithAssets from '../../components/gltf-editor/tour-steps/StepWorkingWithAssets.vue'
import StepHierarchy from '../../components/gltf-editor/tour-steps/StepHierarchy.vue'
import StepViewport from '../../components/gltf-editor/tour-steps/StepViewport.vue'

// const testRef = useTemplateRef<HTMLDivElement>('foo')

const tourSteps = [
  {
    title: 'Welcome to the Dopple glTF Editor!',
    content: StepWelcome
  },
  {
    title: 'Working with a team?',
    content: StepCollaboration
  },
  {
    title: 'Hierarchy and settings',
    content: StepHierarchy
  },
  {
    title: 'Importing assets',
    content: StepWorkingWithAssets
  },
  {
    title: 'Your scene viewport',
    content: StepViewport
  },
  {
    title: 'Other good-to-knows',
    content: StepOtherTips
  }
]
</script>

<template>
  <div class="h-full grid grid-rows-[minmax(0,1fr)]">
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel :max-size="60" :min-size="10" :default-size="30" class="bg-card">
        <EditorSidePanel />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel class="grid place-content-center">
        <span>Viewport stuff will go here...</span>
        <Tour :steps="tourSteps">
          <TourTrigger as-child>
            <Button size="xs" variant="blue" class="mt-4">Dev: Trigger Tour</Button>
          </TourTrigger>
        </Tour>
      </ResizablePanel>
    </ResizablePanelGroup>
  </div>
</template>

<style scoped></style>
