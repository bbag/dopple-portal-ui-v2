<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

import type { Row } from '@tanstack/vue-table'
import { labels } from './data'
import { type IProject } from '@/stores/projects'

import { IconDots } from '@tabler/icons-vue'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { IconInfoCircle, IconCopy, IconStar, IconTags, IconTrash } from '@tabler/icons-vue'

interface ProjectTableRowActionsProps {
  row: Row<IProject>
}
const props = defineProps<ProjectTableRowActionsProps>()

const project = computed(() => props.row.original)
const activeLabel = ref('')
onMounted(() => {
  activeLabel.value = project.value.title
})

const inputDeleteName = ref('')
const inputDeleteWorkspace = ref('')

function handleActionManage() {
  router.push({ name: 'Project Overview', params: { name: project.value.slug } })
}
</script>

<template>
  <AlertDialog>
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="ghost" class="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
          <IconDots class="h-4 w-4" />
          <span class="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" class="w-[160px]">
        <DropdownMenuItem @click="handleActionManage">
          <IconInfoCircle class="w-5 h-5 mr-2" />
          Manage
        </DropdownMenuItem>
        <DropdownMenuItem>
          <IconCopy class="w-5 h-5 mr-2" />
          Duplicate
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <IconTags class="w-5 h-5 mr-2" />
            Labels
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup :value="project.title" v-model="activeLabel">
              <DropdownMenuRadioItem
                v-for="label in labels"
                :key="label.value"
                :value="label.value"
              >
                {{ label.label }}
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem class="text-red-600">
          <IconTrash class="w-5 h-5 mr-2" />
          <AlertDialogTrigger class="w-full flex items-start">Delete</AlertDialogTrigger>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          <p>
            You are about to delete the
            <strong class="text-slate-900">{{ project.title }}</strong> project. This action cannot
            be undone.
          </p>
          <p class="mt-4">To continue, type the name and the workspace for this project below:</p>
          <div class="text-slate-900 grid w-full items-center gap-1.5 mt-4">
            <Label for="delete-project-title"
              >Name:
              <span
                class="text-slate-600 text-xs bg-muted font-mono px-[0.25em] py-[0.125em] rounded"
                >{{ project.title }}</span
              ></Label
            >
            <Input
              id="delete-project-title"
              type="text"
              :placeholder="project.title"
              v-model="inputDeleteName"
            />
          </div>
          <div class="text-slate-900 grid w-full items-center gap-1.5 mt-4">
            <Label for="delete-project-workspace"
              >Workspace:
              <span
                class="text-slate-600 text-xs bg-muted font-mono px-[0.25em] py-[0.1875em] rounded"
                >{{ project.workspace }}</span
              ></Label
            >
            <Input
              id="delete-project-workspace"
              type="text"
              :placeholder="project.workspace"
              v-model="inputDeleteWorkspace"
            />
          </div>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          class="bg-rose-600 hover:bg-rose-700"
          :disabled="
            inputDeleteName !== project.title || inputDeleteWorkspace !== project.workspace
          "
          >Delete</AlertDialogAction
        >
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
