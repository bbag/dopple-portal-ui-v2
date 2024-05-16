<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

import { IconCopy, IconDeviceFloppy, IconPencil } from '@tabler/icons-vue'

import { useProductsStore } from '@/stores/products'
const { name, workspace } = useRoute().params

const productData = useProductsStore().products.find(
  (p) => p.name === name && p.workspace === workspace
)

const product = ref({
  prodTitle: productData?.title || '',
  prodName: productData?.name || '',
  prodWorkspace: productData?.workspace || '',
  prodDescription: productData?.description || ''
})

const isEditingProduct = ref(false)
</script>

<template>
  <div class="grid sm:grid-cols-1 lg:grid-cols-2 gap-4 lg:grid-flow-col-dense items-start">
    <div class="grid w-full items-center gap-1.5">
      <Label for="product-title">Title</Label>
      <div class="relative">
        <Input
          id="product-title"
          type="text"
          placeholder="My Product"
          v-model="product.prodTitle"
          :disabled="!isEditingProduct"
        />
        <Button
          size="icon-sm"
          variant="ghost"
          class="absolute right-1 top-1"
          v-if="!isEditingProduct"
        >
          <IconCopy class="w-4 h-4" />
        </Button>
      </div>
    </div>
    <div class="grid w-full items-center gap-1.5">
      <Label for="product-name">Name</Label>
      <div class="relative">
        <Input
          id="product-name"
          type="text"
          placeholder="product_name"
          v-model="product.prodName"
          :disabled="!isEditingProduct"
        />
        <Button
          size="icon-sm"
          variant="ghost"
          class="absolute right-1 top-1"
          v-if="!isEditingProduct"
        >
          <IconCopy class="w-4 h-4" />
        </Button>
      </div>
    </div>
    <div class="grid w-full items-center gap-1.5">
      <Label for="product-workspace">Workspace</Label>
      <div class="relative">
        <Input
          id="product-workspace"
          type="text"
          placeholder="workspace"
          v-model="product.prodWorkspace"
          :disabled="!isEditingProduct"
        />
        <Button
          size="icon-sm"
          variant="ghost"
          class="absolute right-1 top-1"
          v-if="!isEditingProduct"
        >
          <IconCopy class="w-4 h-4" />
        </Button>
      </div>
    </div>
    <div class="grid w-full items-center gap-1.5 row-span-3">
      <Label for="product-description">Description</Label>
      <Textarea
        id="product-description"
        class="h-24 lg:h-48"
        v-model="product.prodDescription"
        :disabled="!isEditingProduct"
      />
    </div>
  </div>
  <div class="flex justify-end mt-4">
    <Button variant="secondary" v-if="!isEditingProduct" @click="isEditingProduct = true">
      <IconPencil class="w-5 h-5 mr-2" />
      Edit
    </Button>
    <Button v-if="isEditingProduct" @click="isEditingProduct = false">
      <IconDeviceFloppy class="w-5 h-5 mr-2" />
      Save
    </Button>
  </div>
</template>
