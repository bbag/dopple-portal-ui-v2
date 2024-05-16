<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'

const { workspace } = useRoute().params

import Button from '@/components/ui/button/Button.vue'

import IconPlusSmall from '@/assets/icons/plus-small.svg'
</script>

<template>
  <div class="p-8">
    <header class="flex justify-between mb-2">
      <h1 class="text-3xl mb-4 font-bold">Materials</h1>
      <Button>
        <IconPlusSmall class="mr-2 w-5 h-5" />
        Create Material
      </Button>
    </header>
    <p>Coming soon...</p>
  </div>
  <RouterView />
</template>

<style scoped></style>
