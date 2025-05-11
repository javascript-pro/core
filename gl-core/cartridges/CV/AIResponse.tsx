'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Box, Button, Alert, Typography } from '@mui/material';
import { useSlice } from '../../';
import ReactMarkdown from 'react-markdown';

export default function AIResponse() {
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const slice = useSlice();
  const { cv } = slice;
  const { jd, resume } = cv;

  // Scroll to bottom whenever output updates
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [output]);

  const handleAnalyse = async () => {
    setOutput('');
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/gl-api/cv/fit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resume, jd }),
      });

      if (!res.ok || !res.body) {
        throw new Error((await res.text()) || 'No AIResponse stream');
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let partial = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        partial += chunk;

        const lines = partial.split('\n');
        partial = lines.pop() || '';

        for (const line of lines) {
          if (!line.startsWith('data:')) continue;

          const jsonStr = line.replace(/^data:\s*/, '');
          if (jsonStr === '[DONE]') continue;

          try {
            const json = JSON.parse(jsonStr);
            const token = json.choices?.[0]?.delta?.content;
            if (token) setOutput((prev) => prev + token);
          } catch (e) {
            console.error('Bad JSON from chunk:', line);
          }
        }
      }
    } catch (err: any) {
      console.error('Stream error:', err);
      setError(err.message || 'Unknown error');
    }

    setLoading(false);
  };

  useEffect(() => {
  if (!resume || !jd) return;

  const timer = setTimeout(() => {
    handleAnalyse();
  }, 250);

  return () => clearTimeout(timer);
}, [resume, jd]);


  return (
    <Box>
      {error && (
        <Box mt={2}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}

      <Box
        mt={2}
        p={2}
        ref={scrollRef}
        sx={{
          maxHeight: '80vh ',
          overflowY: 'auto',
        }}
      >
        <ReactMarkdown
          components={{
            h1: ({ children }) => (
              <Typography variant="h4" gutterBottom>
                {children}
              </Typography>
            ),
            h2: ({ children }) => (
              <Typography variant="h5" gutterBottom>
                {children}
              </Typography>
            ),
            h3: ({ children }) => (
              <Typography variant="h6" gutterBottom>
                {children}
              </Typography>
            ),
            p: ({ children }) => (
              <Typography variant="body1" paragraph>
                {children}
              </Typography>
            ),
            li: ({ children }) => (
              <li>
                <Typography variant="body2">{children}</Typography>
              </li>
            ),
            strong: ({ children }) => <strong>{children}</strong>,
            em: ({ children }) => <em>{children}</em>,
          }}
        >
          {output}
        </ReactMarkdown>
      </Box>
    </Box>
  );
}
