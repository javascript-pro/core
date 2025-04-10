'use client'

import {
  Box,
  CardHeader,
  CardMedia,
  CardContent,
} from '@mui/material'
import { 
  Icon, 
  // ContextNav,
} from '#/goldlabel'
import ReactMarkdown from 'react-markdown'
import { NavItem } from '#/goldlabel/types/nav'

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

export type FolderPageProps = {
  section: string
  tree: NavItem[] | null
  frontmatter: Frontmatter | null
  content: string | null
  globalNav: NavItem[]
}

export default function FolderPage({
  section,
  // tree,
  frontmatter,
  content,
  globalNav,
}: FolderPageProps) {
  const currentNode = findNodeBySlug(globalNav, section)
  const children: NavItem[] = currentNode?.children || []

  return (
    <Box sx={{ px: 2 }}>
      <CardHeader
        action={<Icon icon={frontmatter?.icon as any} color="secondary" />}
        title={frontmatter?.title || section}
        subheader={frontmatter?.description}
      />

      {frontmatter?.image && (
        <Box sx={{ mx: 1, mb: 1 }}>
          <CardMedia
            component="img"
            sx={{
              height: {
                xs: 120,
                md: 220,
              },
            }}
            src={frontmatter.image}
            alt={frontmatter.title}
          />
        </Box>
      )}

      {/* <ContextNav globalNav={globalNav} parentDepth={1} /> */}

      {content && (
        <CardContent sx={{ mt: 4 }}>
          <ReactMarkdown>
            {content}
          </ReactMarkdown>
        </CardContent>
      )}
    </Box>
  )
}

function findNodeBySlug(nav: NavItem[], slug: string): NavItem | null {
  for (const node of nav) {
    if (node.slug === slug) return node
    if (node.children && Array.isArray(node.children)) {
      const found = findNodeBySlug(node.children, slug)
      if (found) return found
    }
  }
  return null
}
