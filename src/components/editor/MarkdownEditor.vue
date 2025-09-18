<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import { formatter, SymbolType } from './utils/MarkdownFormatter'
import MarkdownEditorTools from './MarkdownEditorTools.vue'
import {
  convertTextToMarkdown,
  getLastLine,
  getNumberOfOrderedList,
  lastLineIsEmptyList,
  lastLineIsOrderedList,
  lastLineIsUnOrderedList,
  removeMarkdownSyntaxBetweenText,
} from './utils/MarkdownExpressions'

const editor = ref<HTMLTextAreaElement>()
const markdown = ref<string>('')
const preview = ref<HTMLDivElement>()

const isPreview = ref<boolean>(false)

onMounted(() => {})

const onChange = (event: Event) => {
  const target = event.target as HTMLTextAreaElement

  if (target.value.endsWith('\n')) {
  }
}

const onKeyUp = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    const target = event.target as HTMLTextAreaElement

    if (lastLineIsOrderedList(target.value)) {
      const index = getNumberOfOrderedList(target.value)
      console.log('value: ', index)
      target.value += `${index + 1}. `
    } else if (lastLineIsUnOrderedList(target.value)) {
      target.value += '- '
    }
  }
}

const onKeyPress = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    const target = event.target as HTMLTextAreaElement
    if (lastLineIsEmptyList(target.value)) {
      const lastLine = getLastLine(target.value)
      target.value = target.value.slice(0, target.value.length - lastLine.length)
    }
  }
}

const toggleMode = async () => {
  isPreview.value = !isPreview.value
  if (!editor.value?.checkVisibility()) {
    console.log('visible')
    editor.value?.focus()
  } else {
    await nextTick()
    await updatePreview()
  }
}

const updatePreview = async () => {
  if (preview.value) {
    preview.value.innerHTML = ''
    const lines = markdown.value.split('\n')

    if (lines && lines.length > 0) {
      const elements = await formatter(lines)

      elements.forEach(async (e) => {
        preview.value?.appendChild(e)
      })
    }
  }
}

const apply = (type: SymbolType) => {
  if (!editor.value) return

  const start = editor.value.selectionStart
  const end = editor.value.selectionEnd

  // if (start == end) return

  const selectedText = markdown.value.slice(start, end)
  const before = markdown.value.slice(0, start)
  const after = markdown.value.slice(end)
  let newText = removeIfDontUse(before, after, type)!
  console.log('newText: ', newText)

  if (newText !== null) {
    markdown.value = newText

    nextTick(() => {
      editor.value!.focus()
      const cursorPos = start - type.toString().length
      editor.value!.setSelectionRange(cursorPos, cursorPos)
    })
    return
  }

  newText = convertTextToMarkdown(type, selectedText)
  markdown.value = before + newText + after

  nextTick(() => {
    editor.value!.focus()
    if (!selectedText) {
      // move cursor between the symbols
      const cursorPos = start + (type == SymbolType.ALIGNCENTER ? 1 : type.toString().length)
      editor.value!.setSelectionRange(cursorPos, cursorPos)
    } else {
      editor.value!.setSelectionRange(start, start + newText.length)
    }
  })
}

const removeIfDontUse = (before: string, after: string, type: SymbolType) => {
  return removeMarkdownSyntaxBetweenText(before, after, type)
}
</script>

<template>
  <!-- <div class="toolbar">
    <div class="tools">
      <button @click="apply(SymbolType.BOLD)">Bold</button>
      <button>Italic</button>
    </div>
    <button @click="toggleMode">Preview</button>
  </div> -->
  <MarkdownEditorTools
    @formatter="(type: SymbolType) => apply(type)"
    @align="(type: SymbolType) => apply(type)"
    @preview="toggleMode"
    :is-preview="isPreview"
  />
  <textarea
    v-if="!isPreview"
    ref="editor"
    name="editor"
    id="editor"
    v-model="markdown"
    @input="onChange"
    @change="onChange"
    @keyup="onKeyUp"
    @keypress="onKeyPress"
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

  :deep(p) {
    margin: 8px 0;

    strong * {
      font-weight: bold;
    }

    em * {
      font-style: italic;
    }

    u * {
      text-decoration: underline;
    }

    s * {
      text-decoration: line-through;
    }

    a {
      color: $link-color;
      text-decoration: underline;
    }
  }
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
