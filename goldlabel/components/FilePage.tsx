// goldlabel/components/FilePage.tsx
import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import {
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
      <Card
        variant="outlined"
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CardHeader
          avatar={
            <Icon icon={icon as any} />
          }
          title={title || 'Untitled'}
          subheader={description}
        />

        {frontmatter?.image && (
          <CardMedia
            component="img"
            height={200}
            src={image}
            alt={title}
          />
        )}



        <CardContent>

          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {body}
          </ReactMarkdown>

        </CardContent>
      </Card>
  )
}
