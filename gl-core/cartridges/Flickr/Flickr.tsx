'use client';
import * as React from 'react';
import { 
  CardHeader,
  Box, 
  Alert,
  Toolbar,
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  // Typography,
} from '@mui/material';
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
  const {  } = flickrSlice;
  const {
    album,
    status,
    message,
  } = flickrSlice;
  const showAlert = false;
  const showToolbar = false;
  const albumTitle = album.meta.title;
  const albumPhotos = album.photos;
  const albumDescription = album.meta.description;
  const albumThumbSrc = album.meta.coverPhoto.sizes.thumb.src
  const albumURL = album.meta.albumUrl;

  React.useEffect(() => {
    if (id) {
      dispatch(initFlickr(id));
    }
  }, [id, dispatch]);

  if (mode === 'app') return <>
    <Box>
      { showAlert && <Alert
        variant="filled"
        severity={status}
        sx={{
          mx: 4,
          mb: 2,
        }}
      >
        {message}
      </Alert>   }
      
      {/* <pre>albumURL: {JSON.stringify(albumURL, null, 2)}</pre> */}
        { showToolbar ?? <Toolbar>
        <MightyButton
          mode="icon"
          label="Resets Flickr Cartridge"
          onClick={() => {
            dispatch(resetFlickr());
          }}
          icon="reset"
          color="secondary"
        />
      </Toolbar> }
      
      <Box sx={{ mx: 4 }}>
      
        <CardHeader 
          title={albumTitle}
          subheader={albumDescription}
          
          // avatar={<>
          //     <img
          //         style={{
          //           borderRadius: '4px',
          //         }}
          //         alt={albumTitle}
          //         height={50}
          //         width={50}
          //         src={albumThumbSrc}
          //     />
          // </>}
        action={
          <MightyButton
            mode="icon"
            icon="flickr"
            label="View album on Flickr"
            color="inherit"
            onClick={() => {
              window.open(albumURL, '_blank');
            }}
          />
        }
      />
        <List>
          { albumPhotos.map((item: any, i: number) => {
            
            const photoTitle = item.title;
            const photoDescription = item.description;
            const thumbSrc = item.sizes.thumb.src;
            return <ListItemButton key={`item_${i}`}>
                      <ListItemAvatar sx={{ mr:2 }}>
                        <img
                          style={{
                            borderRadius: '4px',
                          }}
                          alt={photoTitle}
                          height={50}
                          width={50}
                          src={thumbSrc}
                        />
                      </ListItemAvatar>
                      <ListItemText 
                        primary={photoTitle}
                        secondary={photoDescription}
                      />
                      {/* <pre>{JSON.stringify(thumbSrc, null, 2)}</pre> */}
                    </ListItemButton>
          })}
        </List>
      </Box>

    </Box>
  </>;

  if (mode === 'app')
    return (
      <Box sx={{}}>
         <pre style={{ fontSize: 10 }}>
          flickrSlice: {JSON.stringify(flickrSlice, null, 2)}
        </pre>
      </Box>
    );
    
  if (mode === 'album-card')
    return (
      <Box sx={{}}>
        <CardButton onClick={onClick}>
          {/* 72177720326317140 */}
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
