<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { useModelsStore } from '@/stores/models'

import { Badge } from '@/components/ui/badge'

import { IconCircleCheck } from '@tabler/icons-vue'

defineProps<{
  draftVersion?: number
  publishedVersion?: number
}>()

const model = useModelsStore().models.find((p) => p.shortId === useRoute().params.shortId)
const thumbnail = model?.thumbnail
</script>

<template>
  <div
    class="aspect-[4/3] bg-no-repeat bg-contain bg-center relative"
    :style="{ backgroundImage: `url(${thumbnail})` }"
  >
    <div class="absolute top-6 right-0 flex items-center gap-2">
      <Badge v-if="publishedVersion" variant="outline">
        <IconCircleCheck class="w-4 h-4 mr-2" />
        Published v{{ publishedVersion }}
      </Badge>
      <Badge variant="outline">{{ `Draft v${draftVersion}` || 'Unknown' }}</Badge>
    </div>
  </div>
</template>
