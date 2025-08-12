<script setup lang="ts">
import { codeToTokens } from 'shiki'
import { onMounted, ref, useTemplateRef } from 'vue'
import { IconCheck, IconClipboardCopy } from '@tabler/icons-vue'

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

const props = defineProps<{
  codeHtml: string
  shikiTheme: string
}>()

const shikiTokens = ref({
  bg: '#292D3E',
  fg: '#BABED8',
  themeName: props.shikiTheme
})

const codeBlock = useTemplateRef('code-block')
const copyState = ref<'default' | 'copied'>('default')
let timer: ReturnType<typeof setTimeout> | null = null

async function copyToClipboard() {
  if (codeBlock.value?.textContent) {
    await navigator.clipboard.writeText(codeBlock.value?.textContent)
    copyState.value = 'copied'

    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      copyState.value = 'default'
      timer = null
    }, 1000)
  }
}

onMounted(async () => {
  const {
    bg = '#292D3E',
    fg = '#BABED8',
    themeName = props.shikiTheme
  } = await codeToTokens('', {
    lang: 'html',
    theme: props.shikiTheme
  })
  shikiTokens.value = {
    bg,
    fg,
    themeName
  }
})
</script>
<template>
  <div class="relative">
    <pre
      class="overflow-x-auto"
      :class="['shiki', shikiTokens.themeName]"
      :style="{ backgroundColor: shikiTokens.bg, color: shikiTokens.fg }"
      ref="code-block"
      tabindex="0"
    ><code v-html="codeHtml"></code></pre>
    <Tooltip>
      <TooltipTrigger as-child>
        <button
          class="duration-200 absolute top-2 right-2 flex items-center justify-center h-8 w-8 border rounded transition-colors outline-none text-slate-200 border-slate-600 hover:bg-slate-500/20 hover:border-slate-500 focus-visible:border-slate-500 focus-visible:bg-slate-500/20"
          :class="{
            'text-emerald-300 bg-emerald-600/20 border-emerald-600 hover:bg-emerald-500/20 hover:border-emerald-500 focus-visible:border-emerald-500 focus-visible:bg-emerald-500/20':
              copyState === 'copied'
          }"
          @click="copyToClipboard"
        >
          <IconClipboardCopy
            class="duration-200 size-5 delay-100"
            :class="{ 'scale-0 delay-0': copyState === 'copied' }"
          />
          <IconCheck
            class="duration-200 size-5 absolute top-1 left-1 scale-0 transition-all"
            :class="{ 'scale-100 delay-100': copyState === 'copied' }"
          />
        </button>
      </TooltipTrigger>
      <TooltipContent class="max-w-64 text-sm" align="end" side="left">
        Copy to clipboard
      </TooltipContent>
    </Tooltip>
  </div>
</template>
