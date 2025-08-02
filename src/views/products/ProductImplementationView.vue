<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import { computedAsync } from '@vueuse/core'
import { codeToHtml, codeToTokens } from 'shiki'

import ImplementationItem from '@/components/blocks/implementation-tab/ImplementationItem.vue'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  // SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TooltipProvider } from '@/components/ui/tooltip'

import {
  loadingScreenCss,
  loadingScreenHtml,
  loadingScreenJs,
  mainCssStart,
  mainCssEnd,
  mainHtmlEnd,
  mainHtmlStart,
  mainJsLoad,
  mainJsEnd,
  mainJsStart
} from '@/components/blocks/implementation-tab/implementation-code'

import FullExample from '@/components/blocks/full-luggage-example/FullExample.vue'

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
    selectedOption: 'calypso'
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

// type UiComponentOption = {
//   name: string
//   slug: string
//   isSelected: boolean
//   tooltip?: string
// }

// type UiComponentCategory = {
//   title: string
//   slug: string
//   options: UiComponentOption[]
// }

// const uiComponentCategories = ref({
//   'general-ui': {
//     title: 'General UI',
//     options: {
//       'loading-screen': {
//         name: 'Loading screen',
//         isSelected: false,
//         settings: h('h1', { class: ['class1', 'class2'] }, [
//           'Heading',
//           h('span', {}, '-1'),
//           h('span', { ':style': "{ backgroundColor: 'red' }" }, '-new')
//         ])
//       },
//       'config-menu': {
//         name: 'Side menu with config options',
//         isSelected: false,
//         tooltip: 'Generates a basic selection menu UI with your product’s configurable options.',
//         settings: h('h1', {}, ['Hello', h('span', {}, 'World')])
//       },
//       'gesture-indicator': {
//         name: 'Gesture indicator after load',
//         isSelected: false,
//         tooltip:
//           'Shows a small, animated hand icon at the bottom of the canvas hinting that the product is interactive.'
//       },
//       hotspots: {
//         name: 'Hotspots',
//         isSelected: false,
//         tooltip:
//           'Adds a hotspot container element (and placeholder content for any hotspots on your product) to the Dopple container.'
//       },
//       darkmode: {
//         name: 'Dark mode support',
//         isSelected: false,
//         tooltip: 'Adds the (prefers-color-scheme: dark) media query with color tokens to the CSS.'
//       }
//     }
//   },
//   'mini-ui': {
//     title: 'Mini UI',
//     options: {
//       fullscreen: {
//         name: 'Fullscreen',
//         isSelected: false,
//         tooltip: 'Adds an icon button for entering into full screen mode.'
//       },
//       ar: {
//         name: 'Augmented Reality',
//         isSelected: false,
//         tooltip:
//           'Adds an icon button for launching AR if on mobile, or showing a QR code dialog if not.'
//       },
//       snapshot: {
//         name: 'Snapshot',
//         isSelected: false,
//         tooltip:
//           'Adds an icon button for showing a dialog to capture snapshots of the current canvas.'
//       },
//       gestures: {
//         name: 'Controls/Gestures',
//         isSelected: false,
//         tooltip:
//           'Adds an icon button for showing a dialog with info on how to control and interact with the 3D scene.'
//       },
//       autorotation: {
//         name: 'Auto-rotation',
//         isSelected: false,
//         tooltip: 'Adds an icon button to toggle auto-rotation of the product on or off.'
//       },
//       share: {
//         name: 'Social Share',
//         isSelected: false,
//         tooltip:
//           'Adds an icon button for showing a dialog with a shareable URL for the product’s current configuration.'
//       }
//     }
//   },
//   accessibility: {
//     title: 'Accessibility',
//     options: {
//       'keyboard-camera-controls': {
//         name: 'Keyboard camera control buttons',
//         isSelected: false,
//         tooltip:
//           'Displays a small UI for controlling the camera using the keyboard when the canvas is focused.'
//       },
//       'aria-label': {
//         name: 'Custom ARIA label for the canvas',
//         isSelected: false
//       },
//       'aria-description': {
//         name: 'Custom ARIA description for the canvas',
//         isSelected: false
//       },
//       'live-region': {
//         name: 'Announce to screen readers when the configuration changes',
//         isSelected: false
//       }
//     }
//   },
//   analytics: {
//     title: 'Analytics',
//     options: {
//       'enable-analytics': {
//         name: 'Enable analytics',
//         isSelected: false
//       }
//     }
//   }
// })

const activeUiComponentCategories = ref<string[]>(['general-settings', 'ui-addons', 'mini-ui'])
// for (const category of Object.keys(uiComponentCategories.value) as Array<
//   keyof typeof uiComponentCategories.value
// >) {
//   activeUiComponentCategories.value.push(uiComponentCategories.value[category].title)
// }

const isPreviewShown = ref(false)
const activeOutputTab = ref('html')
const shikiTheme = 'material-theme-palenight'

async function htmlOutput(input: string, lang: 'html' | 'css' | 'js') {
  const html = await codeToHtml(input, {
    lang: lang || 'html',
    theme: shikiTheme
  })
  const codeStart = html.indexOf('<code')
  const codeTagEnd = html.indexOf('>', codeStart) + 1
  const codeEnd = html.lastIndexOf('</code>')

  return html.slice(codeTagEnd, codeEnd)
}

// --------------------------------------------------------------------------------------------- //
// General Settings                                                                              //
// --------------------------------------------------------------------------------------------- //

// Code section: Main (content that's always included)
const mainHtmlStartOutput = computedAsync(async () => await htmlOutput(mainHtmlStart(), 'html'), '')
const mainHtmlEndOutput = computedAsync(async () => await htmlOutput(mainHtmlEnd(), 'html'), '')

const mainJsStartOutput = computedAsync(
  async () => await htmlOutput(mainJsStart({ prop1: 'option1', prop2: 'option2' }), 'html'),
  ''
)
const mainJsLoadOutput = computedAsync(async () => await htmlOutput(mainJsLoad(), 'js'), '')
const mainJsEndOutput = computedAsync(async () => await htmlOutput(mainJsEnd(), 'html'), '')

const mainCssStartOutput = computedAsync(async () => await htmlOutput(mainCssStart(), 'css'), '')
const mainCssEndOutput = computedAsync(async () => await htmlOutput(mainCssEnd(), 'css'), '')

// Code section: Analytics
const isAnalyticsActive = ref(false)

// Code section: Custom ARIA Label
const isAriaLabelActive = ref(false)

// Code section: Custom ARIA Description
const isAriaDescriptionActive = ref(false)

// --------------------------------------------------------------------------------------------- //
// UI Add-ons                                                                                    //
// --------------------------------------------------------------------------------------------- //

// Code section: Loading Screen
const isLoadingScreenActive = ref(false)
const loadingScreenHtmlOutput = computedAsync(
  async () => await htmlOutput(loadingScreenHtml(), 'html'),
  ''
)
const loadingScreenJsOutput = computedAsync(
  async () => await htmlOutput(loadingScreenJs(), 'js'),
  ''
)
const loadingScreenCssOutput = computedAsync(
  async () => await htmlOutput(loadingScreenCss(), 'css'),
  ''
)

// Code section: Config Menu
const isConfigMenuActive = ref(false)

// Code section: Hotspots
const isHotspotsActive = ref(false)

// Code section: Interactivity Indicator
const isInteractivityIndicatorActive = ref(false)

// --------------------------------------------------------------------------------------------- //
// Mini UI                                                                                       //
// --------------------------------------------------------------------------------------------- //

// Code section: Fullscreen
const isFullScreenActive = ref(false)

// Code section: Augmented Reality
const isArActive = ref(false)

// Code section: Snapshot
const isSnapshotActive = ref(false)

// Code section: Controls/Gestures
const isGesturesActive = ref(false)

// Code section: Auto-rotation
const isAutoRotationActive = ref(false)

// Code section: Share
const isShareActive = ref(false)

// --------------------------------------------------------------------------------------------- //
// Code snippet outputs                                                                          //
// --------------------------------------------------------------------------------------------- //

// HTML output
const htmlSnippet = ref('')
watchEffect(async () => {
  htmlSnippet.value = ''

  htmlSnippet.value += mainHtmlStartOutput.value

  if (isLoadingScreenActive.value) {
    htmlSnippet.value += loadingScreenHtmlOutput.value
  }

  htmlSnippet.value += mainHtmlEndOutput.value
})

// JS output
const jsSnippet = ref('')
watchEffect(async () => {
  jsSnippet.value = ''

  jsSnippet.value += mainJsStartOutput.value

  if (isLoadingScreenActive.value) {
    jsSnippet.value += loadingScreenJsOutput.value
  }

  jsSnippet.value += mainJsLoadOutput.value

  jsSnippet.value += mainJsEndOutput.value
})

// JS output
const cssSnippet = ref('')
watchEffect(async () => {
  cssSnippet.value = ''

  cssSnippet.value += mainCssStartOutput.value

  if (isLoadingScreenActive.value) {
    cssSnippet.value += loadingScreenCssOutput.value
  }

  cssSnippet.value += mainCssEndOutput.value
})

const shikiTokens = ref({
  bg: '#292D3E',
  fg: '#BABED8',
  themeName: shikiTheme
})

onMounted(async () => {
  // console.log('- 1 ------------------------------')
  // console.log(
  //   await codeToHtml(mainHtmlStart(), {
  //     lang: 'html',
  //     theme: shikiTheme
  //   })
  // )
  // console.log('- 2 ------------------------------')
  const {
    bg = '#292D3E',
    fg = '#BABED8',
    themeName = shikiTheme
  } = await codeToTokens('', {
    lang: 'html',
    theme: shikiTheme
  })
  shikiTokens.value = {
    bg,
    fg,
    themeName
  }
  // htmlOutputRef.value = await codeToHtml(htmlSnippet.value, {
  //   lang: 'html',
  //   theme: 'material-theme-palenight'
  // })
  // async function getData() {
  //   console.log('getting data')
  //   const owner = 'dopple'
  //   const workspace = 'dev-docs'
  //   const name = 'luggage'
  //   const version = '1'
  //   const res = await fetch(
  //     `https://api.dopple.io/projects/owners/${owner}/workspaces/${workspace}/projects/${name}/versions/${version}/matrix`,
  //     {
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     }
  //   )
  //   console.log('res')
  //   console.log(res)
  //   const data = await res.json()
  //   console.log('data')
  //   console.log(data)
  // }
  // getData()
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
              <TooltipProvider>
                <Accordion
                  type="multiple"
                  class="w-full"
                  collapsible
                  v-model="activeUiComponentCategories"
                >
                  <!-- General UI -->
                  <AccordionItem value="general-settings">
                    <AccordionTrigger
                      class="text-xs uppercase text-muted-foreground font-bold hover:text-foreground"
                    >
                      General Settings
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul class="space-y-2">
                        <ImplementationItem title="Analytics" v-model="isAnalyticsActive">
                          <template #tooltip>Cool tooltip!</template>
                          <template #settings>
                            <p>Settings for the logNamespace and sessionId will go here.</p>
                          </template>
                        </ImplementationItem>
                        <ImplementationItem
                          title="Custom ARIA Description"
                          v-model="isAriaDescriptionActive"
                        >
                          <template #tooltip>Cool tooltip!</template>
                          <template #settings>
                            <p>Settings stuff will go here</p>
                          </template>
                        </ImplementationItem>
                        <ImplementationItem title="Custom ARIA Label" v-model="isAriaLabelActive">
                          <template #tooltip>Cool tooltip!</template>
                          <template #settings>
                            <p>Settings stuff will go here</p>
                          </template>
                        </ImplementationItem>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <!-- UI Add-ons -->
                  <AccordionItem value="ui-addons">
                    <AccordionTrigger
                      class="text-xs uppercase text-muted-foreground font-bold hover:text-foreground"
                    >
                      UI Add-ons
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul class="space-y-2">
                        <ImplementationItem title="Configuration Menu" v-model="isConfigMenuActive">
                          <template #tooltip>Cool tooltip!</template>
                          <template #settings>
                            <p>Settings stuff will go here</p>
                          </template>
                        </ImplementationItem>
                        <ImplementationItem title="Hotspots" v-model="isHotspotsActive">
                          <template #tooltip>Cool tooltip!</template>
                          <template #settings>
                            <p>Settings stuff will go here</p>
                          </template>
                        </ImplementationItem>
                        <ImplementationItem
                          title="Interactivity Indicator"
                          v-model="isInteractivityIndicatorActive"
                        >
                          <template #tooltip>Cool tooltip!</template>
                          <template #settings>
                            <p>Settings stuff will go here</p>
                          </template>
                        </ImplementationItem>
                        <ImplementationItem title="Loading screen" v-model="isLoadingScreenActive">
                          <template #tooltip>Cool tooltip!</template>
                          <template #settings>
                            <p>Settings stuff will go here</p>
                          </template>
                        </ImplementationItem>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <!-- Mini UI -->
                  <AccordionItem value="mini-ui">
                    <AccordionTrigger
                      class="text-xs uppercase text-muted-foreground font-bold hover:text-foreground"
                    >
                      Mini UI Buttons
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul class="space-y-2">
                        <ImplementationItem title="Augmented Reality" v-model="isArActive">
                          <template #tooltip>Cool tooltip!</template>
                          <template #settings>
                            <p>Settings stuff will go here</p>
                          </template>
                        </ImplementationItem>
                        <ImplementationItem title="Auto-rotation" v-model="isAutoRotationActive">
                          <template #tooltip>Cool tooltip!</template>
                          <template #settings>
                            <p>Settings stuff will go here</p>
                          </template>
                        </ImplementationItem>
                        <ImplementationItem title="Fullscreen Mode" v-model="isFullScreenActive">
                          <template #tooltip>Cool tooltip!</template>
                          <template #settings>
                            <p>Settings stuff will go here</p>
                          </template>
                        </ImplementationItem>
                        <ImplementationItem title="Controls/Gestures" v-model="isGesturesActive">
                          <template #tooltip>Cool tooltip!</template>
                          <template #settings>
                            <p>Settings stuff will go here</p>
                          </template>
                        </ImplementationItem>
                        <ImplementationItem title="Shareable URL" v-model="isShareActive">
                          <template #tooltip>Cool tooltip!</template>
                          <template #settings>
                            <p>Settings stuff will go here</p>
                          </template>
                        </ImplementationItem>
                        <ImplementationItem title="Snapshot" v-model="isSnapshotActive">
                          <template #tooltip>Cool tooltip!</template>
                          <template #settings>
                            <p>Settings stuff will go here</p>
                          </template>
                        </ImplementationItem>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TooltipProvider>
              <!-- <AccordionItem
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
												<ImplementationItem title="Loading screen" v-model="testCheckbox">
													<template #tooltip>Cool tooltip!</template>
													<template #settings>
														<p>Settings stuff will go here</p>
													</template>
												</ImplementationItem>

												<li v-for="option in category.options" :key="option.name">
													<span class="flex gap-1.5 flex-wrap">
														<label
															class="inline-flex items-center gap-3 cursor-pointer select-none"
														>
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
														<Tooltip v-if="option.tooltip">
															<TooltipTrigger>
																<IconInfoCircle class="size-4 text-muted-foreground" />
															</TooltipTrigger>
															<TooltipContent class="max-w-64 text-sm">
																{{ option.tooltip }}
															</TooltipContent>
														</Tooltip>
													</span>
													<div
														class="ml-8 mt-2 mb-4 p-4 border rounded-md"
														v-if="option.isSelected && option.settings"
													>
														<component :is="option.settings" />
													</div>
												</li>
											</ul>
										</TooltipProvider>
									</AccordionContent>
								</AccordionItem> -->
            </li>
            <li class="relative ml-4 pl-8 pt-1 pb-8 border-l">
              <span
                class="absolute -left-4 top-0 w-8 h-8 flex items-center justify-center bg-accent rounded-full text-sm font-bold"
              >
                3
              </span>
              <h4 class="mb-4 font-bold">Basic preview</h4>
              <div class="py-4">
                <button @click="isPreviewShown = !isPreviewShown">
                  {{ isPreviewShown ? 'Hide' : 'Show' }} Preview
                </button>
                <FullExample class="border" :style="isPreviewShown ? null : 'display: none'" />
              </div>
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
                    <div class="overflow-x-auto">
                      <pre
                        :class="['shiki', shikiTokens.themeName]"
                        :style="{ backgroundColor: shikiTokens.bg, color: shikiTokens.fg }"
                        tabindex="0"
                      ><code v-html="htmlSnippet"></code></pre>
                    </div>
                  </TabsContent>
                  <TabsContent value="css">
                    <div class="overflow-x-auto">
                      <pre
                        :class="['shiki', shikiTokens.themeName]"
                        :style="{ backgroundColor: shikiTokens.bg, color: shikiTokens.fg }"
                        tabindex="0"
                      ><code v-html="cssSnippet"></code></pre>
                    </div>
                  </TabsContent>
                  <TabsContent value="js">
                    <div class="overflow-x-auto">
                      <pre
                        :class="['shiki', shikiTokens.themeName]"
                        :style="{ backgroundColor: shikiTokens.bg, color: shikiTokens.fg }"
                        tabindex="0"
                      ><code v-html="jsSnippet"></code></pre>
                    </div>
                  </TabsContent>
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
