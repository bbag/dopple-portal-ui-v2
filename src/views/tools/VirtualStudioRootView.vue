<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useProductsStore } from '@/stores/products'

import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

const workspace = useRoute().params.workspace
// const product = useRoute().params.name
const products = useProductsStore().products.filter((p) => p.workspace === workspace)
</script>

<template>
  <div class="p-8 max-w-[104rem] mx-auto">
    <header class="flex justify-between gap-4 mb-8">
      <h1 class="text-3xl font-bold">Virtual Studio</h1>
    </header>
    <Card>
      <CardHeader>
        <CardTitle>Products</CardTitle>
        <CardDescription>
          <div class="w-max text-xs text-rose-600 bg-rose-600/10 px-3 py-2 mt-1 rounded">
            <em>THIS IS JUST A PLACEHOLDER SCREEN — IT'S STILL A WORK-IN-PROGRESS!</em>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul class="space-y-0">
          <li v-for="product in products" :key="product.id">
            <RouterLink
              :to="`/w/${workspace}/studio/${product.name}`"
              :class="buttonVariants({ variant: 'link', size: 'sm' })"
            >
              {{ product.title }}
            </RouterLink>
          </li>
        </ul>
      </CardContent>
    </Card>
  </div>
</template>

<style scoped></style>
