<script setup lang="ts">
import gsap from 'gsap'
import { ref } from 'vue'

interface ButtonProps {
  title: string
  variant?: 'primary' | 'secondary' | 'danger'
}

withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
})

const emit = defineEmits<{
  (e: 'click'): void
}>()

const btnRef = ref<HTMLElement | null>(null)

function handleClick() {
  emit('click')
}

function onDown() {
  if (!btnRef.value) return
  gsap.to(btnRef.value, {
    scaleX: 1,
    scaleY: 1,
    duration: 0.3,
    ease: 'elastic.out(1, 0.3)',
  })
}

function onUp() {
  if (!btnRef.value) return
  gsap.to(btnRef.value, {
    scaleX: 1.1,
    scaleY: 0.9,
    duration: 0.2,
    ease: 'elastic.out(1, 0.5)',
  })
}

function onHover() {
  if (!btnRef.value) return
  gsap.to(btnRef.value, {
    scaleX: 1.1,
    scaleY: 0.9,
    duration: 0.2,
    ease: 'elastic.out(1, 0.5)',
  })
}

function onLeave() {
  if (!btnRef.value) return
  gsap.to(btnRef.value, {
    scaleX: 1,
    scaleY: 1,
    duration: 0.3,
    ease: 'elastic.out(1, 0.3)',
  })
}
</script>

<template>
  <button
    ref="btnRef"
    :class="['btn', `btn--${variant}`]"
    @click="handleClick"
    @mouseenter="onHover"
    @mouseleave="onLeave"
    @mousedown="onDown"
    @mouseup="onUp"
  >
    {{ title }}
  </button>
</template>

<style lang="scss" scoped>
.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;

  &--primary {
    background-color: $gm-c-red;
    color: white;

    &:hover {
      background-color: $gm-c-red-dark;
    }
  }

  &--secondary {
    background-color: $gm-c-purple;
    color: white;
  }
}
</style>
