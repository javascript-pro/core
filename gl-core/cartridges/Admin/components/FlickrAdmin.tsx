// /core/gl-core/cartridges/Admin/components/FlickrAdmin.tsx
'use client';

import * as React from 'react';
import { useEffect, useState, useMemo } from 'react';
import {
  Box,
  Alert,
  CircularProgress,
  CardHeader,
  Autocomplete,
  TextField,
  Typography,
  Card,
  CardContent,
} from '@mui/material';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { MightyButton, Icon, useDispatch } from '../../../../gl-core';
import { useRouter } from 'next/navigation';
import { album } from '../../Admin';

type TFlickrAlbum = {
  id: string;
  title?: string;
  description?: string;
  count?: number;
  flickrUrl?: string;
  createdAt?: number;
  updatedAt?: number;
  photos?: { flickrId: string; title?: string }[];
};

type TFlickrData = {
  latest?: any;
  photos: any[];
  albums: TFlickrAlbum[];
};

export default function FlickrAdmin() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [flickrData, setFlickrData] = useState<TFlickrData>({
    photos: [],
    albums: [],
  });
  const [checked, setChecked] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [inputAlbumId, setInputAlbumId] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'flickr'),
      (querySnapshot) => {
        const docs: Record<string, any> = {};
        querySnapshot.forEach((docSnap) => {
          docs[docSnap.id] = docSnap.data();
        });

        const latestDoc = docs['latest'];

        const photosDoc = docs['photos'];
        const photosArray = photosDoc
          ? Object.entries(photosDoc).map(([id, data]: [string, any]) => ({
              id,
              ...(data as object),
            }))
          : [];

        const albumsDoc = docs['albums'];
        const albumsArray: TFlickrAlbum[] = albumsDoc
          ? Object.entries(albumsDoc).map(([id, data]: [string, any]) => ({
              id,
              ...(data as object),
            }))
          : [];

        setFlickrData({
          latest: latestDoc,
          photos: photosArray,
          albums: albumsArray,
        });
        setErrorMsg(null);
        setChecked(true);
      },
      (error) => {
        setFlickrData({ photos: [], albums: [] });
        setErrorMsg(`Firebase Error: ${error.message}`);
        setChecked(true);
      },
    );

    return () => unsubscribe();
  }, []);

  // Map albumId -> album record
  const albumMap = useMemo(() => {
    const map: Record<string, TFlickrAlbum> = {};
    flickrData.albums.forEach((a) => {
      map[a.id] = a;
    });
    return map;
  }, [flickrData.albums]);

  // For the autocomplete, build a list of options with label/title
  const options = flickrData.albums.map((a) => ({
    label: a.title || a.id,
    id: a.id,
  }));

  const isExisting = inputAlbumId && !!albumMap[inputAlbumId];
  const selectedAlbum = inputAlbumId ? albumMap[inputAlbumId] : undefined;

  const handleAddOrUpdateAlbum = async () => {
    const albumId = inputAlbumId.trim();
    if (!albumId) return;
    setSubmitting(true);
    try {
      await dispatch(
        // @ts-ignore thunk typing
        album({ flickrId: albumId, mode: isExisting ? 'update' : 'create' }),
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ m: 2 }}>
      <CardHeader
        avatar={<Icon icon="flickr" />}
        title="Flickr"
        sx={{ p: 0, mb: 2 }}
      />

      {!checked ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 120,
          }}
        >
          <CircularProgress />
        </Box>
      ) : errorMsg ? (
        <Alert severity="error">{errorMsg}</Alert>
      ) : (
        <>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Paste or select a Flickr Album below. If it already exists in the
            albums list, clicking the button will update it; otherwise, a new
            album entry will be created.
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <Autocomplete
              options={options}
              value={options.find((o) => o.id === inputAlbumId) || null}
              onChange={(e, newValue) => {
                if (
                  newValue &&
                  typeof newValue !== 'string' &&
                  'id' in newValue
                ) {
                  setInputAlbumId(newValue.id);
                } else if (typeof newValue === 'string') {
                  setInputAlbumId(newValue);
                } else {
                  setInputAlbumId('');
                }
              }}
              onInputChange={(e, newInput) => {
                if (typeof newInput === 'string') {
                  setInputAlbumId(newInput);
                }
              }}
              getOptionLabel={(option) =>
                typeof option === 'string' ? option : option.label
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Flickr Album"
                  variant="outlined"
                  size="small"
                />
              )}
              freeSolo
              sx={{ flexGrow: 1 }}
              disabled={submitting}
            />
            <Box sx={{ position: 'relative' }}>
              <MightyButton
                label={isExisting ? 'Update' : 'Create'}
                icon={isExisting ? 'edit' : 'add'}
                variant="contained"
                onClick={handleAddOrUpdateAlbum}
                iconPlacement="right"
                disabled={submitting || !inputAlbumId}
              />
              {submitting && (
                <CircularProgress
                  size={24}
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-12px',
                    marginLeft: '-12px',
                  }}
                />
              )}
            </Box>
          </Box>

          {selectedAlbum ? (
            <Card
              variant="outlined"
              sx={{
                mt: 2,
                p: 1, // tighter padding
              }}
            >
              <CardHeader
                title={selectedAlbum.title || 'Untitled Album'}
                subheader={`ID: ${selectedAlbum.id}`}
                sx={{ p: 1 }}
              />
              <CardContent sx={{ pt: 0.5, pb: 1 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {selectedAlbum.description || 'No description'}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Photos:</strong> {selectedAlbum.count || 0}
                </Typography>

                {Array.isArray(selectedAlbum.photos) &&
                  selectedAlbum.photos.length > 0 && (
                    <Box
                      component="ul"
                      sx={{
                        pl: 2,
                        m: 0,
                        listStyleType: 'disc',
                      }}
                    >
                      {selectedAlbum.photos.map((photo) => (
                        <li
                          key={photo.flickrId}
                          style={{ marginBottom: '4px' }}
                        >
                          <Typography variant="body2" noWrap>
                            {photo.title || '(untitled photo)'}
                          </Typography>
                        </li>
                      ))}
                    </Box>
                  )}
              </CardContent>
            </Card>
          ) : null}
        </>
      )}
    </Box>
  );
}
