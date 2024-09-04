<script lang="ts" setup>
import { ref } from 'vue'

import FileTree from '@/components/blocks/file-tree/FileTree.vue'
import { useAssetsStore } from '@/stores/assets'

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
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '../ui/resizable'
import { ScrollArea } from '../ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import SceneHierarchyItem from './SceneHierarchyItem.vue'

import { IconPackageImport, IconWorld } from '@tabler/icons-vue'

const assets = useAssetsStore().assets

const tabs = [
  { label: 'Project Hierarchy', value: 'scenes' },
  { label: 'History', value: 'history' }
]

const hierarchyItems = ref([
  {
    type: 'group',
    title: 'Global',
    children: [
      {
        type: 'group',
        title: 'Environments',
        children: [
          {
            type: 'environment',
            title: 'Chair-Environment'
          },
          {
            type: 'environment',
            title: 'Chair2-Environment'
          },
          {
            type: 'environment',
            title: 'Chair3-Environment'
          }
        ]
      },
      {
        type: 'camera',
        title: 'Editor Camera'
      }
    ]
  },
  {
    type: 'group',
    title: 'TheChair',
    children: [
      {
        type: 'group',
        title: 'Positioning',
        children: [
          {
            type: 'node',
            title: 'default'
          }
        ]
      },
      {
        type: 'group',
        title: 'Meshes',
        children: [
          {
            type: 'group',
            title: 'arms',
            children: [
              {
                type: 'mesh',
                title: 'Mesh.007'
              }
            ]
          },
          {
            type: 'group',
            title: 'back',
            children: [
              {
                type: 'group',
                title: 'Group.005',
                children: [
                  {
                    type: 'mesh',
                    title: 'back_carbon_fiber'
                  },
                  {
                    type: 'mesh',
                    title: 'back_circuit_ivory'
                  },
                  {
                    type: 'mesh',
                    title: 'back_circuit_onyx'
                  },
                  {
                    type: 'mesh',
                    title: 'back_grey_oak'
                  },
                  {
                    type: 'mesh',
                    title: 'back_ivory_oak'
                  },
                  {
                    type: 'mesh',
                    title: 'back_natural_oak'
                  },
                  {
                    type: 'mesh',
                    title: 'back_sierra_oak'
                  },
                  {
                    type: 'mesh',
                    title: 'back_standard_black'
                  },
                  {
                    type: 'mesh',
                    title: 'back_walnut'
                  }
                ]
              }
            ]
          },
          {
            type: 'group',
            title: 'base',
            children: [
              {
                type: 'group',
                title: 'base_4_spoke',
                children: [
                  {
                    type: 'mesh',
                    title: 'Mesh.010'
                  }
                ]
              },
              {
                type: 'group',
                title: 'base_5_spoke',
                children: [
                  {
                    type: 'mesh',
                    title: 'Mesh.009'
                  }
                ]
              }
            ]
          },
          {
            type: 'group',
            title: 'chassis',
            children: [
              {
                type: 'mesh',
                title: 'Mesh.017'
              }
            ]
          },
          {
            type: 'group',
            title: 'cushions',
            children: [
              {
                type: 'group',
                title: 'cushions_boucle',
                children: [
                  {
                    type: 'mesh',
                    title: 'Mesh.006'
                  }
                ]
              },
              {
                type: 'group',
                title: 'cushions_leather',
                children: [
                  {
                    type: 'mesh',
                    title: 'RetopoFlow.014'
                  }
                ]
              }
            ]
          },
          {
            type: 'group',
            title: 'mat_library',
            children: [
              {
                type: 'group',
                title: 'back_carbon_fiber',
                children: [
                  {
                    type: 'mesh',
                    title: 'Plane'
                  }
                ]
              },
              {
                type: 'group',
                title: 'back_circuit_ivory',
                children: [
                  {
                    type: 'mesh',
                    title: 'Plane.001'
                  }
                ]
              },
              {
                type: 'group',
                title: 'back_circuit_onyx',
                children: [
                  {
                    type: 'mesh',
                    title: 'Plane.021'
                  }
                ]
              },
              {
                type: 'group',
                title: 'back_grey_oak',
                children: [
                  {
                    type: 'mesh',
                    title: 'Plane.004'
                  }
                ]
              },
              {
                type: 'group',
                title: 'back_ivory_oak',
                children: [
                  {
                    type: 'mesh',
                    title: 'Plane.008'
                  }
                ]
              },
              {
                type: 'group',
                title: 'back_natural_oak',
                children: [
                  {
                    type: 'mesh',
                    title: 'Plane.009'
                  }
                ]
              },
              {
                type: 'group',
                title: 'back_sierra_oak',
                children: [
                  {
                    type: 'mesh',
                    title: 'Plane.007'
                  }
                ]
              },
              {
                type: 'group',
                title: 'back_standard_black',
                children: [
                  {
                    type: 'mesh',
                    title: 'Plane.010'
                  }
                ]
              },
              {
                type: 'group',
                title: 'back_walnut',
                children: [
                  {
                    type: 'mesh',
                    title: 'Plane.020'
                  }
                ]
              },
              {
                type: 'group',
                title: 'chassis_quartz',
                children: [
                  {
                    type: 'mesh',
                    title: 'Plane.018'
                  }
                ]
              },
              {
                type: 'group',
                title: 'cushions_boucle_dune',
                children: [
                  {
                    type: 'mesh',
                    title: 'Plane.016'
                  }
                ]
              },
              {
                type: 'group',
                title: 'cushions_boucle_ivory',
                children: [
                  {
                    type: 'mesh',
                    title: 'Plane.019'
                  }
                ]
              },
              {
                type: 'group',
                title: 'cushions_boucle_onyx',
                children: [
                  {
                    type: 'mesh',
                    title: 'Plane.014'
                  }
                ]
              },
              {
                type: 'group',
                title: 'cushions_boucle_steel',
                children: [
                  {
                    type: 'mesh',
                    title: 'Plane.015'
                  }
                ]
              },
              {
                type: 'group',
                title: 'cushions_leather_dune',
                children: [
                  {
                    type: 'mesh',
                    title: 'Plane.002'
                  }
                ]
              },
              {
                type: 'group',
                title: 'cushions_leather_ivory',
                children: [
                  {
                    type: 'mesh',
                    title: 'Plane.003'
                  }
                ]
              },
              {
                type: 'group',
                title: 'cushions_leather_onyx',
                children: [
                  {
                    type: 'mesh',
                    title: 'Plane.005'
                  }
                ]
              },
              {
                type: 'group',
                title: 'cushions_leather_steel',
                children: [
                  {
                    type: 'mesh',
                    title: 'Plane.006'
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        type: 'group',
        title: 'Materials',
        children: [
          {
            type: 'material',
            title: 'back_circuit_ivory'
          },
          {
            type: 'material',
            title: 'back_circuit_onyx'
          },
          {
            type: 'material',
            title: 'back_grey_oak'
          },
          {
            type: 'material',
            title: 'back_natural_oak'
          },
          {
            type: 'material',
            title: 'cushions_boucle_onyx'
          },
          {
            type: 'material',
            title: 'cushions_leather_dune'
          }
        ]
      },
      {
        type: 'group',
        title: 'Textures',
        children: [
          {
            type: 'texture',
            title: 'Body_AO'
          },
          {
            type: 'texture',
            title: 'Body_Normal'
          },
          {
            type: 'texture',
            title: 'Body_Onyx_Albedo'
          },
          {
            type: 'texture',
            title: 'Body_Onyx_Metallic_Roughness'
          },
          {
            type: 'texture',
            title: 'Body_Quartz_Albedo'
          },
          {
            type: 'texture',
            title: 'Body_Quartz_Metallic_Roughness'
          },
          {
            type: 'texture',
            title: 'Cushions_Dune_Albedo'
          },
          {
            type: 'texture',
            title: 'Cushions_Ivory_Albedo'
          },
          {
            type: 'texture',
            title: 'Cushions_Leather_AO'
          },
          {
            type: 'texture',
            title: 'Cushions_Leather_Normal'
          },
          {
            type: 'texture',
            title: 'Cushions_Pink_Albedo'
          },
          {
            type: 'texture',
            title: 'Cushions_Steel_Albedo'
          }
        ]
      },
      {
        type: 'group',
        title: 'Cameras',
        children: [
          {
            type: 'camera',
            title: 'Camera.1723839127-Front'
          },
          {
            type: 'camera',
            title: 'Camera.1755031337-Back'
          }
        ]
      },
      {
        type: 'group',
        title: 'Animations',
        children: []
      }
    ]
  }
])
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
                <Button size="xs" variant="default">
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
            <div class="p-2 pl-5">
              <SceneHierarchyItem
                v-for="(item, i) in hierarchyItems"
                :key="item.title"
                :item="item"
                :is-last-child="i === hierarchyItems.length - 1"
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
        <div class="p-4">
          <h3>Settings Panel</h3>
          <p>Settings panel will go here</p>
        </div>
      </ScrollArea>
    </ResizablePanel>
  </ResizablePanelGroup>
</template>
