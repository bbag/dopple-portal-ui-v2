<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import DummyAnalytics from '@/components/blocks/dummy-analytics/DummyAnalytics.vue'

import customEventJson from './MOCK_DATA_dopple_custom2.json'

const addToCartEvents = customEventJson.filter((e) => e.custom_event_name === 'Add-to-Cart')
console.log('addToCartEvents', addToCartEvents)
</script>

<template>
  <h1 class="text-3xl font-bold mb-8">Analytics</h1>
  <h2>Add To Cart events:</h2>
  <ul>
    <li v-for="event in addToCartEvents" :key="event.id">
      {{ event.project_name }} - {{ event.custom_event_value }}
    </li>
  </ul>
  <div class="w-max text-xs text-rose-600 bg-rose-600/10 px-3 py-2 mt-1 mb-4 rounded">
    <em>STILL IN-PROGRESS — MORE ANALYTICS SCREENS COMING SOON!</em>
  </div>
  <Card>
    <CardHeader>
      <CardTitle class="flex items-center"> Session Analytics </CardTitle>
    </CardHeader>
    <CardContent class="flex-grow">
      <DummyAnalytics />
    </CardContent>
  </Card>
</template>

<style scoped></style>
