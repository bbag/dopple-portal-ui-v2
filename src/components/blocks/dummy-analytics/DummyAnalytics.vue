<script lang="ts" setup>
import { type Ref, ref } from 'vue'
import { CalendarDate, DateFormatter, getLocalTimeZone } from '@internationalized/date'

import { Button } from '@/components/ui/button'
import type { DateRange } from 'radix-vue'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { RangeCalendar } from '@/components/ui/range-calendar'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

import { IconCalendarMonth } from '@tabler/icons-vue'

const df = new DateFormatter('en-US', {
  dateStyle: 'medium'
})

const today = new Date()

const value = ref({
  start: new CalendarDate(today.getFullYear(), today.getMonth(), today.getDate()).subtract({
    months: 6
  }),
  end: new CalendarDate(today.getFullYear(), today.getMonth(), today.getDate())
}) as Ref<DateRange>

const dateRanges = [
  'Past 24 hours',
  'Past 7 days',
  'Past 30 days',
  'Past 6 months',
  'Past year',
  'All time',
  'Custom'
]

const currentDateRange = ref(dateRanges[3])

// Charts
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  ToolboxComponent
} from 'echarts/components'
import VChart from 'vue-echarts'

// import type { ComposeOption } from 'echarts/core'
// import type { PieSeriesOption } from 'echarts/charts'
// import type {
//   TitleComponentOption,
//   TooltipComponentOption,
//   LegendComponentOption
// } from 'echarts/components'

// type EChartsOption = ComposeOption<
//   | TitleComponentOption
//   | TooltipComponentOption
//   | LegendComponentOption
//   | PieSeriesOption
// >

use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  ToolboxComponent
])

const legend = [
  'Oct, 2023',
  'Nov, 2023',
  'Dec, 2023',
  'Jan, 2024',
  'Feb, 2024',
  'Mar, 2024',
  'Apr, 2024'
]

const dummyOption = {
  textStyle: {
    fontFamily: '"DM Sans", system-ui',
    fontWeight: 400
  },
  // title: {
  //   text: 'Analytics Overview',
  //   left: 'center',
  //   textStyle: {
  //     fontWeight: 'bold',
  //     color: 'rgb(2, 8, 23)',
  //     fontSize: 24
  //   }
  // },
  tooltip: {
    trigger: 'axis'
    // formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    bottom: '0%',
    itemWidth: 70,
    itemGap: 70,
    data: ['All', 'With configuration', 'With 3D (labels at right)'],
    textStyle: {
      fontWeight: 'bold',
      color: 'rgb(2, 8, 23)'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '20%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: legend,
    axisLabel: {
      fontWeight: 'bold',
      color: 'rgb(107 114 128)'
    },
    axisTick: {
      show: false
    }
  },
  yAxis: [
    {
      type: 'value',
      position: 'left',
      axisLabel: {
        // formatter: (value: number) => `${value / 1000} K`,
        fontWeight: 'bold',
        color: 'rgb(2, 8, 23)'
      },
      splitNumber: 4
    },
    {
      type: 'value',
      position: 'right',
      axisLabel: {
        formatter: (value: number) => `${value}`,
        fontWeight: 'bold',
        color: 'rgb(2, 8, 23)'
      },
      splitLine: {
        show: false
      }
    }
  ],
  series: [
    {
      name: 'All',
      data: [1040, 2228, 2857, 4720, 4411, 5217, 6185],
      type: 'line',
      symbolSize: 10,
      lineStyle: { color: '#004586' },
      itemStyle: { color: '#004586' },
      yAxisIndex: 0
    },
    {
      name: 'With configuration',
      data: [426, 537, 808, 1266, 1014, 1225, 2497],
      type: 'line',
      symbolSize: 10,
      lineStyle: { color: '#007BEE' },
      itemStyle: { color: '#007BEE' },
      yAxisIndex: 0
    },
    {
      name: 'With 3D (labels at right)',
      data: [15, 14, 20, 15, 36, 32, 40],
      type: 'line',
      symbolSize: 10,
      lineStyle: { color: '#EF5493' },
      itemStyle: { color: '#EF5493' },
      yAxisIndex: 1
    }
  ]
}
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <Select v-model="currentDateRange">
      <SelectTrigger class="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem v-for="option in dateRanges" :key="option" :value="option">
            {{ option }}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
    <Popover>
      <PopoverTrigger as-child>
        <Button
          variant="outline"
          :class="[
            'w-[280px] justify-start text-left font-normal',
            !value && 'text-muted-foreground'
          ]"
          :disabled="currentDateRange !== 'Custom'"
        >
          <IconCalendarMonth class="mr-2 h-5 w-5" />
          <template v-if="value.start">
            <template v-if="value.end">
              {{ df.format(value.start.toDate(getLocalTimeZone())) }} -
              {{ df.format(value.end.toDate(getLocalTimeZone())) }}
            </template>
            <template v-else>
              {{ df.format(value.start.toDate(getLocalTimeZone())) }}
            </template>
          </template>
          <template v-else> Pick a date </template>
        </Button>
      </PopoverTrigger>
      <PopoverContent class="w-auto p-0">
        <RangeCalendar
          v-model="value"
          initial-focus
          :number-of-months="2"
          :placeholder="value?.start"
          @update:start-value="(startDate) => (value.start = startDate)"
        />
      </PopoverContent>
    </Popover>
  </div>
  <v-chart class="h-[40vh] w-full" :option="dummyOption" autoresize />
</template>
