<script lang="ts" setup>
import { ref } from 'vue'

import FileTree from '@/components/blocks/file-tree/FileTree.vue'

import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '../ui/input'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '../ui/resizable'
import { ScrollArea } from '../ui/scroll-area'
import { Slider } from '../ui/slider'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import SceneHierarchyItem from './SceneHierarchyItem.vue'
import { useHierarchyItemsStore } from '@/stores/hierarchyItems'
const hierarchyItems = useHierarchyItemsStore()

import { useEditorStateStore } from '@/stores/editorStates'
const currentEditorState = useEditorStateStore().currentEditorState

import { useAssetsStore } from '@/stores/assets'
const assets = useAssetsStore().assets

const tabs = [
  { label: 'Project Hierarchy', value: 'scenes' },
  { label: 'History', value: 'history' }
]

import {
  IconCircleDot,
  IconCube,
  IconHaze,
  IconPackageImport,
  IconStack2,
  IconVideo,
  IconWorld
} from '@tabler/icons-vue'

import IconMaterial from '@/assets/icons/material.svg'
import IconTexture from '@/assets/icons/texture.svg'

function itemIcon(type: string) {
  switch (type) {
    case 'group':
      return IconStack2
    case 'mesh':
      return IconCube
    case 'environment':
      return IconHaze
    case 'texture':
      return IconTexture
    case 'material':
      return IconMaterial
    case 'camera':
      return IconVideo
    case 'global':
      return IconWorld
    default:
      return IconCircleDot
  }
}

const dummyAspectRatio = ref([0.5])
const dummyFov = ref([90])
</script>

<template>
  <ResizablePanelGroup direction="vertical" class="h-full">
    <ResizablePanel :max-size="90" :min-size="10" :default-size="60">
      <Tabs default-value="scenes" class="h-[calc(100%-2.5rem)]">
        <div class="px-2 pt-2">
          <TabsList class="grid w-full grid-cols-2">
            <TabsTrigger
              v-for="tab in tabs"
              :key="tab.value"
              :value="tab.value"
              class="min-w-content"
            >
              {{ tab.label }}
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="scenes" class="h-full mt-0">
          <div class="flex justify-between items-end p-2 pb-0">
            <h3 class="flex gap-2 items-center px-2 text-sm font-semibold">
              <IconWorld class="w-4 h-4 text-muted-foreground" />
              Scene
            </h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="xs" variant="blue">
                  <IconPackageImport class="w-4 h-4 mr-2" />
                  Import to Scene
                </Button>
              </DialogTrigger>
              <DialogContent class="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Import To Scene</DialogTitle>
                  <DialogDescription>
                    Select assets from your <strong>workspace files</strong> to add into your
                    project’s scene.
                  </DialogDescription>
                </DialogHeader>
                <ScrollArea class="h-96 max-h-[calc(100vh-12rem)]">
                  <FileTree :nodes="assets" size="sm" />
                </ScrollArea>
                <DialogFooter>
                  <DialogTrigger asChild>
                    <Button variant="outline" class="min-w-24">Cancel</Button>
                  </DialogTrigger>
                  <DialogTrigger asChild>
                    <Button variant="default" class="min-w-24">Import</Button>
                  </DialogTrigger>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <!-- <div style="box-shadow: inset 0 0 0 4px red" class="h-full">Test</div> -->
          <ScrollArea class="h-[calc(100%-2.5rem)]">
            <!-- <FileTree :nodes="hierarchyItems" size="sm" class="p-2 pb-4" /> -->
            <div class="p-2">
              <SceneHierarchyItem
                v-for="(item, i) in hierarchyItems.items"
                :key="item.title"
                :item="item"
                :is-last-child="i === hierarchyItems.items.length - 1"
                class="relative pr-2 pl-6"
              />
            </div>
          </ScrollArea>
        </TabsContent>
        <TabsContent value="hotspots"> Hotspots menu will go here. </TabsContent>
        <TabsContent value="history" class="h-full mt-0">
          <ScrollArea class="h-full">
            <pre class="p-4 text-sm">
[
  {
    "path": [
      {
        "type": "environments",
        "id": "e5e34e44-5052-4f3e-9320-e9922f408877"
      },
      {
        "type": "attributes",
        "id": "selected"
      },
      {
        "type": "properties",
        "id": "Environment"
      },
      {
        "type": "options",
        "id": "Env 2"
      }
    ],
    "operation": "set",
    "value": false,
    "when": 1725397815341,
    "oldValue": null
  },
  {
    "path": [
      {
        "type": "environments",
        "id": "e5e34e44-5052-4f3e-9320-e9922f408877"
      },
      {
        "type": "attributes",
        "id": "selected"
      },
      {
        "type": "properties",
        "id": "Environment"
      },
      {
        "type": "options",
        "id": "Env 1"
      }
    ],
    "operation": "set",
    "value": false,
    "when": 1725397815341,
    "oldValue": null
  },
  {
    "path": [
      {
        "type": "environments",
        "id": "8e55537f-b5c3-4e92-bc5f-3cfa96428970"
      },
      {
        "type": "attributes",
        "id": "selected"
      },
      {
        "type": "properties",
        "id": "Environment"
      },
      {
        "type": "options",
        "id": "Env 3"
      }
    ],
    "operation": "set",
    "value": false,
    "when": 1725397815340,
    "oldValue": null
  }
]</pre
            >
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </ResizablePanel>
    <ResizableHandle />
    <ResizablePanel>
      <ScrollArea class="h-full">
        <div v-if="!hierarchyItems.activeItem" class="p-4">
          <h3 class="font-semibold mb-2">Settings</h3>
          <p class="text-sm text-muted-foreground italic">
            Select a node or group from the hierarchy above to view and edit its settings.
          </p>
        </div>
        <div v-else class="p-4">
          <h3 class="font-semibold mb-2">Settings</h3>
          <table class="w-full text-sm">
            <tbody>
              <tr>
                <td class="pr-4 h-8 whitespace-nowrap">Type</td>
                <td class="w-full h-8">
                  <div class="flex items-center gap-2 font-mono">
                    <component :is="itemIcon(hierarchyItems.activeItem.type)" class="w-4 h-4" />
                    {{ hierarchyItems.activeItem.type }}
                  </div>
                </td>
              </tr>
              <tr>
                <td class="pr-4 h-8">Name</td>
                <td class="w-full h-8">
                  <Input size="sm" class="font-mono" v-model="hierarchyItems.activeItem.title" />
                </td>
              </tr>
              <tr>
                <td class="pr-4 h-8">Translation</td>
                <td class="w-full h-8">
                  <div class="grid grid-cols-3 gap-0.5">
                    <Input size="sm" class="font-mono" value="0" />
                    <Input size="sm" class="font-mono" value="0" />
                    <Input size="sm" class="font-mono" value="0" />
                  </div>
                </td>
              </tr>
            </tbody>
            <tbody v-if="hierarchyItems.activeItem.type === 'camera'">
              <tr>
                <td class="pr-4 h-8 whitespace-nowrap">Aspect Ratio</td>
                <td class="w-full h-8">
                  <div class="font-mono grid grid-cols-[auto_minmax(0,1fr)] gap-4 items-center">
                    <Input size="sm" class="font-mono w-14" v-model.number="dummyAspectRatio[0]" />
                    <div class="grid grid-cols-[auto_minmax(0,1fr)_auto] gap-2 items-center">
                      <span>0</span>
                      <Slider
                        :default-value="[0.5]"
                        :max="1"
                        :step="0.01"
                        v-model="dummyAspectRatio"
                      />
                      <span>1</span>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="pr-4 h-8 whitespace-nowrap">FOV</td>
                <td class="w-full h-8">
                  <div class="font-mono grid grid-cols-[auto_minmax(0,1fr)] gap-4 items-center">
                    <Input size="sm" class="font-mono w-14" v-model.number="dummyFov[0]" />
                    <div class="grid grid-cols-[auto_minmax(0,1fr)_auto] gap-2 items-center">
                      <span>10</span>
                      <Slider
                        :default-value="[90]"
                        :max="120"
                        :min="10"
                        :step="1"
                        v-model="dummyFov"
                      />
                      <span>120</span>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
            <tbody v-else-if="hierarchyItems.activeItem.type === 'group'">
              <tr>
                <td class="pr-4 h-8">Translation</td>
                <td class="w-full h-8">
                  <div class="grid grid-cols-3 gap-1">
                    <Input size="sm" class="font-mono" value="0" />
                    <Input size="sm" class="font-mono" value="0" />
                    <Input size="sm" class="font-mono" value="0" />
                  </div>
                </td>
              </tr>
            </tbody>
            <tbody v-else-if="hierarchyItems.activeItem.type === 'mesh'">
              <tr>
                <td class="pr-4 h-8">Translation</td>
                <td class="w-full h-8">
                  <div class="grid grid-cols-3 gap-0.5">
                    <Input size="sm" class="font-mono" value="0" />
                    <Input size="sm" class="font-mono" value="0" />
                    <Input size="sm" class="font-mono" value="0" />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </ScrollArea>
    </ResizablePanel>
  </ResizablePanelGroup>
</template>
