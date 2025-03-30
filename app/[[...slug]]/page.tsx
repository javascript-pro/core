// app/[[...slug]]/page.tsx

import path from 'path'
import { notFound } from 'next/navigation'
import fs from 'fs/promises'
import { loadMarkdown, getMarkdownTree } from '#/lib/loadMarkdown'
import IndexPage from '#/components/IndexPage'
import MarkdownPage from '#/components/MarkDownPage'

type Props = {
  params: any
}

export default async function CatchAllPage({ params }: Props) {
  const slugArray = params.slug || []
  const slugPath = '/' + slugArray.join('/')

  // Try to load markdown file
  const markdown = await loadMarkdown(slugPath)
  if (markdown) {
    return <MarkdownPage content={markdown} />
  }

  // If markdown not found, check if it's a folder
  const folderPath = path.join(process.cwd(), 'public/markdown', ...slugArray)
  try {
    const stat = await fs.stat(folderPath)
    if (stat.isDirectory()) {
      const section = slugArray.join('/')
      const tree = await getMarkdownTree(section)
      return <IndexPage section={section} tree={tree} />
    }
  } catch {
    // Folder doesn't exist, continue to notFound
  }

  return notFound()
}
