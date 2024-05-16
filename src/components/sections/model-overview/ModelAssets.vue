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
    id: '2210dc16-efcc-4727-85fd-d56c25465d79',
    name: 'Carbon_Fiber',
    type: 'material',
    shortId: '47Qvs0zJC2',
    latestVersion: 1
  },
  {
    id: '68c41ed9-46cf-4126-a3ea-64692139de9f ',
    name: 'carbon-fiber-albedo.png',
    type: 'texture',
    shortId: 'AywBorQmN0',
    latestVersion: 1
  },
  {
    id: '9e4b10cc-bcfc-4207-a168-30210e520ca2 ',
    name: 'carbon-fiber-bump.png',
    type: 'texture',
    shortId: '30210e520c',
    latestVersion: 1
  },
  {
    id: 'b4a9dbac-1271-454b-bf3e-a0b6f93d545a ',
    name: 'carbon-fiber-AO.png',
    type: 'texture',
    shortId: 'a0b6f93d54',
    latestVersion: 1
  },
  {
    id: '10b7ce1d-5c4d-4111-8f71-545ab72943bc ',
    name: 'carbon-fiber-metallic.png',
    type: 'texture',
    shortId: '545ab72943',
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
