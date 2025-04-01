// goldlabel/components/FilePage.tsx

import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import {
  Box,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
} from '@mui/material'
import { Icon } from '#/goldlabel'

export type FilePageProps = {
  content: {
    frontmatter: {
      title?: string
      subheader?: string
      excerpt?: string
      image?: string
      icon?: string
      description?: string
    }
    content: string
    
  }
  globalNav?: any
}

export default function FilePage({ content, globalNav }: FilePageProps) {
  const { frontmatter, content: body } = content
  const { title, image, icon, description } = frontmatter

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <CardHeader
        action={<IconButton disabled>
          <Icon icon={icon as any} color="secondary" />
          </IconButton>}
        title={title || 'Untitled'}
        subheader={description}
      />

      {image && (
        <Box sx={{ mx: 1, mb: 1 }}>
          <CardMedia
            component="img"
            height={315}
            src={image}
            alt={title}
          />
        </Box>
      )}

      <CardContent id="file-page-markdown">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {body}
        </ReactMarkdown>
      </CardContent>
    </Box>
  )
}
