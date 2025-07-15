'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { Box, Typography, Alert } from '@mui/material';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../../lib/firebase';

type TFlickrData = {
  latest?: any;
  photos: any[];
  albums: any[];
};

export default function FlickrAdmin() {
  const [flickrData, setFlickrData] = useState<TFlickrData>({
    photos: [],
    albums: [],
  });
  const [checked, setChecked] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

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
        const albumsArray = albumsDoc
          ? Object.entries(albumsDoc).map(([id, data]: [string, any]) => ({
              id,
              ...(data as object),
            }))
          : [];

        const nextData: TFlickrData = {
          latest: latestDoc,
          photos: photosArray,
          albums: albumsArray,
        };

        setFlickrData(nextData);
        setErrorMsg(null);
        setChecked(true);
      },
      (error) => {
        setFlickrData({ photos: [], albums: [] });
        setErrorMsg(`Firebase Error: ${error.message}`);
        setChecked(true);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <Box sx={{ m: 2 }}>
      <Typography variant="h6" gutterBottom>
        Flickr Admin
      </Typography>

      {!checked ? (
        <Typography variant="body2">Loading…</Typography>
      ) : errorMsg ? (
        <Alert severity="error">{errorMsg}</Alert>
      ) : flickrData.latest || flickrData.photos.length || flickrData.albums.length ? (
        <pre
          style={{
            padding: '8px',
            background: '#f5f5f5',
            overflowX: 'auto',
            borderRadius: '4px',
          }}
        >
          albums {JSON.stringify(flickrData.albums, null, 2)}
        </pre>
      ) : (
        <Alert severity="error">
          No <code>latest</code>, <code>photos</code>, or <code>albums</code> documents found in{' '}
          <code>flickr</code> collection.
        </Alert>
      )}
    </Box>
  );
}
