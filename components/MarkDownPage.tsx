'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

type Props = {
  content: {
    frontmatter: Record<string, any>
    content: string
  }
}

export default function MarkdownPage({ content }: Props) {
  const { frontmatter, content: body } = content

  return (
    <div className="prose dark:prose-invert max-w-3xl mx-auto p-8">
      {frontmatter.title && (
        <h1 className="text-3xl font-bold mb-4">{frontmatter.title}</h1>
      )}
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
    </div>
  )
}
