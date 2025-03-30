import path from 'path'
import { notFound } from 'next/navigation'
import fs from 'fs/promises'
import { Container } from '@mui/material'
import { loadMarkdown, getMarkdownTree } from '#/lib/loadMarkdown'
import IndexPage from '#/components/IndexPage'
import MarkdownPage from '#/components/MarkDownPage'

type Props = {
  params: any
}

export default async function CatchAllPage({ params }: Props) {
  const slugArray = params.slug || []
  const slugPath = '/' + slugArray.join('/')

  // Try to load markdown file directly
  const markdown = await loadMarkdown(slugPath)
  if (markdown) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <MarkdownPage content={markdown} />
      </Container>
    )
  }

  // If markdown not found, check if it's a folder
  const folderPath = path.join(process.cwd(), 'public/markdown', ...slugArray)
  try {
    const stat = await fs.stat(folderPath)
    if (stat.isDirectory()) {
      const section = slugArray.join('/')
      const tree = await getMarkdownTree(section)

      // Try to load index.md inside this folder
      const indexMarkdown = await loadMarkdown(path.join(slugPath, 'index'))

      return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
          <IndexPage
            section={section}
            tree={tree}
            frontmatter={indexMarkdown?.frontmatter || null}
          />
        </Container>
      )
    }
  } catch {
    // Folder doesn't exist
  }

  return notFound()
}
