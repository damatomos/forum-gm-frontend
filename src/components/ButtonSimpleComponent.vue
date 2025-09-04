<script setup lang="ts">
interface Props {
  content: string
  variant?: 'purple' | 'rose' | 'button-auth'
}

const props = defineProps<Props>()
</script>

<template>
  <button :class="[props.variant ? variant : 'common']">
    {{ content }}
  </button>
</template>

<style scoped lang="scss">
</style>