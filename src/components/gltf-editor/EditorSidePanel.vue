<script lang="ts" setup>
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const tabs = [
  { label: 'Scenes', value: 'scenes' },
  { label: 'Hotspots', value: 'hotspots' },
  { label: 'Assets', value: 'assets' },
  { label: 'History', value: 'history' }
]
</script>

<template>
  <div class="h-full p-4">
    <Tabs default-value="scenes">
      <TabsList class="w-full justify-start">
        <TabsTrigger v-for="tab in tabs" :key="tab.value" :value="tab.value">
          {{ tab.label }}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="scenes"> Scenes list will go here. </TabsContent>
      <TabsContent value="hotspots"> Hotspots menu will go here. </TabsContent>
      <TabsContent value="assets"> Assets explorer will go here. </TabsContent>
      <TabsContent value="history"> History menu will gohere. </TabsContent>
      <div class="mt-4 p-4 rounded-lg border border-yellow-500 bg-yellow-50 text-yellow-800">
        This whole UI is a placeholder, and the <em>entire thing</em> can be customized to match the
        current prototype according to however the PS and Engineering teams need. :)
      </div>
    </Tabs>
  </div>
</template>
