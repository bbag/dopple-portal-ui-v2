<script setup lang="ts">
import { computed, ref, onMounted, watchEffect } from 'vue'
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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
import {
  arCss,
  arHtml,
  arJs,
  fullScreenCss,
  fullScreenHtml,
  fullScreenJs,
  gesturesHtml,
  gesturesCss,
  gesturesJs,
  miniUiCss,
  miniUiDialogCloseButtonsJs,
  miniUiDialogCss,
  miniUiEndHtml,
  miniUiGroupStartHtml,
  miniUiGroupEndHtml,
  miniUiStartHtml,
  snapshotCss,
  snapshotHtml,
  snapshotJs
} from '@/components/blocks/implementation-tab/snippets/mini-ui'

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

const defaultSelection = computed(() => {
  const selection: Record<string, string> = {}
  for (const item of exampleMatrix.value) {
    selection[item.property] = item.selectedOption
  }
  return selection
})

const activeUiComponentCategories = ref<string[]>(['general-settings', 'ui-addons', 'mini-ui'])
const isPreviewShown = ref(false)
const activeOutputTab = ref('html')
const shikiTheme = 'material-theme-palenight'

function highlightSyntax(val: string, lang: 'html' | 'css' | 'js') {
  return computedAsync(async () => {
    const html = await codeToHtml(val, {
      lang: lang || 'html',
      theme: shikiTheme
    })
    const codeStart = html.indexOf('<code')
    const codeTagEnd = html.indexOf('>', codeStart) + 1
    const codeEnd = html.lastIndexOf('</code>')

    return html.slice(codeTagEnd, codeEnd)
  }, '')
}

// --------------------------------------------------------------------------------------------- //
// General Settings                                                                              //
// --------------------------------------------------------------------------------------------- //

// Code section: Main (content that's always included)
const mainHtmlStartOutput = highlightSyntax(mainHtmlStart(), 'html')
const mainHtmlEndOutput = highlightSyntax(mainHtmlEnd(), 'html')

const mainJsStartOutput = highlightSyntax(mainJsStart(defaultSelection.value), 'html')
const mainJsLoadOutput = highlightSyntax(mainJsLoad(), 'js')
const mainJsEndOutput = highlightSyntax(mainJsEnd(), 'html')

const mainCssStartOutput = highlightSyntax(mainCssStart(), 'css')
const mainCssEndOutput = highlightSyntax(mainCssEnd(), 'css')

// Code section: Analytics
const isAnalyticsActive = ref(false)

// Code section: Auto-rotate on Initial Load
const isAutoRotateOnLoadActive = ref(false)

// Code section: Custom ARIA Attributes
const isAriaAttributesActive = ref(false)

// Code section: Custom Camera Control Behavior
const isCustomCameraControlBehaviorActive = ref(false)

// --------------------------------------------------------------------------------------------- //
// UI Add-ons                                                                                    //
// --------------------------------------------------------------------------------------------- //

// Code section: Loading Screen
const isLoadingScreenActive = ref(false)
const loadingScreenText = ref('Loading...')
const loadingScreenHtmlOutput = highlightSyntax(loadingScreenHtml(loadingScreenText.value), 'html')
const loadingScreenJsOutput = highlightSyntax(loadingScreenJs(), 'js')
const loadingScreenCssOutput = highlightSyntax(loadingScreenCss(), 'css')

// Code section: Config Menu
const isConfigMenuActive = ref(false)

// Code section: Hotspots
const isHotspotsActive = ref(false)

// Code section: Interactivity Indicator
const isInteractivityIndicatorActive = ref(false)

// --------------------------------------------------------------------------------------------- //
// Mini UI                                                                                       //
// --------------------------------------------------------------------------------------------- //

// Code section: Mini UI
const miniUiStartOutput = highlightSyntax(miniUiStartHtml, 'html')
const miniUiEndOutput = highlightSyntax(miniUiEndHtml, 'html')
const miniUiGroupLeftStartOutput = highlightSyntax(miniUiGroupStartHtml('left'), 'html')
const miniUiGroupRightStartOutput = highlightSyntax(miniUiGroupStartHtml('right'), 'html')
const miniUiGroupEndOutput = highlightSyntax(miniUiGroupEndHtml, 'html')
const miniUiCssOutput = highlightSyntax(miniUiCss, 'css')
const miniUiDialogCssOutput = highlightSyntax(miniUiDialogCss, 'css')

// Code section: Fullscreen
const isFullScreenActive = ref(false)
const fullScreenHtmlOutput = highlightSyntax(fullScreenHtml, 'html')
const fullScreenCssOutput = highlightSyntax(fullScreenCss, 'css')
const fullScreenJsOutput = highlightSyntax(fullScreenJs, 'js')

// Code section: Augmented Reality
const isArActive = ref(false)
const arHtmlOutput = highlightSyntax(arHtml, 'html')
const arCssOutput = highlightSyntax(arCss, 'css')
const arJsOutput = highlightSyntax(arJs, 'js')

// Code section: Snapshot
const isSnapshotActive = ref(false)
const snapshotHtmlOutput = highlightSyntax(snapshotHtml, 'html')
const snapshotCssOutput = highlightSyntax(snapshotCss, 'css')
const snapshotJsOutput = highlightSyntax(snapshotJs, 'js')

// Code section: Controls/Gestures
const isGesturesActive = ref(false)
const gesturesHtmlOutput = highlightSyntax(gesturesHtml, 'html')
const gesturesCssOutput = highlightSyntax(gesturesCss, 'css')
const gesturesJsOutput = highlightSyntax(gesturesJs, 'js')

// Code section: Auto-rotation
const isAutoRotationActive = ref(false)

// Code section: Share
const isShareActive = ref(false)

// Detect which components within the Mini UI are active
const isMiniUiLeftGroupActive = computed(() =>
  [
    isArActive.value,
    isAutoRotationActive.value,
    isGesturesActive.value,
    isShareActive.value,
    isSnapshotActive.value
  ].some((item) => item)
)
const isMiniUiRightGroupActive = computed(() => isFullScreenActive.value)
const isMiniUiDialogActive = computed(() =>
  [isArActive.value, isGesturesActive.value, isSnapshotActive.value, isShareActive.value].some(
    (item) => item
  )
)
const miniUiDialogCloseButtonsJsOutput = highlightSyntax(miniUiDialogCloseButtonsJs, 'js')

// --------------------------------------------------------------------------------------------- //
// Code snippet outputs                                                                          //
// --------------------------------------------------------------------------------------------- //

// HTML output
const html = ref('')
watchEffect(async () => {
  html.value = ''

  // Main wrapper div and dopple-container div
  html.value += mainHtmlStartOutput.value

  // Loading screen div
  html.value += isLoadingScreenActive.value ? loadingScreenHtmlOutput.value : ''

  // Mini UI (AR, Snapshot, Fullscreen, etc.)
  if (isMiniUiLeftGroupActive.value || isMiniUiRightGroupActive.value) {
    html.value += miniUiStartOutput.value

    if (isMiniUiLeftGroupActive.value) {
      html.value += miniUiGroupLeftStartOutput.value

      // Controls & Gestures
      html.value += isGesturesActive.value ? gesturesHtmlOutput.value : ''

      // Snapshot
      html.value += isSnapshotActive.value ? snapshotHtmlOutput.value : ''

      // Augmented Reality
      html.value += isArActive.value ? arHtmlOutput.value : ''

      html.value += miniUiGroupEndOutput.value
    }

    if (isMiniUiRightGroupActive.value) {
      html.value += miniUiGroupRightStartOutput.value

      // Full Screen
      html.value += isFullScreenActive.value ? fullScreenHtmlOutput.value : ''

      html.value += miniUiGroupEndOutput.value
    }

    html.value += miniUiEndOutput.value
  }

  // Closing div
  html.value += mainHtmlEndOutput.value
})

// CSS output
const css = ref('')
watchEffect(async () => {
  css.value = ''

  css.value += mainCssStartOutput.value

  // Loading screen styles
  css.value += isLoadingScreenActive.value ? loadingScreenCssOutput.value : ''

  // Mini UI general styles
  if (isMiniUiLeftGroupActive.value || isMiniUiRightGroupActive.value) {
    css.value += miniUiCssOutput.value
  }

  // Mini UI styles for components with dialogs (AR, Controls/Gestures, Snapshot, and Share)
  css.value += isMiniUiDialogActive.value ? miniUiDialogCssOutput.value : ''

  // Mini UI: Controls & Gestures
  css.value += isGesturesActive.value ? gesturesCssOutput.value : ''

  // Mini UI: Snapshot
  css.value += isSnapshotActive.value ? snapshotCssOutput.value : ''

  // Mini UI: Augmented Reality
  css.value += isArActive.value ? arCssOutput.value : ''

  // Mini UI: Full Screen
  css.value += isFullScreenActive.value ? fullScreenCssOutput.value : ''

  css.value += mainCssEndOutput.value
})

// JS output
const js = ref('')
watchEffect(async () => {
  js.value = ''

  // Import SDK and initialize new `dopple` instance
  js.value += mainJsStartOutput.value

  // Loading Screen
  js.value += isLoadingScreenActive.value ? loadingScreenJsOutput.value : ''

  // .load() and removing the `data-dopple-loading` attribute
  js.value += mainJsLoadOutput.value

  // Controls & Gestures
  js.value += isGesturesActive.value ? gesturesJsOutput.value : ''

  // Snapshot
  js.value += isSnapshotActive.value ? snapshotJsOutput.value : ''

  // Augmented Reality
  js.value += isArActive.value ? arJsOutput.value : ''

  // Full Screen
  js.value += isFullScreenActive.value ? fullScreenJsOutput.value : ''

  // Close button click listeners for Mini UI components with dialogs (AR, Controls/Gestures, Snapshot, and Share)
  js.value += isMiniUiDialogActive.value ? miniUiDialogCloseButtonsJsOutput.value : ''

  js.value += mainJsEndOutput.value
})

const shikiTokens = ref({
  bg: '#292D3E',
  fg: '#BABED8',
  themeName: shikiTheme
})

onMounted(async () => {
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
                          <template #tooltip>
                            Connect interaction and configuration events to your Google Analytics
                            account.
                          </template>
                          <template #settings>
                            <p>Settings for the logNamespace and sessionId will go here.</p>
                          </template>
                        </ImplementationItem>
                        <ImplementationItem
                          title="Auto-rotate on Initial Load"
                          v-model="isAutoRotateOnLoadActive"
                        >
                          <template #tooltip>
                            Enable auto-rotation of the camera when the product first loads, and
                            stop auto-rotating once the user interacts with the 3D scene.
                          </template>
                          <template #settings>
                            <p>Settings stuff will go here</p>
                          </template>
                        </ImplementationItem>
                        <ImplementationItem
                          title="Custom ARIA Attributes"
                          v-model="isAriaAttributesActive"
                        >
                          <template #tooltip>
                            Set a custom ARIA label and description for your 3D product to be
                            accessible to screen readers.
                          </template>
                          <template #settings>
                            <p>Settings stuff will go here</p>
                          </template>
                        </ImplementationItem>
                        <ImplementationItem
                          title="Custom Camera Control Behavior"
                          v-model="isCustomCameraControlBehaviorActive"
                        >
                          <template #tooltip>
                            Enable or disable rotating, panning, and/or zooming of the camera.
                          </template>
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
                          <template #tooltip>
                            Generates a basic selection menu UI with your product’s configurable
                            options.
                          </template>
                          <template #settings>
                            <p>Settings stuff will go here</p>
                          </template>
                        </ImplementationItem>
                        <ImplementationItem title="Hotspots" v-model="isHotspotsActive">
                          <template #tooltip>
                            Adds a hotspot container element (and placeholder content for any
                            hotspots on your product) to the Dopple container.
                          </template>
                          <template #settings>
                            <p>Settings stuff will go here</p>
                          </template>
                        </ImplementationItem>
                        <ImplementationItem
                          title="Interactivity Indicator"
                          v-model="isInteractivityIndicatorActive"
                        >
                          <template #tooltip>
                            Shows a small, animated hand icon at the bottom of the canvas hinting
                            that the product is interactive.
                          </template>
                          <template #settings>
                            <p>Settings stuff will go here</p>
                          </template>
                        </ImplementationItem>
                        <ImplementationItem title="Loading Screen" v-model="isLoadingScreenActive">
                          <template #tooltip>
                            Displays a basic loading screen along with a progress bar as the product
                            loads in.
                          </template>
                          <template #settings>
                            <div class="space-y-1">
                              <Label>Loading text:</Label>
                              <Input
                                type="text"
                                v-model="loadingScreenText"
                                placeholder="Loading..."
                              />
                            </div>
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
                          <template #tooltip>
                            Adds an icon button for launching AR if on mobile, or showing a QR code
                            dialog if not.
                          </template>
                          <template #settings>
                            <p>Settings stuff will go here</p>
                          </template>
                        </ImplementationItem>
                        <ImplementationItem title="Auto-rotation" v-model="isAutoRotationActive">
                          <template #tooltip>
                            Adds an icon button to toggle auto-rotation of the product on or off.
                          </template>
                          <template #settings>
                            <p>Settings stuff will go here</p>
                          </template>
                        </ImplementationItem>
                        <ImplementationItem title="Fullscreen Mode" v-model="isFullScreenActive">
                          <template #tooltip>
                            Adds an icon button for entering into full screen mode.
                          </template>
                          <template #settings>
                            <p>Settings stuff will go here</p>
                          </template>
                        </ImplementationItem>
                        <ImplementationItem title="Controls/Gestures" v-model="isGesturesActive">
                          <template #tooltip>
                            Adds an icon button for showing a dialog with info on how to control and
                            interact with the 3D scene.
                          </template>
                          <template #settings>
                            <p>Settings stuff will go here</p>
                          </template>
                        </ImplementationItem>
                        <ImplementationItem title="Shareable URL" v-model="isShareActive">
                          <template #tooltip>
                            Adds an icon button for showing a dialog with a shareable URL for the
                            product’s current configuration.
                          </template>
                          <template #settings>
                            <p>Settings stuff will go here</p>
                          </template>
                        </ImplementationItem>
                        <ImplementationItem title="Snapshot" v-model="isSnapshotActive">
                          <template #tooltip>
                            Adds an icon button for showing a dialog to capture snapshots of the
                            current canvas.
                          </template>
                          <template #settings>
                            <p>Settings stuff will go here</p>
                          </template>
                        </ImplementationItem>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TooltipProvider>
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
                    <pre
                      class="overflow-x-auto"
                      :class="['shiki', shikiTokens.themeName]"
                      :style="{ backgroundColor: shikiTokens.bg, color: shikiTokens.fg }"
                      tabindex="0"
                    ><code v-html="html"></code></pre>
                  </TabsContent>
                  <TabsContent value="css">
                    <pre
                      class="overflow-x-auto"
                      :class="['shiki', shikiTokens.themeName]"
                      :style="{ backgroundColor: shikiTokens.bg, color: shikiTokens.fg }"
                      tabindex="0"
                    ><code v-html="css"></code></pre>
                  </TabsContent>
                  <TabsContent value="js">
                    <pre
                      class="overflow-x-auto"
                      :class="['shiki', shikiTokens.themeName]"
                      :style="{ backgroundColor: shikiTokens.bg, color: shikiTokens.fg }"
                      tabindex="0"
                    ><code v-html="js"></code></pre>
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
