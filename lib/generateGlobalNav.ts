// lib/generateGlobalNav.ts

import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'

const MARKDOWN_ROOT = path.join(process.cwd(), 'public/markdown')
const OUTPUT_PATH = path.join(process.cwd(), 'public', 'globalNav.json')

type MarkdownMeta = {
  title: string
  order?: number
  icon?: string
  slug: string
  [key: string]: any
}

type MarkdownPage = {
  meta: MarkdownMeta
  content: string
}

type NavNode = {
  title: string
  slug: string
  order?: number
  icon?: string
  children?: NavNode[]
}

async function getMarkdownPagesRecursively(dir: string, baseSlug = ''): Promise<NavNode[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const nodes: NavNode[] = []

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    const relativeSlug = path.join(baseSlug, entry.name.replace(/\.md$/, ''))

    if (entry.isDirectory()) {
      const children = await getMarkdownPagesRecursively(fullPath, relativeSlug)
      if (children.length > 0) {
        nodes.push({
          title: entry.name,
          slug: relativeSlug,
          children: children.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
        })
      }
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      const raw = await fs.readFile(fullPath, 'utf-8')
      const { data } = matter(raw)

      const meta: MarkdownMeta = {
        title: data.title || relativeSlug,
        slug: relativeSlug,
        order: data.order ?? 0,
        icon: data.icon,
      }

      nodes.push(meta)
    }
  }

  return nodes.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
}

export async function generateGlobalNav() {
  const tree = await getMarkdownPagesRecursively(MARKDOWN_ROOT)
  await fs.writeFile(OUTPUT_PATH, JSON.stringify(tree, null, 2))
  console.log(`✅ Generated Work, Life, Balance at /globalNav.json`)
}
