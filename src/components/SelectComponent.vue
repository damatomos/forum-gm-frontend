<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

export interface OptionType {
  label: string;
  value: string | number;
}

// const name = ref < string > ('')
const isOpen = ref<boolean>(false)

const { modelValue, options, label } = defineProps<{
  modelValue: string | number,
  options: OptionType[],
  label?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()


const selectedLabel = computed(() => {
  const selected = options.find(
    opt => opt.value === modelValue
  )
  return selected ? selected.label : (label ?? 'Selecione')
})


const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
}
const selectOption = (option: OptionType) => {
  emit('update:modelValue', option.value)
  isOpen.value = false
}

const root = ref<HTMLElement | null>(null);

const handleClickOutside = (event: MouseEvent) => {
  if (root.value && !root.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <div class="custom-select" @click="toggleDropdown" ref="root">
    <div class="selected">
      {{ selectedLabel.split('(')[0] }} <strong v-if="selectedLabel.includes('(')" class="gmps">({{
        selectedLabel.split('(')[1] }}</strong>
      <svg :class="'arrow ' + (isOpen ? 'reverse' : '')" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
        stroke-linejoin="round">
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </div>
    <div class="options" v-show="isOpen">
      <div v-for="option in options" :key="option.value" @click.stop="selectOption(option)"
        :class="['option', selectedLabel === option.label ? 'selected' : '']">
        {{ option.label.split('(')[0] }} <strong v-if="option.label.includes('(')" class="gmps">({{
          option.label.split('(')[1] }}</strong>
      </div>
    </div>
  </div>
</template>


<style scoped lang="scss">
.custom-select {
  min-width: 200px;
  width: auto;
  position: relative;
  font-family: $gm-c-principal-font;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 6px;
  user-select: none;


  .gmps {
    color: $gm-c-red;
  }


  .selected {
    padding: 5px 10px;
    border: 1px solid #ccc;
    background: #fff;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .arrow {
      transition: all 0.2s linear;

      &.reverse {
        transform: rotateZ(-180deg);
      }
    }
  }

  .options {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    border: 1px solid #ccc;
    background: #fff;
    max-height: 200px;
    /* altura máxima */
    overflow-y: auto;
    /* barra de rolagem */
    z-index: 10;
  }

  .option {
    padding: 10px;
    border: none;
    border-radius: 6px;
    user-select: none;

    &.selected {
      background: #eee;
    }
  }

  .option:hover {
    background: #eee;
  }
}
</style>
