<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'

const { workspace } = useRoute().params

import { useProductsStore } from '@/stores/products'
const { products } = useProductsStore()

const productsForCurrentWorkspace = products.filter((p) => p.workspace === workspace)

import Button from '@/components/ui/button/Button.vue'
import ProductTable from '@/components/blocks/product-table/ProductTable.vue'
import { columns } from '@/components/blocks/product-table/columns'

import IconPlusSmall from '@/assets/icons/plus-small.svg'
</script>

<template>
  <div class="p-8 max-w-[104rem] mx-auto">
    <header class="flex justify-between mb-2">
      <h1 class="text-3xl mb-4 font-bold">Products</h1>
      <Button>
        <IconPlusSmall class="mr-2 w-5 h-5" />
        Create Product
      </Button>
    </header>
    <ProductTable :data="productsForCurrentWorkspace" :columns="columns" />
  </div>
  <RouterView />
</template>

<style scoped></style>
