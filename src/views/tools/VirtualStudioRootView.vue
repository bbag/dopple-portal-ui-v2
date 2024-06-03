<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useProductsStore } from '@/stores/products'

import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

import { IconSearch } from '@tabler/icons-vue'

const search = ref('')

const workspace = useRoute().params.workspace
const products = computed(() =>
  useProductsStore()
    .products.filter(
      (p) =>
        p.workspace === workspace &&
        p.title.toLocaleLowerCase().includes(search.value.toLowerCase())
    )
    .sort((a, b) => a.title.localeCompare(b.title))
)
</script>

<template>
  <div class="p-8 max-w-3xl mx-auto">
    <header class="flex justify-between gap-4 mb-8">
      <h1 class="text-3xl font-bold">Virtual Studio</h1>
    </header>
    <Card>
      <CardHeader>
        <CardDescription>
          <p>
            Virtual Studio lets you put together a digital photoshoot of your products, with any
            combination of configurations, camera angles, and environments you like.
          </p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p class="mb-2 font-semibold">Choose a product to get started:</p>
        <div class="relative mb-2">
          <Input v-model="search" placeholder="Search by title..." class="w-full pl-10" />
          <IconSearch
            class="w-5 h-5 pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Name</TableHead>
              <TableHead class="w-full"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="product in products" :key="product.id">
              <TableCell class="font-medium py-2 whitespace-nowrap">
                <RouterLink :to="`/w/${workspace}/studio/${product.name}`">
                  {{ product.title }}
                </RouterLink>
              </TableCell>
              <TableCell class="py-2 font-mono">{{ product.name }}</TableCell>
              <TableCell class="text-right py-2">
                <RouterLink
                  :to="`/w/${workspace}/studio/${product.name}`"
                  :class="buttonVariants({ variant: 'outline', size: 'xs' })"
                >
                  Open
                </RouterLink>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </div>
</template>

<style scoped></style>
