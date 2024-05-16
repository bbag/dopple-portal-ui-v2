<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, type RouteParams, type RouteRecordName } from 'vue-router'

import { useProductsStore } from '@/stores/products'
import { useModelsStore } from '@/stores/models'

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

import IconHome from '@/assets/icons/home.svg'

const route = useRoute()

interface BreadcrumbOutputItem {
  path: string
  name?: RouteRecordName
}

function replaceDynamicPathSegments(path: string) {
  const params = route.params as RouteParams
  Object.entries(params).forEach(([key, value]) => {
    path = path.replace(`:${key}`, value as string)
  })
  return path
}

const breadcrumbs = computed<BreadcrumbOutputItem[]>(() => {
  const arr = [] as BreadcrumbOutputItem[]
  route.matched.forEach((match) => {
    // console.log(match)
    const formattedPath = replaceDynamicPathSegments(match.path)
    const hasExistingPath = arr.find((crumb) => crumb.path === formattedPath)
    if (!hasExistingPath) {
      let itemName = match.name as RouteRecordName
      if (
        typeof itemName === 'string' &&
        ['Product', 'Product (UI Builder)', 'Product (Virtual Studio)'].includes(itemName)
      ) {
        itemName =
          useProductsStore().products.find(
            (product) =>
              product.name === route.params.name && product.workspace === route.params.workspace
          )?.title || 'N/A'
      } else if (
        typeof itemName === 'string' &&
        ['Model', 'Model (glTF Editor)'].includes(itemName)
      ) {
        itemName =
          useModelsStore().models.find(
            (model) =>
              model.shortId === route.params.shortId && model.workspace === route.params.workspace
          )?.name || 'N/A'
      } else if (itemName === 'Workspace') {
        arr.push({
          name: 'Workspaces',
          path: '/workspaces'
        })
        itemName = route.params.workspace.toString()
      } else if (
        typeof match.meta?.breadcrumbName === 'string' &&
        match.meta?.breadcrumbName?.length > 0
      ) {
        itemName = match.meta.breadcrumbName
      }

      arr.push({
        name: itemName,
        path: formattedPath
      })
    }
  })
  return arr
})

const displayedBreadcrumbCount = 3
const displayedBreadcrumbs = computed(() => {
  if (breadcrumbs.value.length <= displayedBreadcrumbCount + 1) {
    return breadcrumbs.value
  }
  return breadcrumbs.value.filter(
    (_, i) => i >= breadcrumbs.value.length - displayedBreadcrumbCount
  )
})

const dropdownBreadcrumbs = computed(() => {
  if (breadcrumbs.value.length <= displayedBreadcrumbCount + 1) {
    return []
  }
  return breadcrumbs.value.filter((_, i) => i < breadcrumbs.value.length - displayedBreadcrumbCount)
})
</script>

<template>
  <Breadcrumb>
    <BreadcrumbList>
      <TooltipProvider>
        <BreadcrumbItem>
          <Tooltip>
            <TooltipTrigger as-child>
              <BreadcrumbLink href="/"><IconHome class="w-5 h-5" /></BreadcrumbLink>
            </TooltipTrigger>
            <TooltipContent>Home</TooltipContent>
          </Tooltip>
        </BreadcrumbItem>
      </TooltipProvider>
      <BreadcrumbSeparator />
      <template v-if="dropdownBreadcrumbs.length > 0">
        <DropdownMenu>
          <DropdownMenuTrigger class="flex items-center gap-1">
            <BreadcrumbEllipsis class="h-4 w-4" />
            <span class="sr-only">Toggle menu</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem v-for="crumb in dropdownBreadcrumbs" :key="crumb.path" class="p-0">
              <BreadcrumbLink :href="crumb.path" class="w-full px-2 py-1.5">
                {{ crumb.name }}
              </BreadcrumbLink>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <BreadcrumbSeparator />
      </template>
      <template v-for="(crumb, i) in displayedBreadcrumbs" :key="i">
        <BreadcrumbItem>
          <BreadcrumbLink :href="crumb.path" v-if="i < displayedBreadcrumbs.length - 1">
            {{ crumb.name }}
          </BreadcrumbLink>
          <BreadcrumbPage v-else>
            {{ crumb.name }}
          </BreadcrumbPage>
        </BreadcrumbItem>
        <BreadcrumbSeparator v-if="i < displayedBreadcrumbs.length - 1" />
      </template>
    </BreadcrumbList>
  </Breadcrumb>
</template>

<style scoped></style>
