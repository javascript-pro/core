// core/gl-core/cartridges/Bouncer/BouncerAdmin.tsx
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
  Divider,
  Stack,
  Avatar,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Icon } from '../../../gl-core';
import {
  collection,
  onSnapshot,
  QueryDocumentSnapshot,
  DocumentData,
} from 'firebase/firestore';
import { db } from '../../lib/firebase';

export default function BouncerAdmin() {
  const [msg, setMsg] = useState<string | null>('Connecting…');
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

  const getBrowserIcon = (browser: string): string => {
    const b = browser?.toLowerCase() || '';
    if (b.includes('chrome')) return 'chrome';
    if (b.includes('safari')) return 'safari';
    if (b.includes('firefox')) return 'firefox';
    if (b.includes('edge')) return 'edge';
    return 'info';
  };

  const getOsIcon = (os: string): string => {
    const o = os?.toLowerCase() || '';
    if (o.includes('mac')) return 'mac';
    if (o.includes('win')) return 'windows';
    if (o.includes('linux')) return 'linux';
    return 'os';
  };

  const getDeviceTypeIcon = (type: string): string => {
    const t = type?.toLowerCase() || '';
    if (t.includes('mobile')) return 'mobile';
    if (t.includes('tablet')) return 'tablet';
    return 'desktop';
  };

  const renderSummaryIcons = (visitor: any) => {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {visitor.photoURL && typeof visitor.photoURL === 'string' && (
          <Avatar src={visitor.photoURL} sx={{ width: 24, height: 24 }} />
        )}
        <Icon icon={getBrowserIcon(visitor.browser || 'work') as any} />
        <Icon icon={getDeviceTypeIcon(visitor.deviceType || '') as any} />
        <Icon icon={getOsIcon(visitor.os || '') as any} />
        {visitor.country_code && typeof visitor.country_code === 'string' && (
          <Avatar
            src={`/svg/flags/${visitor.country_code.toLowerCase()}.svg`}
            sx={{ width: 20, height: 20 }}
            variant="square"
          />
        )}
      </Box>
    );
  };

  return (
    <Box sx={{ m: 2 }}>
      <CardHeader
        title="Visitors"
        action={
          msg && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {msg}
            </Alert>
          )
        }
        sx={{ p: 0, mb: 2 }}
      />

      {loading && <LinearProgress color="secondary" sx={{ mb: 2 }} />}

      {!loading && visitors.length > 0 && (
        <Box>
          {visitors.map((visitor: any) => (
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
                      gap: 2,
                    }}
                  >
                    {renderSummaryIcons(visitor)}
                    <Typography
                      variant="caption"
                      sx={{ flex: 1, wordBreak: 'break-all' }}
                    >
                      {typeof visitor.displayName === 'string' &&
                      visitor.displayName.trim() !== ''
                        ? visitor.displayName
                        : visitor.id}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: 'text.secondary', mt: { xs: 1, sm: 0 } }}
                    >
                      {typeof visitor.currentPathname === 'string'
                        ? visitor.currentPathname
                        : '—'}
                    </Typography>
                  </Box>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={1} divider={<Divider flexItem />}>
                  <Box>
                    <Typography variant="subtitle2" gutterBottom>
                      IP Address
                    </Typography>
                    <Typography variant="body2">
                      {typeof visitor.ip === 'string' ? visitor.ip : '—'}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="subtitle2" gutterBottom>
                      Location
                    </Typography>
                    <Typography variant="body2">
                      {[visitor.city, visitor.state_prov, visitor.country_name]
                        .filter((v) => typeof v === 'string' && v.length > 0)
                        .join(', ') || '—'}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="subtitle2" gutterBottom>
                      Device
                    </Typography>
                    <Typography variant="body2">
                      {visitor.browser || '—'} on {visitor.os || '—'} (
                      {visitor.deviceType || '—'})
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Platform: {visitor.platform || '—'} | Vendor:{' '}
                      {visitor.vendor || '—'}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="subtitle2" gutterBottom>
                      Current Path
                    </Typography>
                    <Typography variant="body2">
                      {typeof visitor.currentPathname === 'string'
                        ? visitor.currentPathname
                        : '—'}
                    </Typography>
                  </Box>
                </Stack>
              </AccordionDetails>
            </Accordion>
          ))}
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
