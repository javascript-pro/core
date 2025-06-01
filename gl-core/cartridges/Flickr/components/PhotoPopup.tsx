'use client';
import * as React from 'react';
import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  Box,
  CardHeader,
  CardMedia,
} from '@mui/material';
import { useSlice, useDispatch, Icon } from '../../../../gl-core';
import { photoSelect } from '../../Flickr';

export default function PhotoPopup() {
  const dispatch = useDispatch();
  const photo = useSlice().flickr?.photo;
  if (!photo) return null;

  const title = photo.title || '';
  const description = photo.description || '';
  const src = photo?.sizes?.medium?.src || photo?.sizes?.small?.src;

  const handleClose = () => dispatch(photoSelect(null));

  if (!src) {
    return (
      <Dialog open onClose={handleClose} maxWidth="lg">
        <CardHeader
          title="Error"
          action={
            <IconButton onClick={handleClose}>
              <Icon icon="close" />
            </IconButton>
          }
        />
        <DialogContent>
          <Typography variant="body2" color="error">
            No suitable image available.
          </Typography>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog
      open
      onClose={handleClose}
      PaperProps={{
        sx: {
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <CardHeader
        title={title}
        subheader={description}
        avatar={
          <IconButton 
            onClick={() => window.open(photo.flickrUrl, '_blank')}
          >
            <Icon icon="flickr" />
          </IconButton>
        }
        action={
          <IconButton onClick={handleClose} color="inherit">
            <Icon icon="close" />
          </IconButton>
        }
      />
      <DialogContent
        sx={{
          p: 2,
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            maxHeight: '100%',
            maxWidth: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CardMedia
            component="img"
            src={src}
            alt={title}
            sx={{
              height: 'auto',
              maxHeight: '100%',
              width: 'auto',
              maxWidth: '100%',
              objectFit: 'contain',
              borderRadius: 2,
            }}
          />
        </Box>
      </DialogContent>

    </Dialog>
  );
}
