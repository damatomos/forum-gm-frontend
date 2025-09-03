<script setup lang="ts">
import gsap from 'gsap'
import { onMounted } from 'vue'

interface SkeletonProps {
  type?: 'card-topic'
}

const props = defineProps<SkeletonProps>()

onMounted(() => {
  gsap.to('.skeleton', {
    backgroundPosition: '200% 0',
    duration: 1.5,
    ease: 'linear',
    repeat: -1,
  })
})
</script>

<template>
  <div class="skeleton" :class="props.type"></div>
</template>

<style lang="scss" scoped>
.skeleton {
  display: inline-block;
  width: 100%;
  height: 260px;
  border-radius: 8px;
  background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
  background-size: 200% 100%;
}
</style>
