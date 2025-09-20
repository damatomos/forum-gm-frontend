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

export function convertTextToMarkdownFormat(type: SymbolType, text: string): string {
  if (isAlignType(type)) {
    return convertAlignTextToMarkdownFormat(type, text)
  } else if (isTextType(type)) {
    return convertTextTypeToMarkdownFormat(type, text)
  } else if (isUnorderedList(type)) {
    return convertUnorderedListToMarkdownFormat(type, text)
  } else if (isOrderedList(type)) {
    return convertOrderedListToMarkdownFormat(type, text)
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

export function convertOrderedListToMarkdownFormat(type: SymbolType, text: string): string {
  let lines = text.split('\n')
  const containsFormat = /^\d+\. (.+?)/g.test(text)
  let result = text

  if (lines.length > 1) {
    lines = lines.map((line, idx) => {
      if (/^\d+\. (.+?)/g.test(line)) {
        console.log('has')
        line = line.replace(/^\d+\.\s*/g, '')
      }

      return line + (idx < lines.length - 1 ? '\n' : '')
    })

    result = lines.reduce((prev, line) => prev + line)

    if (!containsFormat) {
      result = lines.reduce((prev, line, idx) => {
        if (idx == 1) {
          prev = `${idx}. ${prev}`
        }

        const start = prev ? prev : ''
        return start + `${idx + 1}. ${line}`
      })
    }
  } else {
    result = `1. ${lines[0]}`
  }

  return result
}

export function convertUnorderedListToMarkdownFormat(type: SymbolType, text: string): string {
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

export function convertTextTypeToMarkdownFormat(type: SymbolType, text: string): string {
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

export function convertAlignTextToMarkdownFormat(type: SymbolType, text: string): string {
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

export function isUnorderedList(type: SymbolType) {
  return type === SymbolType.UNORDERED_LIST_ITEM
}

export function isOrderedList(type: SymbolType) {
  return type === SymbolType.ORDERED_LIST_ITEM
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
