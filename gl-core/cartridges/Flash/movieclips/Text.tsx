// /app/src/Flash/movieclips/Text.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';

export type TTextMCProps = {
  id: string;
  text: string;
  fontFamily?: string;
  color?: string;
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | 'caption'
    | 'overline'
    | 'inherit';
  split?: 'none' | 'words' | 'chars';
};

export default function TextMC({
  id,
  text,
  fontFamily,
  color,
  variant = 'body1',
  split = 'none',
}: TTextMCProps) {
  const renderContent = () => {
    if (split === 'none') return text;

    if (split === 'words') {
      return text.split(' ').map((word, i) => (
        <span key={i} data-split="word">
          {word}&nbsp;
        </span>
      ));
    }

    if (split === 'chars') {
      // ✅ use .split('') instead of spread for ES5 compatibility
      return text.split('').map((char, i) => (
        <span key={i} data-split="char">
          {char}
        </span>
      ));
    }

    return text;
  };

  return (
    <Box id={id}>
      <Typography
        variant={variant}
        sx={{
          fontFamily,
          color,
          display: 'inline-block',
          whiteSpace: 'pre-wrap', // preserves spacing + line breaks
        }}
      >
        {renderContent()}
      </Typography>
    </Box>
  );
}
