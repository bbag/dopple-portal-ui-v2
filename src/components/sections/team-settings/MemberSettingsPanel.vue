<script lang="ts" setup>
import { computed, ref } from 'vue'
import { cn } from '@/lib/utils'
import { useClientStore, roles } from '@/stores/client'
import { useWorkspacesStore } from '@/stores/workspaces'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '@/components/ui/command'
import { Input } from '@/components/ui/input'
import { IconCirclePlus } from '@tabler/icons-vue'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

import { IconCheck } from '@tabler/icons-vue'

const props = defineProps<{
  personIndex: number
}>()

const person = useClientStore().client.members[props.personIndex]

const selectedWorkspaces = computed(() => new Set())

const workspaces = useWorkspacesStore().workspaces

// interface IFacetedFilter {
//   name: String
// }

const open = ref(false)
const value = ref('')
</script>

<template>
  <div class="p-2">
    <p class="mb-4">(This is all still <em>super</em> in-progress...)</p>
    <pre>{{ value }}</pre>
    <pre>{{ selectedWorkspaces }}</pre>
    <div class="grid grid-cols-[auto,minmax(0,1fr)] gap-x-4 gap-y-4 items-start">
      <span class="font-medium h-6 pt-2">Name:</span>
      <Input v-model="person.name" disabled class="!cursor-default" />
      <span class="font-medium h-6 pt-2">Email:</span>
      <Input v-model="person.email" disabled class="!cursor-default" />
      <span class="font-medium h-6 pt-2">Workspaces:</span>
      <!-- <TagsInput v-model="modelValue">
        <TagsInputItem v-for="item in modelValue" :key="item" :value="item">
          <TagsInputItemText />
          <TagsInputItemDelete />
        </TagsInputItem>
        <TagsInputInput placeholder="Fruits..." />
      </TagsInput> -->

      <Popover v-model:open="open">
        <PopoverTrigger as-child>
          <Button
            variant="outline"
            role="combobox"
            :aria-expanded="open"
            class="w-[200px] justify-between"
          >
            {{
              value
                ? workspaces.find((workspace) => workspace.name === value)?.name
                : 'Select workspace...'
            }}
            <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent class="w-[200px] p-0">
          <Command>
            <CommandInput class="h-9" placeholder="Search workspace..." />
            <CommandEmpty>No workspace found.</CommandEmpty>
            <CommandList>
              <CommandGroup>
                <CommandItem
                  v-for="workspace in workspaces"
                  :key="workspace.name"
                  :value="workspace.name"
                  @select="
                    (ev) => {
                      if (typeof ev.detail.value === 'string') {
                        value = ev.detail.value
                      }
                      open = false
                    }
                  "
                >
                  {{ workspace.name }}
                  <Check
                    :class="
                      cn('ml-auto h-4 w-4', value === workspace.name ? 'opacity-100' : 'opacity-0')
                    "
                  />
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <!-- <Popover>
        <PopoverTrigger as-child>
          <Button variant="outline">
            <IconCirclePlus class="mr-2 h-4 w-4" />
            Workspaces
            <template v-if="selectedWorkspaces.size > 0">
              <Separator orientation="vertical" class="mx-2 h-4" />
              <Badge variant="secondary" class="rounded-sm px-1 font-normal lg:hidden">
                {{ selectedWorkspaces.size }}
              </Badge>
              <div class="hidden space-x-1 lg:flex">
                <Badge
                  v-if="selectedWorkspaces.size > 2"
                  variant="secondary"
                  class="rounded-sm px-1 font-normal"
                >
                  {{ selectedWorkspaces.size }} selected
                </Badge>

                <template v-else>
                  <Badge
                    v-for="workspace in workspaces.filter((workspace) =>
                      selectedWorkspaces.has(workspace.name)
                    )"
                    :key="workspace.name"
                    variant="secondary"
                    class="rounded-sm px-1 font-normal"
                  >
                    {{ workspace.name }}
                  </Badge>
                </template>
              </div>
            </template>
          </Button>
        </PopoverTrigger>
        <PopoverContent class="w-[200px] p-0" align="start">
          <Command
            :filter-function="
              (list: IFacetedFilter[], term) =>
                list.filter((i) => i.name.toLowerCase()?.includes(term))
            "
          >
            <CommandInput placeholder="Search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                <CommandItem
                  v-for="workspace in workspaces"
                  :key="workspace.name"
                  :value="workspace"
                  @select="
                    (e) => {
                      console.log(e.detail.value)
                      const isSelected = selectedWorkspaces.has(workspace.name)
                      if (isSelected) {
                        selectedWorkspaces.delete(workspace.name)
                      } else {
                        selectedWorkspaces.add(workspace.name)
                      }
                      const filterValues = Array.from(selectedWorkspaces)
                      // column?.setFilterValue(filterValues.length ? filterValues : undefined)
                    }
                  "
                >
                  <div
                    :class="
                      cn(
                        'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                        selectedWorkspaces.has(workspace.name)
                          ? 'bg-primary text-primary-foreground'
                          : 'opacity-50 [&_svg]:invisible'
                      )
                    "
                  >
                    <IconCheck :class="cn('h-4 w-4')" />
                  </div>
                  <span>{{ workspace.name }}</span>
                  <span
                    v-if="workspaces.findIndex((w) => w.name === workspace.name) !== -1"
                    class="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs"
                  >
                    {{ workspaces.find((w) => w.name === workspace.name)?.name }}
                  </span>
                </CommandItem>
              </CommandGroup>

              <template v-if="selectedWorkspaces.size > 0">
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    :value="{ label: 'Clear filters' }"
                    class="justify-center text-center"
                    @select="column?.setFilterValue(undefined)"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </template>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover> -->
      <span class="font-medium">Role:</span>
      <span>
        <Select v-model="person.role">
          <SelectTrigger class="w-full">
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem v-for="role in roles" :key="role.title" :value="role.title">
                {{ role.title }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </span>
    </div>
    <p v-if="person.role === 'Custom'" class="mt-4">
      (This will be a table of selectable permissions...)
    </p>
    <Table v-if="person.role === 'Custom'">
      <TableBody>
        <TableRow>
          <TableCell class="font-medium">Name</TableCell>
          <TableCell class="w-full">{{ person.name }}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell class="font-medium">Email</TableCell>
          <TableCell class="w-full">{{ person.email }}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell class="font-medium">Role</TableCell>
          <TableCell class="w-full"> </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
