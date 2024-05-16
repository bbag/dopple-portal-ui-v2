<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import SectionPreview from '@/components/sections/product-overview/ProductPreview.vue'
import SectionDetails from '@/components/sections/product-overview/ProductDetails.vue'
import SectionAnalytics from '@/components/sections/product-overview/ProductAnalytics.vue'
import SectionVersionHistory from '@/components/sections/product-overview/VersionHistory.vue'
import SectionAssets from '@/components/sections/product-overview/ProductAssets.vue'
import SectionEmbedCode from '@/components/sections/product-overview/EmbedCode.vue'
import SectionManage from '@/components/sections/product-overview/ManageProduct.vue'

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
import IconUiBuilder from '@/assets/icons/ui-builder.svg'

import { toast } from 'vue-sonner'

import { useProductsStore } from '@/stores/products'
const { name, workspace } = useRoute().params

const productData = useProductsStore().products.find(
  (p) => p.name === name && p.workspace === workspace
)

const product = ref({
  prodName: productData?.name,
  prodWorkspace: productData?.workspace
})

const productVersions = ref(productData?.versions.reverse() || [])
const currentProductVersion = ref(
  productVersions.value
    .find((v) => v.draftVersion !== null && v.publishedVersion)
    ?.draftVersion?.toString() || 'Unknown'
)

interface SectionData {
  title?: string
  linkId: string
  component: any
  description?: string
}

const productOverviewSections: SectionData[] = [
  {
    linkId: 'preview',
    component: SectionPreview
  },
  {
    title: 'Product Details',
    linkId: 'product-details',
    component: SectionDetails,
    description: `ID: ${productData?.id}`
  },
  {
    title: 'Analytics',
    linkId: 'analytics',
    component: SectionAnalytics
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
    description: 'Any assets (models, materias, textures) that are associated with this product.'
  },
  {
    title: 'Embed Code',
    linkId: 'embed-code',
    component: SectionEmbedCode,
    description:
      'Copy/paste the code below into your page’s HTML/JavaScript to display this product.'
  },
  {
    title: 'Manage',
    linkId: 'manage',
    component: SectionManage
  }
]

const quickJumpSections = productOverviewSections.filter(
  (section) => section.title && section.linkId
)

function scrollToSection(linkId: string) {
  const sectionElement = document.getElementById(linkId)

  if (sectionElement) {
    sectionElement.scrollIntoView({ behavior: 'smooth' })
  }
}

function toggleIsFavorite() {
  console.log('toggling favorite')
  if (!productData) return
  if (productData?.isFavorite) {
    productData.isFavorite = false
    toast('✖ Removed from favorites.', {
      description: `${productData.title} has been removed from your favorites.`
      // action: {
      //   label: 'Undo',
      //   onClick: () => console.log('Undo')
      // }
    })
  } else if (!productData?.isFavorite) {
    productData.isFavorite = true
    toast('⭐ Added to favorites!', {
      description: `${productData.title} has been added to your favorites.`
      // action: {
      //   label: 'Undo',
      //   onClick: () => console.log('Undo')
      // }
    })
  }
}
</script>

<template>
  <div id="product-overview" class="p-8 overflow-x-hidden overflow-y-auto">
    <div class="max-w-5xl mx-auto grid gap-8 grid-cols-[minmax(0,_1fr)_auto]">
      <div class="text-sm order-last">
        <Card class="sticky top-0 px-4 pt-3 pb-2">
          <div class="font-bold border-b pb-2 mb-3">Jump to:</div>
          <button
            v-for="button in quickJumpSections"
            :key="button.linkId"
            @click="scrollToSection(button.linkId)"
            class="block py-0.5 hover:text-blue-500 dark:hover:text-blue-200 transition-colors"
          >
            {{ button.title }}
          </button>
        </Card>
      </div>
      <div class="order-first grid gap-4">
        <header class="flex gap-4 items-center justify-between">
          <h1 class="text-3xl font-bold">{{ productData?.title }}</h1>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger as-child>
                <Button variant="ghost" size="icon-xs" @click="toggleIsFavorite">
                  <IconStarFilled
                    v-if="productData?.isFavorite"
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
        <Card
          v-for="section in productOverviewSections"
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
              :draft-version="currentProductVersion"
              :published-version="
                productVersions.find((v) => v.draftVersion === +currentProductVersion)
                  ?.publishedVersion
              "
            />
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
