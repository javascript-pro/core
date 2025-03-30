'use client'

import Link from 'next/link'
import { Box, Typography, List, ListItem, ListItemButton, ListItemText } from '@mui/material'

type TreeNode = {
  type: 'file' | 'folder'
  name: string
  slug?: string
  children?: TreeNode[]
}

type Props = {
  section: string
  tree: TreeNode[] | null
}

export default function IndexPage({ section, tree }: Props) {
  if (!tree) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6">No content found in /{section}</Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ textTransform: 'capitalize' }}>
        {section}
      </Typography>
      <List disablePadding>{renderTree(tree)}</List>
    </Box>
  )
}

function renderTree(tree: TreeNode[], depth = 0): React.ReactElement[] {
  return tree.map((node, index) => {
    const paddingLeft = depth * 2

    if (node.type === 'file' && node.slug) {
      return (
        <ListItem key={index} disablePadding sx={{ pl: paddingLeft }}>
          <ListItemButton component={Link} href={node.slug}>
            <ListItemText primary={node.name} />
          </ListItemButton>
        </ListItem>
      )
    }

    if (node.type === 'folder' && node.children) {
      return (
        <Box key={index} sx={{ pl: paddingLeft, mb: 1 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            {node.name}
          </Typography>
          <List disablePadding>{renderTree(node.children, depth + 1)}</List>
        </Box>
      )
    }

    return <></>
  })
}
