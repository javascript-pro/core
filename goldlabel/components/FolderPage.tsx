'use client'

import Link from 'next/link'
import {
  Box,
  Card,
  CardActionArea,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
} from '@mui/material'
import { Icon } from '#/goldlabel'
import ReactMarkdown from 'react-markdown'

export type MarkdownProps = {
  type: 'file' | 'folder'
  name: string
  slug?: string
  order?: number
  excerpt?: string
  content?: string
  frontmatter?: Frontmatter
  children?: MarkdownProps[]
}

export type Frontmatter = {
  order?: number
  title?: string
  description?: string
  slug?: string
  icon?: string
  image?: string
  tags?: string[]
  excerpt?: string
}

type NavNode = {
  title: string
  slug: string
  order?: number
  icon?: string
  excerpt?: string
  children?: NavNode[]
}

export type FolderPageProps = {
  section: string
  tree: MarkdownProps[] | null
  frontmatter: Frontmatter | null
  content: string | null
  globalNav: NavNode[]
}

export default function FolderPage({
  section,
  tree,
  frontmatter,
  content,
  globalNav,
}: FolderPageProps) {
  const currentNode = findNodeBySlug(globalNav, section)
  const children: NavNode[] = currentNode?.children || []

  return (
    <Box sx={{ px: 2 }}>
      <CardHeader
        avatar={<Icon icon={frontmatter?.icon as any} color="secondary" />}
        title={frontmatter?.title || section}
        subheader={frontmatter?.description}
      />

      {frontmatter?.image && (
        <Box sx={{ mx: 1, mb: 1 }}>
          <CardMedia
            component="img"
            height={150}
            src={frontmatter.image}
            alt={frontmatter.title}
          />
        </Box>
      )}

      {children.length > 0 && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          {children
            .slice()
            .sort((a: NavNode, b: NavNode) => (a.order ?? 9999) - (b.order ?? 9999))
            .map((node, index) => (
              <Box key={index}>
                <Link
                  href={`/${node.slug}`}
                  style={{ color: 'black', textDecoration: 'none' }}
                >
                  <Card variant="outlined">
                    <CardActionArea>
                      <CardHeader
                        avatar={
                          node.icon ? (
                            <Icon icon={node.icon as any} color="secondary" />
                          ) : undefined
                        }
                        title={node.title}
                        subheader={node.excerpt}
                      />
                    </CardActionArea>
                  </Card>
                </Link>
              </Box>
            ))}
        </Box>
      )}

      {content && (
        <CardContent sx={{ mt: 4 }}>
          <ReactMarkdown>{content}</ReactMarkdown>
        </CardContent>
      )}
    </Box>
  )
}

function findNodeBySlug(nav: NavNode[], slug: string): NavNode | null {
  for (const node of nav) {
    if (node.slug === slug) return node
    if (node.children && Array.isArray(node.children)) {
      const found = findNodeBySlug(node.children, slug)
      if (found) return found
    }
  }
  return null
}
