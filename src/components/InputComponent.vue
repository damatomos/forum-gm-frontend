<script setup lang="ts">
import { ref } from 'vue'
interface Props {
  label?: string
  id?: string
  variant?: 'one' | 'two' | 'three'
  placeholder?: string
  maxLength?: number | string
}

const textInput = ref('')
const props = defineProps<Props>()
</script>

<template>
  <label :for="props.id">{{ label }}</label>
  <div class="container-input">
    <input
      v-model="textInput"
      :class="[variant ? variant : 'one']"
      type="text"
      :placeholder="placeholder"
      :maxlength="maxLength"
      :id="props.id"
    />
    <img v-if="props.variant === 'two'" src="/icons/PaperPlaneRight.svg" alt="button push" />
    <span v-if="props.variant === 'three'">{{ textInput.length }}/{{ maxLength }}</span>
  </div>
</template>

<style scoped lang="scss">
label {
  color: gm-c-text-light-1;
  font-size: $font-family;
  font-size: $font-size-xl;
  margin-bottom: 0.625rem;
}

.container-input {
  max-width: fit-content;
  position: relative;

  input {
    width: 100%;
    font-size: $font-size-xl;
    color: $gm-c-divider-light-2;
    background-color: $gm-c-white-soft;
    border-style: none;
    outline: none;
    border-radius: 6px;
    position: relative;
  }

  .one {
    padding: 0.625rem 1rem;
  }

  .two {
    padding: 0.625rem 3rem 0.625rem 1rem;
  }

  .three {
    border: 1px solid $gm-c-divider-light-2;
    padding: 0.625rem 4rem 0.625rem 1rem;
  }

  img {
    height: 24px;
    width: 24px;
    position: absolute;
    top: 0.625rem;
    right: 1rem;
    cursor: pointer;
  }

  span {
    color: $gm-c-divider-light-2;
    position: absolute;
    bottom: 0;
    right: 0.625rem;
  }
}
</style>
