<script setup lang="ts">
import { computed, h, ref } from 'vue'

import { RouterLink } from 'vue-router'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import { useWorkspacesStore } from '@/stores/workspaces'
import { useTestRolesStore } from '@/stores/testRoles'

import LayoutMain from '@/components/layouts/LayoutMain.vue'

import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { toast } from '@/components/ui/toast'

import { IconArrowsSort, IconDots, IconSearch } from '@tabler/icons-vue'
import IconPlusSmall from '@/assets/icons/plus-small.svg'

const sortOptions = ['Alphabetical', 'Date Created', 'Date Modified', 'Product Count']
const workspaceSortBy = ref('Alphabetical')
const workspaceSearchQuery = ref('')

const workspaces = computed(() => {
  let workspacesList = useWorkspacesStore().workspaces

  if (workspaceSearchQuery.value) {
    workspacesList = workspacesList.filter((workspace) => {
      return workspace.name.toLowerCase().includes(workspaceSearchQuery.value.toLowerCase())
    })
  }

  switch (workspaceSortBy.value) {
    case 'Alphabetical':
      workspacesList = workspacesList.sort((a, b) => a.name.localeCompare(b.name))
      break
    case 'Date Added':
      workspacesList = workspacesList.sort(
        (a, b) => b.dateCreated.getTime() - a.dateCreated.getTime()
      )
      break
    case 'Date Modified':
      workspacesList = workspacesList.sort(
        (a, b) => b.dateModified.getTime() - a.dateModified.getTime()
      )
      break
    case 'Product Count':
      workspacesList = workspacesList.sort((a, b) => b.productCount - a.productCount)
      break
  }

  return workspacesList
})

const newWorkspaceName = ref('')

const formSchema = toTypedSchema(
  z.object({
    'new-workspace': z.string().regex(/^(?![-_])(?!.*[-_]$)[a-z\d-_]+$/)
  })
)

const { handleSubmit } = useForm({
  validationSchema: formSchema
})

const onSubmit = handleSubmit((values) => {
  console.log('values')
  console.log(values)
  toast({
    title: 'Workspace created:',
    description: h('code', { class: 'text-white' }, 'my-workspace-name')
  })
})

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hour12: true
})

const workspacesTableHeaders = ['Name', 'Products', 'Last Modified', 'Actions', '']
</script>

<template>
  <LayoutMain>
    <div class="p-8 max-w-4xl mx-auto">
      <header class="flex justify-between gap-4 mb-8">
        <h1 class="text-3xl font-bold">Workspaces</h1>
      </header>
      <div class="mb-4 flex gap-2 items-center flex-wrap justify-between">
        <div class="relative">
          <Input placeholder="Search..." class="pl-10" v-model="workspaceSearchQuery" />
          <IconSearch
            class="w-5 h-5 pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />
        </div>
        <div class="relative">
          <Select v-model="workspaceSortBy">
            <SelectTrigger class="pl-10 w-[11rem]">
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem v-for="option in sortOptions" :key="option" :value="option">
                  {{ option }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <IconArrowsSort
            class="w-5 h-5 pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />
        </div>
      </div>
      <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
        <table class="w-full text-sm">
          <thead class="[&_tr]:border-b">
            <tr class="border-b transition-colors hover:bg-muted/50">
              <th
                v-for="header in workspacesTableHeaders"
                :key="header"
                class="h-12 px-4 text-left align-middle font-medium text-muted-foreground"
              >
                {{ header }}
              </th>
            </tr>
          </thead>
          <tbody>
            <TableRow v-for="workspace in workspaces" :key="workspace.id">
              <TableCell class="font-medium w-full py-2">
                <RouterLink :to="`/w/${workspace.name}`">
                  {{ workspace.name }}
                </RouterLink>
              </TableCell>
              <TableCell class="py-2 whitespace-nowrap text-muted-foreground text-xs text-center">
                {{ workspace.productCount }}
              </TableCell>
              <TableCell class="py-2 whitespace-nowrap text-muted-foreground text-xs">
                {{ dateFormatter.format(workspace.dateModified) }}
              </TableCell>
              <TableCell class="py-2 pr-0">
                <RouterLink
                  :to="`/w/${workspace.name}`"
                  :class="buttonVariants({ variant: 'outline', size: 'sm' })"
                >
                  Open Workspace
                </RouterLink>
              </TableCell>
              <TableCell class="p-2">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="ghost" size="icon-sm">
                      <IconDots class="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuGroup>
                      <DropdownMenuItem> Open </DropdownMenuItem>
                      <DropdownMenuItem> Rename </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem class="text-red-600"> Delete </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          </tbody>
        </table>
      </div>
      <div class="flex justify-end mt-4">
        <Dialog>
          <DialogTrigger>
            <Button>
              <IconPlusSmall class="mr-2 w-5 h-5" />
              New Workspace
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Workspace</DialogTitle>
              <DialogDescription>
                <form class="space-y-4 my-4 text-slate-900" @submit="onSubmit">
                  <FormField v-slot="{ componentField }" name="new-workspace">
                    <FormItem>
                      <FormLabel>Workspace name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="my-workspace-name"
                          v-bind="componentField"
                        />
                      </FormControl>
                      <FormDescription>
                        Must contain only lowercase letters, numbers, hyphens, and underscores, and
                        must not start or end with a hyphen or underscore.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  </FormField>
                  <div class="flex justify-end">
                    <DialogClose as-child>
                      <Button type="submit"> Create </Button>
                    </DialogClose>
                  </div>
                </form>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  </LayoutMain>
</template>

<style scoped></style>
