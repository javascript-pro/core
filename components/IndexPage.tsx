'use client'

import Link from 'next/link'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

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
  if (!tree) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6">No content found in /{section}</Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ p: 1 }}>
      <Typography variant="h4" gutterBottom sx={{ textTransform: 'capitalize' }}>
        {section}
      </Typography>
      <List disablePadding>{renderTree(tree)}</List>
    </Box>
  )
}

function renderTree(tree: TreeNode[], depth = 0): React.ReactElement[] {
  const sortedTree = [...tree].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  const paddingLeft = depth * 2

  return sortedTree.map((node, index) => {
    const key = `${node.name}-${index}`

    if (node.type === 'file' && node.slug) {
      return (
        <ListItem key={key} disablePadding sx={{ pl: paddingLeft }}>
          <ListItemButton component={Link} href={node.slug}>
            <ListItemText
              primary={node.name}
              secondary={node.excerpt}
              secondaryTypographyProps={{ sx: { whiteSpace: 'pre-line' } }}
            />
          </ListItemButton>
        </ListItem>
      )
    }

    if (node.type === 'folder' && node.children) {
      return (
        <Accordion key={key} disableGutters sx={{ pl: paddingLeft }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box>
              <Typography>{node.name}</Typography>
              {node.excerpt && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ whiteSpace: 'pre-line' }}
                >
                  {node.excerpt}
                </Typography>
              )}
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <List disablePadding>{renderTree(node.children, depth + 1)}</List>
          </AccordionDetails>
        </Accordion>
      )
    }

    return <></>
  })
}
