<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useModelsStore } from '@/stores/models'

import { Card } from '@/components/ui/card'

const model = useModelsStore().models.find((model) => model.shortId === useRoute().params.shortId)
const thumbnail = model?.thumbnail
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
      <h1 class="text-2xl font-bold">glTF Editor</h1>
      <p>Model: {{ model?.name }}</p>
      <p>This UI will change <em>drastically</em> soon... this is just a placeholder for now.</p>
    </div>
  </div>
</template>

<style scoped></style>
