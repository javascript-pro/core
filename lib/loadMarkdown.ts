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
 * including frontmatter and content from index.md in each folder.
 * @param section e.g., "life"
 */
export async function getMarkdownTree(section: string) {
  const sectionPath = path.join(MARKDOWN_ROOT, section)

  async function walk(dir: string): Promise<any[]> {
    const dirents = await fs.readdir(dir, { withFileTypes: true })

    const children = await Promise.all(
      dirents.map(async (dirent) => {
        const fullPath = path.join(dir, dirent.name)
        const relativePath = path.relative(MARKDOWN_ROOT, fullPath)

        if (dirent.isDirectory()) {
          const children = await walk(fullPath)
          const indexPath = path.join(fullPath, 'index.md')
          let frontmatter: any = {}
          let content = ''

          try {
            const fileContent = await fs.readFile(indexPath, 'utf-8')
            const parsed = matter(fileContent)
            frontmatter = parsed.data
            frontmatter.content = parsed.content
            content = parsed.content
          } catch (err) {
            // index.md not found or unreadable
          }

          if (children.length > 0 || Object.keys(frontmatter).length > 0) {
            return {
              type: 'folder',
              name: dirent.name,
              frontmatter,
              content,
              children,
            }
          }
        } else if (dirent.name.endsWith('.md') && dirent.name !== 'index.md') {
          const slug = '/' + relativePath.replace(/\.md$/, '')
          let frontmatter = {}

          try {
            const fileContent = await fs.readFile(fullPath, 'utf-8')
            const { data } = matter(fileContent)
            frontmatter = data
          } catch (err) {
            // file might be unreadable or malformed
          }

          return {
            type: 'file',
            name: dirent.name.replace(/\.md$/, ''),
            slug,
            frontmatter,
          }
        }
      })
    )

    return children.filter(Boolean)
  }

  try {
    return await walk(sectionPath)
  } catch (err) {
    return null
  }
}