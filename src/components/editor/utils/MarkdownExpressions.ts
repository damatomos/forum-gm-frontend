import { SymbolType } from './MarkdownFormatter'
import { MarkdownRegex } from './MarkdownRegex'

export function removeMarkdownSyntaxBetweenText(
  before: string,
  after: string,
  type: SymbolType,
): string | null {
  const size = type.toString().length
  const currentText = before + after

  if (before.endsWith(type.toString())) {
    before = before.slice(0, -size)
  }
  if (after.startsWith(type.toString())) {
    after = after.slice(size)
  }

  return before + after === currentText ? null : before + after
}

export function convertTextToMarkdown(type: SymbolType, text: string): string {
  if (isAlignType(type)) {
    return convertAlignTextToMarkdown(type, text)
  } else if (isTextType(type)) {
    return convertTextTypeToMarkdown(type, text)
  } else if (isListType(type)) {
    return convertListTypeToMarkdown(type, text)
  } else {
    if (type == SymbolType.LINK) {
      if (MarkdownRegex.link.test(text)) {
        return text.replace(MarkdownRegex.link, '$1')
      }
      return `[${text}](url)`
    } else if (type == SymbolType.IMAGE) {
      if (MarkdownRegex.image.test(text)) {
        return text.replace(MarkdownRegex.image, '$1')
      }
      return `![${text}](url)`
    }
  }

  return text
}

export function convertListTypeToMarkdown(type: SymbolType, text: string): string {
  if (type == SymbolType.UNORDERED_LIST_ITEM) {
    if (/^- (.+?)/g.test(text)) {
      return text.replace(/^- \s*/g, '')
    }
    return `- ${text}`
  } else if (type == SymbolType.ORDERED_LIST_ITEM) {
    if (/^\d+\. (.+?)/g.test(text)) {
      return text.replace(/^\d+\. \s*/g, '')
    }
    return `1. ${text}`
  }
  return text
}

export function convertTextTypeToMarkdown(type: SymbolType, text: string): string {
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
  } else if (type == SymbolType.UNDERLINE) {
    if (/__(.+?)__/g.test(text)) {
      return text.replace(/__\s*/g, '').replace(/\s*__$/g, '')
    }
    return `__${text}__`
  } else if (type == SymbolType.STRIKETHROUGH) {
    if (/~~(.+?)~~/g.test(text)) {
      return text.replace(/~~\s*/g, '').replace(/\s*~~$/g, '')
    }
    return `~~${text}~~`
  }

  return text
}

export function convertAlignTextToMarkdown(type: SymbolType, text: string): string {
  if (type == SymbolType.ALIGNLEFT) {
    if (/(.+?)</g.test(text) && !/>(.+?)</g.test(text) && !/>(.+?)/g.test(text)) {
      return text.replace(/\s*</g, '')
    } else if (/>(.+?)</g.test(text)) {
      text.replace(/>\s*/g, '').replace(/\s*</g, '')
    } else if (/(.+?)</g.test(text)) {
      text.replace(/\s*</g, '')
    }
    return `${text}<`
  } else if (type == SymbolType.ALIGNRIGHT) {
    if (/(.+?)>/g.test(text) && !/>(.+?)</g.test(text) && !/<(.+?)/g.test(text)) {
      return text.replace(/\s*>/g, '')
    } else if (/>(.+?)</g.test(text)) {
      console.log('clear center here')
      text.replace(/>\s*/g, '').replace(/\s*</g, '')
    } else if (/(.+?)>/g.test(text)) {
      text.replace(/\s*>/g, '')
    }
    return `>${text}`
  } else if (type == SymbolType.ALIGNCENTER) {
    if (/>(.+?)</g.test(text)) {
      return text.replace(/>\s*/g, '').replace(/\s*</g, '')
    }
    if (/(.+?)>/g.test(text)) {
      text.replace(/\s*>/g, '')
    }
    if (/(.+?)</g.test(text)) {
      text.replace(/\s*</g, '')
    }
    return `>${text}<`
  } else if (type == SymbolType.ALIGNJUSTIFY) {
    if (/>=(.+?)/g.test(text)) {
      return text.replace(/>=\s*/g, '')
    }

    return `>= ${text}`
  }

  return text
}

export function isListType(type: SymbolType) {
  return type === SymbolType.ORDERED_LIST_ITEM || type === SymbolType.UNORDERED_LIST_ITEM
}

export function isTextType(type: SymbolType) {
  return (
    type === SymbolType.BOLD ||
    type === SymbolType.ITALIC ||
    type === SymbolType.STRIKETHROUGH ||
    type === SymbolType.CODE ||
    type === SymbolType.UNDERLINE
  )
}

export function isAlignType(type: SymbolType) {
  return (
    type === SymbolType.ALIGNLEFT ||
    type === SymbolType.ALIGNRIGHT ||
    type === SymbolType.ALIGNCENTER ||
    type === SymbolType.ALIGNJUSTIFY
  )
}

export function lastLineIsUnOrderedList(text: string): boolean {
  const lastLine = getLastLine(text)
  return lastLine.startsWith('- ') && lastLine.trim().length > 2
}

export function lastLineIsOrderedList(text: string): boolean {
  const lastLine = getLastLine(text)
  return /^\d+\. /.test(lastLine) && lastLine.trim().length > 3
}

export function getNumberOfOrderedList(text: string): number {
  const lastLine = getLastLine(text)
  const match = lastLine.match(/^(\d+)\. /)
  if (match) {
    return parseInt(match[1], 10)
  }
  return 0
}

export function getLines(text: string): string[] {
  return text.split('\n')
}

export function getLastLine(text: string): string {
  const lines = getLines(text)
  const lastLine = lines[lines.length - 1]
  return lastLine.length === 0 ? lines[lines.length - 2] : lastLine
}

export function lastLineIsEmptyList(text: string): boolean {
  const lastLine = getLastLine(text)
  return lastLine === '- ' || /^\d+\. $/.test(lastLine)
}

export function parseImageMarkdown(text: string) {
  const maxAltLength = 100
  const maxUrlLength = 200
  const maxDimension = 9999

  if (!text.startsWith('![')) return null

  let pos = 2
  let alt = ''

  while (pos < text.length && text[pos] !== ']' && alt.length < maxAltLength) {
    alt += text[pos++]
  }

  if (text[pos] !== ']' || text[pos + 1] !== '(') return null
  pos += 2

  let url = ''
  while (pos < text.length && text[pos] !== ')' && url.length < maxUrlLength) {
    url += text[pos++]
  }

  if (text[pos] !== ')') return null
  pos++

  let width, height

  const dimFormmat = text.slice(pos).trim()

  if (dimFormmat.startsWith('{') && dimFormmat.endsWith('}')) {
    console.log('pos: ', text.slice(pos))
    const dimensions = dimFormmat
      .replace('{', '')
      .replace('}', '')
      .split(',')
      .map((d) => Number(d.trim()))

    console.log(dimensions)
    if (dimensions) {
      width = dimensions[0]
      height = dimensions[1]

      if (width && (isNaN(width) || width < 1 || width > maxDimension)) return null
      if (height && (isNaN(height) || height < 1 || height > maxDimension)) return null
    }
  }

  return { alt, url, width, height }
}
