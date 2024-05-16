<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useProductsStore } from '@/stores/products'

import { Card } from '@/components/ui/card'

const product = useProductsStore().products.find(
  (product) => product.name === useRoute().params.name
)
const thumbnail = product?.thumbnail
</script>

<template>
  <div class="h-full grid grid-cols-[minmax(0,_1fr)_32rem]">
    <div class="p-8">
      <Card
        class="w-full h-full bg-no-repeat bg-contain bg-center relative"
        :style="{ backgroundImage: `url(${thumbnail})` }"
      ></Card>
    </div>
    <div class="bg-background border-l p-8 space-y-4 overflow-y-auto">
      <h1 class="text-2xl font-bold">UI Builder</h1>
      <p>Product: {{ product?.name }}</p>
      <p>This UI will change <em>drastically</em> soon... this is just a placeholder for now.</p>
    </div>
  </div>
</template>

<style scoped></style>
