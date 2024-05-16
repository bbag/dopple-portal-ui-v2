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
import { toast } from '@/components/ui/toast'

import { IconArrowsSort, IconDots, IconSearch } from '@tabler/icons-vue'
import IconPlusSmall from '@/assets/icons/plus-small.svg'

const sortOptions = ['Alphabetical', 'Date Created', 'Date Modified', 'Product Count']
const workspaceSortBy = ref('Alphabetical')
const workspaceSearchQuery = ref('')

const sortedWorkspaces = computed(() => {
  let workspacesList = useWorkspacesStore().workspaces

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

const filteredWorkspaces = computed(() => {
  if (workspaceSearchQuery.value) {
    return sortedWorkspaces.value.filter((workspace) =>
      workspace.name.toLowerCase().includes(workspaceSearchQuery.value.toLowerCase())
    )
  }
  return sortedWorkspaces.value
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
</script>

<template>
  <LayoutMain>
    <div class="p-8 max-w-[104rem] mx-auto">
      <header class="flex justify-between gap-4 mb-8">
        <h1 class="text-3xl font-bold">Workspaces</h1>
        <Dialog>
          <DialogTrigger>
            <Button>
              <IconPlusSmall class="mr-2 w-5 h-5" />
              Add Workspace
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Workspace</DialogTitle>
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
      </header>
      <div class="mb-4 flex gap-2 items-center flex-wrap">
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
      <ul class="grid gap-4 grid-cols-[repeat(auto-fill,minmax(22rem,1fr))]">
        <li v-for="workspace in filteredWorkspaces" :key="workspace.name">
          <Card id="product-details">
            <CardHeader>
              <CardTitle class="relative pr-10">
                {{ workspace.name }}
                <div class="absolute -right-2 -top-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button variant="ghost" size="icon-sm">
                        <IconDots class="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuGroup>
                        <DropdownMenuItem> View </DropdownMenuItem>
                        <DropdownMenuItem> Rename </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem class="text-red-600"> Delete </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardTitle>
              <CardDescription>
                {{ workspace.productCount }} product{{ workspace.productCount === 1 ? '' : 's' }}
              </CardDescription>
            </CardHeader>
            <CardContent class="grid gap-4">
              <RouterLink
                :to="`/w/${workspace.name}`"
                :class="buttonVariants({ variant: 'outline' })"
              >
                Open Workspace
              </RouterLink>
            </CardContent>
          </Card>
        </li>
      </ul>
    </div>
  </LayoutMain>
</template>

<style scoped></style>
