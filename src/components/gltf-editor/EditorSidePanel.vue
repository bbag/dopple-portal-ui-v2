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
    </Tabs>
  </div>
</template>
