<script lang="ts" setup>
import { h } from 'vue'
import { useRoute } from 'vue-router'
import { useProductsStore, type IProductVersion } from '@/stores/products'
const product = useProductsStore().products.find((p) => p.name === useRoute().params.name)

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

import {
  IconDots,
  IconEyeCode,
  IconSlideshow,
  IconSquareCheckFilled,
  IconSquareFilled
} from '@tabler/icons-vue'

import IconUiBuilder from '@/assets/icons/ui-builder.svg'

import { toast } from 'vue-sonner'

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hour12: true
})

function handleIsDefaultClick(item: IProductVersion) {
  const initialDefault = product?.versions.find((v) => v.isDefault === true)

  product?.versions.forEach((v) => {
    item !== v ? (v.isDefault = false) : (v.isDefault = true)
  })

  toast(
    h('span', { class: 'flex items-start' }, [
      h(IconSquareCheckFilled, { class: 'h-5 w-5 mr-2 text-green-500 shrink-0' }),
      h('span', {}, `Draft v${item.draftVersion} set as the new default.`)
    ]),
    {
      // description: `Draft version ${item.draftVersion} set as the new default.`,
      action: {
        label: 'Undo',
        onClick: () => {
          product?.versions.forEach((v) => {
            initialDefault !== v ? (v.isDefault = false) : (v.isDefault = true)
          })
        }
      }
    }
  )
}
</script>

<template>
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Default</TableHead>
        <TableHead class="whitespace-nowrap">Published Version</TableHead>
        <TableHead class="whitespace-nowrap">Draft Version</TableHead>
        <TableHead class="whitespace-nowrap">Created By</TableHead>
        <TableHead class="whitespace-nowrap">Saved At</TableHead>
        <TableHead class="text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow
        v-for="(item, i) in product?.versions"
        :key="item.draftVersion?.toString() + i.toString()"
      >
        <TableCell class="py-2">
          <button class="flex items-center mx-auto" @click="() => handleIsDefaultClick(item)">
            <IconSquareCheckFilled v-if="item.isDefault" class="w-6 h-6 text-green-500" />
            <IconSquareFilled v-else class="w-6 h-6 text-slate-300" />
          </button>
        </TableCell>
        <TableCell class="py-2 text-center">{{ item.publishedVersion }}</TableCell>
        <TableCell class="py-2 text-center">{{ item.draftVersion }}</TableCell>
        <TableCell class="py-2 whitespace-nowrap truncate w-full max-w-1">
          {{ item.createdBy }}
        </TableCell>
        <TableCell class="py-2 whitespace-nowrap">{{
          dateFormatter.format(item.dateCreated)
        }}</TableCell>
        <TableCell class="py-2 flex gap-2 justify-end items-center">
          <Button
            :variant="item.publishedVersion ? 'outline' : 'default'"
            size="sm"
            :disabled="item.publishedVersion"
          >
            Publish
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="ghost" size="icon-sm">
                <IconDots class="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <IconEyeCode class="w-5 h-5 mr-2" />
                  Open in Live Preview
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <IconSlideshow class="w-5 h-5 mr-2" />
                  Open in Virtual Studio
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <IconUiBuilder class="w-5 h-5 mr-2" />
                  Open in UI Builder
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
