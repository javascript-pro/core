'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { TAlbumCard } from '../types';
import {
  Box,
  ButtonBase,
  Card,
  CardMedia,
  CardActions,
  CardContent,
  CardHeader,
  Skeleton,
  Typography,
} from '@mui/material';
import { MightyButton, useDispatch, useSlice } from '../../../../gl-core';
import { setLatestIndex } from '../../Flickr';

export default function FlickrLatest({}: TAlbumCard) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { latestIndex } = useSlice().flickr;
  const [photos, setPhotos] = useState<any[]>([]);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasImageError, setHasImageError] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'flickr', 'latest'), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (Array.isArray(data?.photos)) {
          setPhotos(data.photos);
          // dispatch(
          //   toggleFeedback({
          //     severity: 'info',
          //     title: 'Got Updates',
          //     description: 'Latest Photos',
          //   }),
          // );
        }
      }
    });

    return () => unsub();
  }, [dispatch]);

  const currentPhoto = photos[latestIndex] || null;

  useEffect(() => {
    if (currentPhoto) {
      setImageLoaded(false);
      setHasImageError(false);
    }
  }, [currentPhoto]);

  const handlePrev = () => {
    if (latestIndex > 0) {
      dispatch(setLatestIndex(latestIndex - 1));
    }
  };

  const handleNext = () => {
    if (latestIndex < photos.length - 1) {
      dispatch(setLatestIndex(latestIndex + 1));
    }
  };

  const handleReset = () => {
    dispatch(setLatestIndex(0));
  };

  const width = currentPhoto?.sizes?.medium?.width;
  const height = currentPhoto?.sizes?.medium?.height;
  const aspectRatio = width && height ? height / width : 0.75;

  return (
    <>
      <CardActions>
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
          mode="icon"
          color="primary"
          label="Flickr"
          icon="flickr"
          onClick={() => {
            router.push('/flickr');
          }}
          disabled={latestIndex >= photos.length - 1}
        />
        <MightyButton
          color="primary"
          label="Next"
          icon="right"
          onClick={handleNext}
          disabled={latestIndex >= photos.length - 1}
        />
        <Box sx={{ flexGrow: 1 }} />
      </CardActions>

      <CardContent>
        <Box sx={{ my: 1 }}>
          {currentPhoto ? (
            <Box sx={{ position: 'relative' }}>
              {!imageLoaded && !hasImageError && (
                <>
                  <Skeleton
                    variant="rectangular"
                    animation="pulse"
                    sx={{
                      width: '100%',
                      aspectRatio: `${width} / ${height}`,
                      borderRadius: 0,
                      minHeight: 100,
                    }}
                  />

                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      pointerEvents: 'none',
                    }}
                  >
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ px: 2, py: 2 }}
                    >
                      Loading &ldquo;{currentPhoto.title || 'Photo'}&rdquo;...
                    </Typography>
                  </Box>
                </>
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
                    onLoad={() => setImageLoaded(true)}
                    onError={() => setHasImageError(true)}
                    sx={{
                      width: '100%',
                      aspectRatio: `${width} / ${height}`,
                      borderRadius: 0,
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
            <Skeleton variant="rectangular" width="100%" height={200} />
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
    </>
  );
}
