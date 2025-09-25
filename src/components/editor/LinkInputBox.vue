<script setup lang="ts">
import { nextTick, ref, watch } from 'vue';
import IconButtonComponent from '../IconButtonComponent.vue';
import CheckIcon from '../icons/CheckIcon.vue';
import InputComponent from '../InputComponent.vue';

const inputModel = defineModel<string>()

const isOpen = defineModel<boolean>('opened', { default: false })

const emit = defineEmits<{
  (event: 'click', url: string): void
  (event: 'open'): void
  (event: 'close'): void
}>();


const root = ref<HTMLElement | null>(null);
const inputRef = ref<HTMLInputElement | null>(null)

const handleClickOutside = (event: MouseEvent) => {
  if (isOpen.value && root.value && !root.value.contains(event.target as Node)) {
    isOpen.value = false;
    inputModel.value = ""
  }
};

watch(isOpen, async (val) => {
  if (val) {
    await nextTick(() => {
      inputRef.value?.focus()
    }) // espera o DOM montar
    setTimeout(() => {
      document.addEventListener('click', handleClickOutside)
    }, 0)

  } else {
    document.removeEventListener('click', handleClickOutside);
  }
})

const onClick = () => {
  emit('click', inputModel.value!)
  isOpen.value = false
  inputModel.value = ""
}

</script>

<template>
  <div class="link-input-box" v-if="isOpen" ref="root">
    <InputComponent variant="small-underline" placeholder="https://www.url.com" v-model="inputModel" ref="inputRef" @keyupEnter="onClick" />
    <IconButtonComponent :icon="CheckIcon" variant="secondary" @click="onClick" />
  </div>
</template>

<style lang="scss" scoped>
.link-input-box {
  min-width: 250px;
  position: absolute;
  top: 0;
  left: 50%;
  width: fit-content;
  z-index: 100;

  transform: translateX(-50%);

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  border-radius: 6px;

  padding: 0.5rem 1rem;

  background-color: white;

  box-shadow: 4px 4px 12px 0 rgba(0, 0, 0, 0.12);
}
</style>
