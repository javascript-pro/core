'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  Box,
  Alert,
  LinearProgress,
  CardHeader,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Icon } from '../../../../gl-core';
import {
  collection,
  onSnapshot,
  QueryDocumentSnapshot,
  DocumentData,
} from 'firebase/firestore';
import { db } from '../../../lib/firebase';

export default function VisitorsAdmin() {
  const [msg, setMsg] = useState<string | null>('Connecting...');
  const [loading, setLoading] = useState<boolean>(true);
  const [visitors, setVisitors] = useState<DocumentData[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'visitors'),
      (snapshot) => {
        const data = snapshot.docs.map((doc: QueryDocumentSnapshot) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setVisitors(data);
        setMsg(`${data.length} visitors.`);
        setLoading(false);
      },
      (error) => {
        console.error('Error subscribing to visitors collection:', error);
        setMsg('Error connecting to visitors.');
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  // helper to format geo summary
  const formatGeoSummary = (geo: any): string => {
    if (!geo) return '';
    const parts: string[] = [];
    if (geo.city) parts.push(geo.city);
    if (geo.region) parts.push(geo.region);
    if (geo.countryCode || geo.country) {
      parts.push(geo.countryCode || geo.country);
    }
    return parts.join(', ');
  };

  return (
    <Box sx={{ m: 2 }}>
      <CardHeader
        avatar={<Icon icon="visitors" />}
        title="Visitors"
        subheader="View and manage visitors in real time"
        sx={{ p: 0, mb: 2 }}
      />

      {msg && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {msg}
        </Alert>
      )}

      {loading && <LinearProgress color="secondary" sx={{ mb: 2 }} />}

      {!loading && visitors.length > 0 && (
        <Box>
          {visitors.map((visitor) => {
            const geoSummary = formatGeoSummary(visitor.geo);
            return (
              <Accordion key={visitor.id} sx={{ mb: 1 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '100%',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Icon icon="fingerprint" color="primary" />
                        {geoSummary && (
                          <Typography variant="body1" sx={{ ml: 2 }}>
                            {geoSummary}
                          </Typography>
                        )}
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{ color: 'text.secondary', mt: { xs: 1, sm: 0 } }}
                      >
                        {visitor.id}
                      </Typography>
                    </Box>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <pre
                    style={{
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word',
                      margin: 0,
                    }}
                  >
                    {JSON.stringify(visitor, null, 2)}
                  </pre>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Box>
      )}

      {!loading && visitors.length === 0 && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          No visitors found.
        </Typography>
      )}
    </Box>
  );
}
