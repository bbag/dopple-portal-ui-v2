<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import LayoutMain from '@/components/layouts/LayoutMain.vue'
</script>

<template>
  <LayoutMain :hide-sidebar="useRoute().meta.hideSideNav ? true : false">
    <RouterView />
  </LayoutMain>
</template>

<style scoped></style>
