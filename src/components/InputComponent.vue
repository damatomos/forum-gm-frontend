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
      :class="[props.variant ? props.variant : 'one']"
      type="text"
      :placeholder="placeholder"
      :maxlength="maxLength"
      :id="props.id"
    />
    <img v-if="props.variant === 'two'" src="/icons/PaperPlaneRight.svg" alt="button push" />
    <span v-if="props.variant === 'three'">{{ textInput.length }}/{{ maxLength }}</span>
  </div>
</template>

<style scoped lang="scss"></style>
