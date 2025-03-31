// goldlabel/components/FilePage.tsx
import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
} from '@mui/material'
import {Icon } from '#/goldlabel'

type Props = {
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
}

export default function FilePage({ content }: Props) {
  const { frontmatter, content: body } = content
  const { title, image, icon, description } = frontmatter

  return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CardHeader
          action={
            <Icon icon={icon as any} />
          }
          title={title || 'Untitled'}
          subheader={description}
        />

        {frontmatter?.image && (
          <Box sx={{mx:1, mb:1}}>
          <CardMedia
            component="img"
            height={200}
            src={image}
            alt={title}
            
          />
          </Box>
        )}



        <CardContent>

          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {body}
          </ReactMarkdown>

        </CardContent>
      </Box>
  )
}
