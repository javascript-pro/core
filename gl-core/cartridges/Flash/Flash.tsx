'use client';
import * as React from 'react';
import { Stage } from '../Flash';

// Define the props the shortcode parser may pass
export type TFlashProps = {
  movie?: string;
  width?: number | string;
  height?: number | string;
  color?: string;
  loop?: boolean | string; // might arrive as string from Markdown
  [key: string]: any; // catch-all for future shortcode props
};

export default function Flash({
  movie = 'default_movie',
  width = 300,
  height = 200,
  color = 'dodgerblue',
  loop = false,
  ...rest
}: TFlashProps) {
  // Normalise string booleans like "true"/"false"
  const loopNormalized =
    typeof loop === 'string' ? loop.toLowerCase() === 'true' : loop;

  React.useEffect(() => {
    console.log('Flash component mounted', {
      movie,
      width,
      height,
      color,
      loop: loopNormalized,
      rest,
    });
    // here you could load a movie, trigger animation, etc.
  }, [movie, width, height, color, loopNormalized, rest]);

  return (
    <Stage
      movie={movie}
      width={width}
      height={height}
      color={color}
      loop={loopNormalized}
      {...rest}
    />
  );
}
