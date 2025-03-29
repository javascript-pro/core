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
  children?: NavNode[]
}

async function getMarkdownPagesRecursively(dir: string, baseSlug = ''): Promise<NavNode[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true })

  // Check for index.md first
  const indexFile = entries.find(e => e.isFile() && e.name === 'index.md')
  if (!indexFile) return []

  const fullIndexPath = path.join(dir, 'index.md')
  const rawIndex = await fs.readFile(fullIndexPath, 'utf-8')
  const { data: indexData } = matter(rawIndex)

  const slug = baseSlug || '/' // fallback to root
  const node: NavNode = {
    title: indexData.title || path.basename(dir),
    slug,
    order: indexData.order ?? 0,
    icon: indexData.icon,
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
      const { data } = matter(raw)
      const fileSlug = path.join(slug, entry.name.replace(/\.md$/, ''))

      node.children!.push({
        title: data.title || fileSlug,
        slug: fileSlug,
        order: data.order ?? 0,
        icon: data.icon,
      })
    }
  }

  // Sort children by order
  if (node.children && node.children.length > 0) {
    node.children.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  }

  return [node]
}

export async function generateGlobalNav() {
  const tree = await getMarkdownPagesRecursively(MARKDOWN_ROOT)
  await fs.writeFile(OUTPUT_PATH, JSON.stringify(tree, null, 2))
  console.log(`✅ Generated nested nav with ${tree.length} top-level sections at /globalNav.json`)
}
