import { validateImageUrl } from '@/utils/validateUrlImage'
import { MarkdownRegex } from './MarkdownRegex'
import { parseImageMarkdown } from './MarkdownExpressions'

export enum SymbolType {
  PARAGRAPH,
  UNORDERED_LIST,
  ORDERED_LIST,
  UNORDERED_LIST_ITEM,
  ORDERED_LIST_ITEM,
  HEADONE = '#',
  HEADTWO = '##',
  HEADTHREE = '###',
  HEADFOUR = '####',
  HEADFIVE = '#####',
  HEADSIX = '######',
  BOLD = '**',
  ITALIC = '_',
  UNDERLINE = '__',
  STRIKETHROUGH = '~~',
  ALIGNLEFT = '<',
  ALIGNCENTER = '><',
  ALIGNRIGHT = '>',
  ALIGNJUSTIFY = '>=',
  IMAGE = '![alt](url)',
  LINK = '[text](url)',
  QUOTE = '> ',
  CODE = '```',
}

enum HorizontalPosition {
  NONE,
  LEFT = 'left',
  CENTER = 'center',
  RIGHT = 'right',
}

interface LineWrapper {
  symbol: SymbolType
  text: string
  alt?: string
  url?: string
  width?: number
  height?: number
  horizontal?: HorizontalPosition
  children?: LineWrapper[]
  before?: LineWrapper
  after?: LineWrapper
}

export async function formatter(value: string[]): Promise<HTMLElement[]> {
  const list = transformBruteLinesToWrapperList(value)

  return Promise.all(
    // value
    //   .map((v) => transformLineToWrapper(v))
    list.map((w) => (w != null ? trasformWrapperToElement(w) : null)).filter((w) => w != null),
  ) as Promise<HTMLElement[]>
}

export function formatterParagraphs(value: string): string {
  if (!value) return ''
  return value
    .replace(MarkdownRegex.lt, '&lt;$1')
    .replace(MarkdownRegex.gt, '&gt;$1')
    .replace(MarkdownRegex.underline, '<u>$1</u>')
    .replace(MarkdownRegex.strikethrough, '<s>$1</s>')
    .replace(MarkdownRegex.bold, '<strong>$1</strong>')
    .replace(MarkdownRegex.italic, '<em>$1</em>')
    .replace(MarkdownRegex.breakline, '<br />')
    .replace(MarkdownRegex.multipleSpaces, (match) => '&nbsp;'.repeat(match.length))
    .replace(MarkdownRegex.code, '<code>$1</code>')
    .replace(MarkdownRegex.link, '<a href="$2" target="_blank" rel="noopener">$1</a>')
    .replace(MarkdownRegex.line, '<hr/>')
}

export function formatterUnorderedList(value: string): string {
  if (!value) return ''
  const items = value.split(/\r?\n/).map((item) => item.replace(/^-+\s*/, '').trim())
  const listItems = items.map((item) => `<li>${formatterParagraphs(item)}</li>`).join('')
  return `<ul>${listItems}</ul>`
}

async function trasformWrapperToElement(wrapper: LineWrapper): Promise<HTMLElement> {
  const currentElement = createElementBySymbol(wrapper.symbol)

  if (wrapper.symbol === SymbolType.IMAGE && wrapper.url) {
    const isValid = await validateImageUrl(wrapper.url)
    ;(currentElement as HTMLImageElement).src = isValid ? wrapper.url! : '/default-image.png'
    ;(currentElement as HTMLImageElement).alt = isValid ? wrapper.alt || '' : 'Invalid image'
    if (wrapper.width) (currentElement as HTMLImageElement).width = wrapper.width
    if (wrapper.height) (currentElement as HTMLImageElement).height = wrapper.height
  }

  currentElement.style.textAlign = wrapper.horizontal?.toString() || 'left'

  if (currentElement instanceof HTMLImageElement) {
    if (wrapper.horizontal == HorizontalPosition.CENTER) {
      currentElement.style.margin = '0 auto'
    } else if (wrapper.horizontal == HorizontalPosition.RIGHT) {
      currentElement.style.marginLeft = 'auto'
    }
  }

  if (currentElement instanceof HTMLParagraphElement) {
    const value = formatterParagraphs(wrapper.text)
    currentElement.innerHTML = value
  } else {
    currentElement.innerHTML = wrapper.text
  }

  if (wrapper.children) {
    await Promise.all(
      wrapper.children.map(async (child) => {
        currentElement.appendChild(await trasformWrapperToElement(child))
      }),
    )
  }

  return currentElement
}

function createElementBySymbol(symbol: SymbolType): HTMLElement {
  switch (symbol) {
    case SymbolType.HEADONE:
      return document.createElement('h1')
    case SymbolType.HEADTWO:
      return document.createElement('h2')
    case SymbolType.HEADTHREE:
      return document.createElement('h3')
    case SymbolType.HEADFOUR:
      return document.createElement('h4')
    case SymbolType.HEADFIVE:
      return document.createElement('h5')
    case SymbolType.HEADSIX:
      return document.createElement('h6')
    case SymbolType.IMAGE:
      const img = document.createElement('img')
      img.setAttribute('style', 'max-width: 100%; ')
      return img
    case SymbolType.ORDERED_LIST:
      return document.createElement('ol')
    case SymbolType.UNORDERED_LIST:
      return document.createElement('ul')
    case SymbolType.ORDERED_LIST_ITEM:
    case SymbolType.UNORDERED_LIST_ITEM:
      return document.createElement('li')
    case SymbolType.PARAGRAPH:
    default:
      return document.createElement('p')
  }
}

function transformBruteLinesToWrapperList(value: string[]): LineWrapper[] {
  const elements: LineWrapper[] = []
  let buffer: LineWrapper[] = []

  console.log('Quantidade de linhas: ', value.length)

  let counter = 0
  while (counter < value.length) {
    let line = value[counter]
    let wrapper: LineWrapper | null = null

    const horizontalPosition = getHorizontalPosition(line)
    line = cleanHorizontalMarkers(line, horizontalPosition)

    const imageMatch = parseImageMarkdown(line)

    console.log('Linha: ', line)

    if (isAListItem(line)) {
      const containItem = buffer.length > 0
      const containsAListUnordered = containItem
        ? buffer[0].symbol == SymbolType.UNORDERED_LIST_ITEM
        : false

      if (isAUnorderedListItem(line) && containItem && containsAListUnordered) {
        wrapper = {
          symbol: SymbolType.UNORDERED_LIST_ITEM,
          text: formatterParagraphs(line.replace(/^-\s+/, '')),
        }
        buffer.push(wrapper)
        counter++
        continue
      } else if (isAOrderedListItem(line) && containItem && !containsAListUnordered) {
        wrapper = {
          symbol: SymbolType.ORDERED_LIST_ITEM,
          text: formatterParagraphs(line.replace(/^\s*\d+[\.\)]\s+/, '')),
        }
        buffer.push(wrapper)
        counter++
        continue
      } else if (containItem) {
        wrapper = {
          symbol:
            buffer[0].symbol == SymbolType.UNORDERED_LIST_ITEM
              ? SymbolType.UNORDERED_LIST
              : SymbolType.ORDERED_LIST,
          text: '',
          children: Object.assign(buffer),
        }

        elements.push(wrapper)

        buffer = []

        wrapper = {
          symbol: isAUnorderedListItem(line)
            ? SymbolType.UNORDERED_LIST_ITEM
            : SymbolType.ORDERED_LIST_ITEM,
          text: isAUnorderedListItem(line)
            ? formatterParagraphs(line.replace(/^-\s+/, ''))
            : formatterParagraphs(line.replace(/^\s*\d+[\.\)]\s+/, '')),
        }

        buffer.push(wrapper)

        counter++
        continue
      } else {
        wrapper = {
          symbol: isAUnorderedListItem(line)
            ? SymbolType.UNORDERED_LIST_ITEM
            : SymbolType.ORDERED_LIST_ITEM,
          text: isAUnorderedListItem(line)
            ? formatterParagraphs(line.replace(/^-\s+/, ''))
            : formatterParagraphs(line.replace(/^\s*\d+[\.\)]\s+/, '')),
        }
        buffer.push(wrapper)

        counter++
        continue
      }
    } else if (buffer.length > 0) {
      const wrapper = {
        symbol:
          buffer[0].symbol == SymbolType.UNORDERED_LIST_ITEM
            ? SymbolType.UNORDERED_LIST
            : SymbolType.ORDERED_LIST,
        text: '',
        horizontal: HorizontalPosition.LEFT,
        children: Object.assign(buffer),
      }

      buffer = []

      elements.push(wrapper)
    }

    if (imageMatch) {
      const img = {
        symbol: SymbolType.IMAGE,
        text: imageMatch.alt,
        url: imageMatch.url,
        alt: imageMatch.alt,
        horizontal: horizontalPosition,
      } as LineWrapper

      const width = imageMatch.width
      const height = imageMatch.height

      if (width) img.width = width
      if (height) img.height = height

      wrapper = img
    } else if (isAHeading(line)) {
      wrapper = {
        symbol: getSymbolTypeFromHeading(line)!,
        text: line.replace(/^(#{1,6})\s+/, ''),
        horizontal: horizontalPosition,
      }
    } else {
      wrapper = { symbol: SymbolType.PARAGRAPH, text: line, horizontal: horizontalPosition }
    }

    elements.push(wrapper)

    counter++
  }

  if (buffer.length > 0) {
    const wrapper = {
      symbol:
        buffer[0].symbol == SymbolType.UNORDERED_LIST_ITEM
          ? SymbolType.UNORDERED_LIST
          : SymbolType.ORDERED_LIST,
      text: '',
      horizontal: HorizontalPosition.LEFT,
      children: Object.assign(buffer),
    }

    buffer = []

    elements.push(wrapper)
  }

  console.log('elements: ', elements)

  return elements
}

// function transformLineToWrapper(value: string, before?: LineWrapper): LineWrapper | null {
//   //if (!value.trim()) return null // ignora linhas vazias

//   let wrapper: LineWrapper | null = null

//   const horizontalPosition = getHorizontalPosition(value)

//   value = cleanHorizontalMarkers(value, horizontalPosition)

//   const imageMatch = parseImageMarkdown(value)

//   if (imageMatch) {
//     const img = {
//       symbol: SymbolType.IMAGE,
//       text: imageMatch.alt,
//       url: imageMatch.url,
//       alt: imageMatch.alt,
//       horizontal: horizontalPosition,
//     } as LineWrapper

//     const width = imageMatch.width
//     const height = imageMatch.height

//     if (width) img.width = width
//     if (height) img.height = height

//     return img
//   } else if (isAHeading(value)) {
//     return {
//       symbol: getSymbolTypeFromHeading(value)!,
//       text: value.replace(/^(#{1,6})\s+/, ''),
//       horizontal: horizontalPosition,
//     }
//   } else if (isAUnorderedListItem(value)) {
//     const listItemText = value.replace(/^-\s+/, '')

//     if (before && before.symbol === SymbolType.UNORDERED_LIST_ITEM) {
//       // Continua a lista existente
//       return {
//         symbol: SymbolType.UNORDERED_LIST_ITEM,
//         text: '',
//         horizontal: horizontalPosition,
//         children: { symbol: SymbolType.PARAGRAPH, text: listItemText },
//         before: before,
//       }
//     }

//     return {
//       symbol: SymbolType.UNORDERED_LIST_ITEM,
//       text: '',
//       horizontal: horizontalPosition,
//       children: { symbol: SymbolType.PARAGRAPH, text: listItemText },
//     }
//   } else {
//     wrapper = { symbol: SymbolType.PARAGRAPH, text: value, horizontal: horizontalPosition }
//   }

//   return wrapper
// }

function isAHeading(value: string): boolean {
  return /^#{1,6}\s+(.+)/.test(value.trim())
}

function isAListItem(value: string): boolean {
  return isAOrderedListItem(value) || isAUnorderedListItem(value)
}

function isAUnorderedListItem(value: string): boolean {
  return /^-\s+(.+)/.test(value.trim())
}

function isAOrderedListItem(value: string): boolean {
  return /^\s*\d+[\.\)]\s+/.test(value.trim())
}

function getSymbolTypeFromHeading(value: string): SymbolType | null {
  const match = value.match(/^(#{1,6})\s+/)
  if (match) {
    const level = match[1].length
    switch (level) {
      case 1:
        return SymbolType.HEADONE
      case 2:
        return SymbolType.HEADTWO
      case 3:
        return SymbolType.HEADTHREE
      case 4:
        return SymbolType.HEADFOUR
      case 5:
        return SymbolType.HEADFIVE
      case 6:
      default:
        return SymbolType.HEADSIX
    }
  }
  return null
}

function getHorizontalPosition(value: string): HorizontalPosition {
  if (value.startsWith('>') && value.endsWith('<')) {
    return HorizontalPosition.CENTER
  } else if (value.startsWith('>') && !value.endsWith('<')) {
    return HorizontalPosition.RIGHT
  } else {
    return HorizontalPosition.LEFT
  }
}

function cleanHorizontalMarkers(value: string, position: HorizontalPosition): string {
  if (position === HorizontalPosition.CENTER) {
    return value.slice(1, -1).trim()
  } else if (position === HorizontalPosition.RIGHT) {
    return value.slice(1).trim()
  } else {
    return value.trim()
  }
}
