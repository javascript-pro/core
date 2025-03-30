// lib/generateGlobalNav.ts

import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'

const MARKDOWN_ROOT = path.join(process.cwd(), 'public/markdown')
const OUTPUT_PATH = path.join(process.cwd(), 'public', 'globalNav.json')

type NavNode = {
  title: string
  slug: string
  order?: number
  icon?: string
  type: 'folder' | 'file'
  tags?: string[]
  excerpt?: string
  children?: NavNode[]
}

function extractExcerpt(content: string): string {
  return content
    .replace(/<!--.*?-->/gs, '') // remove HTML comments
    .replace(/!\[.*?\]\(.*?\)/g, '') // remove images
    .replace(/\[.*?\]\(.*?\)/g, '') // remove links
    .replace(/`{1,3}.*?`{1,3}/gs, '') // remove inline code
    .replace(/[#>*_`-]/g, '') // strip markdown symbols
    .trim()
    .slice(0, 200)
}

function parseTags(rawTags?: string): string[] | undefined {
  if (!rawTags) return undefined
  return rawTags.split(',').map(tag => tag.trim()).filter(Boolean)
}

export async function getMarkdownPagesRecursively(dir: string, baseSlug = ''): Promise<NavNode[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true })

  const indexFile = entries.find(e => e.isFile() && e.name === 'index.md')
  if (!indexFile) return []

  const fullIndexPath = path.join(dir, 'index.md')
  const rawIndex = await fs.readFile(fullIndexPath, 'utf-8')
  const { data: indexData, content: indexContent } = matter(rawIndex)

  const slug = baseSlug || '/'
  const node: NavNode = {
    title: indexData.title || path.basename(dir),
    slug,
    order: indexData.order ?? 0,
    icon: indexData.icon,
    type: 'folder',
    tags: parseTags(indexData.tags),
    excerpt: extractExcerpt(indexContent),
    children: []
  }

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      const childSlug = path.join(slug, entry.name)
      const childNodes = await getMarkdownPagesRecursively(fullPath, childSlug)
      node.children!.push(...childNodes)
    }

    if (entry.isFile() && entry.name.endsWith('.md') && entry.name !== 'index.md') {
      const raw = await fs.readFile(fullPath, 'utf-8')
      const { data, content } = matter(raw)
      const fileSlug = path.join(slug, entry.name.replace(/\.md$/, ''))

      node.children!.push({
        title: data.title || fileSlug,
        slug: fileSlug,
        order: data.order ?? 0,
        icon: data.icon,
        type: 'file',
        tags: parseTags(data.tags),
        excerpt: extractExcerpt(content),
      })
    }
  }

  if (node.children && node.children.length > 0) {
    node.children.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  }

  return [node]
}

export async function generateGlobalNav() {
  const tree = await getMarkdownPagesRecursively(MARKDOWN_ROOT)
  await fs.writeFile(OUTPUT_PATH, JSON.stringify(tree, null, 2))
  console.log(`✅ Generated Work, Life, Balance at /globalNav.json`)
}
