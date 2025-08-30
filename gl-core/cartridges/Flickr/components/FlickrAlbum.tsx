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
  Popover,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from '@mui/material';
import { Icon } from '../../../../gl-core';
import {
  MightyButton,
  useDispatch,
  useSlice,
  toggleFeedback,
  useIsMobile,
} from '../../../../gl-core';
import { setLatestIndex } from '../../Flickr';

export default function FlickrAlbum({ album }: { album: string }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const isMobile = useIsMobile();
  const { latestIndex } = useSlice().flickr;

  const [photos, setPhotos] = useState<any[]>([]);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasImageError, setHasImageError] = useState(false);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

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

  useEffect(() => {
    if (photos.length > 0) {
      const nextIndex = (latestIndex + 1) % photos.length;
      dispatch(setLatestIndex(nextIndex));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [album, photos.length]);

  const currentPhoto = photos[latestIndex] || null;
  const width = currentPhoto?.sizes?.medium?.width || 4;
  const height = currentPhoto?.sizes?.medium?.height || 3;

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

  const handleOpenFlickr = () => {
    if (currentPhoto?.flickrUrl) {
      window.open(currentPhoto.flickrUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const popoverOpen = Boolean(anchorEl);

  const handleImageClick = () => {
    setDialogOpen(true);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleFlickrClick = () => {
    if (currentPhoto?.flickrUrl) {
      window.open(currentPhoto.flickrUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <>
      <Box sx={{ position: 'relative' }}>
        {photos.length > 0 && currentPhoto ? (
          <Box sx={{ position: 'relative' }}>
            <Box
              sx={{
                mb: 1,
                display: 'flex',
                justifyContent: 'center',
                gap: 1,
              }}
            >
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
                label="Open Flickr"
                icon="flickr"
                onClick={handleOpenFlickr}
                disabled={photos.length === 0 || !currentPhoto?.flickrUrl}
              />
              <MightyButton
                color="primary"
                mode="icon"
                label="Next"
                icon="right"
                onClick={handleNext}
                disabled={photos.length === 0}
              />
            </Box>

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
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
                onClick={handleImageClick}
                sx={{
                  width: '100%',
                  display: imageLoaded ? 'block' : 'none',
                }}
              >
                <CardMedia
                  component="img"
                  alt={currentPhoto.title || 'Photo'}
                  src={currentPhoto.sizes?.medium?.src}
                  onLoad={() => {
                    setTimeout(() => setImageLoaded(true), DELAY_MS);
                  }}
                  onError={() => setHasImageError(true)}
                  sx={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'contain',
                    display: 'block',
                    borderRadius: 0,
                  }}
                />
              </ButtonBase>
            )}

            <Popover
              sx={{ pointerEvents: 'none' }}
              open={popoverOpen}
              anchorEl={anchorEl}
              onClose={handlePopoverClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              disableRestoreFocus
            >
              <Box sx={{ p: 2, maxWidth: 300 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {currentPhoto.title || 'Untitled'}
                </Typography>
                <Typography variant="body2">
                  {currentPhoto.description}
                </Typography>
              </Box>
            </Popover>

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
      </Box>

      {/* Fullscreen dialog only on mobile */}
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        fullScreen={isMobile}
        PaperProps={{
          sx: { backgroundColor: 'background.default', position: 'relative' },
        }}
      >
        <DialogTitle sx={{ p: 0 }}>
          <CardHeader
            title={currentPhoto?.title || 'Untitled'}
            subheader={currentPhoto?.description}
            avatar={
              <IconButton onClick={handleFlickrClick} title="View on Flickr">
                <Icon icon="flickr" />
              </IconButton>
            }
            action={
              <IconButton onClick={handleDialogClose} title="Close">
                <Icon icon="close" />
              </IconButton>
            }
          />
        </DialogTitle>
        <DialogContent
          sx={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            p: 2,
          }}
        >
          {/* Prev Button */}
          <Box
            sx={{
              position: 'absolute',
              left: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
            }}
          >
            <MightyButton
              color="primary"
              mode="icon"
              icon="left"
              label="Prev"
              onClick={handlePrev}
              disabled={photos.length === 0}
            />
          </Box>

          {/* Next Button */}
          <Box
            sx={{
              position: 'absolute',
              right: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
            }}
          >
            <MightyButton
              color="primary"
              mode="icon"
              icon="right"
              label="Next"
              onClick={handleNext}
              disabled={photos.length === 0}
            />
          </Box>

          {currentPhoto?.sizes?.large?.src ? (
            <CardMedia
              component="img"
              src={currentPhoto.sizes.large.src}
              alt={currentPhoto.title || 'Photo'}
              sx={{
                width: '100%',
                height: 'auto',
                maxHeight: '80vh',
                objectFit: 'contain',
              }}
            />
          ) : (
            <Typography>No large image available</Typography>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
