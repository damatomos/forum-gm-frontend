<script setup lang="ts">
interface TabProps {
  label: string
  isActive: boolean
}

const props = defineProps<TabProps>()
</script>

<template>
  <div class="tab" :class="{ enabled: isActive }">{{ props.label }}</div>
</template>

<style scoped lang="scss">
.tab {
  width: 200px;
  padding: 2px 1rem;
  text-align: center;
  cursor: pointer;
  font-size: $font-size-xl;
  color: $color-text-disabled;
  border-bottom: 2px solid $color-tab-disabled;
  transition: all 0.3s ease;

  &.enabled,
  &:hover {
    color: $color-text;
    border-bottom: 2px solid $color-tab-enabled;
  }
}
</style>
