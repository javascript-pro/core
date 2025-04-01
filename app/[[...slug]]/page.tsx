import path from 'path'
import { notFound } from 'next/navigation'
import fs from 'fs/promises'
import { loadMarkdown, getMarkdownTree } from '#/lib/loadMarkdown'
import { FolderPage, FilePage, Sitemap, Home } from '#/goldlabel'

export type CatchAllPageProps = {
  params: any
}

export default async function CatchAllPage({ params }: CatchAllPageProps) {
  const slugArray = params.slug || []
  const slugPath = '/' + slugArray.join('/')

  // Load globalNav JSON directly from public folder
  const navPath = path.join(process.cwd(), 'public/globalNav.json')
  let globalNav = null
  try {
    const navRaw = await fs.readFile(navPath, 'utf-8')
    globalNav = JSON.parse(navRaw)
  } catch (err) {
    console.error('Failed to load globalNav.json:', err)
  }

  if (slugPath === '/') {
    return <>            
            <Home />
            <Sitemap globalNav={globalNav} openTopLevelByDefault={1} />
          </>
  }

  // Special case for /sitemap
  if (slugPath === '/sitemap') {
    return <Sitemap globalNav={globalNav} openTopLevelByDefault={10}/>
  }

  // Try to load markdown file directly
  const markdown = await loadMarkdown(slugPath)
  if (markdown) {
    return <FilePage content={markdown} globalNav={globalNav} />
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
        <FolderPage
          section={section}
          tree={tree}
          frontmatter={indexMarkdown?.frontmatter || null}
          content={indexMarkdown?.content || null}
          globalNav={globalNav}
        />
      )
    }
  } catch {
    // Folder doesn't exist
  }

  return notFound()
}
