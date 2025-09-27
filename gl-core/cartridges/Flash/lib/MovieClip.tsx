// /app/src/Flash/lib/MovieClip.tsx
import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { TMovieClip } from '../types';
import { useDispatch } from '../hooks/useDispatch';
import { useRedux } from '../hooks/useRedux';
import { setUbereduxKey } from '../lib/store';

export default function MovieClip({
  id,
  children,
  border,
  width = '100%',
  height = '100%',
  zIndex,
  style,
}: TMovieClip & { zIndex?: number }) {
  const dispatch = useDispatch();
  const redux = useRedux();
  const clips: string[] = redux?.clips ?? [];

  useEffect(() => {
    if (!id) return;

    // register on mount
    if (!clips.includes(id)) {
      dispatch(
        setUbereduxKey({
          key: 'clips',
          value: [...clips, id],
        }),
      );
    }

    // unregister on unmount
    return () => {
      const next = (redux?.clips ?? []).filter((c: string) => c !== id);
      dispatch(
        setUbereduxKey({
          key: 'clips',
          value: next,
        }),
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]); // intentionally only on mount/unmount

  return (
    <Box
      id={id}
      sx={{
        ...style,
        position: 'absolute',
        top: 0,
        left: 0,
        width,
        height,
        zIndex,
        ...(border && { border: '1px solid gold' }),
      }}
    >
      {children}
    </Box>
  );
}
