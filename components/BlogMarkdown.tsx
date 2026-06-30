import Link from 'next/link'
import { Fragment, type ReactNode } from 'react'

interface BlogMarkdownProps {
  content?: string | null
  emptyLabel: string
}

type ListKind = 'ol' | 'ul'

interface MarkdownList {
  kind: ListKind
  items: string[]
}

function isSafeHref(href: string): boolean {
  return (
    href.startsWith('/') ||
    href.startsWith('https://') ||
    href.startsWith('http://') ||
    href.startsWith('mailto:')
  )
}

function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = []
  const pattern = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/gu
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index))
    }

    const token = match[0]
    const key = `${match.index}-${token}`

    if (token.startsWith('**') && token.endsWith('**')) {
      nodes.push(<strong key={key}>{token.slice(2, -2)}</strong>)
    } else if (token.startsWith('`') && token.endsWith('`')) {
      nodes.push(<code key={key}>{token.slice(1, -1)}</code>)
    } else {
      const linkMatch = /^\[([^\]]+)\]\(([^)]+)\)$/u.exec(token)
      const label = linkMatch?.[1]
      const href = linkMatch?.[2]

      if (label && href && isSafeHref(href)) {
        if (href.startsWith('/')) {
          nodes.push(
            <Link key={key} href={href}>
              {label}
            </Link>,
          )
        } else {
          nodes.push(
            <a key={key} href={href} target={href.startsWith('mailto:') ? undefined : '_blank'} rel="noreferrer">
              {label}
            </a>,
          )
        }
      } else {
        nodes.push(token)
      }
    }

    lastIndex = pattern.lastIndex
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex))
  }

  return nodes
}

function renderParagraph(lines: string[], key: string): ReactNode | null {
  const text = lines.join(' ').trim()

  return text ? <p key={key}>{renderInline(text)}</p> : null
}

function renderList(list: MarkdownList, key: string): ReactNode {
  const ListTag = list.kind

  return (
    <ListTag key={key}>
      {list.items.map((item, index) => (
        <li key={`${key}-${index}`}>{renderInline(item)}</li>
      ))}
    </ListTag>
  )
}

export default function BlogMarkdown({ content, emptyLabel }: BlogMarkdownProps) {
  const source = content?.replace(/\r\n?/gu, '\n').trim()

  if (!source) {
    return <p>{emptyLabel}</p>
  }

  const blocks: ReactNode[] = []
  const paragraphLines: string[] = []
  let activeList: MarkdownList | null = null
  let codeLines: string[] | null = null

  const flushParagraph = () => {
    const block = renderParagraph(paragraphLines, `p-${blocks.length}`)
    paragraphLines.length = 0

    if (block) {
      blocks.push(block)
    }
  }

  const flushList = () => {
    if (activeList) {
      blocks.push(renderList(activeList, `list-${blocks.length}`))
      activeList = null
    }
  }

  source.split('\n').forEach((line) => {
    const trimmed = line.trim()

    if (trimmed.startsWith('```')) {
      if (codeLines !== null) {
        blocks.push(
          <pre key={`code-${blocks.length}`}>
            <code>{codeLines.join('\n')}</code>
          </pre>,
        )
        codeLines = null
      } else {
        flushParagraph()
        flushList()
        codeLines = []
      }

      return
    }

    if (codeLines !== null) {
      codeLines.push(line)
      return
    }

    if (!trimmed) {
      flushParagraph()
      flushList()
      return
    }

    const headingMatch = /^(#{1,3})\s+(.+)$/u.exec(trimmed)
    if (headingMatch) {
      flushParagraph()
      flushList()
      const level = headingMatch[1].length
      const text = headingMatch[2]

      if (level === 1) {
        blocks.push(<h2 key={`h-${blocks.length}`}>{renderInline(text)}</h2>)
      } else if (level === 2) {
        blocks.push(<h2 key={`h-${blocks.length}`}>{renderInline(text)}</h2>)
      } else {
        blocks.push(<h3 key={`h-${blocks.length}`}>{renderInline(text)}</h3>)
      }

      return
    }

    const unorderedMatch = /^[-*]\s+(.+)$/u.exec(trimmed)
    const orderedMatch = /^\d+\.\s+(.+)$/u.exec(trimmed)

    if (unorderedMatch || orderedMatch) {
      flushParagraph()
      const nextKind: ListKind = orderedMatch ? 'ol' : 'ul'

      if (!activeList || activeList.kind !== nextKind) {
        flushList()
        activeList = { kind: nextKind, items: [] }
      }

      activeList.items.push((unorderedMatch || orderedMatch)?.[1] || '')
      return
    }

    if (trimmed.startsWith('>')) {
      flushParagraph()
      flushList()
      blocks.push(<blockquote key={`quote-${blocks.length}`}>{renderInline(trimmed.replace(/^>\s?/u, ''))}</blockquote>)
      return
    }

    paragraphLines.push(trimmed)
  })

  flushParagraph()
  flushList()

  const trailingCodeLines = codeLines as string[] | null

  if (trailingCodeLines) {
    blocks.push(
      <pre key={`code-${blocks.length}`}>
        <code>{trailingCodeLines.join('\n')}</code>
      </pre>,
    )
  }

  return <>{blocks.map((block, index) => <Fragment key={index}>{block}</Fragment>)}</>
}
