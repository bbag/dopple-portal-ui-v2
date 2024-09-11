<script setup lang="ts">
import { onMounted, useTemplateRef } from 'vue'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
// import {
//   Tour,
//   TourContent,
//   TourTrigger,
// } from '@/components/ui/tour'
import { Button } from '@/components/ui/button'
import {
  Tour,
  TourContent,
  TourDescription,
  TourFooter,
  TourHeader,
  TourTitle,
  TourTrigger
} from '@/components/ui/tour-dialog'

import EditorSidePanel from '@/components/gltf-editor/EditorSidePanel.vue'

import StepWelcome from '../../components/gltf-editor/tour-steps/StepWelcome.vue'
import StepOtherTips from '../../components/gltf-editor/tour-steps/StepOtherTips.vue'
import StepCollaboration from '../../components/gltf-editor/tour-steps/StepCollaboration.vue'
import StepWorkingWithAssets from '../../components/gltf-editor/tour-steps/StepWorkingWithAssets.vue'

// const testRef = useTemplateRef<HTMLDivElement>('foo')

const tourSteps = [
  {
    title: 'Welcome to the Dopple glTF Editor',
    content: StepWelcome
  },
  {
    title: 'Working with assets',
    content: StepWorkingWithAssets
  },
  {
    title: 'Collaboration',
    content: StepCollaboration
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
        <div>
          Main content here.
          <Tour :steps="tourSteps">
            <TourTrigger as-child>
              <Button size="xs" variant="blue">Start Tour</Button>
            </TourTrigger>
          </Tour>
        </div>
        <div class="my-8" data-tour-step="0">A second line with some content</div>
        <div>Final line with another bit of <span data-tour-step="0">content</span></div>
      </ResizablePanel>
    </ResizablePanelGroup>
  </div>
</template>

<style scoped></style>
