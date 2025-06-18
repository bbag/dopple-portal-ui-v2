<script setup lang="ts">
// HEADS UP: THIS TOOL IS A SUPER ROUGH PROOF-OF-CONCEPT
// Much of the implementation is either incomplete or not done as optimally as it would be in a
// production app; the stuff here is just to spitball ideas and test usability.

import { computed, nextTick, reactive, ref } from 'vue'

import Button from '@/components/ui/button/Button.vue'

import Card from '@/components/ui/card/Card.vue'
import CardContent from '@/components/ui/card/CardContent.vue'
import CardDescription from '@/components/ui/card/CardDescription.vue'
import CardHeader from '@/components/ui/card/CardHeader.vue'
import CardTitle from '@/components/ui/card/CardTitle.vue'

import Checkbox from '@/components/ui/checkbox/Checkbox.vue'

import Code from '@/components/ui/code/Code.vue'

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import Label from '@/components/ui/label/Label.vue'

import Input from '@/components/ui/input/Input.vue'

import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

import Separator from '@/components/ui/separator/Separator.vue'

import Switch from '@/components/ui/switch/Switch.vue'

import Table from '@/components/ui/table/Table.vue'
import TableBody from '@/components/ui/table/TableBody.vue'
import TableCell from '@/components/ui/table/TableCell.vue'
import TableHead from '@/components/ui/table/TableHead.vue'
import TableHeader from '@/components/ui/table/TableHeader.vue'
import TableRow from '@/components/ui/table/TableRow.vue'

import {
  IconBolt,
  IconCloudDownload,
  IconCopy,
  IconFilter,
  IconPencil,
  IconPlus,
  IconTrashX
} from '@tabler/icons-vue'

// Fetch some dummy product data from Dopple
const fetchOwner = ref('dopple')
const fetchWorkspace = ref('demo-assets')
const fetchProduct = ref('luggage')
const fetchVersion = ref(1)
const fetchState = ref<'loading' | 'default'>('default')

const dummyConfig = ref({
  'luggage-view': {
    options: {
      closed: 'closed',
      open: 'open'
    }
  },
  'luggage-color': {
    options: {
      'light-gray': 'light-gray',
      aleutian: 'aleutian',
      black: 'black',
      white: 'white',
      sahara: 'sahara',
      pink: 'pink',
      cherry: 'cherry',
      bumblebee: 'bumblebee',
      evergreen: 'evergreen',
      calypso: 'calypso',
      atlantis: 'atlantis'
    }
  },
  'packing-cubes': {
    options: {
      hidden: 'hidden',
      shown: 'shown'
    }
  },
  'toiletry-bag': {
    options: {
      none: 'none',
      included: 'included'
    }
  },
  charger: {
    options: {
      none: 'none',
      included: 'included'
    }
  },
  'camera-position': {
    options: {
      default: 'default',
      charger: 'charger',
      'toiletry-bag': 'toiletry-bag',
      autorotate: 'autorotate',
      lock: 'lock'
    }
  }
})

async function handleFetchDummyProduct() {
  fetchState.value = 'loading'

  await new Promise((resolve) => setTimeout(resolve, 1500))

  const dummyProperties = Object.keys(dummyConfig.value)

  for (let i = 0; i < dummyProperties.length; i++) {
    newOptionProperty.value = dummyProperties[i]
    addOption()

    const dummyOptions = Object.keys(dummyConfig.value[dummyProperties[i]].options)

    for (const option of dummyOptions) {
      newOptionValues[options.value[i].id] = option
      addOptionValue(options.value[i].id)
    }
  }

  fetchState.value = 'default'
}

// Types and reactive data
type Selection = {
  [propertyName: string]: string
}
type Item = {
  id: string
  name: string
  selection: Selection
}
type ItemGroup = {
  id: string
  groupName: string
  items: Item[]
}
type OptionValue = {
  id: string
  value: string
}
type Option = {
  id: string
  property: string
  values: OptionValue[]
  isVisible: boolean
}

const itemGroups = ref<ItemGroup[]>([])
const options = ref<Option[]>([])
const itemSelections = ref({})
const itemOptionStates = ref({})

// UI state
const selectedItemIds = ref<string[]>([])
const newGroupName = ref('')
const newItemNames = reactive({})
const newOptionProperty = ref('')
const newOptionValues = reactive({})
const isPreviewShown = ref(false)

// Naming conventions for auto-generating variant groups
const namingConventions = [
  {
    label: 'kebab-case',
    value: 'kebab-case',
    exampleOption: 'my-option',
    exampleVariant: 'my-variant'
  },
  {
    label: 'snake_case',
    value: 'snake-case',
    exampleOption: 'my_option',
    exampleVariant: 'my_variant'
  },
  {
    label: 'camelCase',
    value: 'camel-case',
    exampleOption: 'myOption',
    exampleVariant: 'myVariant'
  },
  {
    label: 'PascalCase',
    value: 'pascal-case',
    exampleOption: 'MyOption',
    exampleVariant: 'MyVariant'
  },
  {
    label: 'Name with Spaces',
    value: 'name-with-spaces',
    exampleOption: 'My Option',
    exampleVariant: 'My Variant'
  }
]
const doppleNamingConvention = ref('kebab-case')
const variantNamingConvention = ref('name-with-spaces')
const variantCapitalizationOptions = [
  {
    label: 'No Change',
    value: 'no-change'
  },
  {
    label: 'Capitalize Words',
    value: 'capitalize'
  },
  {
    label: 'All Uppercase',
    value: 'all-uppercase'
  },
  {
    label: 'All Lowercase',
    value: 'all-lowercase'
  }
]
const variantCapitalization = ref('no-change')
// const selectedConventionExample = computed(() => {
//   const option = namingConventions.find(
//     (convention) => convention.value === doppleNamingConvention.value
//   )
//   const variant = namingConventions.find(
//     (convention) => convention.value === variantNamingConvention.value
//   )

//   return {
//     option: option ? option.exampleOption : '',
//     variant: variant ? variant.exampleVariant : ''
//   }
// })

// Editing state
const editingStates = reactive({
  group: null,
  item: null,
  option: null,
  optionValue: null
})
const editingValue = ref('')
const originalValue = ref('')

// Computed properties
// const selectedItem = computed(() => {
//   if (!selectedItemId.value) {
//     return null
//   }
//   for (const group of itemGroups.value) {
//     const item = group.items.find((item) => item.id === selectedItemId.value)
//     if (item) {
//       return item
//     }
//   }
//   return null
// })

const formattedJson = computed(() => {
  const output = itemGroups.value.map((group) => ({
    // id: group.id,
    group: group.groupName,
    variants: group.items.map((item) => {
      const itemData: { variantName: string; selection: Selection } = {
        // id: item.id,
        variantName: item.name,
        selection: {}
      }

      const selections = itemSelections.value[item.id as keyof typeof itemSelections.value] || {}

      for (const [property, value] of Object.entries(selections)) {
        if (value) {
          itemData.selection[property as keyof typeof itemData.selection] = value
        }
      }

      return itemData
    })
  }))

  return JSON.stringify(output, null, 2)
})

// Utility functions
const generateId = () => Date.now().toString() + Math.random().toString(36).substr(2, 9)

// Group management
const addGroup = () => {
  if (!newGroupName.value.trim()) {
    return
  }

  const newGroup = {
    id: generateId(),
    groupName: newGroupName.value.trim(),
    items: []
  }

  itemGroups.value.push(newGroup)
  newItemNames[newGroup.id as keyof typeof newItemNames] = ''
  newGroupName.value = ''
}

const removeGroup = (groupId: string) => {
  const group = itemGroups.value.find((g) => g.id === groupId)
  if (group) {
    group.items.forEach((item) => {
      delete itemSelections.value[item.id]

      const index = selectedItemIds.value.indexOf(item.id)
      if (index !== -1) {
        selectedItemIds.value.splice(index, 1)
      }
    })
  }

  itemGroups.value = itemGroups.value.filter((g) => g.id !== groupId)
  delete newItemNames[groupId]
}

// Item management
const addItem = (groupId: string) => {
  const itemName = newItemNames[groupId]
  if (!itemName || !itemName.trim()) {
    return
  }

  const group = itemGroups.value.find((g) => g.id === groupId)
  if (!group) {
    return
  }

  const newItem = {
    id: generateId(),
    name: itemName.trim(),
    selection: {}
  }

  group.items.push(newItem)
  itemSelections.value[newItem.id] = {}
  newItemNames[groupId] = ''
}

const removeItem = (groupId: string, itemId: string) => {
  const group = itemGroups.value.find((g) => g.id === groupId)
  if (!group) {
    return
  }

  group.items = group.items.filter((item) => item.id !== itemId)
  delete itemSelections.value[itemId]

  const index = selectedItemIds.value.indexOf(itemId)
  if (index !== -1) {
    selectedItemIds.value.splice(index, 1)
  }
}

// Option management
const addOption = () => {
  if (!newOptionProperty.value.trim()) {
    return
  }

  const newOption = {
    id: generateId(),
    property: newOptionProperty.value.trim(),
    values: [],
    isVisible: true
  }

  options.value.push(newOption)
  newOptionValues[newOption.id] = ''
  newOptionProperty.value = ''
}

const removeOption = (optionId: string) => {
  const option = options.value.find((opt) => opt.id === optionId)
  if (!option) {
    return
  }

  Object.values(itemSelections.value).forEach((selections) => {
    delete selections[option.property]
  })

  options.value = options.value.filter((opt) => opt.id !== optionId)
  delete newOptionValues[optionId]
}

const addOptionValue = (optionId: string) => {
  const valueText = newOptionValues[optionId]
  if (!valueText?.trim()) {
    return
  }

  const option = options.value.find((opt) => opt.id === optionId)
  if (!option) {
    return
  }

  const newValue = {
    id: generateId(),
    value: valueText.trim()
  }

  option.values.push(newValue)
  newOptionValues[optionId] = ''
}

const removeOptionValue = (optionId: string, valueId: string) => {
  const option = options.value.find((opt) => opt.id === optionId)
  if (!option) {
    return
  }

  const value = option.values.find((v) => v.id === valueId)
  if (!value) {
    return
  }

  Object.values(itemSelections.value).forEach((selections) => {
    if (selections[option.property] === value.value) {
      delete selections[option.property]
    }
  })

  option.values = option.values.filter((v) => v.id !== valueId)
}

// Item option selection
const initializeItemOptionState = (itemId: string) => {
  if (!itemOptionStates.value[itemId]) {
    itemOptionStates.value[itemId] = {}
  }

  for (const option of options.value) {
    if (!itemOptionStates.value[itemId][option.property]) {
      itemOptionStates.value[itemId][option.property] = {
        enabled: false,
        selectedValue: option.values[0]?.value || ''
      }
    }
  }
}

const getItemOptionState = (itemId: string, property: string) => {
  initializeItemOptionState(itemId)
  return (
    itemOptionStates.value[itemId][property] || {
      enabled: false,
      selectedValue: ''
    }
  )
}

const updateItemSelections = (itemId: string) => {
  if (!itemSelections.value[itemId]) {
    itemSelections.value[itemId] = {}
  }

  Object.keys(itemOptionStates.value[itemId] || {}).forEach((property) => {
    const state = itemOptionStates.value[itemId][property]
    if (state.enabled && state.selectedValue) {
      itemSelections.value[itemId][property] = state.selectedValue
    } else {
      delete itemSelections.value[itemId][property]
    }
  })
}

// const getSelectedOptionsCount = (item: string) => {
//   const selections = itemSelections.value[item.id] || {}
//   return Object.keys(selections).length
// }

// Editing functions
const startEditing = async (type, id: string, currentValue: string) => {
  Object.keys(editingStates).forEach((key) => {
    editingStates[key] = null
  })

  editingStates[type] = id
  editingValue.value = currentValue
  originalValue.value = currentValue

  // Focus the input after the DOM is updated
  await nextTick(() => {
    // [ ] TODO: use refs here to get only the text inputs for editing values
    // const input = document.querySelector('input[type="text"]')
    // if (input) {
    //   input.focus()
    //   input.select()
    // }
  })
}

const finishEditing = (type, id: string) => {
  if (!editingValue.value.trim()) {
    cancelEditing()
    return
  }

  const newValue = editingValue.value.trim()
  if (newValue === originalValue.value) {
    cancelEditing()
    return
  }

  switch (type) {
    case 'group': {
      const group = itemGroups.value.find((g) => g.id === id)
      if (group) group.groupName = newValue
      break
    }
    case 'item': {
      for (const group of itemGroups.value) {
        const item = group.items.find((i) => i.id === id)
        if (item) {
          item.name = newValue
          break
        }
      }
      break
    }
    case 'option': {
      const option = options.value.find((opt) => opt.id === id)
      if (option) {
        const oldProperty = option.property
        option.property = newValue

        // Update all item selections to use the new property name
        Object.values(itemSelections.value).forEach((selections) => {
          if (selections[oldProperty]) {
            selections[newValue] = selections[oldProperty]
            delete selections[oldProperty]
          }
        })
      }
      break
    }
    case 'optionValue': {
      for (const option of options.value) {
        const value = option.values.find((v) => v.id === id)
        if (value) {
          const oldValue = value.value
          value.value = newValue

          // Update all item selections that use this value
          Object.values(itemSelections.value).forEach((selections) => {
            Object.keys(selections).forEach((property) => {
              if (selections[property] === oldValue) {
                selections[property] = newValue
              }
            })
          })
          break
        }
      }
      break
    }
  }

  cancelEditing()
}

const cancelEditing = () => {
  Object.keys(editingStates).forEach((key) => {
    editingStates[key] = null
  })
  editingValue.value = ''
  originalValue.value = ''
}

function convertWordCapitalization(wordArray: string[]) {
  wordArray.forEach((word, wordIndex) => {
    switch (variantCapitalization.value) {
      case 'all-lowercase':
        wordArray[wordIndex] = word.toLocaleLowerCase()
        break
      case 'all-uppercase':
        wordArray[wordIndex] = word.toLocaleUpperCase()
        break
      case 'capitalize':
        wordArray[wordIndex] = word.charAt(0).toLocaleUpperCase() + word.slice(1)
        break
      default:
        break
    }
  })
}

function convertNamingConvention(name: string) {
  if (doppleNamingConvention.value === variantNamingConvention.value) {
    return name
  }

  const sourceConvention = namingConventions.find(
    (convention) => convention.value === doppleNamingConvention.value
  )
  const targetConvention = namingConventions.find(
    (convention) => convention.value === variantNamingConvention.value
  )

  if (!(sourceConvention && targetConvention)) {
    return name
  }

  let nameSplitArray = []

  switch (sourceConvention.value) {
    case 'camel-case':
    case 'pascal-case':
      nameSplitArray = name.split(/(?=[A-Z])/)
      break
    case 'snake-case':
      nameSplitArray = name.split('_')
      break
    case 'kebab-case':
      nameSplitArray = name.split('-')
      break
    default:
      nameSplitArray = name.split(' ')
      break
  }

  let nameJoined = ''

  switch (targetConvention.value) {
    case 'camel-case':
      nameSplitArray = nameSplitArray.map((word, wordIndex) => {
        if (wordIndex < 1) {
          return word.charAt(0).toLocaleLowerCase() + word.slice(1).toLocaleLowerCase()
        }
        return word.charAt(0).toLocaleUpperCase() + word.slice(1).toLocaleLowerCase()
      })
      nameJoined = nameSplitArray.join('')
      break
    case 'pascal-case':
      nameSplitArray = nameSplitArray.map(
        (word) => word.charAt(0).toLocaleUpperCase() + word.slice(1).toLocaleLowerCase()
      )
      nameJoined = nameSplitArray.join('')
      break
    case 'snake-case':
      convertWordCapitalization(nameSplitArray)
      nameJoined = nameSplitArray.join('_')
      break
    case 'kebab-case':
      convertWordCapitalization(nameSplitArray)
      nameJoined = nameSplitArray.join('-')
      break
    default:
      convertWordCapitalization(nameSplitArray)
      nameJoined = nameSplitArray.join(' ')
      break
  }

  return nameJoined
}

function generateVariantsFromProductConfig() {
  for (let i = 0; i < options.value.length; i++) {
    newGroupName.value = convertNamingConvention(options.value[i].property)
    addGroup()

    for (let j = 0; j < options.value[i].values.length; j++) {
      newItemNames[itemGroups.value[i].id] = convertNamingConvention(
        options.value[i].values[j].value
      )

      addItem(itemGroups.value[i].id)

      const itemId = itemGroups.value[i].items[j].id

      initializeItemOptionState(itemId)

      itemOptionStates.value[itemId][options.value[i].property] = {
        enabled: true,
        selectedValue: options.value[i].values[j].value
      }

      updateItemSelections(itemId)
    }
  }
  newGroupName.value = ''
}

const exampleVariantCapitalization = computed(() => {
  return `An option named “${options.value[0].property}” in your Dopple product config will generate a variant named “${convertNamingConvention(options.value[0].property)}”.`
})
</script>

<template>
  <div class="p-4 sm:p-8 w-full max-w-5xl mx-auto space-y-4">
    <header class="flex justify-between gap-4 mb-8">
      <h1 class="text-3xl font-bold">JSON Map Builder</h1>
    </header>

    <!-- Options Schema Section -->
    <Card>
      <CardHeader>
        <CardTitle class="flex items-center flex-wrap gap-2 text-2xl font-bold whitespace-nowrap">
          <span class="text-blue-500 dark:text-blue-300">Step 1:</span>
          Dopple Product Config Setup
        </CardTitle>
        <CardDescription>
          Define the configurable properties and options for your product to be used in the final
          JSON mapping.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div v-if="!options.length" class="space-y-2">
          <div
            class="border border-yellow-500/25 bg-yellow-500/10 text-yellow-700 dark:text-yellow-200 rounded-md text-sm p-4 mb-4"
          >
            No properties created yet. You can automatically fetch them for a specific product from
            Dopple, or manually add them below.
          </div>
          <fieldset class="border p-2 rounded-md">
            <legend class="px-2 font-semibold text-sm">Fetch product config from Dopple</legend>
            <div class="flex gap-4 p-2 flex-col xl:flex-row xl:items-end">
              <div
                class="grow-1 grid gap-2 grid-cols-1 lg:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,min-content)]"
              >
                <div>
                  <Label class="whitespace-nowrap">Owner</Label>
                  <Input v-model="fetchOwner" />
                </div>
                <div>
                  <Label class="whitespace-nowrap">Workspace</Label>
                  <Input v-model="fetchWorkspace" />
                </div>
                <div>
                  <Label class="whitespace-nowrap">Project Name</Label>
                  <Input v-model="fetchProduct" />
                </div>
                <div>
                  <Label class="whitespace-nowrap pr-6">Version</Label>
                  <Input type="number" min="1" v-model="fetchVersion" />
                </div>
              </div>
              <Button @click="handleFetchDummyProduct" :state="fetchState">
                <IconCloudDownload class="mr-2 size-5" />
                Fetch
              </Button>
            </div>
          </fieldset>
          <Separator class="!my-8" />
          <p class="font-semibold">Manually add properties:</p>
          <div class="flex items-center gap-2 max-w-128 mb-4">
            <Input
              v-model="newOptionProperty"
              placeholder="Option property (e.g., size)"
              @keydown.enter="addOption"
            />
            <Button @click="addOption">
              <IconPlus class="mr-2 size-5" />
              Add Property
            </Button>
          </div>
        </div>
        <div v-else class="space-y-2">
          <p class="font-bold text-xs uppercase text-muted-foreground">Properties:</p>
          <details
            v-for="(option, optionIndex) in options"
            :key="option.id"
            class="border rounded-md"
          >
            <summary class="flex items-center gap-2 cursor-pointer text-sm font-semibold p-2">
              <span
                class="flex items-center justify-center rounded-full font-bold min-w-6 h-6 px-1 py-1 text-xs bg-accent text-muted-foreground"
              >
                {{ optionIndex + 1 }}
              </span>
              {{ option.property }}
            </summary>
            <div class="p-4 pt-2 border-t">
              <div class="flex items-center gap-2 pt-2">
                <h3 v-if="editingStates.option !== option.id" class="w-full text-sm">
                  <span class="font-medium text-muted-foreground">Property:</span>
                  <Code class="ml-2">{{ option.property }}</Code>
                </h3>
                <Input
                  v-else
                  v-model="editingValue"
                  @blur="finishEditing('option', option.id)"
                  @keyup.enter="finishEditing('option', option.id)"
                  @keyup.escape="cancelEditing"
                  ref="editInput"
                  class="w-full h-8"
                />
                <Button
                  @click="startEditing('option', option.id, option.property)"
                  variant="outline"
                  size="sm"
                >
                  <IconPencil class="mr-2 size-5 text-muted-foreground" />
                  Rename
                </Button>
                <Button @click="removeOption(option.id)" variant="outline" size="sm">
                  <IconCopy class="mr-2 size-5 text-muted-foreground" />
                  Duplicate
                </Button>
                <Button
                  @click="removeOption(option.id)"
                  variant="outline"
                  size="sm"
                  class="text-destructive dark:text-rose-400"
                >
                  <IconTrashX class="mr-2 size-5" />
                  Remove
                </Button>
              </div>
              <Separator class="!my-4" />
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead class="w-full whitespace-nowrap"> Option Name </TableHead>
                    <TableHead> Actions </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow v-for="value in option.values" :key="value.id">
                    <TableCell class="w-full py-1 whitespace-nowrap font-mono pl-1">
                      <span
                        v-if="editingStates.optionValue !== value.id"
                        class="inline-flex items-center h-8 pl-3"
                      >
                        <Code>{{ value.value }}</Code>
                      </span>
                      <Input
                        v-else
                        v-model="editingValue"
                        @blur="finishEditing('optionValue', value.id)"
                        @keyup.enter="finishEditing('optionValue', value.id)"
                        @keyup.escape="cancelEditing"
                        ref="editInput"
                        class="h-8 ml-1"
                      />
                    </TableCell>
                    <TableCell class="py-1">
                      <div class="flex gap-2 items-center">
                        <Button
                          @click="startEditing('optionValue', value.id, value.value)"
                          title="Edit"
                          variant="outline"
                          size="icon-xs"
                        >
                          <IconPencil class="size-4 text-muted-foreground" />
                        </Button>
                        <Button
                          @click="startEditing('optionValue', value.id, value.value)"
                          title="Duplicate"
                          variant="outline"
                          size="icon-xs"
                        >
                          <IconCopy class="size-4 text-muted-foreground" />
                        </Button>
                        <Button
                          @click="removeOptionValue(option.id, value.id)"
                          title="Delete"
                          variant="outline"
                          size="icon-xs"
                        >
                          <IconTrashX class="size-4 text-muted-foreground" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <p class="font-semibold mb-2 mt-4">Add new option:</p>
              <div class="flex items-center gap-2 max-w-96">
                <Input
                  v-model="newOptionValues[option.id]"
                  :placeholder="`Add value for ${option.property}`"
                  @keydown.enter="addOptionValue(option.id)"
                />
                <Button @click="addOptionValue(option.id)">
                  <IconPlus class="mr-2 size-5" />
                  Add Option
                </Button>
              </div>
            </div>
          </details>
          <Separator class="!my-8" />
          <p class="font-semibold">Add new property:</p>
          <div class="flex items-center gap-2 max-w-128 mb-4">
            <Input
              v-model="newOptionProperty"
              placeholder="Option property (e.g., size)"
              @keydown.enter="addOption"
            />
            <Button @click="addOption">
              <IconPlus class="mr-2 size-5" />
              Add Property
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle>
          <span class="text-blue-500 dark:text-blue-300">Step 2:</span>
          Ecommerce Variants Setup
        </CardTitle>
        <CardDescription>
          Set up the groups of product variants used in your ecommerce store, and apply the
          corresponding Dopple properties and options to them.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div v-if="!itemGroups.length" class="space-y-2">
          <div
            class="border border-yellow-500/25 bg-yellow-500/10 text-yellow-700 dark:text-yellow-200 rounded-md text-sm p-4 mb-4"
          >
            No variant groups created yet. You can automatically generate them based on the Dopple
            config properties above using a naming format, or manually add them below.
          </div>
          <fieldset class="border p-2 rounded-md" v-if="options.length">
            <legend class="px-2 font-semibold text-sm">
              Generate variants from Dopple product config
            </legend>
            <div class="flex gap-4 p-2 flex-col xl:flex-row xl:items-end">
              <div class="grow-1 grid gap-2 grid-cols-1 xl:grid-cols-3">
                <div>
                  <Label class="whitespace-nowrap"> Product config format: </Label>
                  <Select v-model="doppleNamingConvention">
                    <SelectTrigger class="w-full">
                      <SelectValue placeholder="Select an option" class="font-mono" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        v-for="namingConvention in namingConventions"
                        :key="namingConvention.value"
                        :value="namingConvention.value"
                        class="font-mono"
                      >
                        {{ namingConvention.label }}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label class="whitespace-nowrap">Variant name format:</Label>
                  <Select v-model="variantNamingConvention">
                    <SelectTrigger class="w-full">
                      <SelectValue placeholder="Select an option" class="font-mono" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        v-for="namingConvention in namingConventions"
                        :key="namingConvention.value"
                        :value="namingConvention.value"
                        class="font-mono"
                      >
                        {{ namingConvention.label }}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label class="whitespace-nowrap"> Variant capitalization: </Label>
                  <Select
                    v-model="variantCapitalization"
                    :disabled="['camel-case', 'pascal-case'].includes(variantNamingConvention)"
                  >
                    <SelectTrigger class="w-full">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        v-for="capitalizationOption in variantCapitalizationOptions"
                        :key="capitalizationOption.value"
                        :value="capitalizationOption.value"
                      >
                        {{ capitalizationOption.label }}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button @click="generateVariantsFromProductConfig" :state="fetchState">
                <IconBolt class="mr-2 size-5" />
                Auto-generate
              </Button>
            </div>
            <p class="text-sm p-2 text-muted-foreground">
              <strong>Example:</strong> {{ exampleVariantCapitalization }}
            </p>
            <Separator class="my-4" />
            <div class="p-2">
              <div class="flex items-center gap-2">
                <h3>Preview result:</h3>
                <Switch v-model="isPreviewShown" />
              </div>
              <ScrollArea class="h-64 border rounded-md mt-2" v-show="isPreviewShown">
                <ul class="text-sm p-4">
                  <li v-for="option in options" :key="option.id">
                    {{ convertNamingConvention(option.property) }}
                    <ul class="pl-4 p-1">
                      <li
                        v-for="(value, valueIndex) in option.values"
                        :key="value.id"
                        class="relative pl-4 flex items-center gap-2 h-6"
                      >
                        <span
                          class="absolute -left-2 top-1 w-4 h-2 inline-block border-b border-l rounded-bl"
                        ></span>
                        <span
                          class="absolute -left-2 top-0 inline-block border-l"
                          :class="[valueIndex === option.values.length - 1 ? 'h-2' : 'h-6']"
                        ></span>
                        {{ convertNamingConvention(value.value) }}
                      </li>
                    </ul>
                  </li>
                </ul>
              </ScrollArea>
            </div>
          </fieldset>
          <Separator class="!my-8" />
          <p class="font-semibold">Manually add variant groups:</p>
          <div class="flex items-center gap-2 max-w-128 mb-4">
            <Input
              v-model="newGroupName"
              placeholder="Variant group name (e.g., Product Color)"
              @keydown.enter="addGroup"
            />
            <Button @click="addGroup">
              <IconPlus class="mr-2 size-5" />
              Add Group
            </Button>
          </div>
        </div>
        <div v-else class="space-y-2">
          <div class="flex items-end justify-between gap-4 flex-wrap">
            <p class="font-bold text-xs uppercase text-muted-foreground">Variant Groups:</p>
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <Button variant="outline">
                  <IconFilter class="mr-2 size-5 text-muted-foreground" />
                  Filter Dopple Properties
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent class="w-fit min-w-60" align="end">
                <DropdownMenuLabel>Select/Deselect All</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  v-for="option in options"
                  :key="option.id"
                  class="font-mono"
                  v-model:model-value="option.isVisible"
                  @select="(e) => e.preventDefault()"
                >
                  {{ option.property }}
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <details
            v-for="(group, groupIndex) in itemGroups"
            :key="group.id"
            class="border rounded-md"
          >
            <summary class="flex items-center gap-2 cursor-pointer text-sm font-semibold p-2">
              <span
                class="flex items-center justify-center rounded-full font-bold min-w-6 h-6 px-1 py-1 text-xs bg-accent text-muted-foreground"
              >
                {{ groupIndex + 1 }}
              </span>
              {{ group.groupName }}
            </summary>
            <div class="p-4 border-t">
              <div class="flex items-center gap-2 pt-2">
                <h3 v-if="editingStates.group !== group.id" class="w-full text-sm">
                  <span class="font-medium text-muted-foreground"> Group Name: </span>
                  <Code class="ml-2">{{ group.groupName }}</Code>
                </h3>
                <Input
                  v-else
                  v-model="editingValue"
                  @blur="finishEditing('group', group.id)"
                  @keyup.enter="finishEditing('group', group.id)"
                  @keyup.escape="cancelEditing"
                  ref="editInput"
                  class="w-full h-8"
                />
                <Button
                  @click="startEditing('group', group.id, group.groupName)"
                  variant="outline"
                  size="sm"
                >
                  <IconPencil class="mr-2 size-5 text-muted-foreground" />
                  Rename
                </Button>
                <Button @click="removeGroup(group.id)" variant="outline" size="sm">
                  <IconCopy class="mr-2 size-5 text-muted-foreground" />
                  Duplicate
                </Button>
                <Button
                  @click="removeGroup(group.id)"
                  variant="outline"
                  size="sm"
                  class="text-destructive dark:text-rose-400"
                >
                  <IconTrashX class="mr-2 size-5" />
                  Remove
                </Button>
              </div>
              <Separator class="my-4" />
              <div v-if="group.items.length" class="space-y-2">
                <p class="font-bold text-xs uppercase text-muted-foreground">Variants:</p>
                <details
                  v-for="(item, itemIndex) in group.items"
                  :key="item.id"
                  class="border rounded-md"
                >
                  <summary
                    class="bg-background flex items-center gap-2 cursor-pointer text-sm font-semibold p-2"
                  >
                    <span
                      class="flex items-center justify-center rounded-full font-bold min-w-6 h-6 px-1 py-1 text-xs bg-accent text-muted-foreground"
                    >
                      {{ itemIndex + 1 }}
                    </span>
                    {{ item.name }}
                  </summary>
                  <div class="p-4 pt-2 border-t">
                    <div class="flex items-center gap-2 pt-2">
                      <h4 v-if="editingStates.item !== item.id" class="w-full text-sm">
                        <span class="font-medium text-muted-foreground"> Variant Name: </span>
                        <Code class="ml-2">{{ item.name }}</Code>
                      </h4>
                      <Input
                        v-else
                        v-model="editingValue"
                        @blur="finishEditing('item', item.id)"
                        @keyup.enter="finishEditing('item', item.id)"
                        @keyup.escape="cancelEditing"
                        ref="editInput"
                        class="w-full h-8"
                      />
                      <Button
                        @click="startEditing('item', item.id, item.name)"
                        variant="outline"
                        size="sm"
                      >
                        <IconPencil class="mr-2 size-5 text-muted-foreground" />
                        Rename
                      </Button>
                      <Button @click="removeItem(group.id, item.id)" variant="outline" size="sm">
                        <IconCopy class="mr-2 size-5 text-muted-foreground" />
                        Duplicate
                      </Button>
                      <Button
                        @click="removeItem(group.id, item.id)"
                        variant="outline"
                        size="sm"
                        class="text-destructive dark:text-rose-400"
                      >
                        <IconTrashX class="mr-2 size-5" />
                        Remove
                      </Button>
                    </div>
                    <Separator class="my-4" />
                    <p class="font-bold text-xs uppercase text-muted-foreground">Selection:</p>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead class="whitespace-nowrap"> Dopple Property </TableHead>
                          <TableHead class="w-full whitespace-nowrap"> Dopple Value </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow
                          v-for="option in options"
                          :key="option.id"
                          v-show="option.isVisible"
                        >
                          <TableCell class="py-1 whitespace-nowrap font-mono">
                            <div class="flex items-center gap-2">
                              <Checkbox
                                :id="`checkbox-${item.id}-${option.property}`"
                                v-model="getItemOptionState(item.id, option.property).enabled"
                                @update:modelValue="updateItemSelections(item.id)"
                                class="size-5"
                              />
                              <Code>{{ option.property }}</Code>
                            </div>
                          </TableCell>
                          <TableCell class="py-1 w-full">
                            <Select
                              :id="`select-${item.id}-${option.property}`"
                              v-model="getItemOptionState(item.id, option.property).selectedValue"
                              @update:modelValue="updateItemSelections(item.id)"
                              :disabled="!getItemOptionState(item.id, option.property).enabled"
                            >
                              <SelectTrigger class="w-full h-8">
                                <SelectValue placeholder="Select an option" class="font-mono" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem
                                  v-for="value in option.values"
                                  :key="value.id"
                                  :value="value.value"
                                  class="font-mono"
                                >
                                  {{ value.value }}
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </details>
              </div>
              <div v-else class="p-4 pt-2 text-muted-foreground text-sm">
                No variants yet in this group. Add a variant to get started.
              </div>
            </div>
          </details>
          <Separator class="my-8" />
          <p class="font-semibold">Add new variant group:</p>
          <div class="flex items-center gap-2 max-w-128 mb-4">
            <Input
              v-model="newGroupName"
              placeholder="Variant group name (e.g., Product Color)"
              @keydown.enter="addGroup"
            />
            <Button @click="addGroup">
              <IconPlus class="mr-2 size-5" />
              Add Group
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle>
          <span class="text-blue-500 dark:text-blue-300">Step 3:</span>
          JSON Output
        </CardTitle>
        <CardDescription>
          Include the JSON map below in your page’s JavaScript to handle updating the 3D product
          whenever a user selects a new variant.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <pre class="bg-accent text-sm p-4 rounded-md text-primary">{{ formattedJson }}</pre>
      </CardContent>
    </Card>
  </div>
</template>
