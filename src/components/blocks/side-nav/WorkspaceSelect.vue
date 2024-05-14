<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
const route = useRouter()

import { useWorkspacesStore } from '@/stores/workspaces'
const { currentWorkspace, workspaces } = useWorkspacesStore()

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { IconCheck, IconSelector } from '@tabler/icons-vue'

const open = ref(false)
const selectedValue = ref(currentWorkspace)

watch(
  () => route.currentRoute.value.params.workspace,
  (newWorkspace) => {
    if (typeof newWorkspace === 'string') {
      selectedValue.value = newWorkspace
    } else {
      selectedValue.value = newWorkspace[0]
    }
  }
)
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        role="combobox"
        :aria-expanded="open"
        class="w-full justify-between"
        :class="[selectedValue ? '' : 'text-slate-500']"
      >
        {{
          selectedValue
            ? workspaces.find((workspace) => workspace.name === selectedValue)?.name
            : 'Select workspace...'
        }}
        <IconSelector class="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-[14rem] p-0">
      <Command>
        <CommandInput class="h-9" placeholder="Search workspaces..." />
        <CommandEmpty>No workspace found.</CommandEmpty>
        <CommandList>
          <CommandGroup>
            <CommandItem
              v-for="workspace in workspaces"
              :key="workspace.name"
              :value="workspace.name"
              @select="
                (event) => {
                  $router.push(`/w/${event.detail.value}`)
                  open = false
                }
              "
            >
              {{ workspace.name }}
              <IconCheck
                :class="[
                  'ml-auto h-4 w-4',
                  selectedValue === workspace.name ? 'opacity-100' : 'opacity-0'
                ]"
              />
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>
