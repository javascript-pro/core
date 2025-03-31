'use client'

import Link from 'next/link'
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Avatar,
  Container,
} from '@mui/material'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import HomeIcon from '@mui/icons-material/Home'
import BookIcon from '@mui/icons-material/Book'
import AppsIcon from '@mui/icons-material/Apps'

type TreeNode = {
  type: 'file' | 'folder'
  name: string
  slug?: string
  order?: number
  excerpt?: string
  frontmatter?: Frontmatter
  children?: TreeNode[]
}

type Frontmatter = {
  order?: number
  title?: string
  description?: string
  slug?: string
  icon?: string
  image?: string
  tags?: string
}

type Props = {
  section: string
  tree: TreeNode[] | null
  frontmatter: Frontmatter | null
}

export default function IndexPage({ section, tree, frontmatter }: Props) {
  if (!tree) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6">No content found in /{section}</Typography>
      </Box>
    )
  }


  const Icon = getIcon(frontmatter?.icon)

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          mb: 4,
        }}
      >
        <CardContent sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Avatar sx={{ mr: 1 }}>
              <Icon />
            </Avatar>
            <Typography variant="h4">
              {frontmatter?.title || section}
            </Typography>
          </Box>
          {frontmatter?.description && (
            <Typography variant="body1" color="text.secondary">
              {frontmatter.description}
            </Typography>
          )}
          {frontmatter?.tags && (
            <Typography
              variant="caption"
              sx={{ display: 'block', mt: 1, color: 'text.disabled' }}
            >
              {frontmatter.tags}
            </Typography>
          )}
        </CardContent>

        {frontmatter?.image && (
          <Box
            component="img"
            src={frontmatter.image}
            alt={frontmatter.title}
            sx={{
              width: { xs: '100%', sm: 300 },
              height: 'auto',
              objectFit: 'cover',
              borderTop: { xs: 1, sm: 0 },
              borderLeft: { sm: 1 },
              borderColor: 'divider',
              borderRadius: 0,
            }}
          />
        )}
      </Card>

      {tree.length > 0 && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {renderCards(tree)}
        </Box>
      )}
    </>
  )
}

function renderCards(tree: TreeNode[]): React.ReactElement[] {
  const sortedTree = [...tree].sort((a, b) => {
    const orderA = a.frontmatter?.order ?? a.order ?? 9999
    const orderB = b.frontmatter?.order ?? b.order ?? 9999
    return orderA - orderB
  })

  return sortedTree.map((node, index) => {
    const key = `${node.name}-${index}`
    const isFolder = node.type === 'folder'
    const href = isFolder
      ? node.frontmatter?.slug || `/${slugify(node.name)}`
      : node.slug || `/${slugify(node.name)}`
    const AvatarIcon = isFolder ? AppsIcon : InsertDriveFileIcon
    const title = node.frontmatter?.title
    const subheader = node.frontmatter?.description
    
    return (
      <Link href={href} key={key} style={{ textDecoration: 'none' }}>
        <Card
          variant="outlined"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <CardHeader
            avatar={
              <Avatar>
                <AvatarIcon />
              </Avatar>
            }
            title={title}
            subheader={subheader}
          />
          {node.excerpt && (
            <CardContent sx={{ pt: 0 }}>
              <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                {node.excerpt}
              </Typography>
            </CardContent>
          )}
        </Card>
      </Link>
    )
  })
}

function getIcon(name?: string): React.ElementType {
  switch (name) {
    case 'home':
      return HomeIcon
    case 'book':
      return BookIcon
    case 'apps':
      return AppsIcon
    default:
      return InsertDriveFileIcon
  }
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}
