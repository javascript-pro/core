'use client'

import Link from 'next/link'
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Avatar,
} from '@mui/material'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'

type TreeNode = {
  type: 'file' // we no longer care about 'folder'
  name: string
  slug?: string
  order?: number
  excerpt?: string
  children?: TreeNode[] // kept for compatibility but unused here
}

type Props = {
  section: string
  tree: TreeNode[] | null
}

export default function IndexPage({ section, tree }: Props) {
  // console.log('tree', tree)

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
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {renderCards(tree)}
      </Box>
    </Box>
  )
}

function renderCards(tree: TreeNode[]): React.ReactElement[] {
  const sortedTree = [...tree].sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999))

  return sortedTree.map((node, index) => {
    const key = `${node.name}-${index}`
    const href = node.slug || '/missing-slug'

    return (
      <Link href={href} passHref legacyBehavior key={key}>
        <a style={{ textDecoration: 'none' }}>
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
                <Avatar sx={{ bgcolor: 'secondary.main' }}>
                  <InsertDriveFileIcon />
                </Avatar>
              }
              title={node.name}
            />
            {node.excerpt && (
              <CardContent sx={{ pt: 0 }}>
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
    )
  })
}
