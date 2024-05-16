<script lang="ts" setup>
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

const dummyAssets = [
  {
    id: '877e1413-acde-47f5-96be-39924d41c9c6',
    name: 'export_final_FINAL(2).gltf',
    type: 'model',
    shortId: 'GpS8Jj4lXe',
    latestVersion: 4
  },
  {
    id: 'afaed49f-1f64-4201-af07-d329407dbd65',
    name: 'foobar.gltf',
    type: 'model',
    shortId: 'Y08QG4mOwD',
    latestVersion: 1
  },
  {
    id: '2210dc16-efcc-4727-85fd-d56c25465d79',
    name: 'carbon_fiber',
    type: 'material',
    shortId: '47Qvs0zJC2',
    latestVersion: 1
  },
  {
    id: '7c62c7e3-53bc-43ee-af8b-885f31297452',
    name: 'example_model.gltf',
    type: 'model',
    shortId: 'JXCcuhbekS',
    latestVersion: 2
  },
  {
    id: '68c41ed9-46cf-4126-a3ea-64692139de9f ',
    name: 'carbon-fiber.png',
    type: 'texture',
    shortId: 'AywBorQmN0',
    latestVersion: 1
  }
]
</script>

<template>
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead class="w-full">Name</TableHead>
        <TableHead>Type</TableHead>
        <TableHead>Short ID</TableHead>
        <TableHead class="text-center whitespace-nowrap">Latest Version</TableHead>
        <TableHead>Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="item in dummyAssets" :key="item.id">
        <TableCell class="cursor-pointer">{{ item.name }}</TableCell>
        <TableCell class="capitalize">{{ item.type }}</TableCell>
        <TableCell class="font-mono">{{ item.shortId }}</TableCell>
        <TableCell class="text-center">{{ item.latestVersion }}</TableCell>
        <TableCell>
          <Button variant="outline" size="xs">View</Button>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
