import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'

export const MARKDOWN_ROOT = path.join(process.cwd(), 'public/markdown')

/**
 * Recursively find all .md files under MARKDOWN_ROOT and return those with featured: true
 */
export async function getFeatured(): Promise<
  {
    slug: string
    frontmatter: any
  }[]
> {
  async function walk(dir: string): Promise<{ slug: string; frontmatter: any }[]> {
    const entries = await fs.readdir(dir, { withFileTypes: true })

    const results = await Promise.all(
      entries.map(async (entry) => {
        const fullPath = path.join(dir, entry.name)

        if (entry.isDirectory()) {
          return await walk(fullPath)
        }

        if (entry.isFile() && entry.name.endsWith('.md')) {
          try {
            const fileContent = await fs.readFile(fullPath, 'utf-8')
            const { data } = matter(fileContent)

            if (data.featured) {
              const relative = path.relative(MARKDOWN_ROOT, fullPath)
              const slug = '/' + relative.replace(/\.md$/, '')
              return [{ slug, frontmatter: data }]
            }
          } catch (err) {
            // silently skip bad files
          }
        }

        return []
      })
    )

    return results.flat()
  }

  return walk(MARKDOWN_ROOT)
}
