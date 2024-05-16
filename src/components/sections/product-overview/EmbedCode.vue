<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { codeToHtml } from 'shiki'
import { useClientStore } from '@/stores/client'

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const shikiTheme = 'material-theme-palenight'

const snippetVc = `<script src="https://builds.dopple.io/atlatl-visual-component/releases/current/index.js"><\/script>
<atlatl-visual client-id="${useClientStore().client.clientId}">
  <av-product name="${useRoute().params.name}" namespace="${useRoute().params.workspace}"></av-product>
</atlatl-visual>`

const snippetApiHtml = `<script src="https://builds.dopple.io/atlatl-visual-api/releases/current/index.js"><\/script>
<canvas id="dopple-canvas" touch-action="none"></canvas>`

const snippetApiJs = `async function loadDopple() {
    // Get the <canvas> element to render the 3D product onto
    const renderCanvas = document.getElementById('my-canvas');
    const visual = new Atlatl.Visual(renderCanvas);
    
    // Replace with your client ID here
    await visual.initClient('${useClientStore().client.clientId}');

    // Create and load the ProductTemplate
    const template = new Atlatl.ProductTemplate(visual, '${useRoute().params.workspace}', '${useRoute().params.name}');
    await template.load();

    // Create the Product instance
    const myProduct = new Atlatl.Product(template);
    
    // Hide the loading screen to show the product once the product is ready
    await myProduct.ready();
    visual.loadingScreen.hide();
});`

const codeVc = ref('')
const codeApiHtml = ref('')
const codeApiJs = ref('')

onMounted(async () => {
  codeVc.value = await codeToHtml(snippetVc, {
    lang: 'html',
    theme: shikiTheme
  })
  codeApiHtml.value = await codeToHtml(snippetApiHtml, {
    lang: 'html',
    theme: shikiTheme
  })
  codeApiJs.value = await codeToHtml(snippetApiJs, {
    lang: 'javascript',
    theme: shikiTheme
  })
})
</script>

<template>
  <Tabs default-value="vc">
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
  </Tabs>
</template>

<style></style>
