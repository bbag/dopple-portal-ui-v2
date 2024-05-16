<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { IconCopy, IconDeviceFloppy, IconPencil } from '@tabler/icons-vue'

import { useModelsStore } from '@/stores/models'
const { shortId, workspace } = useRoute().params

const modelData = useModelsStore().models.find(
  (p) => p.shortId === shortId && p.workspace === workspace
)

const model = ref({
  modelName: modelData?.name || '',
  modelWorkspace: modelData?.workspace || ''
})

const isEditingModel = ref(false)
</script>

<template>
  <div class="grid sm:grid-cols-1 lg:grid-cols-2 gap-4 lg:grid-flow-col-dense items-start">
    <div class="grid w-full items-center gap-1.5">
      <Label for="model-name">Name</Label>
      <div class="relative">
        <Input
          id="model-name"
          type="text"
          placeholder="model_name"
          v-model="model.modelName"
          :disabled="!isEditingModel"
        />
        <Button
          size="icon-sm"
          variant="ghost"
          class="absolute right-1 top-1"
          v-if="!isEditingModel"
        >
          <IconCopy class="w-4 h-4" />
        </Button>
      </div>
    </div>
    <div class="grid w-full items-center gap-1.5">
      <Label for="model-workspace">Workspace</Label>
      <div class="relative">
        <Input
          id="model-workspace"
          type="text"
          placeholder="workspace"
          v-model="model.modelWorkspace"
          :disabled="!isEditingModel"
        />
        <Button
          size="icon-sm"
          variant="ghost"
          class="absolute right-1 top-1"
          v-if="!isEditingModel"
        >
          <IconCopy class="w-4 h-4" />
        </Button>
      </div>
    </div>
  </div>
  <div class="flex justify-end mt-4">
    <Button variant="secondary" v-if="!isEditingModel" @click="isEditingModel = true">
      <IconPencil class="w-5 h-5 mr-2" />
      Edit
    </Button>
    <Button v-if="isEditingModel" @click="isEditingModel = false">
      <IconDeviceFloppy class="w-5 h-5 mr-2" />
      Save
    </Button>
  </div>
</template>
