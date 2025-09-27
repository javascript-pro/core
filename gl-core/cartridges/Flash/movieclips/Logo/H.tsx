// /Users/goldlabel/GitHub/core/gl-core/cartridges/Flash/movieclips/logo/H.tsx
import React from 'react';
import { TMovieClip } from '../../types';
import { useTheme } from '@mui/material';

export default function H({ ...props }: TMovieClip) {
  const theme = useTheme();
  const {mode} = theme.palette;
  let frontColor = theme.palette.background.default;
  if(mode === "dark"){
    frontColor = theme.palette.primary.main;
  }
  const midColor = theme.palette.primary.main;
  const darkColor = theme.palette.text.primary;

  return (
    <svg width="311.489362px" height="400px" viewBox="0 0 311.489362 400">
      <g
        id="Page-1"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="Logo"
          transform="translate(-1698.266, -124.0688)"
          fillRule="nonzero"
        >
          <g id="H" transform="translate(1698.266, 124.0688)">
            <polygon
              id="black"
              fill={darkColor}
              points="2 409 2 9 113.246201 9 113.246201 186.777778 202.243161 186.777778 202.243161 9 313.489362 9 313.489362 409 202.243161 409 202.243161 275.666667 113.246201 275.666667 113.246201 409"
            ></polygon>
            <polygon
              id="blue"
              fill={midColor}
              points="-7 386 -7 -14 104.246201 -14 104.246201 163.777778 193.243161 163.777778 193.243161 -14 304.489362 -14 304.489362 386 193.243161 386 193.243161 252.666667 104.246201 252.666667 104.246201 386"
            ></polygon>
            <path
              d="M106.246201,5 L106.246201,182.777778 L205.243161,182.777778 L205.243161,5 L306.489362,5 L306.489362,395 L205.243161,395 L205.243161,261.666667 L106.246201,261.666667 L106.246201,395 L5,395 L5,5 L106.246201,5 Z"
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
