// app/components/MarkdownPage.tsx
import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Container, Typography, Box } from '@mui/material'

type Props = {
  content: {
    frontmatter: Record<string, any>
    content: string
  }
}

export default function MarkdownPage({ content }: Props) {
  const { frontmatter, content: body } = content

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      
      {frontmatter.title && (
        <Typography variant="h3" component="h1" gutterBottom>
          {frontmatter.title}
        </Typography>
      )}

      <Box
        sx={{
          '& h1': { fontSize: '2rem', marginTop: '2rem' },
          '& h2': { fontSize: '1.75rem', marginTop: '2rem' },
          '& p': { marginBottom: '1rem', lineHeight: 1.7 },
          '& ul': { paddingLeft: '1.5rem', mb: 2 },
          '& li': { mb: 0.5 },
          '& a': { color: 'primary.main', textDecoration: 'underline' },
          '& code': {
            fontFamily: 'monospace',
            backgroundColor: '#f4f4f4',
            padding: '0.2em 0.4em',
            borderRadius: '4px',
          },
          '& pre': {
            backgroundColor: '#f4f4f4',
            padding: '1em',
            overflow: 'auto',
            borderRadius: '4px',
            mb: 2,
          },
        }}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
      </Box>

      {frontmatter.image && (
        <Box
          component="img"
          src={frontmatter.image}
          alt={frontmatter.title || 'Featured'}
          sx={{ width: '100%', height: 'auto', borderRadius: 2, mb: 4 }}
        />
      )}

    </Container>
  )
}
