<script setup lang="ts">
import HeaderComponent from '@/components/HeaderComponent.vue'
</script>

<template>
  <HeaderComponent />
  <main>
    <h1 ref="title">Hello World</h1>
  </main>
</template>

<style scoped lang="scss">
h1 {
  color: #42b983;
}
</style>
