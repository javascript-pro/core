// core/gl-core/cartridges/Fallmanager/components/Faelle/Fallliste.tsx
'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { collection, onSnapshot, DocumentData } from 'firebase/firestore';
import { db } from '../../../../lib/firebase';
import { useTranslation } from '../../../Fallmanager/hooks/useTranslation';

export default function Fallliste() {
  const [docs, setDocs] = useState<DocumentData[]>([]);
  const t = useTranslation();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'fallmanager'), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDocs(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Box sx={{ mx: 2 }}>
      <Typography variant="h4" gutterBottom>
        {t('caseList')}
      </Typography>
      {docs.map((doc) => (
        <Box key={doc.id} sx={{ mb: 2, p: 1, bgcolor: '#f5f5f5', borderRadius: 1 }}>
          <pre>{JSON.stringify(doc, null, 2)}</pre>
        </Box>
      ))}
    </Box>
  );
}
