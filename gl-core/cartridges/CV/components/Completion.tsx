'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Box, Alert, Typography } from '@mui/material';
import { useSlice, useDispatch } from '../../../';
import { updateCVKey } from '../';
import ReactMarkdown from 'react-markdown';

export default function Completion() {
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const slice = useSlice();
  const dispatch = useDispatch();
  const { prompt } = slice.cv;

  // console.log("prompt", prompt)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [output]);

  const handleAnalyse = async () => {
    dispatch(updateCVKey('cv', { fetching: true }));
    setOutput('');
    setError(null);

    try {
      const res = await fetch('/api/gl-api/openai/cv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok || !res.body) {
        throw new Error((await res.text()) || 'No Completion stream');
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let partial = '';
      let finalOutput = '';

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
            if (token) {
              finalOutput += token;
              setOutput((prev) => prev + token);
            }
          } catch (e) {
            console.error('Bad JSON from chunk:', line);
          }
        }
      }

      dispatch(updateCVKey('cv', { fit: finalOutput }));
    } catch (err: any) {
      console.error('Stream error:', err);
      setError(err.message || 'Unknown error');
    }

    dispatch(updateCVKey('cv', { fetching: false }));
  };

  useEffect(() => {
    if (!prompt) return;

    const timer = setTimeout(() => {
      handleAnalyse();
    }, 250);

    return () => clearTimeout(timer);
  }, [prompt]);

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
          maxHeight: '80vh',
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
          {output || ''}
        </ReactMarkdown>
      </Box>
    </Box>
  );
}
