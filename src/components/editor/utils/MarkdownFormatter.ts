export enum SymbolType {
  PARAGRAPH,
  HEADONE,
  HEADTWO,
  HEADTHREE,
  HEADFOUR,
  HEADFIVE,
  HEADSIX,
  BOLD,
  ITALIC,
  UNDERLINE,
  STRIKETHROUGH,
  ALIGNLEFT,
  ALIGNCENTER,
  ALIGNRIGHT,
  ALIGNJUSTIFY,
  IMAGE,
  LINK,
}

enum HorizontalPosition {
  LEFT,
  CENTER,
  RIGHT,
}

interface LineWrapper {
  symbol: SymbolType
  text: string
  alt?: string
  url?: string
  horizontal?: HorizontalPosition
  children?: LineWrapper
}

export function formatter(value: string[]): HTMLElement[] {
  return value
    .map((v) => getWrapperByLine(v))
    .map((w) => (w != null ? getElementByWrapper(w) : null))
    .filter((w) => w != null)
}

function getElementByWrapper(wrapper: LineWrapper): HTMLElement {
  let currentElement: HTMLElement | HTMLImageElement

  switch (wrapper.symbol) {
    case SymbolType.HEADONE:
      currentElement = document.createElement('h1')
      break
    case SymbolType.HEADTWO:
      currentElement = document.createElement('h2')
      break
    case SymbolType.HEADTHREE:
      currentElement = document.createElement('h3')
      break
    case SymbolType.HEADFOUR:
      currentElement = document.createElement('h4')
      break
    case SymbolType.HEADFIVE:
      currentElement = document.createElement('h5')
      break
    case SymbolType.HEADSIX:
      currentElement = document.createElement('h6')
      break
    case SymbolType.IMAGE:
      const imgEl = document.createElement('img')
      imgEl.src = wrapper.url!
      imgEl.alt = wrapper.alt || wrapper.text
      currentElement = imgEl
      break
    case SymbolType.BOLD:
      const el = document.createElement('strong')
      el.textContent = wrapper.text
      currentElement = el
      break
    case SymbolType.PARAGRAPH:
    default:
      currentElement = document.createElement('p')
  }

  currentElement.style.textAlign =
    wrapper.horizontal == HorizontalPosition.CENTER
      ? 'center'
      : wrapper.horizontal == HorizontalPosition.RIGHT
        ? 'right'
        : 'left'

  if (
    currentElement instanceof HTMLImageElement &&
    wrapper.horizontal == HorizontalPosition.CENTER
  ) {
    currentElement.style.margin = '0 auto'
  }

  currentElement.textContent = wrapper.text

  if (currentElement instanceof HTMLParagraphElement) {
    currentElement = getFormattedParagraph(currentElement)
  }

  if (wrapper.children) {
    currentElement.appendChild(getElementByWrapper(wrapper.children))
  }

  return currentElement
}

function getFormattedParagraph(paragraph: HTMLParagraphElement): HTMLParagraphElement {
  // console.log('Modifying paragraph')
  // const boldMatch = currentElement.textContent.match(/\*\*(.+?)\*\*/g)
  // console.log(boldMatch)
  return paragraph
}

function getWrapperByLine(value: string): LineWrapper | null {
  if (!value.trim()) return null // ignora linhas vazias

  let wrapper: LineWrapper | null = null

  const horizontalPosition: HorizontalPosition =
    value.startsWith('>') && value.endsWith('<')
      ? HorizontalPosition.CENTER
      : value.startsWith('>') && !value.endsWith('<')
        ? HorizontalPosition.RIGHT
        : HorizontalPosition.LEFT

  value = value.replace(/^>\s*/, '').replace(/\s*<$/, '')

  const imageMatch = value.match(/!\[(.*?)\]\((.*?)\)/)
  const linkMatch = value.match(/\[(.*?)\]\((.*?)\)/)

  if (imageMatch) {
    return {
      symbol: SymbolType.IMAGE,
      text: imageMatch[1],
      url: imageMatch[2],
      alt: imageMatch[1],
      horizontal: horizontalPosition,
    }
  } else if (linkMatch) {
    return {
      symbol: SymbolType.LINK,
      text: linkMatch[1],
      url: linkMatch[2],
      alt: linkMatch[1],
      horizontal: horizontalPosition,
    }
  } else if (/^######\s+/.test(value)) {
    return {
      symbol: SymbolType.HEADSIX,
      text: value.replace(/^######\s+/, ''),
      horizontal: horizontalPosition,
    }
  } else if (/^#####\s+/.test(value)) {
    return {
      symbol: SymbolType.HEADFIVE,
      text: value.replace(/^#####\s+/, ''),
      horizontal: horizontalPosition,
    }
  } else if (/^####\s+/.test(value)) {
    return {
      symbol: SymbolType.HEADFOUR,
      text: value.replace(/^####\s+/, ''),
      horizontal: horizontalPosition,
    }
  } else if (/^###\s+/.test(value)) {
    return {
      symbol: SymbolType.HEADTHREE,
      text: value.replace(/^###\s+/, ''),
      horizontal: horizontalPosition,
    }
  } else if (/^##\s+/.test(value)) {
    return {
      symbol: SymbolType.HEADTWO,
      text: value.replace(/^##\s+/, ''),
      horizontal: horizontalPosition,
    }
  } else if (/^#\s+/.test(value)) {
    return {
      symbol: SymbolType.HEADONE,
      text: value.replace(/^#\s+/, ''),
      horizontal: horizontalPosition,
    }
  } else {
    // caso contrário, vira parágrafo
    wrapper = { symbol: SymbolType.PARAGRAPH, text: value, horizontal: horizontalPosition }
  }

  return wrapper
}
