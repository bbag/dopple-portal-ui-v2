<script setup lang="ts">
import { computed, ref, useTemplateRef } from 'vue';
import type { Component } from 'vue';

import { Button } from '../button'

import {
  DialogRoot,
  type DialogRootEmits,
  type DialogRootProps,
  useForwardPropsEmits
} from 'radix-vue'

import {
  TourContent,
  TourDescription,
  TourFooter,
  TourHeader,
  TourTitle,
  TourTrigger,
} from '.'

interface Step {
  content: Component | string
  description?: string
  target: string
  title: string
}

const props = defineProps<DialogRootProps & { steps?: Step[] }>()
const emits = defineEmits<DialogRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)

const currentStep = ref(0)

const isNotFirstStep = computed(() => currentStep.value > 0)
const isNotLastStep = computed(() => currentStep.value < props.steps.length - 1)

const closeButton = useTemplateRef('close-button')

function incrementStep() {
  if (isNotLastStep.value) {
    currentStep.value++
  } else {
    closeButton.value?.$el.click()
  }
}

function handleOpenChange(openState: boolean) {
  if (openState === true) currentStep.value = 0 
}
</script>

<template>
  <DialogRoot v-bind="forwarded" @update:open="(state) => handleOpenChange(state)">
    <slot />
    <TourContent v-if="props.steps" class="w-sm">
      <TourHeader>
        <TourTitle>
          {{ props.steps[currentStep].title }}
        </TourTitle>
        <TourDescription v-if="props.steps[currentStep].description">
          {{ props.steps[currentStep].description }}
        </TourDescription>
      </TourHeader>
      <div>
        <span v-if="typeof props.steps[currentStep].content === 'string'">{{ props.steps[currentStep].content }}</span>
        <component v-else :is="props.steps[currentStep].content" />
      </div>
      <TourFooter class="flex items-center sm:justify-between gap-2">
        <TourTrigger as-child>
          <Button class="w-[4.5rem] hidden sm:flex" size="sm" variant="secondary" ref="close-button">
            Skip
          </Button>
        </TourTrigger>
        <div class="flex gap-1.5 order-1 sm:order-2 pb-2 sm:pt-2">
          <span
            class="h-1.5 rounded-full transition-all duration-500"
            :class="currentStep === index ? 'w-6 bg-blue-500' : 'w-1.5 bg-slate-500/20'"
            v-for="(_, index) in props.steps"
            :key="index"
          ></span>
        </div>
        <div class="w-full sm:w-auto flex gap-2 sm:order-last">
          <Button
            class="w-full sm:w-[4.5rem]"
            @click="isNotFirstStep ? currentStep-- : null"
            size="sm"
            variant="secondary"
            :disabled="!isNotFirstStep"
          >
            Back
          </Button>
          <Button
            class="w-full sm:w-[4.5rem]"
            @click="incrementStep"
            size="sm"
            variant="blue"
          >
            {{ isNotLastStep ? 'Next' : 'Close' }}
          </Button>
        </div>
      </TourFooter>
    </TourContent>
  </DialogRoot>
</template>
