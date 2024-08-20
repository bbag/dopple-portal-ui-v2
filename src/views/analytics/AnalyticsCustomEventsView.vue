<script setup lang="ts">
import { ref } from 'vue'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

import customEventJson from './MOCK_DATA_dopple_custom2.json'

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

const selectedTimeframe = ref('30')
const timeframes = [
  {
    name: 'Past week',
    value: '7'
  },
  {
    name: 'Past 30 days',
    value: '30'
  },
  {
    name: 'Past 180 days',
    value: '180'
  },
  {
    name: 'Past year',
    value: '365'
  }
]
</script>

<template>
  <div class="flex justify-between">
    <h1 class="text-3xl font-bold mb-8">Custom Events</h1>
    <Select v-model="selectedTimeframe">
      <SelectTrigger class="w-40">
        <SelectValue placeholder="Select timeframe..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem v-for="timeframe in timeframes" :key="timeframe.name" :value="timeframe.value">
          {{ timeframe.name }}
        </SelectItem>
      </SelectContent>
    </Select>
  </div>
  <Accordion
    type="multiple"
    class="w-full space-y-4"
    collapsible
    :default-value="customEventCategories.map((item) => item.customEventName)"
  >
    <AccordionItem
      v-for="customEventCategory in customEventCategories"
      :key="customEventCategory.customEventName"
      :value="customEventCategory.customEventName"
      class="border-b-0"
    >
      <Card>
        <AccordionTrigger class="px-4 font-bold text-left items-start">
          <div>
            <h2 class="text-lg font-bold">
              {{ customEventCategory.customEventName }}
            </h2>
            <p class="text-sm text-muted-foreground font-normal">
              <!-- <span class="font-bold text-foreground">115</span> in the past 30 days -->
              <span class="font-bold text-foreground">
                {{ Math.floor(Math.random() * 200) + 1 }}
              </span>
              in the past 30 days
            </p>
          </div>
        </AccordionTrigger>
        <AccordionContent class="p-4 border-t">
          <div class="flex h-40 w-full max-w-[48rem] border rounded p-4">
            <div
              v-for="n in 30"
              :key="n"
              class="group w-full h-full px-px grid grid-rows-[minmax(0,1fr),1rem] gap-1 items-end"
            >
              <div
                class="h-full rounded bg-slate-500/40 group-hover:bg-slate-500/80"
                :style="{ height: `${Math.floor(Math.random() * 100) + 1}%` }"
              ></div>
              <div class="text-center text-xs font-bold w-4 border-t">
                {{ n }}
              </div>
            </div>
          </div>
        </AccordionContent>
      </Card>
    </AccordionItem>
  </Accordion>
  <!-- <div
    v-for="customEventCategory in customEventCategories"
    :key="customEventCategory.customEventName"
  >
    <Accordion type="multiple" class="w-full" collapsible>
      <AccordionItem :value="customEventCategory.customEventName" class="border-b-0 my-2">
        <Card>
          <AccordionTrigger class="px-4 font-bold hover:bg-slate-500/5">
            {{ customEventCategory.customEventName }}
          </AccordionTrigger>
          <AccordionContent class="p-4"> Content will go here... </AccordionContent>
        </Card>
      </AccordionItem>
    </Accordion>
  </div> -->
</template>

<style scoped></style>
