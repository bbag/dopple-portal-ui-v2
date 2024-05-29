<script lang="ts" setup>
import { ref } from 'vue'
import FileTreeNode from '../file-tree/FileTreeNode.vue'

const props = defineProps({
  nodes: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <ul>
    <FileTreeNode v-for="(node, index) in nodes" :key="index" :node="node" />
  </ul>
</template>
