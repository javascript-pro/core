'use client'

import Link from 'next/link'
import {
  Box,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
} from '@mui/material'
import {Icon} from '#/goldlabel'
import ReactMarkdown from 'react-markdown'

type TreeNode = {
  type: 'file' | 'folder'
  name: string
  slug?: string
  order?: number
  excerpt?: string
  content?: string // markdown string for folder index.md
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
  excerpt?: string
}

type Props = {
  section: string
  tree: TreeNode[] | null
  frontmatter: Frontmatter | null
  content: string | null
}

export default function FolderPage({ section, tree, frontmatter, content }: Props) {


  if (!tree) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6">
          No content found in /{section}
        </Typography>
      </Box>
    )
  }
  console.log("content", content)
  return (
    <>
      <Card
        sx={{
        }}
      >
        <CardHeader 
          avatar={<Icon icon={frontmatter?.icon as any} />}
          title={frontmatter?.title || section}
          subheader={frontmatter?.description }
        />

      {frontmatter?.image && (
          <CardMedia
            component="img"
            height={200}
            src={frontmatter.image}
            alt={frontmatter.title}
          />
        )}

        <CardContent>
          
          {content && (
            <ReactMarkdown>{content}</ReactMarkdown>
          )}

          {/* {frontmatter?.tags && (
            <Typography>
              {frontmatter.tags}
            </Typography>
          )} */}

          {tree.length > 0 && (
            <Box sx={{}}>
              {renderCards(tree)}
            </Box>
          )}


        </CardContent>
      </Card>

      
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
    const title = node.frontmatter?.title
    const subheader = node.frontmatter?.description
    const icon = node.frontmatter?.icon
    return (
      <Link href={href} key={key} style={{ textDecoration: 'none' }}>
        <Box>
          <CardHeader
            avatar={
              <Icon icon={icon as any} />
            }
            title={title}
            subheader={subheader}
          />
        </Box>
      </Link>
    )
  })
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
