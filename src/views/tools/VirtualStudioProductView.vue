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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

import {
  IconArrowsHorizontal,
  IconArrowsVertical,
  IconCamera,
  IconCapture,
  IconColorSwatch,
  IconCopy,
  IconDeviceFloppy,
  IconEye,
  IconFileExport,
  IconPencil,
  IconPlus,
  IconSettings,
  IconSunset2,
  IconTrash,
  IconVideo
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

const fileFormats = ['PNG', 'JPG']
const fileFormat = ref('PNG')

const filenamePrefix = ref('snapshot-')

const scale = ref('1080p')
const scalesList = ['4K (2160p)', '2K (1440p)', '1080p', '720p', '480p', '360p', 'Custom']
const customScaleWidth = ref('1920')
const customScaleHeight = ref('1080')

const customCameras = ref<{ name: string; id: string; isEditing: boolean }[]>([
  { name: 'Top-down angle', id: '66b94c3adc', isEditing: false },
  { name: 'Front view (zoomed in)', id: 'bbe24f3918', isEditing: false }
])

function handleAddCustomCamera() {
  customCameras.value.push({ name: 'New camera', id: crypto.randomUUID(), isEditing: true })
}

const configOptions = [
  {
    name: 'bodyColor',
    options: ['Black', 'Red', 'Blue', 'Neon Green', 'Sunset Orange']
  },
  {
    name: 'frameColor',
    options: ['Black', 'Red', 'Blue', 'Neon Green', 'Sunset Orange', 'Electric Blue', 'White']
  },
  {
    name: 'wheelType',
    options: ['Trifork', 'Sport']
  },
  {
    name: 'decal',
    options: ['None', 'Stripes', 'Two-tone', 'Oval']
  }
]

const configurations = ref([
  {
    name: 'Black/Red Trifork',
    properties: [
      { name: 'bodyColor', value: 'Black' },
      { name: 'frameColor', value: 'Red' },
      { name: 'wheelType', value: 'Trifork' },
      { name: 'decal', value: 'Stripes' }
    ]
  },
  {
    name: 'Black/Red Sport',
    properties: [
      { name: 'bodyColor', value: 'Black' },
      { name: 'frameColor', value: 'Red' },
      { name: 'wheelType', value: 'Trifork' },
      { name: 'decal', value: 'Stripes' }
    ]
  },
  {
    name: 'Red Devil (Trifork + Red)',
    properties: [
      { name: 'bodyColor', value: 'Red' },
      { name: 'frameColor', value: 'Red' },
      { name: 'wheelType', value: 'Trifork' },
      { name: 'decal', value: 'None' }
    ]
  }
])
</script>

<template>
  <div class="h-full grid grid-cols-[minmax(0,_1fr)_32rem] overflow-y-hidden">
    <div class="p-8 my-auto">
      <Card
        class="max-w-full max-h-[calc(100vh-7rem)] mx-auto bg-no-repeat bg-contain bg-center relative"
        :style="{
          aspectRatio: `${aspectRatioValues.w}/${aspectRatioValues.h}`,
          backgroundImage: `url(${thumbnail})`,
          backgroundColor: bgColor || 'rgba(0, 0, 0, 0)'
        }"
      ></Card>
    </div>
    <div class="bg-background border-l p-8 overflow-y-auto">
      <TooltipProvider>
        <h1 class="text-2xl font-bold mb-2">Virtual Studio</h1>
        <p class="text-sm text-muted-foreground mb-4">
          Capture batches of images of your product with ease.
        </p>
        <div>
          <Accordion class="w-full -mx-1" type="multiple" collapsible>
            <AccordionItem value="section-settings">
              <AccordionTrigger class="px-1 py-3">
                <span class="inline-flex items-center gap-3 text-lg font-bold">
                  <IconSettings class="w-5 h-5" />
                  <span class="text-left flex-grow">Settings</span>
                </span>
              </AccordionTrigger>
              <AccordionContent class="px-1">
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
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="section-configurations">
              <AccordionTrigger class="px-1 py-3">
                <span class="inline-flex items-center gap-3 text-lg font-bold">
                  <IconColorSwatch class="w-5 h-5" />
                  <span class="text-left flex-grow">Configurations</span>
                </span>
              </AccordionTrigger>
              <AccordionContent class="px-1">
                <p class="mb-4 text-muted-foreground">
                  Select which product configurations to capture.
                </p>
                <ul class="grid pt-4">
                  <li
                    v-for="configuration in configurations"
                    :key="configuration.name"
                    class="flex items-center h-8 hover:bg-muted -mx-2 px-2 rounded-md"
                  >
                    <Checkbox :id="configuration.name" />
                    <label
                      :for="configuration.name"
                      class="text-sm leading-none ml-2 cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {{ configuration.name }}
                    </label>
                    <div class="ml-auto">
                      <Tooltip>
                        <TooltipTrigger as-child>
                          <Button
                            class="ml-2 text-muted-foreground hover:text-base"
                            size="icon-xs"
                            variant="ghost"
                          >
                            <IconPencil class="w-5 h-5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Edit</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </li>
                </ul>
                <Button variant="outline" class="w-full mt-4">
                  <IconPlus class="w-4 h-4 mr-2" />
                  New configuration
                </Button>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="section-cameras">
              <AccordionTrigger class="px-1 py-3">
                <span class="inline-flex items-center gap-3 text-lg font-bold">
                  <IconVideo class="w-5 h-5" />
                  <span class="text-left flex-grow">Camera Views</span>
                </span>
              </AccordionTrigger>
              <AccordionContent class="px-1">
                <p class="mb-4 text-muted-foreground">
                  Select which camera angles to include in your batch of images for each
                  configuration.
                </p>
                <ul class="grid pt-4">
                  <li class="flex items-center border-b pb-4 h-8">
                    <Checkbox id="select-all-cameras" />
                    <label
                      for="select-all-cameras"
                      class="text-sm leading-none ml-2 cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Select all cameras
                    </label>
                  </li>
                  <Label class="mt-4 mb-2">Existing cameras in product:</Label>
                  <li
                    v-for="camera in product?.cameras"
                    :key="camera.id"
                    class="flex items-center h-8 hover:bg-muted -mx-2 px-2 rounded-md"
                  >
                    <Checkbox :id="`camera-${camera.id}`" />
                    <label
                      :for="`camera-${camera.id}`"
                      class="text-sm leading-none ml-2 cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {{ camera.name }}
                    </label>
                    <Tooltip>
                      <TooltipTrigger as-child>
                        <Button
                          class="ml-auto text-muted-foreground hover:text-base"
                          size="icon-xs"
                          variant="ghost"
                        >
                          <IconEye class="w-5 h-5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View</p>
                      </TooltipContent>
                    </Tooltip>
                  </li>
                  <Label class="mt-4 mb-2">Custom cameras for Virtual Studio:</Label>
                  <li
                    v-for="camera in customCameras"
                    :key="camera.id"
                    class="flex items-center h-8 hover:bg-muted -mx-2 px-2 rounded-md"
                  >
                    <Checkbox :id="`camera-${camera.id}`" />
                    <label
                      v-if="!camera.isEditing"
                      :for="`camera-${camera.id}`"
                      class="text-sm leading-none ml-2 cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {{ camera.name }}
                    </label>
                    <div v-else class="relative">
                      <Input class="h-7 px-1 mx-1" v-model="camera.name" />
                      <Tooltip>
                        <TooltipTrigger as-child>
                          <Button
                            variant="ghost"
                            size="icon-xs"
                            class="absolute top-1/2 right-0 -translate-y-1/2 text-muted-foreground hover:text-base"
                            @click="camera.isEditing = false"
                          >
                            <IconDeviceFloppy class="w-5 h-5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Save</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <Tooltip>
                      <TooltipTrigger as-child>
                        <Button
                          class="ml-auto text-muted-foreground hover:text-base"
                          size="icon-xs"
                          variant="ghost"
                        >
                          <IconCapture class="w-5 h-5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Set to current view</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger as-child>
                        <Button
                          class="ml-2 text-muted-foreground hover:text-base"
                          size="icon-xs"
                          variant="ghost"
                        >
                          <IconEye class="w-5 h-5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger as-child>
                        <Button
                          class="ml-2 text-muted-foreground hover:text-base"
                          size="icon-xs"
                          variant="ghost"
                          @click="camera.isEditing = true"
                        >
                          <IconPencil class="w-5 h-5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Edit</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger as-child>
                        <Button
                          class="ml-2 text-muted-foreground hover:text-base"
                          size="icon-xs"
                          variant="ghost"
                        >
                          <IconTrash class="w-5 h-5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Delete</p>
                      </TooltipContent>
                    </Tooltip>
                  </li>
                </ul>
                <Button class="mt-4 w-full" variant="outline" @click="handleAddCustomCamera">
                  <IconPlus class="w-4 h-4 mr-2" />
                  New custom camera
                </Button>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="section-environments">
              <AccordionTrigger class="px-1 py-3">
                <span class="inline-flex items-center gap-3 text-lg font-bold">
                  <IconSunset2 class="w-5 h-5" />
                  <span class="text-left flex-grow">Environments</span>
                </span>
              </AccordionTrigger>
              <AccordionContent class="px-1">
                <p class="text-sm text-muted-foreground mb-4">
                  Choose which lighting environment to showcase your product in.
                </p>
                <table class="my-2">
                  <tbody>
                    <tr>
                      <td class="pr-4 py-1">
                        <Label class="whitespace-nowrap">Environment:</Label>
                      </td>
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
                      <td class="pr-4 py-1">
                        <Label class="whitespace-nowrap">Background:</Label>
                      </td>
                      <td class="py-1 w-full">
                        <div class="w-60 flex gap-2 items-center">
                          <sl-color-picker
                            :disabled="isBgTransparent"
                            id="bg-color-input"
                            label="Select a color"
                            size="small"
                            :value="isBgTransparent ? 'transparent' : bgColor"
                            @sl-input="
                              ($event: InputEvent) => handleSetBgColor($event?.target?.value)
                            "
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
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="section-output">
              <AccordionTrigger class="px-1 py-3">
                <span class="inline-flex items-center gap-3 text-lg font-bold">
                  <IconFileExport class="w-5 h-5" />
                  <span class="text-left flex-grow">Output</span>
                </span>
              </AccordionTrigger>
              <AccordionContent class="px-1">
                <p class="text-sm text-muted-foreground mb-4">
                  Specify the file name, format, and resolution for your final images.
                </p>
                <table class="my-2">
                  <tbody>
                    <tr>
                      <td class="pr-4 py-1">File format:</td>
                      <td class="py-1 w-full h-12">
                        <Select v-model="fileFormat">
                          <SelectTrigger class="w-24">
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem
                                v-for="option in fileFormats"
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
                      <td class="pr-4 py-1 whitespace-nowrap">Filename prefix:</td>
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
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </TooltipProvider>
      <div class="flex justify-end gap-4 mt-8">
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

/* .section-heading {
  counter-increment: section;
}

.section-heading::before {
  @apply w-6 h-6 flex items-center justify-center bg-muted text-foreground rounded-md px-1 text-xs;
  content: counter(section);
} */
</style>
