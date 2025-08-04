'use client';

import * as React from 'react';
import { useEffect, useState, useMemo } from 'react';
import {
  Box,
  Alert,
  CircularProgress,
  CardHeader,
  Typography,
  Card,
  CardContent,
  List,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Avatar,
  TextField,
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
  photos?: { flickrId: string; title?: string, sizes?: any }[];
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
  const [selectedAlbumId, setSelectedAlbumId] = useState('');
  const [newFlickrId, setNewFlickrId] = useState('');
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

  const albumMap = useMemo(() => {
    const map: Record<string, TFlickrAlbum> = {};
    flickrData.albums.forEach((a) => {
      map[a.id] = a;
    });
    return map;
  }, [flickrData.albums]);

  const selectedAlbum = selectedAlbumId ? albumMap[selectedAlbumId] : undefined;

  const handleCreateAlbum = async () => {
    const trimmedId = newFlickrId.trim();
    if (!trimmedId) return;
    setSubmitting(true);
    try {
      await dispatch(
        // @ts-ignore
        album({ flickrId: trimmedId, mode: 'create' }),
      );
      setNewFlickrId('');
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateAlbum = async () => {
    if (!selectedAlbumId) return;
    setSubmitting(true);
    try {
      await dispatch(
        // @ts-ignore
        album({ flickrId: selectedAlbumId, mode: 'update' }),
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
          <Typography variant="body1" sx={{ mb: 2 }}>
            Enter a Flickr Album ID to create a new album, or select one below to update it.
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <TextField
              label="Flickr Album ID"
              size="small"
              variant="outlined"
              value={newFlickrId}
              onChange={(e) => setNewFlickrId(e.target.value)}
              fullWidth
              disabled={submitting}
            />
            <Box sx={{ position: 'relative' }}>
              <MightyButton
                label="New from Flickr ID"
                icon="add"
                variant="contained"
                onClick={handleCreateAlbum}
                disabled={submitting || !newFlickrId.trim()}
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

          <List sx={{ mb: 3 }}>
            {flickrData.albums.map((a) => {
              const firstPhoto = a.photos?.[0];
              const thumbUrl = firstPhoto?.sizes?.thumb?.src;

              return (
                <ListItemButton
                  key={a.id}
                  selected={selectedAlbumId === a.id}
                  onClick={() => setSelectedAlbumId(a.id)}
                  disabled={submitting}
                >
                  <ListItemAvatar>
                    <Avatar
                      variant="rounded"
                      src={thumbUrl}
                      alt={firstPhoto?.title || ''}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={a.title || a.id}
                    secondary={`Photos: ${a.count || 0}`}
                  />
                </ListItemButton>
              );
            })}
          </List>

          {selectedAlbumId && (
            <Box sx={{ position: 'relative', mb: 3 }}>
              <MightyButton
                label="Update Selected Album"
                icon="edit"
                variant="outlined"
                onClick={handleUpdateAlbum}
                disabled={submitting}
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
          )}

          {selectedAlbum && (
            <Card variant="outlined" sx={{ mt: 2, p: 1 }}>
              <CardHeader
                title={selectedAlbum.title}
                subheader={`ID: ${selectedAlbum.id}`}
                sx={{ p: 1 }}
              />
              <CardContent sx={{ pt: 0.5, pb: 1 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {selectedAlbum.description}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Photos:</strong> {selectedAlbum.count || 0}
                </Typography>
                {Array.isArray(selectedAlbum.photos) &&
                  selectedAlbum.photos.length > 0 && (
                    <Box component="ul" sx={{ pl: 2, m: 0, listStyleType: 'disc' }}>
                      {selectedAlbum.photos.map((photo) => (
                        <li key={photo.flickrId} style={{ marginBottom: '4px' }}>
                          <Typography variant="body2" noWrap>
                            {photo.title || '(untitled photo)'}
                          </Typography>
                        </li>
                      ))}
                    </Box>
                  )}
              </CardContent>
            </Card>
          )}

          {/* <Box sx={{ mt: 4 }}>
            <Typography variant="caption" component="div" sx={{ mb: 1 }}>
              Albums JSON:
            </Typography>
            <Box component="pre" sx={{ fontSize: 12, overflow: 'auto', maxHeight: 300 }}>
              {JSON.stringify(flickrData.albums, null, 2)}
            </Box>
          </Box> */}
        </>
      )}
    </Box>
  );
}
