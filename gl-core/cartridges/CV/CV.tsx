'use client';
import * as React from 'react';
import {Controls} from "./";
import {
  Typography,
  Container,
} from '@mui/material';
import ReactMarkdown from 'react-markdown';

export type TCV = {
  body?: string;
}

export default function CV({
  body = "No content",
}: TCV) {

  return <Container maxWidth="md">
            <Controls />
            <Typography>
              <ReactMarkdown>
                {body}
              </ReactMarkdown>
            </Typography>
          </Container>
}
