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
$purple-button: $gm-c-purple-polygon;
$red-button: $gm-c-red;

@mixin button-purple {
  background-color: $purple-button;
  &:hover {
    background-color: $gm-c-blue-polygon;
  }
}

button {
  width: 100%;
  font-size: $font-size-base;
  font-family: $gm-c-principal-font;
  font-weight: bold;
  color: $gm-c-white;
  border-radius: 6px;
  border: none;
  padding: 0.625rem 1rem;
  cursor: pointer;
}

.rose {
  background-color: $red-button;
  &:hover {
    background-color: $gm-c-red-dark;
  }
}

.purple {
  @include button-purple;
}

.button-auth {
  @include button-purple;
  font-size: $font-size-3xl;
}
</style>
