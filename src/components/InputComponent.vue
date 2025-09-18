<script setup lang="ts">
interface Props {
  width?: string | number
  label?: string
  id?: string
  variant?: 'auth' | 'send' | 'common-number' | 'common'
  placeholder?: string
  maxLength?: number | string
  type: string
}

defineEmits(['change', 'input', 'blur'])

const model = defineModel<string>()
const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  variant: 'common',
  maxLength: 255,
  type: 'text',
})
</script>

<template>
  <label :for="props.id" :class="{ 'label-auth': props.variant == 'auth' }">{{
    props.label
  }}</label>
  <div class="container-input" :style="{ width: `${props.width}px` || '100%' }">
    <input
      v-model="model"
      :class="[props.variant]"
      :type="type"
      :placeholder="placeholder"
      :maxlength="maxLength"
      :id="props.id"
    />
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
