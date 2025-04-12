'use client'

import {
  Box,
  CardHeader,
  CardContent,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import Image from 'next/image'
import { 
  // Icon, 
  Advert,
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
  frontmatter,
  content,
  globalNav,
}: FolderPageProps) {
  const theme = useTheme()
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'))

  const currentNode = findNodeBySlug(globalNav, section)
  const children: NavItem[] = currentNode?.children || []

  const isHome = section === 'home'

  return (
    <Box sx={{ px: 2 }}>
      <CardHeader
        // avatar={
        //   isHome
        //     ? null
        //     : <Icon icon={frontmatter?.icon as any} color="secondary" />
        // }
        title={frontmatter?.title || section}
        subheader={frontmatter?.description}
      />

      {frontmatter?.image && (
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            maxWidth: 900,
            aspectRatio: '16/9',
            mb: { xs: 1, sm: 4 },
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          <Image
            priority
            src={frontmatter.image}
            alt={frontmatter.title || 'Cover image'}
            fill
            sizes="(max-width: 600px) 100vw, (max-width: 1200px) 80vw, 900px"
            style={{ objectFit: 'cover' }}
          />
        </Box>
      )}

      <Box sx={{ display: "flex" }}>
        {isSmUp ? (
          <Box sx={{ display: "flex" }}>
            <Box sx={{ mt: { xs: 0, sm: -3 } }}>
              {content && (
                <CardContent>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </CardContent>
              )}
            </Box>
            <Box sx={{ maxWidth: 300 }}>
              <Advert />
            </Box>
          </Box>
        ) : (
          <Box>
            {content && <ReactMarkdown>{content}</ReactMarkdown>}
            <Advert />
          </Box>
        )}
      </Box>
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
