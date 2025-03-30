'use client'

import Link from 'next/link'
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Avatar,
  useTheme,
} from '@mui/material'
import Grid2 from '@mui/material/Grid'

type TreeNode = {
  type: 'file' | 'folder'
  name: string
  slug?: string
  order?: number
  excerpt?: string
  children?: TreeNode[]
}

type Props = {
  section: string
  tree: TreeNode[] | null
}

export default function IndexPage({ section, tree }: Props) {
  const theme = useTheme()

  if (!tree) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6">No content found in /{section}</Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ textTransform: 'capitalize' }}>
        {section}
      </Typography>
        {renderCards(tree)}
    </Box>
  )
}

function renderCards(tree: TreeNode[]): React.ReactElement[] {
  const sortedTree = [...tree].sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999))

  return sortedTree.map((node, index) => {
    const key = `${node.name}-${index}`
    const isFolder = node.type === 'folder'
    const href = isFolder
      ? findFirstValidSlug(node.children)
      : node.slug || '#'

    return (
      <div key={key}>
        <Link href={href} passHref legacyBehavior>
          <a style={{ textDecoration: 'none' }}>
            <Card variant="outlined" sx={{ height: '100%' }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: isFolder ? 'primary.main' : 'secondary.main' }}>
                    {isFolder ? '📁' : '📄'}
                  </Avatar>
                }
                title={node.name}
              />
              {node.excerpt && (
                <CardContent>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ whiteSpace: 'pre-line' }}
                  >
                    {node.excerpt}
                  </Typography>
                </CardContent>
              )}
            </Card>
          </a>
        </Link>
      </div>
    )
  })
}

function findFirstValidSlug(children?: TreeNode[]): string {
  if (!children || children.length === 0) return '#'

  const sorted = [...children].sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999))

  for (const child of sorted) {
    if (child.slug) return child.slug
    if (child.children) {
      const nested = findFirstValidSlug(child.children)
      if (nested !== '#') return nested
    }
  }

  return '#'
}
