<script setup lang="ts">
// import { ref } from 'vue'
// import { RouterLink, useRoute } from 'vue-router'
// import { useModelsStore } from '@/stores/models'

// import { Button, buttonVariants } from '@/components/ui/button'
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
// import { Label } from '@/components/ui/label'
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue
// } from '@/components/ui/select'

// const workspace = useRoute().params.workspace
// // const model = useRoute().params.name
// const models = useModelsStore().models.filter((p) => p.workspace === workspace)

import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger
} from '@/components/ui/menubar'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'

import EditorSidePanel from '@/components/gltf-editor/EditorSidePanel.vue'

import { menuItems } from '@/components/gltf-editor/editorMenuItems'
</script>

<template>
  <div class="h-full grid grid-rows-[minmax(0,1fr)]">
    <!-- <div class="border-b">
      <Menubar class="border-none rounded-none">
        <MenubarMenu v-for="menu in menuItems" :key="menu.text">
          <MenubarTrigger>{{ menu.text }}</MenubarTrigger>
          <MenubarContent>
            <component v-for="(item, i) in menu.children" :key="i" :is="item.component">
              <component
                v-if="item.icon"
                :is="item.icon"
                class="w-5 h-5 mr-2 text-muted-foreground"
              />
              {{ item.text }}
            </component>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div> -->
    <!-- <div
      class="p-4 rounded-lg border border-yellow-500 bg-yellow-50 text-yellow-800 max-w-lg dark:border-yellow-200/30 dark:bg-yellow-500/10 dark:text-yellow-200"
    >
      This whole UI is a placeholder, and the <em>entire thing</em> can be customized to match the
      current prototype according to however the PS and Engineering teams need. :)
    </div> -->
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel :max-size="60" :min-size="10" :default-size="30" class="bg-card">
        <EditorSidePanel />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel class="grid place-content-center">Main content here</ResizablePanel>
    </ResizablePanelGroup>
  </div>
</template>

<style scoped></style>
