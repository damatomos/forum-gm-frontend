<script setup lang="ts">
import ButtonBaseComponent from './ButtonBaseComponent.vue'
import GMPointIcon from './icons/GMPointIcon.vue'

function handleSignIn() {
  console.log('Clicked')
}
</script>

<template>
  <header class="header">
    <span class="logo">ForumGM</span>
    <span class="gm-points"> <GMPointIcon />850</span>
    <ButtonBaseComponent title="Sign In" variant="primary" @click="handleSignIn" />
  </header>
</template>

<style scoped lang="scss">
.header {
  width: 100%;
  height: 50px;
  background-color: $gm-c-purple;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 32px;
}

.logo {
  font-size: $font-size-3xl;
  font-weight: bold;
  color: white;
}

.gm-points {
  font-size: $font-size-3xl;
  color: $gm-c-yellow;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>
