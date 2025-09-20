import check from 'safe-regex2'

export const MarkdownRegex = {
  bold: /\*\*(.+?)\*\*/g,
  italic: /_(.+?)_/g,
  underline: /__(.+?)__/g,
  strikethrough: /~~(.+?)~~/g,

  alignLeft: /(.+?)</g,
  alignRight: /(.+?)>/g,
  alignCenter: />=(.+?)</g,
  alignJustify: />=(.+?)/g,

  lt: /<(.+?)/g,
  gt: />(.+?)/g,

  image: /!\[([\w\s\-_.]{0,100})\]\((https?:\/\/[^\s)]{1,200}|[^\s)]{1,200})\)/,
  link: /\[(.*?)\]\((.*?)\)/g,

  code: /```(.+?)```/g,
  inlineCode: /`(.+?)`/g,

  unorderedList: /(^|\n)(\*|\-|\+)\s+(.+?)(\n|$)/g,
  orderedList: /(^|\n)(\d+)\.\s+(.+?)(\n|$)/g,

  blockquote: /(^|\n)>\s+(.+?)(\n|$)/g,
  horizontalRule: /(^|\n)(\*{3,}|\-{3,}|_{3,})(\n|$)/g,

  heading1: /(^|\n)# (.+?)(\n|$)/g,
  heading2: /(^|\n)## (.+?)(\n|$)/g,
  heading3: /(^|\n)### (.+?)(\n|$)/g,
  heading4: /(^|\n)#### (.+?)(\n|$)/g,
  heading5: /(^|\n)##### (.+?)(\n|$)/g,
  heading6: /(^|\n)###### (.+?)(\n|$)/g,

  paragraph: /(^|\n)([^\n]+?)(\n|$)/g,

  breakline: /\n/g,

  multipleSpaces: /\s{2,}/g,

  line: /---/
}

export function checkAllRegexHealth() {
  console.log('Checking health of Markdown regex patterns...')
  Object.keys(MarkdownRegex).forEach((key) => {
    const regex = (MarkdownRegex as Record<string, RegExp>)[key]
    if (!check(regex)) {
      console.warn(`❌ The regex for ${key} is potentially unsafe.`)
    } else {
      console.log(`✅ The regex for ${key} is safe.`)
    }
  })
}
