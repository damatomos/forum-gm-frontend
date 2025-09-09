<script setup lang="ts">
import HeaderComponent from '@/components/HeaderComponent.vue'
</script>

<template>
  <HeaderComponent />
  <main>
    <div class="background"></div>
  </main>
</template>

<style scoped lang="scss">
main {
  position: relative;
  margin: 0 auto;
  width: 100%;
  min-height: calc(100dvh - 50px);
  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;

    clip-path: polygon(0% 0%, 20% 0%, 55% 100%, 0% 100%);

    background-color: $color-pink;
  }
}
</style>
