// app/components/MarkdownPage.tsx
import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import {
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Container,
  Typography,
  Box,
} from '@mui/material'
import ArticleIcon from '@mui/icons-material/Article' // Swap this if needed

type Props = {
  content: {
    frontmatter: {
      title?: string
      subheader?: string
      excerpt?: string
      image?: string
    }
    content: string
  }
}

export default function MarkdownPage({ content }: Props) {
  const { frontmatter, content: body } = content
  const { title, subheader, excerpt, image } = frontmatter

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Card
        variant="outlined"
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CardHeader
          avatar={
            <Avatar>
              <ArticleIcon />
            </Avatar>
          }
          title={title || 'Untitled'}
          subheader={subheader || null}
        />

        <CardContent>
          <Box
            sx={{
              display: 'flex',
              flexDirection: ['column', 'column', 'row'],
              gap: 3,
            }}
          >
            <Box sx={{ flex: 2 }}>
              {excerpt && (
                <Typography
                  variant="body1"
                  sx={{ whiteSpace: 'pre-line', mb: 2 }}
                >
                  {excerpt}
                </Typography>
              )}

              <Box
                sx={{
                  '& h1': { fontSize: '2rem', mt: 3 },
                  '& h2': { fontSize: '1.75rem', mt: 3 },
                  '& h3': { fontSize: '1.5rem', mt: 3 },
                  '& p': { mb: 2, lineHeight: 1.7 },
                  '& ul': { pl: 3, mb: 2 },
                  '& ol': { pl: 3, mb: 2 },
                  '& li': { mb: 0.5 },
                  '& a': {
                    color: 'primary.main',
                    textDecoration: 'underline',
                    wordBreak: 'break-word',
                  },
                  '& code': {
                    fontFamily: 'monospace',
                    backgroundColor: '#f4f4f4',
                    px: '0.4em',
                    py: '0.2em',
                    borderRadius: '4px',
                  },
                  '& pre': {
                    backgroundColor: '#f4f4f4',
                    p: 2,
                    overflow: 'auto',
                    borderRadius: '4px',
                    mb: 2,
                  },
                  '& table': {
                    width: '100%',
                    borderCollapse: 'collapse',
                    mb: 3,
                  },
                  '& th, & td': {
                    border: '1px solid #ccc',
                    p: 1,
                    textAlign: 'left',
                  },
                  '& th': {
                    backgroundColor: '#f0f0f0',
                  },
                }}
              >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {body}
                </ReactMarkdown>
              </Box>
            </Box>

            {image && (
              <Box
                component="img"
                src={image}
                alt={title || 'Featured'}
                sx={{
                  flex: 1,
                  width: '100%',
                  maxWidth: 300,
                  height: 'auto',
                  borderRadius: 2,
                  alignSelf: 'start',
                }}
              />
            )}
          </Box>
        </CardContent>
      </Card>
    </Container>
  )
}
