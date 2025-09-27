// /Users/goldlabel/GitHub/core/gl-core/cartridges/Flash/movieclips/logo/F.tsx
import React from 'react';
import { TMovieClip } from '../../types';
import { useTheme } from '@mui/material';

export default function F({ ...props }: TMovieClip) {
  const theme = useTheme();
  const frontColor = theme.palette.primary.main;

  return (
    <svg width="210.612245px" height="400px" viewBox="0 0 210.612245 400">
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g transform="translate(-555.266, -124.0688)" fillRule="nonzero">
          <g transform="translate(555.266, 124.0688)">
            <polygon
              id="black"
              fill="#000000"
              points="4.59183673 390 4.59183673 6.32653061 195.612245 6.32653061 195.612245 91.5873016 110.714286 91.5873016 110.714286 176.848073 174.387755 176.848073 174.387755 262.108844 110.714286 262.108844 110.714286 390"
            ></polygon>
            <polygon
              id="blue"
              fill="#60A5FA"
              points="-18.8367347 368.306122 -18.8367347 -15.3673469 172.183673 -15.3673469 172.183673 69.893424 87.2857143 69.893424 87.2857143 155.154195 150.959184 155.154195 150.959184 240.414966 87.2857143 240.414966 87.2857143 368.306122"
            ></polygon>
            <path
              d="M186.020408,5 L186.020408,80.260771 L101.122449,80.260771 L101.122449,175.521542 L164.795918,175.521542 L164.795918,250.782313 L101.122449,250.782313 L101.122449,378.673469 L5,378.673469 L5,5 L186.020408,5 Z"
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
