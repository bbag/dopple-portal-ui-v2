<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
// import { Primitive, type PrimitiveProps } from 'radix-vue'
import { RouterLink } from 'vue-router'
import { cn } from '@/lib/utils'

// const props = withDefaults(defineProps<PrimitiveProps & { class?: HTMLAttributes['class'] }>(), {
//   as: 'a'
// })

const props = withDefaults(
  defineProps<{
    href: string
    class?: HTMLAttributes['class']
  }>(),
  {}
)
</script>

<template>
  <!-- <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn('transition-colors hover:text-foreground', props.class)"
  >
    <slot />
  </Primitive> -->
  <RouterLink :class="cn('transition-colors hover:text-foreground', props.class)" :to="props.href">
    <slot />
  </RouterLink>
</template>
