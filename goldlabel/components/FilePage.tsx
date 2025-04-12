// goldlabel/components/FilePage.tsx

import React from 'react'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import {
  Box,
  CardContent,
  CardHeader,
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
        // avatar={
        //   <IconButton disabled>
        //     <Icon icon={icon as any} color="secondary" />
        //   </IconButton>
        // }
        title={title || 'Untitled'}
        subheader={description}
      />

      {image && (
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            maxWidth: 800,
            aspectRatio: '16/9',
            mx: 1,
            mb: 2,
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          <Image
            src={image}
            alt={title || 'Image'}
            fill
            sizes="(max-width: 600px) 100vw, (max-width: 1200px) 80vw, 800px"
            style={{ objectFit: 'cover' }}
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
