'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import {
  Box,
  ButtonBase,
  CardActions,
  CardContent,
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

  // small artificial delay (ms)
  const DELAY_MS = 200;

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

  useEffect(() => {
    if (photos.length > 0 && latestIndex < photos.length) {
      setImageLoaded(false);
      setHasImageError(false);
    }
  }, [photos, latestIndex]);

  const currentPhoto = photos[latestIndex] || null;

  const handlePrev = () => {
    if (latestIndex > 0) {
      dispatch(setLatestIndex(latestIndex - 1));
    }
  };

  const handleNext = () => {
    if (photos.length > 0) {
      const nextIndex = latestIndex + 1;
      if (nextIndex < photos.length) {
        dispatch(setLatestIndex(nextIndex));
      }
    }
  };

  const handleReset = () => {
    dispatch(setLatestIndex(0));
  };

  const width = currentPhoto?.sizes?.medium?.width || 4;
  const height = currentPhoto?.sizes?.medium?.height || 3;

  return (
    <>
      <CardContent>
        <Box sx={{ mt: 1, position: 'relative' }}>
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
                      // introduce slight delay before showing image
                      setTimeout(() => setImageLoaded(true), DELAY_MS);
                    }}
                    onError={() => setHasImageError(true)}
                    sx={{
                      width: '100%',
                      aspectRatio: `${width} / ${height}`,
                      borderRadius: 0,
                      display: 'block',
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
            // no photos at all
            <Box
              sx={{
                width: '100%',
                minHeight: 200,
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
              <Typography variant="body1">
                {currentPhoto?.title || 'Photo title'}
              </Typography>
            }
            subheader={
              <Typography variant="body2">
                {currentPhoto?.description}
              </Typography>
            }
          />
        </Box>
      </CardContent>
      <CardActions>
        <Box sx={{ flexGrow: 1 }} />
        <MightyButton
          color="primary"
          mode="icon"
          label="Back"
          icon="left"
          onClick={handlePrev}
          disabled={latestIndex === 0}
        />
        <MightyButton
          color="primary"
          mode="icon"
          label="Reset"
          icon="reset"
          onClick={handleReset}
          disabled={latestIndex === 0}
        />
        <MightyButton
          color="primary"
          mode="icon"
          label="Next"
          icon="right"
          onClick={handleNext}
          disabled={latestIndex >= photos.length - 1}
        />
        <Box sx={{ flexGrow: 1 }} />
      </CardActions>
    </>
  );
}
