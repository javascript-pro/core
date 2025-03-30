// lib/loadMarkdown.ts

import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'

export const MARKDOWN_ROOT = path.join(process.cwd(), 'public/markdown')

/**
 * Load a single markdown file based on a slug path
 * @param slugPath like "/life/portugal"
 */
export async function loadMarkdown(slugPath: string) {
  const filePath = path.join(MARKDOWN_ROOT, `${slugPath}.md`)

  try {
    const fileContent = await fs.readFile(filePath, 'utf-8')
    const { data, content } = matter(fileContent)
    return { frontmatter: data, content }
  } catch (err) {
    return null // File not found
  }
}

/**
 * Recursively list all .md files and folders inside a section,
 * excluding index.md files from the navigation tree.
 * @param section e.g., "life"
 */
export async function getMarkdownTree(section: string) {
  const sectionPath = path.join(MARKDOWN_ROOT, section)

  async function walk(dir: string): Promise<any[]> {
    const dirents = await fs.readdir(dir, { withFileTypes: true })
    return Promise.all(
      dirents.map(async (dirent) => {
        const fullPath = path.join(dir, dirent.name)
        const relativePath = path.relative(MARKDOWN_ROOT, fullPath)

        if (dirent.isDirectory()) {
          const children = await walk(fullPath)
          // Only include the folder if it has visible children
          if (children.length > 0) {
            return {
              type: 'folder',
              name: dirent.name,
              children,
            }
          }
        } else if (dirent.name.endsWith('.md') && dirent.name !== 'index.md') {
          const slug = '/' + relativePath.replace(/\.md$/, '')
          return {
            type: 'file',
            name: dirent.name.replace(/\.md$/, ''),
            slug,
          }
        }
      })
    ).then((items) => items.filter(Boolean))
  }

  try {
    return await walk(sectionPath)
  } catch (err) {
    return null
  }
}
