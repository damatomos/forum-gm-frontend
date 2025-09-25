<script setup lang="ts">
import CheckIcon from './icons/CheckIcon.vue';
import type { Component } from 'vue';

interface Props {
  icon: Component
  variant?: 'primary' | 'secondary' | 'tertiary'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  icon: CheckIcon
})
</script>

<template>
  <button :class="[props.variant]">
    <component :is="props.icon" />
  </button>
</template>

<style scoped lang="scss">
@mixin button-secondary {
  background-color: $secondary;

  &:hover {
    background-color: $secondary-hover;
  }
}

button {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: $font-size-base;
  font-family: $gm-c-principal-font;
  font-weight: bold;
  color: $gm-c-white;
  border-radius: 6px;
  border: none;
  padding: 8px;
  cursor: pointer;

  transition: all 0.2s linear;
}

.primary {
  background-color: $primary;

  &:hover {
    background-color: $primary-hover;
  }
}

.secondary {
  @include button-secondary;
}
</style>
