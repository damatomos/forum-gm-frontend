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
@mixin polygon-top {
  clip-path: polygon(0 0, 56% 0, 100% 100%, 0 89%);
  position: fixed;
  top: 0;
  z-index: 100;
}

@mixin polygon-bottom {
  clip-path: polygon(0 46%, 100% 0, 54% 100%, 0 100%);
  position: fixed;
  bottom: 0;
  z-index: 100;
}

@mixin reverse-bottom {
  transform: scaleX(-1);
  right: 0;
}

.container-polygons {
  position: relative;
  width: 100%;
  z-index: -999;

  .polygon {
    width: 850px;
    height: 434px;
  }

  .one {
    @include polygon-top;
    background-color: $gm-c-rose-polygon;
  }

  .two {
    @include polygon-bottom;
    background-color: $gm-c-yellow-polygon;
  }

  .three {
    @include polygon-top;
    @include reverse-bottom;
    background-color: $gm-c-purple-polygon;
  }

  .four {
    @include polygon-bottom;
    @include reverse-bottom;
    background-color: $gm-c-blue-polygon;
  }

  @media (max-width: 1350px) {
    .polygon {
      width: 680px;
    }
  }

  @media (max-width: 1100px) {
    .polygon {
      width: 545px;
    }
  }

  @media (max-width: 900px) {
    .polygon {
      width: 430px;
    }
  }

  @media (max-width: 730px) {
    .polygon {
      width: 350px;
    }
  }

  @media (max-width: 590px) {
    .polygon {
      width: 300px;
    }
  }

  @media (max-width: 470px) {
    .polygon {
      width: 230px;
    }
  }

  @media (max-width: 380px) {
    .polygon {
      width: 180px;
    }
  }
}
</style>
