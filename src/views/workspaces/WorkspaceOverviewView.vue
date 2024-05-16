<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

// Workspace
const workspace = useRoute().params.workspace

// Products
import { useProductsStore } from '@/stores/products'
const products = computed(() =>
  useProductsStore().products.filter((product) => product.workspace === workspace)
)
const productsDisplayCount = 3
const recentProducts = products.value
  .sort((a, b) => b.dateModified.getTime() - a.dateModified.getTime())
  .slice(0, productsDisplayCount)

// Models
import { useModelsStore } from '@/stores/models'
const models = computed(() =>
  useModelsStore().models.filter((model) => model.workspace === workspace)
)
const modelsDisplayCount = 3
const recentModels = models.value
  .sort((a, b) => b.dateModified.getTime() - a.dateModified.getTime())
  .slice(0, modelsDisplayCount)

// Materials
import { useMaterialsStore } from '@/stores/materials'
const materials = computed(() =>
  useMaterialsStore().materials.filter((material) => material.workspace === workspace)
)

// Textures
import { useTexturesStore } from '@/stores/textures'
const textures = computed(() =>
  useTexturesStore().textures.filter((texture) => texture.workspace === workspace)
)

import { buttonVariants } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

import DummyAnalytics from '@/components/blocks/dummy-analytics/DummyAnalytics.vue'

import { IconArrowNarrowRight, IconBox, IconChartDots, IconSlideshow } from '@tabler/icons-vue'
import IconGltfEditor from '@/assets/icons/gltf-editor.svg'
import IconMaterial from '@/assets/icons/material.svg'
import IconShoppingBag from '@/assets/icons/shopping-bag.svg'
import IconTexture from '@/assets/icons/texture.svg'
import IconUiBuilder from '@/assets/icons/ui-builder.svg'

const assetsTable = computed(() => [
  {
    icon: IconBox,
    title: 'Models',
    count: models.value.length,
    href: `/w/${workspace}/models`
  },
  {
    icon: IconMaterial,
    title: 'Materials',
    count: materials.value.length,
    href: `/w/${workspace}/materials`
  },
  {
    icon: IconTexture,
    title: 'Textures',
    count: textures.value.length,
    href: `/w/${workspace}/textures`
  }
])

const toolsTable = computed(() => [
  {
    icon: IconGltfEditor,
    title: 'glTF Editor',
    href: `/w/${workspace}/editor`,
    description: 'Edit and preview models and environments.'
  },
  {
    icon: IconSlideshow,
    title: 'Virtual Studio',
    href: `/w/${workspace}/studio`,
    description: 'Capture images of product configurations.'
  },
  {
    icon: IconUiBuilder,
    title: 'UI Builder',
    href: `/w/${workspace}/ui-builder`,
    description: 'Design configurator UIs for your products.'
  }
])
</script>

<template>
  <div class="p-8 max-w-[104rem] mx-auto">
    <h1 class="text-3xl font-bold mb-8">
      Workspace:
      <span class="font-mono bg-slate-500/10 px-3 py-1 rounded-lg ml-1 text-foreground/80">
        {{ workspace }}
      </span>
    </h1>
    <div
      class="grid gap-4 auto-rows-auto grid-cols-1 xl:grid-cols-2 2xl:grid-cols-[minmax(0,3fr),minmax(0,2fr)] grid-flow-row-dense"
    >
      <Card class="flex flex-col col-span-1 xl:row-span-2 xl:col-span-2 2xl:col-span-1">
        <CardHeader>
          <CardTitle class="relative pr-8">
            Products
            <IconShoppingBag class="w-5 h-5 absolute right-0 top-0 text-muted-foreground" />
          </CardTitle>
          <CardDescription>{{ products.length }} total</CardDescription>
        </CardHeader>
        <CardContent class="flex-grow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead class="whitespace-nowrap">Product Title</TableHead>
                <TableHead class="w-full">Name</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="product in recentProducts" :key="product.name">
                <TableCell class="whitespace-nowrap font-medium">{{ product.title }}</TableCell>
                <TableCell class="font-mono w-full">{{ product.name }}</TableCell>
                <TableCell>
                  <RouterLink
                    :to="`/w/${product.workspace}/products/${product.name}`"
                    :class="buttonVariants({ variant: 'outline', size: 'xs' })"
                  >
                    View
                  </RouterLink>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p
            v-if="products.length > productsDisplayCount"
            class="text-sm text-slate-500 italic pt-2 px-4 border-t border-slate-200"
          >
            + {{ products.length - productsDisplayCount }} more
          </p>
        </CardContent>
        <CardFooter class="justify-end">
          <RouterLink
            :to="`/w/${$route.params.workspace}/products`"
            :class="buttonVariants({ variant: 'default' })"
          >
            View All Products
            <IconArrowNarrowRight class="w-6 h-6 ml-2" />
          </RouterLink>
        </CardFooter>
      </Card>
      <Card class="flex flex-col col-span-1 row-span-1">
        <CardHeader>
          <CardTitle class="relative pr-8">
            Assets
            <IconBox class="w-5 h-5 absolute right-0 top-0 text-muted-foreground" />
          </CardTitle>
        </CardHeader>
        <CardContent class="flex-grow">
          <Table>
            <TableBody>
              <TableRow v-for="row in assetsTable" :key="row.title">
                <TableCell class="py-2 pr-0">
                  <component :is="row.icon" class="inline w-5 h-5 text-muted-foreground" />
                </TableCell>
                <TableCell class="py-2 p-2 whitespace-nowrap font-medium">
                  {{ row.title }}
                </TableCell>
                <TableCell class="py-2 w-full text-muted-foreground"
                  >({{ row.count }} total)</TableCell
                >
                <TableCell class="py-2">
                  <RouterLink
                    :to="row.href"
                    :class="buttonVariants({ variant: 'default', size: 'sm' })"
                  >
                    View All
                  </RouterLink>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card class="flex flex-col col-span-1 row-span-1">
        <CardHeader>
          <CardTitle class="relative pr-8">
            Tools
            <IconGltfEditor class="w-5 h-5 absolute right-0 top-0 text-muted-foreground" />
          </CardTitle>
        </CardHeader>
        <CardContent class="flex-grow">
          <div class="grid grid-cols-3 gap-4">
            <RouterLink
              v-for="tool in toolsTable"
              :key="tool.title"
              :to="tool.href"
              :class="buttonVariants({ variant: 'outline' })"
              class="flex flex-col py-6 h-auto"
            >
              <component :is="tool.icon" class="inline w-8 h-8 text-muted-foreground" />
              <p class="mt-1 mb-2 text-center font-medium text-base">{{ tool.title }}</p>
              <p class="whitespace-normal text-center text-xs text-balance text-slate-600">
                {{ tool.description }}
              </p>
            </RouterLink>
          </div>
        </CardContent>
      </Card>
      <Card class="flex flex-col col-span-1 row-span-1 xl:col-span-2">
        <CardHeader>
          <CardTitle class="relative pr-8">
            Analytics
            <IconChartDots class="w-5 h-5 absolute right-0 top-0 text-muted-foreground" />
          </CardTitle>
        </CardHeader>
        <CardContent class="flex-grow">
          <DummyAnalytics />
        </CardContent>
        <CardFooter class="justify-end">
          <RouterLink
            :to="`/w/${$route.params.workspace}/analytics`"
            :class="buttonVariants({ variant: 'default' })"
          >
            View Analytics
            <IconArrowNarrowRight class="w-6 h-6 ml-2" />
          </RouterLink>
        </CardFooter>
      </Card>
    </div>
  </div>
</template>

<style scoped></style>
