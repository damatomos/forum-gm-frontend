<script setup lang="ts">
interface TagProps {
  content: string
}

const { content } = defineProps<TagProps>()
</script>

<template>
  <span class="tag">{{ content }}</span>
</template>

<style scoped lang="scss">
.tag {
  background-color: $color-tag;
  color: $color-tag-text;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: $font-size-sm;
  text-wrap-mode: nowrap;
}
</style>
