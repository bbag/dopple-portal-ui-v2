<script setup lang="ts">
import type { Measurable } from 'node_modules/radix-vue/dist/Popper/PopperRoot'
import type { Component } from 'vue'
import { computed, onMounted, ref, toRaw, useTemplateRef, watch } from 'vue'
import { PopoverAnchor, PopoverRoot, PopoverTrigger, useForwardPropsEmits } from 'radix-vue'
import type { PopoverRootEmits, PopoverRootProps } from 'radix-vue'
import { TourContent } from './'

import { useEditorTourStore } from '../../../stores/editorTour'
const tourStore = useEditorTourStore()

interface Step {
  el: string
  title: string
  content: Component | string
}

const props = defineProps<PopoverRootProps & { steps?: Step[], testRef?: any }>()
const emits = defineEmits<PopoverRootEmits>()
const forwarded = useForwardPropsEmits(props, emits)

const currentStep = ref(0)

function handleClick(i: number) {
  console.log('clicked')
  // console.log(anchorElements)
}

const targetRef = useTemplateRef('foo')
const elementRef = {
  getBoundingClientRect: () => targetRef.value?.getBoundingClientRect() ?? new DOMRect(),
}

const temp = ref()

onMounted(() => {
  console.log('--- here ---')
  temp.value = elementRef
  console.log(elementRef)
  console.log(toRaw(temp.value))
})

</script>

<template>
  <div class="m-32">
    Some content <span ref="foo" class="text-emerald-500">here</span> to test custom anchor positioning.
  </div>
  <PopoverRoot v-bind="forwarded">
    <slot />
    <PopoverAnchor :element="elementRef" />
    <!-- <PopoverAnchor :element="toRaw(temp)" /> -->
    <TourContent v-if="props.steps">
      <div v-for="(step, i) in props.steps" :key="i">
        {{ step.title }} - {{ step.el }}
        <button @click="() => handleClick(i)">Test</button>
      </div>
    </TourContent>
  </PopoverRoot>
</template>
