<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  width?: string | number
  label?: string
  id?: string
  variant?: 'auth' | 'send' | 'common-number' | 'common' | 'topic-title' | 'small' | 'small-underline'
  placeholder?: string
  maxLength?: number | string
  type?: HTMLInputElement['type']
}

const emit = defineEmits(['change', 'input', 'blur', 'keyupEnter'])

const inputEl = ref<HTMLInputElement | null>(null)

defineExpose({
  focus: () => inputEl.value?.focus(),
  el: inputEl // caso queira manipular direto
})

const model = defineModel<string>()
const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  variant: 'common',
  maxLength: 255,
  type: 'text',
})
</script>

<template>
  <label v-if="props.label" :for="props.id" :class="{ 'label-auth': props.variant == 'auth' }">{{
    props.label
    }}</label>
  <div class="container-input" :style="{ width: `${props.width}px` || '100%' }">
    <input v-model="model" :class="[props.variant]" :type="type" :placeholder="placeholder" :maxlength="maxLength"
      :id="props.id" ref="inputEl"  @keyup.enter="(e) => emit('keyupEnter', e)" v-bind="$attrs"/>
    <img v-if="props.variant === 'send'" src="/icons/PaperPlaneRight.svg" alt="button push" />
    <span v-if="props.variant === 'common-number'">{{ model!.length }}/{{ maxLength }}</span>
  </div>
</template>

<style scoped lang="scss">
label {
  color: gm-c-text-light-1;
  font-family: $font-family;
  font-size: $font-size-xl;
  margin-bottom: 0.625rem;
}

.label-auth {
  color: $gm-c-yellow;
}

.container-input {
  position: relative;

  input {
    width: 100%;
    font-size: $font-size-xl;
    color: $gm-c-divider-light-2;
    background-color: $gm-c-white-soft;
    border: 1px solid $gm-c-divider-light-2;
    outline: none;
    border-radius: 6px;
    position: relative;
  }

  .common {
    padding: 0.625rem 1rem;
  }

  .auth {
    padding: 0.625rem 1rem;
    border: none;
  }

  .send {
    padding: 0.625rem 3rem 0.625rem 1rem;
  }

  .common-number {
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
    font-size: $font-size-xs;
    color: $gm-c-divider-light-2;
    position: absolute;
    bottom: 0;
    right: 0.625rem;
  }

  .small {
    font-size: $font-size-base;
    max-height: 30px;
    padding: 0.5rem 1rem;
    background-color: $gm-c-white;
    border: none;
  }


  .small-underline {
    font-size: $font-size-base;
    max-height: 30px;
    padding: 0.5rem 1rem;
    background-color: $gm-c-white;
    border-radius: 0;
    border: none;
    transition: all 0.2s linear;

    &:hover, &:focus {
      // border-bottom: 1px solid $gm-c-divider-light-1;
      box-shadow: 0 1px 0 0 $gm-c-divider-light-1;
    }
  }

  .topic-title {
    font-size: $font-size-5xl;
    font-weight: 600;
    border-radius: 0;
    background: transparent;
    border: none;
    border-bottom: 1px solid $gm-c-divider-light-1;
    transition: 0.2s linear;
    margin-bottom: 1rem;

    &::placeholder {
      color: $color-placeholder;
      font-weight: 500;
    }

    &:focus {
      font-size: $font-size-6xl;
      padding: 0.75rem 0;
    }
  }
}



@include media('tablet') {
  label {
    font-size: $font-size-lg;
  }

  .container-input {
    input {
      font-size: $font-size-base;
    }

    img {
      width: 20px;
      height: 20px;
    }
  }
}

@include media('mobile') {
  label {
    font-size: $font-size-base;
  }

  img {
    width: 18px;
    height: 18px;
  }
}
</style>
