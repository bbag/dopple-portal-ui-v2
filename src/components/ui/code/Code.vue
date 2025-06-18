<script setup lang="ts">
import { twMerge } from "tailwind-merge";
import type { HTMLAttributes } from "vue";

const props = defineProps<{
	class?: HTMLAttributes["class"];
}>();
</script>

<template>
	<code :class="twMerge('bg-accent px-1.5 py-0.5 rounded', props.class)">
		<slot />
	</code>
</template>
