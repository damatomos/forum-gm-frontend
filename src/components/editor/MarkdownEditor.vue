<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import { formatter, SymbolType } from './utils/MarkdownFormatter'
import MarkdownEditorTools from './MarkdownEditorTools.vue'

const editor = ref<HTMLTextAreaElement>()
const markdown = ref<string>('')
const preview = ref<HTMLDivElement>()

const isPreview = ref<boolean>(false)

onMounted(() => {})

const onChange = (event: Event) => {
  const target = event.target as HTMLTextAreaElement

  if (target.value.endsWith('\n')) {
    console.log('fim da linha')
  }
}

const toggleMode = async () => {
  isPreview.value = !isPreview.value
  if (!editor.value?.checkVisibility()) {
    console.log('visible')
    editor.value?.focus()
  } else {
    await nextTick()
    updatePreview()
  }
}

const updatePreview = () => {
  if (preview.value) {
    preview.value.innerHTML = ''
    const lines = markdown.value.split('\n')
    console.log(lines)
    if (lines && lines.length > 0) {
      const elements = formatter(lines)

      elements.forEach((e) => {
        preview.value?.appendChild(e)
      })

      console.log('update preview')
    }
  }
}

const apply = (type: SymbolType) => {
  if (!editor.value) return

  const start = editor.value.selectionStart
  const end = editor.value.selectionEnd

  if (start == end) return

  const selectedText = markdown.value.slice(start, end)
  const before = markdown.value.slice(0, start)
  const after = markdown.value.slice(end)

  const newText = convertTo(type, selectedText)
  markdown.value = before + newText + after

  nextTick(() => {
    editor.value!.focus()
    editor.value!.setSelectionRange(start, start + newText.length)
  })
}

const convertTo = (type: SymbolType, text: string) => {
  if (type == SymbolType.BOLD) {
    if (/\*\*(.+?)\*\*/g.test(text)) {
      return text.replace(/\*\*\s*/g, '').replace(/\s*\*\*$/g, '')
    }

    return `**${text}**`
  } else if (type == SymbolType.ITALIC) {
    if (/_(.+?)_/g.test(text)) {
      return text.replace(/_\s*/g, '').replace(/\s*_$/g, '')
    }
    return `_${text}_`
  }
  return text
}
</script>

<template>
  <div class="toolbar">
    <div class="tools">
      <button @click="apply(SymbolType.BOLD)">Bold</button>
      <button>Italic</button>
    </div>
    <button @click="toggleMode">Preview</button>
  </div>
  <MarkdownEditorTools @formatter="(type) => apply(type)" />
  <textarea
    v-if="!isPreview"
    ref="editor"
    name="editor"
    id="editor"
    v-model="markdown"
    @input="onChange"
    @change="onChange"
  ></textarea>
  <div v-else id="preview" ref="preview"></div>
</template>

<style lang="scss" scoped>
#editor,
#preview {
  width: 100%;
  max-width: 100%;
  min-height: 650px;
  max-height: fit-content;
  border: none;
  outline: none;
  resize: none;
}

#preview {
  word-break: break-all;
}

.toolbar {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .tools {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }
}
</style>
