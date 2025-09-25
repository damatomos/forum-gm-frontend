<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import { formatter, SymbolType } from './utils/MarkdownFormatter'
import MarkdownEditorTools from './MarkdownEditorTools.vue'
import {
  convertTextToMarkdownFormat,
  getLastLine,
  getNumberOfOrderedList,
  lastLineIsEmptyList,
  lastLineIsOrderedList,
  lastLineIsUnOrderedList,
  removeMarkdownSyntaxBetweenText,
} from './utils/MarkdownExpressions'

const editor = ref<HTMLTextAreaElement>()
const markdown = defineModel<string>()
const preview = ref<HTMLDivElement>()

const isPreview = ref<boolean>(false)

defineEmits<{
  (event: 'change', e: Event): void,
  (event: 'input', e: Event): void,
  (event: 'blur', e: Event): void
}>()

onMounted(() => { })

const onChange = (event: Event) => {
  const target = event.target as HTMLTextAreaElement

  if (target.value.endsWith('\n')) {
  }
}

const onKeyUp = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    const target = event.target as HTMLTextAreaElement

    const cursorPos = target.selectionStart

    const before = target.value.slice(0, cursorPos)
    const after = target.value.slice(cursorPos)

    let content = '';

    if (lastLineIsOrderedList(before)) {
      const index = getNumberOfOrderedList(before)
      content = `${index + 1}. `
      target.value = before + content + after

    } else if (lastLineIsUnOrderedList(before)) {
      content = `- `
      target.value = before + content + after
    }
    target.selectionStart = target.selectionEnd = cursorPos + content.length
    target.focus()
  }
}

const onKeyPress = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    const target = event.target as HTMLTextAreaElement

    const cursorPos = target.selectionStart
    const before = target.value.slice(0, cursorPos)
    const after = target.value.slice(cursorPos)

    if (lastLineIsEmptyList(before)) {
      const lastLine = getLastLine(before)
      target.value = before.slice(0, before.length - lastLine.length) + after

      target.selectionStart = target.selectionEnd = cursorPos - lastLine.length
      target.focus()
    }
  }
}

const toggleMode = async () => {
  isPreview.value = !isPreview.value
  if (!editor.value?.checkVisibility()) {
    editor.value?.focus()
  } else {
    await nextTick()
    await updatePreview()
  }
}

const updatePreview = async () => {
  if (preview.value) {
    preview.value.innerHTML = ''
    const lines = markdown.value!.toString().split('\n')

    if (lines && lines.length > 0) {
      const elements = await formatter(lines)

      elements.forEach(async (e) => {
        preview.value?.appendChild(e)
      })
    }
  }
}

const apply = (type: SymbolType, url?: string) => {
  if (!editor.value) return

  const start = editor.value.selectionStart
  const end = editor.value.selectionEnd

  // if (start == end) return

  const selectedText = markdown.value ? markdown.value!.slice(start, end) : ''
  const before = markdown.value ? markdown.value!.slice(0, start) : ''
  const after = markdown.value ? markdown.value!.slice(end) : ''
  let newText = removeIfDontUse(before, after, type)!

  if (newText !== null) {
    markdown.value = newText

    nextTick(() => {
      editor.value!.focus()
      const cursorPos = start - type.toString().length
      editor.value!.setSelectionRange(cursorPos, cursorPos)
    })
    return
  }

  if (type === SymbolType.LINK)
  {
    console.log("text: ", url, "selected: ", selectedText)
    newText = convertTextToMarkdownFormat(type, selectedText, url ?? '')
  } else {
    newText = convertTextToMarkdownFormat(type, selectedText)
  }
  markdown.value = before + newText + after

  nextTick(() => {
    if (!selectedText) {
      // move cursor between the symbols
      const cursorPos = start + getCharactersOffsetOfCursor(type, newText.length ?? 0)
      editor.value!.setSelectionRange(cursorPos, cursorPos)
    } else {
      editor.value!.setSelectionRange(start, start + newText.length)
    }
    editor.value!.focus()
  })
}

const getCharactersOffsetOfCursor = (type: SymbolType, textLenght: number): number =>
{
  const isALinkOrImage = (type == SymbolType.LINK || type == SymbolType.IMAGE)
  const isAlignCenter = type == SymbolType.ALIGNCENTER
  return isALinkOrImage ? textLenght : isAlignCenter ? 1 : type.toString().length
}

const removeIfDontUse = (before: string, after: string, type: SymbolType) => {
  return removeMarkdownSyntaxBetweenText(before, after, type)
}
</script>

<template>
  <MarkdownEditorTools @formatter="(type: SymbolType, url?: string) => apply(type, url)" @align="(type: SymbolType) => apply(type)"
    @preview="toggleMode" :is-preview="isPreview" />
  <textarea v-if="!isPreview" ref="editor" name="editor" id="editor" v-model="markdown" @input="onChange"
    @change="onChange" @keyup="onKeyUp" @keypress="onKeyPress"></textarea>
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

  :deep(ul) {
    list-style: unset;
    display: unset;
    list-style-position: inside;
  }

  :deep(ol) {
    padding: unset;
    margin: unset;
    display: unset;
    list-style-position: inside;
  }

  :deep(p) {
    min-height: 1.25em;

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
</style>
