'use client';
import * as React from 'react';
import { Box } from '@mui/material';

export default function LoadingDots() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        py: 4,
      }}
    >
      <Box
        component="span"
        sx={{
          display: 'inline-block',
          width: 8,
          height: 8,
          mx: 0.5,
          borderRadius: '50%',
          backgroundColor: 'text.primary',
          animation: 'bounce 1.4s infinite ease-in-out both',
          animationDelay: '0s',
        }}
      />
      <Box
        component="span"
        sx={{
          display: 'inline-block',
          width: 8,
          height: 8,
          mx: 0.5,
          borderRadius: '50%',
          backgroundColor: 'text.primary',
          animation: 'bounce 1.4s infinite ease-in-out both',
          animationDelay: '0.2s',
        }}
      />
      <Box
        component="span"
        sx={{
          display: 'inline-block',
          width: 8,
          height: 8,
          mx: 0.5,
          borderRadius: '50%',
          backgroundColor: 'text.primary',
          animation: 'bounce 1.4s infinite ease-in-out both',
          animationDelay: '0.4s',
        }}
      />

      <style jsx global>{`
        @keyframes bounce {
          0%,
          80%,
          100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }
      `}</style>
    </Box>
  );
}
