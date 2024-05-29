<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

import type { Row } from '@tanstack/vue-table'
import { labels } from './data'
import { type IProduct } from '@/stores/products'

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

interface ProductTableRowActionsProps {
  row: Row<IProduct>
}
const props = defineProps<ProductTableRowActionsProps>()

const product = computed(() => props.row.original)
const activeLabel = ref('')
onMounted(() => {
  activeLabel.value = product.value.label
})

const inputDeleteName = ref('')
const inputDeleteWorkspace = ref('')

function handleActionManage() {
  router.push({ name: 'Product Overview', params: { name: product.value.name } })
}
function handleActionToggleFavorite() {
  product.value.isFavorite = !product.value.isFavorite
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
        <DropdownMenuItem @click="handleActionToggleFavorite">
          <IconStar class="w-5 h-5 mr-2" />
          Favorite
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <IconTags class="w-5 h-5 mr-2" />
            Labels
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup :value="product.label" v-model="activeLabel">
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
            <strong class="text-slate-900">{{ product.title }}</strong> product. This action cannot
            be undone.
          </p>
          <p class="mt-4">To continue, type the name and the workspace for this product below:</p>
          <div class="text-slate-900 grid w-full items-center gap-1.5 mt-4">
            <Label for="delete-product-name"
              >Name:
              <span
                class="text-slate-600 text-xs bg-muted font-mono px-[0.25em] py-[0.125em] rounded"
                >{{ product.name }}</span
              ></Label
            >
            <Input
              id="delete-product-name"
              type="text"
              :placeholder="product.name"
              v-model="inputDeleteName"
            />
          </div>
          <div class="text-slate-900 grid w-full items-center gap-1.5 mt-4">
            <Label for="delete-product-workspace"
              >Workspace:
              <span
                class="text-slate-600 text-xs bg-muted font-mono px-[0.25em] py-[0.1875em] rounded"
                >{{ product.workspace }}</span
              ></Label
            >
            <Input
              id="delete-product-workspace"
              type="text"
              :placeholder="product.workspace"
              v-model="inputDeleteWorkspace"
            />
          </div>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          class="bg-rose-600 hover:bg-rose-700"
          :disabled="inputDeleteName !== product.name || inputDeleteWorkspace !== product.workspace"
          >Delete</AlertDialogAction
        >
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
