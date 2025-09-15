<script setup lang="ts">
import AlignCenterIcon from '../icons/AlignCenterIcon.vue'
import AlignJustifyIcon from '../icons/AlignJustifyIcon.vue'
import AlignLeftIcon from '../icons/AlignLeftIcon.vue'
import AlignRightIcon from '../icons/AlignRightIcon.vue'
import NumberOrderListIcon from '../icons/NumberOrderListIcon.vue'
import TextBoldIcon from '../icons/TextBoldIcon.vue'
import TextItalicIcon from '../icons/TextItalicIcon.vue'
import TextStrikethroughIcon from '../icons/TextStrikethroughIcon.vue'
import TextUnderlineIcon from '../icons/TextUnderlineIcon.vue'
import UnorderListIcon from '../icons/UnorderListIcon.vue'
import { SymbolType } from './utils/MarkdownFormatter'

interface ToolbarEmitter {
  (e: 'formatter', type: SymbolType): void
  (e: 'align', type: SymbolType): void
}

const emit = defineEmits<ToolbarEmitter>()
</script>

<template>
  <div class="toolbar">
    <div class="text-formatter tool-list">
      <span class="tool bold" @click="emit('formatter', SymbolType.BOLD)">
        <TextBoldIcon />
      </span>
      <span class="tool italic" @click="emit('formatter', SymbolType.ITALIC)"
        ><TextItalicIcon />
      </span>
      <span class="tool underline" @click="emit('formatter', SymbolType.UNDERLINE)">
        <TextUnderlineIcon />
      </span>
      <span class="tool strike" @click="emit('formatter', SymbolType.STRIKETHROUGH)">
        <TextStrikethroughIcon />
      </span>
    </div>
    <div class="text-align tool-list" @click="emit('align', SymbolType.ALIGNLEFT)">
      <span class="tool left">
        <AlignLeftIcon />
      </span>
      <span class="tool center" @click="emit('align', SymbolType.ALIGNCENTER)">
        <AlignCenterIcon />
      </span>
      <span class="tool right" @click="emit('align', SymbolType.ALIGNRIGHT)">
        <AlignRightIcon />
      </span>
      <span class="tool justify" @click="emit('align', SymbolType.ALIGNJUSTIFY)">
        <AlignJustifyIcon />
      </span>
    </div>
    <div class="text-list tool-list">
      <span class="tool unorder-list">
        <UnorderListIcon />
      </span>
      <span class="tool order-list">
        <NumberOrderListIcon />
      </span>
    </div>
    <div class="others tool-list"></div>
  </div>
</template>

<style lang="scss" scoped>
.toolbar {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  border-radius: 10px;
  border: 1px solid $tool-separator;
  padding: 12px 1rem;

  .tool-list {
    padding: 0 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2px;

    border-right: 1px solid $tool-separator;

    &:first-child {
      padding-left: 0;
    }

    .tool {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: transparent;
      width: 32px;
      height: 32px;
      border-radius: 4px;

      transition: 0.2s linear;
      cursor: pointer;

      &:hover,
      &:active,
      &.enabled {
        background-color: $tool-enabled;
      }
    }
  }
}
</style>
