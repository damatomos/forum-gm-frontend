<script setup lang="ts">
import { nextTick, ref, watch } from 'vue';
import IconButtonComponent from '../IconButtonComponent.vue';
import CheckIcon from '../icons/CheckIcon.vue';
import InputComponent from '../InputComponent.vue';

const inputModel = defineModel<string>('input')
const widthModel = defineModel<string>('width')
const heightModel = defineModel<string>('height')

const isOpen = defineModel<boolean>('opened', { default: true })

const emit = defineEmits<{
  (event: 'click', url: string, width?: number, height?: number): void
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
  console.log("result: ", inputModel.value!, widthModel.value, heightModel.value!)
  emit('click', inputModel.value!, parseInt(widthModel.value!), parseInt(heightModel.value!))
  isOpen.value = false
  inputModel.value = ""
  widthModel.value = ""
  heightModel.value = ""
}

</script>

<template>
  <div class="link-input-box" v-if="isOpen" ref="root">
    <div class="input-and-apply">
      <InputComponent variant="small-underline" placeholder="https://www.url.com" v-model="inputModel" ref="inputRef"
        @keyupEnter="onClick" />
      <IconButtonComponent :icon="CheckIcon" variant="secondary" @click="onClick" />
    </div>
    <div class="preview-and-dimensions">
      <img id="preview" :src="inputModel" alt="preview">
      <div class="dimensions">
      <InputComponent variant="small-underline" placeholder="width" v-model="widthModel" @keyupEnter="onClick"/>
      <InputComponent variant="small-underline" placeholder="height" v-model="heightModel" @keyupEnter="onClick"/>
    </div>
    </div>
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
  flex-direction: column;
  gap: 1rem;

  border-radius: 6px;

  padding: 1rem;

  background-color: white;

  box-shadow: 4px 4px 12px 0 rgba(0, 0, 0, 0.12);

  .input-and-apply, .preview-and-dimensions
  {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }

  .preview-and-dimensions
  {
    img#preview {
      width: 160px;
      height: 90px;
      background-color: $gm-c-gray;
      image-rendering: optimizeQuality;
      object-fit: contain;
    }

    .dimensions {
      width: 100%;
      max-width: 92px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      gap: 0.5rem;
    }
  }
}
</style>
