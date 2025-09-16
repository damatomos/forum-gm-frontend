<script setup lang="ts"></script>

<template>
  <div class="container-polygons">
    <div class="polygon one"></div>
    <div class="polygon two"></div>
    <div class="polygon three"></div>
    <div class="polygon four"></div>
  </div>
</template>

<style scoped lang="scss">
.container-polygons {
  width: 100%;
  height: 100%;
  min-height: 100vh;

  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  overflow: hidden;

  .polygon {
    position: absolute;
    min-width: 100%;
    max-width: 120%;
    min-height: 100%;
    max-height: 120%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    aspect-ratio: 16 / 9;
  }

  .one {
    clip-path: polygon(0 0, 30% 0%, 50% 50%, 0 48%);
    background-color: $gm-c-rose-polygon;
  }

  .two {
    clip-path: polygon(0% 80%, 50% 50%, 36% 100%, 0 100%);
    background-color: $gm-c-yellow-polygon;
  }

  .three {
    clip-path: polygon(50% 50%, 60% 0%, 100% 0%, 100% 30%);
    background-color: $gm-c-purple-polygon;
  }

  .four {
    clip-path: polygon(50% 50%, 100% 80%, 100% 100%, 64% 100%);
    background-color: $gm-c-blue-polygon;
  }
}
</style>
