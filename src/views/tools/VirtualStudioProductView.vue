<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useProductsStore } from '@/stores/products'

// Shoelace (for color-picker component)
import '@shoelace-style/shoelace/dist/themes/light.css'
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js'
setBasePath('https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.15.0/cdn/')
import '@shoelace-style/shoelace/dist/components/color-picker/color-picker.js'

// Components
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

import {
  IconArrowsHorizontal,
  IconArrowsVertical,
  IconDeviceFloppy,
  IconCamera,
  IconCopy
} from '@tabler/icons-vue'

const product = useProductsStore().products.find(
  (product) => product.name === useRoute().params.name
)
const thumbnail = product?.thumbnail

const aspectRatio = ref('16:9')
const aspectRatiosList = [
  { label: '1:1', w: '1', h: '1' },
  { label: '3:4', w: '3', h: '4' },
  { label: '4:3', w: '4', h: '3' },
  { label: '16:9', w: '16', h: '9' },
  { label: '16:10', w: '16', h: '10' },
  { label: 'Custom', w: '1', h: '1' }
]

const customAspectRatio = ref({
  w: '1',
  h: '1'
})

const aspectRatioValues = computed(() => {
  if (aspectRatio.value === 'Custom') {
    return {
      w: customAspectRatio.value.w || '1',
      h: customAspectRatio.value.h || '1'
    }
  } else {
    const option = aspectRatiosList.find((a) => a.label === aspectRatio.value)
    return option ? { w: option.w, h: option.h } : { w: '1', h: '1' }
  }
})

const environment = ref('default')
const environmentsList = [
  { label: 'Default', value: 'default' },
  { label: 'Street', value: 'Street' },
  { label: 'Studio', value: 'studio' }
]

const isBgTransparent = ref(true)
const bgColor = ref('#FFFFFF')
function handleSetBgColor(color: string) {
  bgColor.value = color.toUpperCase()
}

const filenamePrefix = ref('snapshot-')

const scale = ref('1080p')
const scalesList = ['4K (2160p)', '2K (1440p)', '1080p', '720p', '480p', '360p', 'Custom']
const customScaleWidth = ref('1920')
const customScaleHeight = ref('1080')
</script>

<template>
  <div class="h-full grid grid-cols-[minmax(0,_1fr)_32rem] overflow-y-hidden">
    <div class="p-8">
      <Card
        class="max-w-full max-h-[calc(100vh-7rem)] mx-auto bg-no-repeat bg-contain bg-center relative"
        :style="{
          aspectRatio: `${aspectRatioValues.w}/${aspectRatioValues.h}`,
          backgroundImage: `url(${thumbnail})`,
          backgroundColor: bgColor || 'rgba(0, 0, 0, 0)'
        }"
      ></Card>
    </div>
    <div class="bg-background border-l p-8 space-y-8 overflow-y-auto">
      <TooltipProvider>
        <div>
          <h1 class="text-2xl font-bold mb-2">Virtual Studio</h1>
          <p class="text-slate-500 text-sm mb-4">
            This UI will change <em>drastically</em> soon... this is just a placeholder for now.
          </p>
          <p>
            <span class="font-mono bg-slate-500/10 px-2 py-1 rounded ml-1 text-foreground/80">
              Product: {{ product?.name }}
            </span>
          </p>
        </div>
        <Separator />
        <div>
          <h2 class="text-lg font-bold">Settings</h2>
          <div class="flex gap-4 items-center">
            <Label class="whitespace-nowrap">Aspect ratio:</Label>
            <Select v-model="aspectRatio">
              <SelectTrigger class="w-32 tracking-wide">
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem
                    v-for="option in aspectRatiosList"
                    :key="option.label"
                    :value="option.label"
                    class="tracking-wide"
                  >
                    {{ option.label }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <div v-if="aspectRatio === 'Custom'" class="custom-aspect-ratio-input">
              <Tooltip>
                <TooltipTrigger as-child>
                  <IconArrowsHorizontal
                    class="w-4 h-4 absolute top-1/2 left-3 -translate-y-1/2 text-slate-600 cursor-help"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Width</p>
                </TooltipContent>
              </Tooltip>
              <Input v-model="customAspectRatio.w" type="number" max="4096" min="1" />
            </div>
            <div v-if="aspectRatio === 'Custom'" class="custom-aspect-ratio-input">
              <Tooltip>
                <TooltipTrigger as-child>
                  <IconArrowsVertical
                    class="w-4 h-4 absolute top-1/2 left-3 -translate-y-1/2 text-slate-600 cursor-help"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Height</p>
                </TooltipContent>
              </Tooltip>
              <Input v-model="customAspectRatio.h" type="number" max="4096" min="1" />
            </div>
          </div>
        </div>
        <div>
          <h2 class="text-lg font-bold">Camera Views</h2>
          <ul class="grid gap-4 pt-4">
            <li class="flex items-center border-b pb-4">
              <Checkbox id="select-all-cameras" />
              <label
                for="select-all-cameras"
                class="text-sm font-medium leading-none ml-2 cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Select all cameras
              </label>
            </li>
            <li v-for="camera in product?.cameras" :key="camera.id" class="flex items-center">
              <Checkbox :id="`camera-${camera.id}`" />
              <label
                :for="`camera-${camera.id}`"
                class="text-sm font-medium leading-none ml-2 cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {{ camera.name }}
              </label>
            </li>
          </ul>
        </div>
        <div>
          <h2 class="text-lg font-bold">Environments</h2>
          <table class="my-2">
            <tbody>
              <tr>
                <td class="pr-4 py-1"><Label class="whitespace-nowrap">Environment:</Label></td>
                <td class="py-1 w-full">
                  <Select v-model="environment">
                    <SelectTrigger class="w-60">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem
                          v-for="option in environmentsList"
                          :key="option.label"
                          :value="option.value"
                          class="tracking-wide"
                        >
                          {{ option.label }}
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </td>
              </tr>
              <tr>
                <td class="pr-4 py-1"><Label class="whitespace-nowrap">Background:</Label></td>
                <td class="py-1 w-full">
                  <div class="w-60 flex gap-2 items-center">
                    <sl-color-picker
                      :disabled="isBgTransparent"
                      id="bg-color-input"
                      label="Select a color"
                      size="small"
                      :value="isBgTransparent ? 'transparent' : bgColor"
                      @sl-input="($event: InputEvent) => handleSetBgColor($event?.target?.value)"
                    ></sl-color-picker>
                    <div
                      class="w-56 h-10 pl-3 pr-1 inline-flex items-center justify-between gap-2 font-mono border border-input rounded-md bg-background text-sm overflow-ellipsis"
                      :class="isBgTransparent ? 'opacity-80' : `bg-${bgColor}`"
                    >
                      <span>{{ isBgTransparent ? '' : bgColor }}</span>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        class="text-slate-500 hover:text-slate-700"
                        :disabled="isBgTransparent"
                      >
                        <IconCopy class="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="flex gap-2 items-center mt-2">
            <Checkbox
              id="terms1"
              :checked="isBgTransparent"
              @update:checked="() => (isBgTransparent = !isBgTransparent)"
            />
            <label
              for="terms1"
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Transparent background
            </label>
          </div>
        </div>
        <div>
          <h2 class="text-lg font-bold">Output</h2>
          <table class="my-2">
            <tbody>
              <tr>
                <td class="pr-4 py-1">Format:</td>
                <td class="py-1 w-full h-12">PNG</td>
              </tr>
              <tr>
                <td class="pr-4 py-1">Filename:</td>
                <td class="py-1 w-full">
                  <Input v-model="filenamePrefix" />
                </td>
              </tr>
              <tr>
                <td class="pr-4 py-1">Scale:</td>
                <td class="py-1 w-full">
                  <Select v-model="scale">
                    <SelectTrigger class="w-40">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem
                          v-for="option in scalesList"
                          :key="option"
                          :value="option"
                          class="tracking-wide"
                        >
                          {{ option }}
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </td>
              </tr>
              <tr>
                <td></td>
                <td class="flex gap-2">
                  <div v-if="scale === 'Custom'" class="relative">
                    <Tooltip>
                      <TooltipTrigger as-child>
                        <IconArrowsHorizontal
                          class="w-4 h-4 absolute top-1/2 left-3 -translate-y-1/2 text-slate-600 cursor-help"
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Width</p>
                      </TooltipContent>
                    </Tooltip>
                    <Input
                      v-model="customScaleHeight"
                      type="number"
                      max="4096"
                      min="1"
                      class="w-32 pl-9"
                    />
                  </div>
                  <div v-if="scale === 'Custom'" class="relative">
                    <Tooltip>
                      <TooltipTrigger as-child>
                        <IconArrowsVertical
                          class="w-4 h-4 absolute top-1/2 left-3 -translate-y-1/2 text-slate-600 cursor-help"
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Height</p>
                      </TooltipContent>
                    </Tooltip>
                    <Input
                      v-model="customScaleWidth"
                      type="number"
                      max="4096"
                      min="1"
                      class="w-32 pl-9"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h2 class="text-lg font-bold">Configurations</h2>
          <p>Stuff coming soon...</p>
        </div>
      </TooltipProvider>
      <div class="flex justify-end gap-4">
        <Button variant="outline">
          <IconDeviceFloppy class="w-5 h-5 mr-2" />
          Save
        </Button>
        <Button>
          <IconCamera class="w-5 h-5 mr-2" />
          Capture
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-aspect-ratio-input {
  @apply relative w-[5.5rem];
}

.custom-aspect-ratio-input input {
  @apply pl-9;
  -moz-appearance: textfield;
}

.custom-aspect-ratio-input input::-webkit-outer-spin-button,
.custom-aspect-ratio-input input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
