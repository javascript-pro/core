// /Users/goldlabel/GitHub/core/gl-core/cartridges/Flash/movieclips/logo/A.tsx
import React from 'react';
import { TMovieClip } from '../../types';
import { useTheme } from '@mui/material';

export default function A({ ...props }: TMovieClip) {
  const theme = useTheme();
  const { mode } = theme.palette;
  let frontColor = theme.palette.background.default;
  if (mode === 'dark') {
    frontColor = theme.palette.primary.main;
  }
  const midColor = theme.palette.primary.main;
  const darkColor = theme.palette.text.primary;

  return (
    <svg width="350px" height="400px" viewBox="0 0 350 400">
      <g
        id="Page-1"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g id="Logo" transform="translate(-1021.866, -124.0688)">
          <g id="A" transform="translate(1021.866, 124.0688)">
            <path
              d="M8.4,400 L178.9,11 L349.4,400 L210.86875,400 L178.9,310.854167 L125.61875,310.854167 L93.65,400 L8.4,400 Z M146.93125,246.020833 L178.9,164.979167 L210.86875,246.020833 L146.93125,246.020833 Z"
              id="black"
              fill={darkColor}
            ></path>
            <path
              d="M-11.6,370 L158.9,-19 L329.4,370 L190.86875,370 L158.9,280.854167 L105.61875,280.854167 L73.65,370 L-11.6,370 Z M126.93125,216.020833 L158.9,134.979167 L190.86875,216.020833 L126.93125,216.020833 Z"
              id="blue"
              fill={midColor}
            ></path>
            <path
              d="M0.4,389 L170.9,0 L341.4,389 L202.86875,389 L170.9,299.854167 L117.61875,299.854167 L85.65,389 L0.4,389 Z M138.93125,235.020833 L170.9,153.979167 L202.86875,235.020833 L138.93125,235.020833 Z"
              id="white"
              stroke="#052841"
              strokeWidth="10"
              fill={frontColor}
            ></path>
          </g>
        </g>
      </g>
    </svg>
  );
}
