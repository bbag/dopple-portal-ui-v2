<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { codeToHtml } from 'shiki'
import { useClientStore } from '@/stores/client'

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const shikiTheme = 'material-theme-palenight'

const snippet = ref('')

const snippetRaw = `<div>
    <div id="dopple-canvas"></div>
    <div id="loader"></div>
</div>

<script type="module">
    import { DoppleXR } from 'https://www.dopple.io/path/to/script.js'

    // Replace with your default selection
    const selection = {}

    // Initialize Dopple
    const dopple = new DoppleXR({
        container: document.getElementById('dopple-canvas'),
        selection,
        owner: 'dopple',
        workspace: '${useRoute().params.workspace}',
        projectName: '${useRoute().params.name}'
        productVersion: '2',
    })

    await dopple.load()
    dopple.run()

    // Handle any loading events and logic for your UI
    dopple.loadingManager.onProgress = (_url, loaded, total) => {
        document.getElementById('loader').innerHTML = Math.round((loaded / total) * 100)} + '%'
    }
    dopple.loadingManager.onLoad = () => {
        document.getElementById('loader').innerHTML = ''
    }

    dopple.resize()
    dopple.animate()
<\/script>`

onMounted(async () => {
  snippet.value = await codeToHtml(snippetRaw, {
    lang: 'html',
    theme: shikiTheme
  })
})
</script>

<template>
  <div v-html="snippet"></div>
  <!-- <Tabs default-value="vc">
    <TabsList class="grid grid-cols-2 w-full">
      <TabsTrigger value="vc"> Visual Component </TabsTrigger>
      <TabsTrigger value="api"> Visual API </TabsTrigger>
    </TabsList>
    <TabsContent value="vc">
      <span class="text-sm font-medium">HTML:</span>
      <ScrollArea class="border rounded-md w-full whitespace-nowrap">
        <div v-html="codeVc"></div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </TabsContent>
    <TabsContent value="api" class="grid grid-cols-1 gap-2">
      <div>
        <span class="text-sm font-medium">HTML:</span>
        <ScrollArea class="border rounded-md w-full whitespace-nowrap">
          <div v-html="codeApiHtml"></div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      <div>
        <span class="text-sm font-medium">JavaScript:</span>
        <ScrollArea class="border rounded-md w-full whitespace-nowrap">
          <div v-html="codeApiJs"></div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </TabsContent>
  </Tabs> -->
</template>

<style></style>
