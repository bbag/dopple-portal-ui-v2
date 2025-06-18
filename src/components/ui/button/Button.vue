<!-- <script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Primitive, type PrimitiveProps } from 'radix-vue'
import { type ButtonVariants, buttonVariants } from '.'
import { cn } from '@/lib/utils'

interface Props extends PrimitiveProps {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
})
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size }), props.class)"
  >
    <slot />
  </Primitive>
</template> -->

<script setup lang="ts">
import { Primitive, type PrimitiveProps } from 'reka-ui'
import { twMerge } from 'tailwind-merge'
import { type HTMLAttributes, computed } from 'vue'
import { type ButtonVariants, buttonVariants } from '.'

import { IconCheck, IconExclamationCircle, IconLoader2 } from '@tabler/icons-vue'

interface Props extends PrimitiveProps {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  class?: HTMLAttributes['class']
  state?: 'default' | 'loading' | 'success' | 'error'
}

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
  state: 'default'
})

const iconComponent = computed(() => {
  switch (props.state) {
    case 'success':
      return IconCheck
    case 'loading':
      return IconLoader2
    case 'error':
      return IconExclamationCircle
    default:
      return null
  }
})
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="
      twMerge(
        buttonVariants({ variant, size }),
        props.class,
        state === 'loading' && 'cursor-progress'
      )
    "
  >
    <span
      :class="
        twMerge(
          'inline-flex items-center justify-center whitespace-nowrap transition-all duration-200',
          ['loading', 'success', 'error'].includes(state) && 'opacity-0'
        )
      "
    >
      <slot />
    </span>
    <span v-if="iconComponent" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <component
        :is="iconComponent"
        :class="twMerge('inline w-5 h-5', state === 'loading' && 'animate-spin')"
      />
    </span>
  </Primitive>
</template>
