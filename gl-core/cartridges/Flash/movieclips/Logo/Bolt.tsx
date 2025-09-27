// /Users/goldlabel/GitHub/core/gl-core/cartridges/Flash/movieclips/Bolt.tsx
import React from 'react';
import { TMovieClip } from '../../types';
// import { useTheme } from '@mui/material';

export default function Bolt({ ...props }: TMovieClip) {
  // const theme = useTheme();
  // const frontColor = theme.palette.primary.main;

  return (  
    <svg width="365.270812px" height="750px" viewBox="0 0 365.270812 750">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g id="bolt">
                <polygon id="black" fill="#000000" points="174.782997 18.9127238 32.2922567 363.574453 167.283484 363.574453 92.2883576 723.221475 362.270812 281.155344 227.279585 281.155344 309.774223 18.9127238"></polygon>
                <polygon id="blue" fill="#60A5FA" points="147.49074 -19 5 325.66173 139.991227 325.66173 64.996101 685.308751 334.978556 243.24262 199.987328 243.24262 282.481967 -19"></polygon>
                <path d="M289.43833,6.55701885 L207.058908,261.027632 L354.948807,261.027632 L82.4844644,721.837385 L160.142671,340.84079 L11.7166474,340.84079 L149.8754,6.55701885 L289.43833,6.55701885 Z" id="white" stroke="#052841" strokeWidth="10" fill="#FFFFFF" fillRule="nonzero"></path>
            </g>
        </g>
    </svg>
  );
}
