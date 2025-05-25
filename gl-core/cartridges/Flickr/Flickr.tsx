'use client';
import * as React from 'react';
import { Box, Alert } from '@mui/material';
import { useDispatch } from '../../../gl-core';
import { initFlickr, resetFlickr, AlbumCard } from './';
import { TFlickr } from './types';
import { 
  MightyButton,
  CardButton, 
  useSlice,
} from '../../../gl-core';

export default function Flickr({
  mode = 'default',
  id = null,
  onClick = () => {
    console.log('No onClick supplied to Flickr');
  },
}: TFlickr) {
  const dispatch = useDispatch();
  const flickrSlice = useSlice().flickr;
  const {
    status,
    message,
  } = flickrSlice;
  React.useEffect(() => {
    if (id) {
      dispatch(initFlickr(id));
    }
  }, [id, dispatch]);

  if (mode === 'app') return <>
    
    {/* <pre>flickrSlice: {JSON.stringify(flickrSlice, null, 2)}</pre> */}
    <Box sx={{mx: 4}}>
      <Alert
        severity={status}
      >
        {message}
      </Alert>
      <MightyButton
        mode="button"
        label="Resets Flickr Cartridge"
        onClick={() => {
          dispatch(resetFlickr());
        }}
        icon="reset"
        color="secondary"
      />
    </Box>
  </>;

  if (mode === 'album-card')
    return (
      <Box sx={{}}>
        <CardButton onClick={onClick}>
          <AlbumCard id={`72177720326317140`} />
        </CardButton>
      </Box>
    );

  if (mode === 'default') return <></>;
  
  return (
    <pre style={{ fontSize: 10 }}>
      flickrSlice: {JSON.stringify(flickrSlice, null, 2)}
    </pre>
  );
}
