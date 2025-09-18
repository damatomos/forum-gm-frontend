<script setup lang="ts">
import { checkAllRegexHealth } from './components/editor/utils/MarkdownRegex'

if (import.meta.env.DEV) {
  checkAllRegexHealth()
}
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
