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
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  // DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
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

import { IconEye } from '@tabler/icons-vue'

import {
  configurationMenuCss,
  configurationMenuHtml,
  configurationMenuJs
} from '@/components/blocks/implementation-tab/snippets/config-menu-snippets'
import {
  mainCssStart,
  mainCssEnd,
  mainHtmlEnd,
  mainHtmlStart,
  mainJsDoppleWrapper,
  mainJsEnd,
  mainJsDoppleLoad,
  mainJsDoppleRun,
  mainJsRemoveLoadingAttribute,
  mainJsNewDoppleInstance,
  mainJsStart,
  mainJsWindowDopple,
  minimalCss,
  minimalHtml
} from '@/components/blocks/implementation-tab/snippets/general-snippets'
import {
  hotspotsCss,
  hotspotsHtml,
  hotspotsJs
} from '@/components/blocks/implementation-tab/snippets/hotspots-snippets'
import {
  loadingScreenCss,
  loadingScreenHtml,
  loadingScreenJs
} from '@/components/blocks/implementation-tab/snippets/loading-screen-snippets'
import {
  arCss,
  arHtml,
  arJs,
  autoRotateCss,
  autoRotateHtml,
  autoRotateJs,
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
  shareCss,
  shareHtml,
  shareJs,
  snapshotCss,
  snapshotHtml,
  snapshotJs
} from '@/components/blocks/implementation-tab/snippets/mini-ui-snippets'

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

const exampleHotspots = ref({
  'luggage-body': {},
  'toiletry-bag': {},
  charger: {}
})

const defaultSelection = computed(() => {
  const selection: Record<string, string> = {}
  for (const item of exampleMatrix.value) {
    selection[item.property] = item.selectedOption
  }
  return selection
})

const activeUiComponentCategories = ref<string[]>(['general-settings', 'ui-addons', 'mini-ui'])
const activeOutputTab = ref('html')
const shikiTheme = 'material-theme-palenight'

function highlightSyntax(val: () => string, lang: 'html' | 'css' | 'js') {
  return computedAsync(async () => {
    const html = await codeToHtml(val(), {
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

const minimalHtmlOutput = highlightSyntax(() => minimalHtml, 'html')
const minimalCssOutput = highlightSyntax(() => minimalCss, 'css')

// Code section: Main (content that's always included)
const mainHtmlStartOutput = highlightSyntax(() => mainHtmlStart, 'html')
const mainHtmlEndOutput = highlightSyntax(() => mainHtmlEnd, 'html')

const mainJsStartOutput = highlightSyntax(() => mainJsStart, 'html')
const mainJsDoppleLoadOutput = highlightSyntax(() => mainJsDoppleLoad, 'js')
const mainJsRemoveLoadingAttributeOutput = highlightSyntax(() => mainJsRemoveLoadingAttribute, 'js')
const mainJsDoppleRunOutput = highlightSyntax(() => mainJsDoppleRun, 'js')

const mainJsDoppleWrapperOutput = highlightSyntax(() => mainJsDoppleWrapper, 'js')
const mainJsNewDoppleInstanceOutput = highlightSyntax(
  () => mainJsNewDoppleInstance(defaultSelection.value),
  'js'
)

const mainJsEndOutput = highlightSyntax(() => mainJsEnd, 'html')

const mainCssStartOutput = highlightSyntax(() => mainCssStart, 'css')
const mainCssEndOutput = highlightSyntax(() => mainCssEnd, 'css')

// Code section: Add Dopple Instance to Window
const isAddToWindowActive = ref(false)
const mainJsWindowDoppleOutput = highlightSyntax(() => mainJsWindowDopple, 'js')

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
const loadingScreenHtmlOutput = highlightSyntax(
  () => loadingScreenHtml(loadingScreenText.value),
  'html'
)
const loadingScreenJsOutput = highlightSyntax(() => loadingScreenJs, 'js')
const loadingScreenCssOutput = highlightSyntax(() => loadingScreenCss, 'css')

// Code section: Config Menu
const isConfigMenuActive = ref(false)
const configMenuType = ref<'dropdowns' | 'radios'>('dropdowns')
const configMenuHtmlOutput = highlightSyntax(
  () => configurationMenuHtml(exampleMatrix.value, configMenuType.value),
  'html'
)
const configMenuJsOutput = highlightSyntax(() => configurationMenuJs(configMenuType.value), 'js')
const configMenuCssOutput = highlightSyntax(() => configurationMenuCss(configMenuType.value), 'js')

// Code section: Hotspots
const isHotspotsActive = ref(false)
const hotspotsType = ref<'minimal' | 'stylized'>('minimal')
const hotspotsHtmlOutput = highlightSyntax(
  () => hotspotsHtml(exampleHotspots.value, hotspotsType.value),
  'html'
)
const hotspotsJsOutput = highlightSyntax(() => hotspotsJs, 'js')
const hotspotsCssOutput = highlightSyntax(() => hotspotsCss(hotspotsType.value), 'css')

// Code section: Interactivity Indicator
const isInteractivityIndicatorActive = ref(false)

// --------------------------------------------------------------------------------------------- //
// Mini UI                                                                                       //
// --------------------------------------------------------------------------------------------- //

// Code section: Mini UI
const miniUiStartOutput = highlightSyntax(() => miniUiStartHtml, 'html')
const miniUiEndOutput = highlightSyntax(() => miniUiEndHtml, 'html')
const miniUiGroupLeftStartOutput = highlightSyntax(() => miniUiGroupStartHtml('left'), 'html')
const miniUiGroupRightStartOutput = highlightSyntax(() => miniUiGroupStartHtml('right'), 'html')
const miniUiGroupEndOutput = highlightSyntax(() => miniUiGroupEndHtml, 'html')
const miniUiCssOutput = highlightSyntax(() => miniUiCss, 'css')
const miniUiDialogCssOutput = highlightSyntax(() => miniUiDialogCss, 'css')

// Code section: Fullscreen
const isFullScreenActive = ref(false)
const fullScreenHtmlOutput = highlightSyntax(() => fullScreenHtml, 'html')
const fullScreenCssOutput = highlightSyntax(() => fullScreenCss, 'css')
const fullScreenJsOutput = highlightSyntax(() => fullScreenJs, 'js')

// Code section: Augmented Reality
const isArActive = ref(false)
const arHtmlOutput = highlightSyntax(() => arHtml, 'html')
const arCssOutput = highlightSyntax(() => arCss, 'css')
const arJsOutput = highlightSyntax(() => arJs, 'js')

// Code section: Snapshot
const isSnapshotActive = ref(false)
const snapshotHtmlOutput = highlightSyntax(() => snapshotHtml, 'html')
const snapshotCssOutput = highlightSyntax(() => snapshotCss, 'css')
const snapshotJsOutput = highlightSyntax(() => snapshotJs, 'js')

// Code section: Controls/Gestures
const isGesturesActive = ref(false)
const gesturesHtmlOutput = highlightSyntax(() => gesturesHtml, 'html')
const gesturesCssOutput = highlightSyntax(() => gesturesCss, 'css')
const gesturesJsOutput = highlightSyntax(() => gesturesJs, 'js')

// Code section: Auto-rotation
const isAutoRotationActive = ref(false)
const autoRotateHtmlOutput = highlightSyntax(() => autoRotateHtml, 'html')
const autoRotateCssOutput = highlightSyntax(() => autoRotateCss, 'css')
const autoRotateJsOutput = highlightSyntax(() => autoRotateJs, 'js')

// Code section: Share
const isShareActive = ref(false)
const shareHtmlOutput = highlightSyntax(() => shareHtml, 'html')
const shareCssOutput = highlightSyntax(() => shareCss, 'css')
const shareJsOutput = highlightSyntax(() => shareJs, 'js')

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
const miniUiDialogCloseButtonsJsOutput = highlightSyntax(() => miniUiDialogCloseButtonsJs, 'js')

/** Returns true if the resulting HTML markup for the selected options is minimal (i.e. no elements besides the required container div) */
const isMinimalMarkup = computed(() => {
  return !(
    isConfigMenuActive.value ||
    isHotspotsActive.value ||
    isInteractivityIndicatorActive.value ||
    isLoadingScreenActive.value ||
    isMiniUiLeftGroupActive.value ||
    isMiniUiRightGroupActive.value
  )
})

// --------------------------------------------------------------------------------------------- //
// Code snippet outputs                                                                          //
// --------------------------------------------------------------------------------------------- //

// HTML output
const html = ref('')
watchEffect(async () => {
  html.value = ''

  if (isMinimalMarkup.value) {
    html.value += minimalHtmlOutput.value
    return
  }

  // Main wrapper div and dopple-container div
  html.value += mainHtmlStartOutput.value

  // Loading screen
  html.value += isLoadingScreenActive.value ? loadingScreenHtmlOutput.value : ''

  // Hotspots
  html.value += isHotspotsActive.value ? hotspotsHtmlOutput.value : ''

  // Mini UI (AR, Snapshot, Fullscreen, etc.)
  if (isMiniUiLeftGroupActive.value || isMiniUiRightGroupActive.value) {
    html.value += miniUiStartOutput.value

    if (isMiniUiLeftGroupActive.value) {
      html.value += miniUiGroupLeftStartOutput.value

      // Share
      html.value += isShareActive.value ? shareHtmlOutput.value : ''

      // Controls & Gestures
      html.value += isGesturesActive.value ? gesturesHtmlOutput.value : ''

      // Auto-rotation
      html.value += isAutoRotationActive.value ? autoRotateHtmlOutput.value : ''

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

  if (isConfigMenuActive.value) {
    html.value += configMenuHtmlOutput.value
  }
})

// CSS output
const css = ref('')
watchEffect(async () => {
  css.value = ''

  if (isMinimalMarkup.value) {
    css.value += minimalCssOutput.value
    return
  }

  css.value += mainCssStartOutput.value

  // Config menu styles
  css.value += isConfigMenuActive.value ? configMenuCssOutput.value : ''

  // Loading screen styles
  css.value += isLoadingScreenActive.value ? loadingScreenCssOutput.value : ''

  // Hotspot styles
  css.value += isHotspotsActive.value ? hotspotsCssOutput.value : ''

  // Mini UI general styles
  if (isMiniUiLeftGroupActive.value || isMiniUiRightGroupActive.value) {
    css.value += miniUiCssOutput.value
  }

  // Mini UI styles for components with dialogs (AR, Controls/Gestures, Snapshot, and Share)
  css.value += isMiniUiDialogActive.value ? miniUiDialogCssOutput.value : ''

  // Mini UI: Share
  css.value += isShareActive.value ? shareCssOutput.value : ''

  // Mini UI: Controls & Gestures
  css.value += isGesturesActive.value ? gesturesCssOutput.value : ''

  // Mini UI: Auto-rotation
  css.value += isAutoRotationActive.value ? autoRotateCssOutput.value : ''

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

  // Open script tag and import SDK
  js.value += mainJsStartOutput.value

  // Define the doppleWrapper div
  if (!isMinimalMarkup.value) {
    js.value += mainJsDoppleWrapperOutput.value
  }

  // Initialize a new Dopple product instance
  js.value += mainJsNewDoppleInstanceOutput.value

  // Loading Screen
  js.value += isLoadingScreenActive.value ? loadingScreenJsOutput.value : ''

  // Call dopple.load()
  js.value += mainJsDoppleLoadOutput.value

  // Remove loading attribute on wrapper element if it exists
  if (!isMinimalMarkup.value) {
    js.value += mainJsRemoveLoadingAttributeOutput.value
  }

  if (isAddToWindowActive.value) {
    js.value += mainJsWindowDoppleOutput.value
  }

  // Call dopple.run()
  js.value += mainJsDoppleRunOutput.value

  // Mini UI: Hotspots
  js.value += isHotspotsActive.value ? hotspotsJsOutput.value : ''

  // Mini UI: Share
  js.value += isShareActive.value ? shareJsOutput.value : ''

  // Mini UI: Controls & Gestures
  js.value += isGesturesActive.value ? gesturesJsOutput.value : ''

  // Mini UI: Auto-rotation
  js.value += isAutoRotationActive.value ? autoRotateJsOutput.value : ''

  // Mini UI: Snapshot
  js.value += isSnapshotActive.value ? snapshotJsOutput.value : ''

  // Mini UI: Augmented Reality
  js.value += isArActive.value ? arJsOutput.value : ''

  // Mini UI: Full Screen
  js.value += isFullScreenActive.value ? fullScreenJsOutput.value : ''

  // Close button click listeners for Mini UI components with dialogs (AR, Controls/Gestures, Snapshot, and Share)
  js.value += isMiniUiDialogActive.value ? miniUiDialogCloseButtonsJsOutput.value : ''

  // Configuration Menu
  js.value += isConfigMenuActive.value ? configMenuJsOutput.value : ''

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
                  <!-- General Settings -->
                  <AccordionItem value="general-settings">
                    <AccordionTrigger
                      class="text-xs uppercase text-muted-foreground font-bold hover:text-foreground"
                    >
                      General Settings
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul class="space-y-2">
                        <ImplementationItem
                          title="Add Dopple Instance to Window"
                          v-model="isAddToWindowActive"
                        >
                          <template #tooltip>
                            Adds the <code>dopple</code> product instance to the page’s
                            <code>window</code> for easier access in the browser console (useful for
                            debugging).
                          </template>
                        </ImplementationItem>
                        <ImplementationItem title="Analytics" v-model="isAnalyticsActive">
                          <template #tooltip>
                            Connect interaction and configuration events to your Google Analytics
                            account.
                          </template>
                          <template #settings>
                            <p>
                              TODO: code snippet not yet implemented (will have settings for the
                              logNamespace and sessionId here).
                            </p>
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
                            <p>
                              TODO: code snippet not yet implemented (will have settings for
                              auto-rotation speed and direction).
                            </p>
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
                            <p>TODO: code snippet not yet implemented.</p>
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
                            <p>
                              TODO: code snippet not yet implemented (will have settings for which
                              camera control actions are enabled/disabled).
                            </p>
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
                            <p>Menu Type:</p>
                            <Select v-model="configMenuType">
                              <SelectTrigger class="w-48">
                                <SelectValue placeholder="Select..." />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="dropdowns">Dropdowns</SelectItem>
                                <SelectItem value="radios">Radio Buttons</SelectItem>
                              </SelectContent>
                            </Select>
                          </template>
                        </ImplementationItem>
                        <ImplementationItem title="Hotspots" v-model="isHotspotsActive">
                          <template #tooltip>
                            Adds a hotspot container element (and placeholder content for any
                            hotspots on your product) to the Dopple container.
                          </template>
                          <template #settings>
                            <p>Hotspot Style:</p>
                            <Select v-model="hotspotsType">
                              <SelectTrigger class="w-48">
                                <SelectValue placeholder="Select..." />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="minimal">Minimal</SelectItem>
                                <SelectItem value="stylized">Stylized</SelectItem>
                              </SelectContent>
                            </Select>
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
                            <p>
                              TODO: code snippet not yet implemented (will have callout to save the
                              image yourself, since Dopple isn't responsible for hosting it for
                              you).
                            </p>
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
                            <p>TODO: will have settings for setting the base URL to use for AR.</p>
                          </template>
                        </ImplementationItem>
                        <ImplementationItem title="Auto-rotation" v-model="isAutoRotationActive">
                          <template #tooltip>
                            Adds an icon button to toggle auto-rotation of the product on or off.
                          </template>
                          <template #settings>
                            <p>TODO: will have settings for auto-rotation speed and direction</p>
                          </template>
                        </ImplementationItem>
                        <ImplementationItem title="Fullscreen Mode" v-model="isFullScreenActive">
                          <template #tooltip>
                            Adds an icon button for entering into full screen mode.
                          </template>
                        </ImplementationItem>
                        <ImplementationItem title="Controls/Gestures" v-model="isGesturesActive">
                          <template #tooltip>
                            Adds an icon button for showing a dialog with info on how to control and
                            interact with the 3D scene.
                          </template>
                          <template #settings>
                            <p>
                              TODO: will have a .ZIP download link for the icon images + callout for
                              hosting the images yourself, since Dopple isn't responsible for
                              hosting them.
                            </p>
                          </template>
                        </ImplementationItem>
                        <ImplementationItem title="Shareable URL" v-model="isShareActive">
                          <template #tooltip>
                            Adds an icon button for showing a dialog with a shareable URL for the
                            product’s current configuration.
                          </template>
                          <template #settings>
                            <p>TODO: will have settings for setting the base URL.</p>
                          </template>
                        </ImplementationItem>
                        <ImplementationItem title="Snapshot" v-model="isSnapshotActive">
                          <template #tooltip>
                            Adds an icon button for showing a dialog to capture snapshots of the
                            current canvas.
                          </template>
                          <template #settings>
                            <p>
                              TODO: will have settings for entering a custom default filename for
                              the downloaded image and default width/height.
                            </p>
                          </template>
                        </ImplementationItem>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TooltipProvider>
            </li>
            <!-- <li class="relative ml-4 pl-8 pt-1 pb-8 border-l">
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
            </li> -->
            <li class="relative ml-4 pl-8 pt-1 pb-8 border-l border-transparent">
              <span
                class="absolute -left-4 top-0 w-8 h-8 flex items-center justify-center bg-accent rounded-full text-sm font-bold"
              >
                3
              </span>
              <h4 class="mb-4 font-bold">Copy the outputted code</h4>
              <p class="text-sm text-muted-foreground">
                Include the code below on your web page to embed your Dopple experience.
              </p>
              <div class="py-4">
                <Tabs v-model="activeOutputTab">
                  <div class="flex justify-between flex-wrap gap-2">
                    <TabsList>
                      <TabsTrigger value="html">HTML</TabsTrigger>
                      <TabsTrigger value="css">CSS</TabsTrigger>
                      <TabsTrigger value="js">JavaScript</TabsTrigger>
                    </TabsList>
                    <Dialog>
                      <DialogTrigger as-child>
                        <Button variant="blue">
                          <IconEye class="size-5 mr-2" />
                          Preview
                        </Button>
                      </DialogTrigger>
                      <DialogContent class="max-w-3xl">
                        <DialogHeader>
                          <DialogTitle>Preview Snippet</DialogTitle>
                          <DialogDescription>
                            This is just a rough preview of the UI selected above.
                          </DialogDescription>
                        </DialogHeader>
                        <FullExample />
                      </DialogContent>
                    </Dialog>
                  </div>
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
