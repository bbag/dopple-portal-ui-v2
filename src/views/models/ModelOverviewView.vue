<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import SectionPreview from '@/components/sections/model-overview/ModelPreview.vue'
import SectionDetails from '@/components/sections/model-overview/ModelDetails.vue'
import SectionVersionHistory from '@/components/sections/model-overview/VersionHistory.vue'
import SectionAssets from '@/components/sections/model-overview/ModelAssets.vue'
import SectionManage from '@/components/sections/model-overview/ManageModel.vue'

import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

import { IconEyeCode, IconSlideshow, IconStar, IconStarFilled } from '@tabler/icons-vue'
import IconGltfEditor from '@/assets/icons/gltf-editor.svg'

import { toast } from 'vue-sonner'

import { useModelsStore } from '@/stores/models'
const { shortId, workspace } = useRoute().params

const modelData = useModelsStore().models.find(
  (p) => p.shortId === shortId && p.workspace === workspace
)

const model = ref({
  modelName: modelData?.name,
  modelWorkspace: modelData?.workspace
})

const modelVersions = ref(modelData?.versions.reverse() || [])
const currentModelVersion = ref(
  modelVersions.value
    .find((v) => v.draftVersion !== null && v.publishedVersion)
    ?.draftVersion?.toString() || 'Unknown'
)

interface SectionData {
  title?: string
  linkId: string
  component: any
  description?: string
}

const modelOverviewSections: SectionData[] = [
  {
    linkId: 'preview',
    component: SectionPreview
  },
  {
    title: 'Model Details',
    linkId: 'model-details',
    component: SectionDetails,
    description: `ID: ${modelData?.id}`
  },
  {
    title: 'Version History',
    linkId: 'version-history',
    component: SectionVersionHistory
  },
  {
    title: 'Assets',
    linkId: 'assets',
    component: SectionAssets,
    description: 'Any assets (materials and textures) that are associated with this model.'
  },
  {
    title: 'Manage',
    linkId: 'manage',
    component: SectionManage
  }
]

function scrollToSection(linkId: string) {
  const sectionElement = document.getElementById(linkId)

  if (sectionElement) {
    sectionElement.scrollIntoView({ behavior: 'smooth' })
  }
}

function toggleIsFavorite() {
  console.log('toggling favorite')
  if (!modelData) return
  if (modelData?.isFavorite) {
    modelData.isFavorite = false
    toast('✖ Removed from favorites.', {
      description: `${modelData.name} has been removed from your favorites.`
      // action: {
      //   label: 'Undo',
      //   onClick: () => console.log('Undo')
      // }
    })
  } else if (!modelData?.isFavorite) {
    modelData.isFavorite = true
    toast('⭐ Added to favorites!', {
      description: `${modelData.name} has been added to your favorites.`
      // action: {
      //   label: 'Undo',
      //   onClick: () => console.log('Undo')
      // }
    })
  }
}
</script>

<template>
  <div id="model-overview" class="p-8 overflow-x-hidden overflow-y-auto">
    <div class="max-w-5xl mx-auto grid gap-8 grid-cols-[minmax(0,_1fr)_auto]">
      <div class="text-sm order-last">
        <ul class="sticky top-0">
          <li class="mb-2 font-bold border-b pb-2">Sections:</li>
          <li v-for="button in modelOverviewSections" :key="button.linkId">
            <button @click="scrollToSection(button.linkId)">{{ button.title }}</button>
          </li>
        </ul>
      </div>
      <div class="order-first grid gap-4">
        <header class="flex gap-4 items-center justify-between">
          <h1 class="text-3xl font-bold">{{ modelData?.name }}</h1>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger as-child>
                <Button variant="ghost" size="icon-xs" @click="toggleIsFavorite">
                  <IconStarFilled
                    v-if="modelData?.isFavorite"
                    class="w-5 h-5 text-amber-400 hover:text-amber-500"
                  />
                  <IconStar v-else class="w-5 h-5 text-slate-400 hover:text-slate-600" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Favorite</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </header>
        <div class="flex flex-wrap gap-4 justify-between">
          <Select id="model-status" v-model="currentModelVersion">
            <SelectTrigger class="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  v-for="(version, i) in modelVersions"
                  :key="(version.draftVersion || '') + i.toString()"
                  :value="version.draftVersion?.toString() || 'Unknown'"
                >
                  {{ `Draft v${version.draftVersion}` || 'Unknown Version' }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <div class="flex flex-wrap gap-4">
            <RouterLink
              :to="`/w/${workspace}/editor/${shortId}`"
              :class="buttonVariants({ variant: 'outline' })"
            >
              <IconGltfEditor class="w-6 h-6 mr-2" />
              Open in glTF Editor
            </RouterLink>
          </div>
        </div>
        <Card
          v-for="section in modelOverviewSections"
          :key="section.linkId"
          :id="section.linkId"
          class="overflow-hidden"
        >
          <CardHeader v-if="section.title">
            <CardTitle>{{ section.title }}</CardTitle>
            <CardDescription v-if="section.description">{{ section.description }}</CardDescription>
          </CardHeader>
          <CardContent>
            <component
              :is="section.component"
              :draft-version="currentModelVersion"
              :published-version="
                modelVersions.find((v) => v.draftVersion === +currentModelVersion)?.publishedVersion
              "
            />
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
