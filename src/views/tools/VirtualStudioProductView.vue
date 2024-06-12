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
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

import {
  IconAlertTriangle,
  IconArrowsHorizontal,
  IconArrowsVertical,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandX,
  IconCamera,
  IconCapture,
  IconColorSwatch,
  IconCopy,
  IconDeviceFloppy,
  IconEye,
  IconFileExport,
  IconHash,
  IconPencil,
  IconPlus,
  IconSettings,
  IconSunset2,
  IconTrash,
  IconVideo
} from '@tabler/icons-vue'
import { custom } from 'zod'

const product = useProductsStore().products.find(
  (product) => product.name === useRoute().params.name
)
const thumbnail = product?.thumbnail

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

const aspectRatio = ref('16:9')
const aspectRatiosList = [
  { label: '1:1', w: 1, h: 1 },
  { label: '3:4', w: 3, h: 4 },
  { label: '4:3', w: 4, h: 3 },
  { label: '16:9', w: 16, h: 9 },
  { label: '16:10', w: 16, h: 10 },
  { label: 'Custom', w: 1, h: 1 }
]

const customAspectRatio = ref({
  w: 1,
  h: 1
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

const resolution = ref('Custom')
const resolutionsList = [
  {
    group: 'Common Sizes',
    icon: IconHash,
    options: [
      { label: 'Custom', w: 0, h: 0 },
      { label: '4K (4096 x 2160)', w: 4096, h: 2160 },
      { label: '1440p (2560 x 1440)', w: 2560, h: 1440 },
      { label: '1080p Full HD (1920 x 1080)', w: 1920, h: 1080 },
      { label: '720p HD (1280 x 720)', w: 1280, h: 720 }
    ]
  },
  {
    group: 'Instagram',
    icon: IconBrandInstagram,
    options: [
      { label: 'Feed: Portrait (1080 x 1350)', w: 1080, h: 1350 },
      { label: 'Feed: Landscape (1080 x 566)', w: 1080, h: 566 },
      { label: 'Feed: Square (1080 x 1080)', w: 1080, h: 1080 },
      { label: 'Reel Video/Story (1080 x 1920)', w: 1080, h: 1920 }
    ]
  },
  {
    group: 'LinkedIn',
    icon: IconBrandLinkedin,
    options: [
      { label: 'Page Cover Image (1128 x 191)', w: 1128, h: 191 },
      { label: 'Blog Post Image (1200 x 627)', w: 1200, h: 627 },
      { label: 'Carousel Image (1080 x 1080)', w: 1080, h: 1080 }
    ]
  },
  {
    group: 'X/Twitter',
    icon: IconBrandX,
    options: [
      { label: 'Profile Picture (400 x 400)', w: 400, h: 400 },
      { label: 'In-stream Image (1600 x 900)', w: 1600, h: 900 },
      { label: 'Header Image (1500 x 500)', w: 1500, h: 500 },
      { label: 'Single/Multi Image Post (600 x 335)', w: 600, h: 335 }
    ]
  }
]
const customResolution = ref({
  w: 1920,
  h: 1080
})

/** Returns a resolution string (e.g. '1920x1080') based on the selected aspect ratio and resolution */
const aspectRatioOutput = computed(() => {
  let w = 0
  let h = 0

  if (resolution.value !== 'Custom') {
    resolutionListLoop: for (const item of resolutionsList) {
      for (const option of item.options) {
        console.log(option.label)
        if (option.label === resolution.value) {
          w = option.w
          h = option.h
          break resolutionListLoop
        }
      }
    }
  } else {
    w = customResolution.value.w
    h = customResolution.value.h
  }

  if (w === 0 || h === 0) {
    return { w, h }
  }

  const greatestCommonDivisor = (a: number, b: number): number =>
    b == 0 ? a : greatestCommonDivisor(b, a % b)
  let divisor = greatestCommonDivisor(w, h)

  w = w / divisor
  h = h / divisor

  if (w < 21 && h < 21) {
    return { w, h }
  }

  if (w > h) {
    w = Math.round((w / h) * 100) / 100
    h = 1
  } else {
    w = 1
    h = Math.round((h / w) * 100) / 100
  }

  return { w, h }
})

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
    id: '40fd76f3501e',
    name: 'Black/Blue Trifork',
    properties: {
      bodyColor: 'Black',
      frameColor: 'Electric Blue',
      wheelType: 'Trifork',
      decal: 'Stripes'
    }
  },
  {
    id: '690b87767a24',
    name: 'Black/Red Sport',
    properties: {
      bodyColor: 'Black',
      frameColor: 'Red',
      wheelType: 'Sport',
      decal: 'Oval'
    }
  },
  {
    id: 'dc618e781ec0',
    name: '“Red Devil” (Trifork + Red)',
    properties: {
      bodyColor: 'Red',
      frameColor: 'Red',
      wheelType: 'Trifork',
      decal: 'None'
    }
  }
])
</script>

<template>
  <div class="h-full grid grid-cols-[minmax(0,_1fr)_32rem] overflow-y-hidden">
    <div class="p-8 my-auto">
      <Card
        class="max-w-full max-h-[calc(100vh-7rem)] mx-auto bg-no-repeat bg-contain bg-center relative"
        :style="{
          aspectRatio: `${aspectRatioOutput.w}/${aspectRatioOutput.h}`,
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
        <div class="my-4 p-4 rounded-lg border border-yellow-500 bg-yellow-50 text-yellow-800">
          This UI is just a concept for features. The <em>entire thing</em> can evolve to match
          final requirements.
        </div>
        <div>
          <Accordion class="w-full -mx-1" type="multiple" collapsible>
            <AccordionItem value="section-photoshoots">
              <AccordionTrigger class="px-1 py-3">
                <span class="inline-flex items-center gap-3 text-lg font-bold">
                  <IconSettings class="w-5 h-5" />
                  <span class="text-left flex-grow">Saved Photoshoots</span>
                </span>
              </AccordionTrigger>
              <AccordionContent class="px-1 space-y-4">
                <p>
                  This section will soon let you save photoshoot “presets” for future re-use, such
                  as having a preset for capturing thumbnails for your ecommerce store, another for
                  capturing certain angles/configs for social media posts, etc.
                </p>
                <p>Stay tuned!</p>
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
                    :key="configuration.id"
                    class="flex items-center h-8 hover:bg-muted -mx-2 px-2 rounded-md"
                  >
                    <Checkbox :id="configuration.id" />
                    <label
                      :for="configuration.id"
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
                            <IconEye class="w-5 h-5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>View</p>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <Sheet>
                          <SheetTrigger as-child>
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
                          </SheetTrigger>
                          <SheetContent class="sm:max-w-md" hide-overlay>
                            <SheetHeader>
                              <SheetTitle>Edit configuration</SheetTitle>
                              <SheetDescription>
                                Make changes to your configuration here.
                              </SheetDescription>
                            </SheetHeader>
                            <div class="grid gap-4 py-4">
                              <div>
                                <Label>
                                  Name <span class="text-muted-foreground">(optional)</span>
                                </Label>
                                <Input v-model="configuration.name" />
                              </div>
                              <div v-for="configOption in configOptions" :key="configOption.name">
                                <Label class="font-mono mb-1">{{ configOption.name }}</Label>
                                <Select v-model="configuration.properties[configOption.name]">
                                  <SelectTrigger class="w-full">
                                    <SelectValue placeholder="Select..." />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectGroup>
                                      <SelectItem
                                        v-for="opt in configOption.options"
                                        :key="opt"
                                        :value="opt"
                                        class="tracking-wide"
                                      >
                                        {{ opt }}
                                      </SelectItem>
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            <SheetFooter>
                              <SheetClose as-child>
                                <Button type="submit"> Save changes </Button>
                              </SheetClose>
                            </SheetFooter>
                          </SheetContent>
                        </Sheet>
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
                    <!-- <tr>
                      <td class="pr-4 py-1">Aspect ratio:</td>
                      <td class="py-1 w-full">
                        <div class="flex items-center gap-2">
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
                            <Input
                              v-model.number="customAspectRatio.h"
                              type="number"
                              max="4096"
                              min="1"
                            />
                          </div>
                        </div>
                      </td>
                    </tr> -->
                    <tr>
                      <td class="pr-4 py-1">Resolution:</td>
                      <td class="py-1 w-full">
                        <Select v-model="resolution">
                          <SelectTrigger class="w-full">
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup v-for="(group, i) in resolutionsList" :key="group.group">
                              <div v-if="i !== 0" class="px-2 pt-1 pb-2">
                                <Separator />
                              </div>
                              <SelectLabel
                                class="flex items-center gap-2 text-muted-foreground mx-2 -px-2"
                              >
                                <component :is="group.icon" class="w-4 h-4" />
                                {{ group.group }}
                              </SelectLabel>
                              <SelectItem
                                v-for="option in group.options"
                                :key="option.label"
                                :value="option.label"
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
                      <td></td>
                      <td class="pt-1">
                        <div class="flex gap-2">
                          <div v-if="resolution === 'Custom'" class="relative">
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
                              v-model.number="customResolution.w"
                              type="number"
                              max="4096"
                              min="1"
                              class="w-32 pl-9"
                            />
                          </div>
                          <div v-if="resolution === 'Custom'" class="relative">
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
                              v-model.number="customResolution.h"
                              type="number"
                              max="4096"
                              min="1"
                              class="w-32 pl-9"
                            />
                          </div>
                        </div>
                        <!-- <div v-if="resolution === 'Custom'" class="mt-2 relative pl-6">
                          <IconAlertTriangle
                            class="w-4 h-4 absolute top-0 left-0 text-amber-700 dark:text-amber-300"
                          />
                          <p class="text-xs text-amber-700 dark:text-amber-300">
                            Custom resolution values will override the aspect ratio in the output
                            images.
                          </p>
                        </div> -->
                        <p class="text-sm text-muted-foreground">
                          Aspect ratio:
                          <span class="tracking-wider">
                            {{ aspectRatioOutput.w }}:{{ aspectRatioOutput.h }}
                          </span>
                        </p>
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
        <!-- <Button variant="outline">
          <IconDeviceFloppy class="w-5 h-5 mr-2" />
          Save
        </Button> -->
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
