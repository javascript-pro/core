// app/[[...slug]]/page.tsx

import { notFound } from 'next/navigation'
import { loadMarkdown, getMarkdownTree } from '#/lib/loadMarkdown'
import IndexPage from '#/components/IndexPage'
import MarkdownPage from '#/components/MarkDownPage'
import path from 'path'
import fs from 'fs/promises'

type Props = {
  params: any
}

export default async function CatchAllPage({ params }: Props) {
  const slugArray = params.slug || []
  const slugPath = '/' + slugArray.join('/')

  // 1. Homepage
  // if (slugPath === '/') {
  //   return <HomePage />
  // }

  // 2. Try to load markdown file
  const markdown = await loadMarkdown(slugPath)
  if (markdown) {
    return <MarkdownPage content={markdown} />
  }

  // 3. Try to load folder index
  const folderPath = path.join(process.cwd(), 'public/markdown', ...slugArray)
  try {
    const stat = await fs.stat(folderPath)
    if (stat.isDirectory()) {
      const section = slugArray.join('/')
      const tree = await getMarkdownTree(section)
      return <IndexPage section={section} tree={tree} />
    }
  } catch (err) {
    // folder doesn't exist
  }

  // 4. Nothing found
  return notFound()
}
