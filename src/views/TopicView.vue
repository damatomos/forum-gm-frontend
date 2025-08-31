<script setup lang="ts"></script>

<template>
  <main>
    <h1 ref="title">Tópico: {{ $route.params.id }}</h1>
  </main>
</template>

<style scoped lang="scss">
h1 {
  color: #42b983;
}
</style>
