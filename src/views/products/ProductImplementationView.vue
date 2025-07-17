<script setup lang="ts">
import { computed, reactive, ref, onMounted, watch } from 'vue'
import { codeToHtml, getHighlighter } from 'shiki'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

import { IconInfoCircle } from '@tabler/icons-vue'

const exampleMatrix = ref([
  {
    property: 'luggage-view',
    options: ['closed', 'open'],
    selectedOption: 'closed'
  },
  {
    property: 'luggage-color',
    options: [
      'light-gray',
      'aleutian',
      'black',
      'white',
      'sahara',
      'pink',
      'cherry',
      'bumblebee',
      'evergreen',
      'calypso',
      'atlantis'
    ],
    selectedOption: 'light-gray'
  },
  {
    property: 'packing-cubes',
    options: ['hidden', 'shown'],
    selectedOption: 'hidden'
  },
  {
    property: 'toiletry-bag',
    options: ['none', 'included'],
    selectedOption: 'none'
  },
  {
    property: 'charger',
    options: ['none', 'included'],
    selectedOption: 'none'
  },
  {
    property: 'camera-position',
    options: ['default', 'charger'],
    selectedOption: 'default'
  }
])

type UiComponentOption = {
  name: string
  slug: string
  isSelected: boolean
  tooltip?: string
}

type UiComponentCategory = {
  title: string
  slug: string
  options: UiComponentOption[]
}

const uiComponentCategories = ref(
  {
    'general-ui': {
      title: 'General UI',
      options: {
        'loading-screen': {
          name: 'Loading screen',
          isSelected: false
        },
        'config-menu': {
          name: 'Side menu with config options',
          isSelected: false,
          tooltip: 'Generates a basic selection menu UI with your product’s configurable options.'
        },
        'gesture-indicator': {
          name: 'Gesture indicator after load',
          isSelected: false,
          tooltip:
            'Shows a small, animated hand icon at the bottom of the canvas hinting that the product is interactive.'
        }
      }
    },
    'mini-ui': {
      title: 'Mini UI',
      options: {
        fullscreen: {
          name: 'Fullscreen',
          isSelected: true
        },
        ar: {
          name: 'Augmented Reality',
          isSelected: false
        },
        snapshot: {
          name: 'Snapshot',
          isSelected: false
        },
        gestures: {
          name: 'Controls/Gestures',
          isSelected: false
        }
      }
    },
    accessibility: {
      title: 'Accessibility',
      options: {
        'aria-label': {
          name: 'Custom ARIA label for the canvas',
          isSelected: false
        },
        'aria-description': {
          name: 'Custom ARIA description for the canvas',
          isSelected: false
        },
        'live-region': {
          name: 'Announce to screen readers when the configuration changes',
          isSelected: false
        }
      }
    }
  }
  // {
  //   title: 'General UI',
  //   slug: 'general',
  //   options: [
  //     {
  //       name: 'Loading screen',
  //       slug: 'loading-screen',
  //       isSelected: true
  //     },
  //     {
  //       name: 'Side menu with config options',
  //       slug: 'config-menu',
  //       isSelected: false,
  //       tooltip: 'Generates a basic selection menu UI with your product’s configurable options.'
  //     },
  //     {
  //       name: 'Gesture indicator after load',
  //       slug: 'gesture-indicator',
  //       isSelected: false,
  //       tooltip:
  //         'Shows a small, animated hand icon at the bottom of the canvas hinting that the product is interactive.'
  //     },
  //     {
  //       name: 'Hotspots',
  //       slug: 'hotspots',
  //       isSelected: false
  //     }
  //   ]
  // },
  // {
  //   title: 'Mini UI',
  //   slug: 'mini-ui',
  //   options: [
  //     {
  //       name: 'Fullscreen',
  //       slug: 'fullscreen',
  //       isSelected: false
  //     },
  //     {
  //       name: 'Augmented reality',
  //       slug: 'ar',
  //       isSelected: false
  //     },
  //     {
  //       name: 'Snapshot',
  //       slug: 'snapshot',
  //       isSelected: false
  //     },
  //     {
  //       name: 'Controls/gestures',
  //       slug: 'controls',
  //       isSelected: false
  //     }
  //   ]
  // },
  // {
  //   title: 'Accessibility',
  //   slug: 'accessibility',
  //   options: [
  //     {
  //       name: 'Custom ARIA label for the canvas',
  //       slug: 'aria-label',
  //       isSelected: false
  //     },
  //     {
  //       name: 'Custom ARIA description for the canvas',
  //       slug: 'aria-description',
  //       isSelected: false
  //     },
  //     {
  //       name: 'Announce to screen readers when the configuration changes',
  //       slug: 'live-region',
  //       isSelected: false
  //     }
  //   ]
  // }
)

const activeUiComponentCategories = ref<string[]>([])
for (const category of Object.keys(uiComponentCategories.value) as Array<
  keyof typeof uiComponentCategories.value
>) {
  activeUiComponentCategories.value.push(uiComponentCategories.value[category].title)
}

const activeOutputTab = ref('html')

const showMiniUi = true
const showLoadingScreen = false

const htmlStructure = [
  '<div>',
  '    <p>Actual dynamic code snippet coming soon...</p>',
  showMiniUi && '    <div>Mini UI!</div>',
  showLoadingScreen && '    <div>Loading Screen</div>',
  '</div>'
]

const htmlStructure2 = `<div>
	<p>Awesome</p>${showMiniUi ? '	<div>Mini UI!</div>' : ''}${
    showLoadingScreen ? '	<div>Loading Screen</div>' : ''
  }
</div>`

const htmlSnippet = computed(() => {
  const parts: string[] = []

  htmlStructure.forEach((item) => {
    if (item) {
      parts.push(item as string)
    }
  })

  return parts.join('\n')
})

const finalHtmlSnippet = ref('')

onMounted(async () => {
  finalHtmlSnippet.value = await codeToHtml(htmlSnippet.value, {
    lang: 'html',
    theme: 'material-theme-palenight'
  })
})
</script>

<template>
  <div class="bg-muted overflow-x-auto p-8">
    <div class="max-w-5xl mx-auto space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Implementation</CardTitle>
          <CardDescription>
            Follow the steps below to create a basic, copy/pastable code snippet to implement this
            product on your own web pages.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ol>
            <li class="relative ml-4 pl-8 pt-1 pb-8 border-l">
              <span
                class="absolute -left-4 top-0 w-8 h-8 flex items-center justify-center bg-accent rounded-full text-sm font-bold"
              >
                1
              </span>
              <h4 class="mb-4 font-bold">Choose a default product selection</h4>
              <p class="text-sm text-muted-foreground">
                These will be the values that your product will be loaded with by default on your
                page.
              </p>
              <div class="py-4">
                <table>
                  <tbody>
                    <tr v-for="item in exampleMatrix" :key="item.property">
                      <td class="py-1 pr-4 text-sm font-mono whitespace-nowrap">
                        {{ item.property }}
                      </td>
                      <td class="py-1">
                        <Select v-model="item.selectedOption">
                          <SelectTrigger class="w-full min-w-64 font-mono">
                            <SelectValue placeholder="Select an option" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem
                                v-for="option in item.options"
                                :key="option"
                                :value="option"
                                class="font-mono"
                              >
                                {{ option }}
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </li>
            <li class="relative ml-4 pl-8 pt-1 pb-8 border-l">
              <span
                class="absolute -left-4 top-0 w-8 h-8 flex items-center justify-center bg-accent rounded-full text-sm font-bold"
              >
                2
              </span>
              <h4 class="mb-4 font-bold">Choose UI components and additions</h4>
              <p class="text-sm text-muted-foreground">
                Select any UI components you want included in the outputted code snippets below
                (optional).
              </p>
              <Accordion
                type="multiple"
                class="w-full"
                collapsible
                v-model="activeUiComponentCategories"
              >
                <AccordionItem
                  v-for="category in uiComponentCategories"
                  :key="category.title"
                  :value="category.title"
                >
                  <AccordionTrigger
                    class="text-xs uppercase text-muted-foreground font-bold hover:text-foreground"
                  >
                    {{ category.title }}
                  </AccordionTrigger>
                  <AccordionContent>
                    <TooltipProvider>
                      <ul class="space-y-2">
                        <li
                          v-for="option in category.options"
                          :key="option.name"
                          class="flex gap-1.5 flex-wrap"
                        >
                          <label class="inline-flex items-center gap-3 cursor-pointer select-none">
                            <Checkbox
                              v-model="option.isSelected"
                              class="size-5"
                              @update:model-value="
                                (newValue) =>
                                  console.log('logChange(option.name, newValue as boolean)')
                              "
                            />
                            {{ option.name }}
                          </label>
                          <!-- <Tooltip v-if="option.tooltip">
														<TooltipTrigger>
															<IconInfoCircle class="size-4 text-muted-foreground" />
														</TooltipTrigger>
														<TooltipContent class="max-w-64 text-sm">
															{{ option.tooltip }}
														</TooltipContent>
													</Tooltip> -->
                        </li>
                      </ul>
                    </TooltipProvider>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </li>
            <li class="relative ml-4 pl-8 pt-1 pb-8 border-l">
              <span
                class="absolute -left-4 top-0 w-8 h-8 flex items-center justify-center bg-accent rounded-full text-sm font-bold"
              >
                3
              </span>
              <h4 class="mb-4 font-bold">Basic preview</h4>
              <div class="py-4">Basic preview will go here...</div>
            </li>
            <li class="relative ml-4 pl-8 pt-1 pb-8 border-l border-transparent">
              <span
                class="absolute -left-4 top-0 w-8 h-8 flex items-center justify-center bg-accent rounded-full text-sm font-bold"
              >
                4
              </span>
              <h4 class="mb-4 font-bold">Copy the outputted code</h4>
              <p class="text-sm text-muted-foreground">
                Include the code below on your web page to embed your Dopple experience.
              </p>
              <div class="py-4">
                <Tabs v-model="activeOutputTab">
                  <TabsList>
                    <TabsTrigger value="html">HTML</TabsTrigger>
                    <TabsTrigger value="css">CSS</TabsTrigger>
                    <TabsTrigger value="js">JavaScript</TabsTrigger>
                  </TabsList>
                  <TabsContent value="html">
                    <div v-html="finalHtmlSnippet"></div>
                  </TabsContent>
                  <TabsContent value="css"> CSS </TabsContent>
                  <TabsContent value="js"> </TabsContent>
                </Tabs>
              </div>
            </li>
          </ol>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Example Code</CardTitle>
          <CardDescription>
            Call
            <a
              href="https://docs.dopple.io/docs/visual-api/configuration#updating-the-product-using-setvalue"
              target="_blank"
              class="link font-mono"
              >setValue(property, value)</a
            >
            on the product to update its configuration.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <!-- <Label>JavaScript:</Label> -->
          <!-- <div v-html="snippetHtmlRef"></div> -->
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<style scoped></style>
