'use client'

import {
  Box,
  CardHeader,
  CardMedia,
  CardContent,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { Icon, Advert } from '#/goldlabel'
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

  return (
    <Box sx={{ px: 2 }}>
      <CardHeader
        avatar={<Icon icon={frontmatter?.icon as any} color="secondary" />}
        title={frontmatter?.title || section}
        subheader={frontmatter?.description}
      />

      {frontmatter?.image && (
        <Box sx={{ mb: {
          xs: 1,
          sm: 4,
        }}}>
          <CardMedia
            component="img"
            sx={{
              height: {
                xs: 100,
                sm: 250,
              },
            }}
            src={frontmatter.image}
            alt={frontmatter.title}
          />
        </Box>
      )}
          <Box sx={{ display: "flex" }}>
            
            {isSmUp ? (
              
              <Box sx={{display: "flex"}}>
                
                <Box 
                  sx={{mt:{
                    xs: 0,
                    sm: -3,
                  }}}>
                    {content && (
                      <CardContent>
                        <ReactMarkdown>{content}</ReactMarkdown>
                      </CardContent>
                    )}
                  </Box>
                  <Box sx={{maxWidth: 300}}>
                    <Advert />
                  </Box>
              </Box>

              
            ) : (
              <Box sx={{}}>
                {content && <ReactMarkdown>{content}</ReactMarkdown>}
                
                    <Advert />
                
              </Box>
            )}
          </Box>
          <Box>
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
