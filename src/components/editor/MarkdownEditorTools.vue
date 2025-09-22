<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
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
import gsap from 'gsap'

interface ToolbarEmitter {
  (e: 'formatter', type: SymbolType): void
  (e: 'align', type: SymbolType): void
  (e: 'preview'): void
}

interface MarkdownEditorToolsProps {
  isPreview: boolean
}

const emit = defineEmits<ToolbarEmitter>()
const props = defineProps<MarkdownEditorToolsProps>()

let observer;

onMounted(() => {

  const tool = document.querySelector(".tools");

  observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'class') {
        const target = mutation.target as HTMLElement;

        if (target.classList.contains('disable')) {
          gsap.to(target, {
            opacity: 0.3,
            scale: 0.2,
            duration: 0.4,
            width: '0px',
            ease: "power2.out"
          });
        } else {
          gsap.to(target, {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            width: 'auto',
            ease: "power2.out",
            onComplete: () => {
              // volta suavemente ao tamanho normal
              gsap.to(target, { scale: 1, duration: 0.2, ease: "back.out(2)" });
            }
          });
        }
      }
    });
  }) as MutationObserver;

  if (observer) {
    observer!.observe(tool!, { attributes: true });
  }
})

onBeforeUnmount(() => {
  if (observer!) observer.disconnect();
});

</script>

<template>
  <div class="toolbar">
    <div :class="'tools ' + (props.isPreview ? 'disable' : '')">
      <div class="text-formatter tool-list">
        <span class="tool bold" @click="emit('formatter', SymbolType.BOLD)">
          <TextBoldIcon />
        </span>
        <span class="tool italic" @click="emit('formatter', SymbolType.ITALIC)">
          <TextItalicIcon />
        </span>
        <span class="tool underline" @click="emit('formatter', SymbolType.UNDERLINE)">
          <TextUnderlineIcon />
        </span>
        <span class="tool strike" @click="emit('formatter', SymbolType.STRIKETHROUGH)">
          <TextStrikethroughIcon />
        </span>
      </div>
      <div class="text-align tool-list">
        <span class="tool left" @click="emit('align', SymbolType.ALIGNLEFT)">
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
        <span class="tool unorder-list" @click="emit('formatter', SymbolType.UNORDERED_LIST_ITEM)">
          <UnorderListIcon />
        </span>
        <span class="tool order-list" @click="emit('formatter', SymbolType.ORDERED_LIST_ITEM)">
          <NumberOrderListIcon />
        </span>
      </div>
      <!-- <div class="others tool-list"></div> -->
    </div>

    <button :class="'btn-preview ' + (props.isPreview ? 'enabled' : '')" @click="emit('preview')">
      Preview
    </button>
  </div>
</template>

<style lang="scss" scoped>
.toolbar {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  border-radius: 10px;
  border-bottom: 1px solid $tool-separator;
  padding: 12px 1rem;
  margin-bottom: 1rem;

  .tools {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    overflow: hidden;

    &.disabled {
      pointer-events: none;
    }
  }

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

    &:last-child {
      border-right: none;
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

  .btn-preview {
    all: unset;
    cursor: pointer;
    width: fit-content;
    padding: 4px 16px;
    background-color: transparent;
    border-radius: 4px;
    background-image: url('../assets/icons/eye.svg');
    background-size: 16px;
    background-repeat: no-repeat;
    background-position: center;

    transition: 0.2s linear;

    box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.1);

    &:hover,
    &:active,
    &.enabled {
      background-color: $tool-enabled;
    }
  }

}
</style>
