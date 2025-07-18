'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import {
  Box,
  ButtonBase,
  CardHeader,
  CardMedia,
  Typography,
  CircularProgress,
} from '@mui/material';
import {
  MightyButton,
  useDispatch,
  useSlice,
  toggleFeedback,
} from '../../../../gl-core';
import { setLatestIndex } from '../../Flickr';

export default function FlickrAlbum({ album }: { album?: string }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { latestIndex } = useSlice().flickr;

  const [photos, setPhotos] = useState<any[]>([]);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasImageError, setHasImageError] = useState(false);

  const DELAY_MS = 200;

  // warn if no album
  useEffect(() => {
    if (!album) {
      dispatch(
        toggleFeedback({
          severity: 'warning',
          title: 'album id not provided',
          description: 'No album id was passed to FlickrAlbum component.',
        }),
      );
    }
  }, [album, dispatch]);

  // subscribe to album photos
  useEffect(() => {
    if (!album) return;

    const unsub = onSnapshot(doc(db, 'flickr', 'albums'), (docSnap) => {
      if (!docSnap.exists()) {
        dispatch(
          toggleFeedback({
            severity: 'error',
            title: 'Albums document not found',
            description: 'The albums document does not exist in Firestore.',
          }),
        );
        return;
      }

      const data = docSnap.data();
      const albumData = data[album];

      if (!albumData) {
        dispatch(
          toggleFeedback({
            severity: 'error',
            title: `Flickr album ${album} not found`,
            description: 'This album id is not in the albums document.',
          }),
        );
        setPhotos([]);
        return;
      }

      const newPhotos = Array.isArray(albumData.photos) ? albumData.photos : [];
      setPhotos(newPhotos);
    });

    return () => unsub();
  }, [album, dispatch]);

  // reset image load states when photo changes
  useEffect(() => {
    if (photos.length > 0 && latestIndex < photos.length) {
      setImageLoaded(false);
      setHasImageError(false);
    }
  }, [photos, latestIndex]);

  // auto-progress to next photo when component mounts / album changes
  useEffect(() => {
    if (photos.length > 0) {
      // when component mounts or photos update, go to next
      const nextIndex = (latestIndex + 1) % photos.length;
      dispatch(setLatestIndex(nextIndex));
    }
    // only trigger when album or photos length changes (not on every latestIndex)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [album, photos.length]);

  const currentPhoto = photos[latestIndex] || null;

  const handlePrev = () => {
    if (photos.length > 0) {
      const prevIndex = latestIndex === 0 ? photos.length - 1 : latestIndex - 1;
      dispatch(setLatestIndex(prevIndex));
    }
  };

  const handleNext = () => {
    if (photos.length > 0) {
      const nextIndex = (latestIndex + 1) % photos.length;
      dispatch(setLatestIndex(nextIndex));
    }
  };

  const handleReset = () => {
    dispatch(setLatestIndex(0));
  };

  const width = currentPhoto?.sizes?.medium?.width || 4;
  const height = currentPhoto?.sizes?.medium?.height || 3;

  return (
    <>
      <Box sx={{ position: 'relative' }}>
        {photos.length > 0 && currentPhoto ? (
          <Box sx={{ position: 'relative' }}>
            {/* Loading spinner overlay */}
            {!imageLoaded && !hasImageError && (
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: `${width} / ${height}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CircularProgress />
              </Box>
            )}

            {!hasImageError && (
              <ButtonBase
                onClick={() =>
                  currentPhoto?.flickrUrl &&
                  window.open(currentPhoto.flickrUrl, '_blank')
                }
                sx={{
                  width: '100%',
                  display: imageLoaded ? 'block' : 'none',
                }}
              >
                <CardMedia
                  alt={currentPhoto.title || 'Photo'}
                  src={currentPhoto.sizes?.medium?.src}
                  component="img"
                  onLoad={() => {
                    setTimeout(() => setImageLoaded(true), DELAY_MS);
                  }}
                  onError={() => setHasImageError(true)}
                  sx={{
                    width: '100%',
                    aspectRatio: `${width} / ${height}`,
                    borderRadius: 0,
                    display: 'block',
                    maxHeight: { xs: 250 },
                    objectFit: 'contain',
                  }}
                />
              </ButtonBase>
            )}

            {hasImageError && (
              <Box sx={{ px: 2, py: 1 }}>
                <Typography color="error" fontSize={14}>
                  Failed to load image: {currentPhoto.sizes?.medium?.src}
                </Typography>
              </Box>
            )}
          </Box>
        ) : (
          <Box
            sx={{
              width: '100%',
              minHeight: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CircularProgress />
          </Box>
        )}

        <CardHeader
          title={
            <Typography variant="body1">{currentPhoto?.title || ''}</Typography>
          }
          action={
            <>
              <MightyButton
                color="primary"
                mode="icon"
                label="Back"
                icon="left"
                onClick={handlePrev}
                disabled={photos.length === 0}
              />
              <MightyButton
                color="primary"
                mode="icon"
                label="Reset"
                icon="reset"
                onClick={handleReset}
                disabled={photos.length === 0}
              />
              <MightyButton
                color="primary"
                mode="icon"
                label="Next"
                icon="right"
                onClick={handleNext}
                disabled={photos.length === 0}
              />
            </>
          }
        />
      </Box>
      <Box sx={{ mx: 2 }}>
        <Typography variant="body2">{currentPhoto?.description}</Typography>
      </Box>
    </>
  );
}
