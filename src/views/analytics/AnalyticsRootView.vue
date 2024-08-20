<script setup lang="ts">
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// import DummyAnalytics from '@/components/blocks/dummy-analytics/DummyAnalytics.vue'

import customEventJson from './MOCK_DATA_dopple_custom2.json'

interface CustomEvent {
  id: string
  timestamp: string
  session_id: string
  user_id: string
  org_name: string
  workspace_name: string
  project_name: string
  event_type: string
  custom_event_name: string
  custom_event_value: number
  custom_tags: string
}

// Project categories
interface ProjectCategory {
  projectName: string
  customEventCategories: {
    name: string
    events: {
      timestamp: string
      value: number
      tags: string[]
    }[]
  }[]
}

const projectCategories: ProjectCategory[] = []

for (const event of customEventJson) {
  const projectName = event.project_name
  const customEventName = event.custom_event_name

  let projectCategory = projectCategories.find((p) => p.projectName === projectName)

  if (!projectCategory) {
    projectCategory = { projectName: projectName, customEventCategories: [] }
    projectCategories.push(projectCategory)
  }

  let customEventCategory = projectCategory.customEventCategories.find(
    (e) => e.name === customEventName
  )

  if (!customEventCategory) {
    customEventCategory = { name: customEventName, events: [] }
    projectCategory.customEventCategories.push(customEventCategory)
  }

  customEventCategory.events.push({
    timestamp: event.timestamp,
    value: event.custom_event_value,
    tags: event.custom_tags
  })
}

console.log(projectCategories)

// Sort categories and event types within each category
projectCategories.sort((a, b) => a.projectName.localeCompare(b.projectName))
for (const projectCategory of projectCategories) {
  projectCategory.customEventCategories.sort((a, b) => a.name.localeCompare(b.name))
}

// Event categories
interface CustomEventCategory {
  customEventName: string
}

const customEventCategories: CustomEventCategory[] = []

for (const event of customEventJson) {
  const customEventName = event.custom_event_name

  let customEventCategory = customEventCategories.find(
    (item) => item.customEventName === customEventName
  )

  if (!customEventCategory) {
    customEventCategory = {
      customEventName: customEventName
      // customEventCategories: []
    }
    customEventCategories.push(customEventCategory)
  }
}

// Misc.
function getMinAndMaxTimestamp(events: { timestamp: string }[]) {
  let minTimestamp = +events[0].timestamp
  let maxTimestamp = +events[0].timestamp

  for (const event of events) {
    if (+event.timestamp < minTimestamp) {
      minTimestamp = +event.timestamp
    }
    if (+event.timestamp > maxTimestamp) {
      maxTimestamp = +event.timestamp
    }
  }

  return {
    min: new Intl.DateTimeFormat('en-US').format(minTimestamp),
    max: new Intl.DateTimeFormat('en-US').format(maxTimestamp),
    // min: new Intl.DateTimeFormat('en-US').format(minTimestamp),
    // max: new Intl.DateTimeFormat('en-US').format(maxTimestamp),
    numberOfDaysDifference: (maxTimestamp - minTimestamp) / (1000 * 60 * 60 * 24)
  }
}
</script>

<template>
  <h1 class="text-3xl font-bold mb-8">Analytics</h1>
  <h2 class="text-2xl font-bold">Custom Events</h2>
  <Accordion type="multiple" class="w-full" collapsible>
    <AccordionItem
      v-for="customEventCategory in customEventCategories"
      :key="customEventCategory.customEventName"
      :value="customEventCategory.customEventName"
      class="border-b-0 my-2"
    >
      <Card>
        <AccordionTrigger class="px-4 font-bold hover:bg-slate-500/5">
          {{ customEventCategory.customEventName }}
        </AccordionTrigger>
        <AccordionContent class="p-4"> Content will go here... </AccordionContent>
      </Card>
    </AccordionItem>
  </Accordion>

  <!-- <Accordion type="multiple" class="w-full" collapsible>
    <AccordionItem
      v-for="projectCategory in projectCategories"
      :key="projectCategory.projectName"
      :value="projectCategory.projectName"
      class="border-b-0 my-2"
    >
      <Card>
        <AccordionTrigger class="px-4 font-bold hover:bg-slate-500/5">
          {{ projectCategory.projectName }}
        </AccordionTrigger>
        <AccordionContent>
          <div
            v-for="customEventCategory in projectCategory.customEventCategories"
            :key="customEventCategory.name"
            class="px-8 my-2"
          >
            <p>{{ customEventCategory.name }}: {{ customEventCategory.events.length }}</p>
            <p>{{ getMinAndMaxTimestamp(customEventCategory.events) }}</p>
          </div>
        </AccordionContent>
      </Card>
    </AccordionItem>
  </Accordion> -->
  <!-- <pre>{{ projectCategories }}</pre>
  <ul>
    <li v-for="projectCategory in projectCategories" :key="projectCategory.project">
      {{ projectCategory.project }}
    </li>
  </ul> -->
  <Accordion type="multiple" class="w-full" collapsible>
    <AccordionItem value="json">
      <AccordionTrigger>Show original JSON</AccordionTrigger>
      <AccordionContent>
        <pre>{{ customEventJson }}</pre>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
  <!-- <div class="w-max text-xs text-rose-600 bg-rose-600/10 px-3 py-2 mt-1 mb-4 rounded">
    <em>STILL IN-PROGRESS — MORE ANALYTICS SCREENS COMING SOON!</em>
  </div>
  <Card>
    <CardHeader>
      <CardTitle class="flex items-center"> Session Analytics </CardTitle>
    </CardHeader>
    <CardContent class="flex-grow">
      <DummyAnalytics />
    </CardContent>
  </Card> -->
</template>

<style scoped></style>
