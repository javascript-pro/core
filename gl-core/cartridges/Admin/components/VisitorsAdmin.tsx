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

  const getBrowserIcon = (browser: string): string => {
    const b = browser?.toLowerCase() || '';
    if (b.includes('chrome')) return 'chrome';
    if (b.includes('safari')) return 'safari';
    if (b.includes('firefox')) return 'firefox';
    if (b.includes('edge')) return 'edge';
    return 'browser';
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
    const browser = visitor.device?.userAgent?.browser || '';
    const os = visitor.device?.userAgent?.os || '';
    const deviceType = visitor.device?.userAgent?.deviceType || '';
    const countryCode = visitor.geo?.countryCode || '';

    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Icon icon={getBrowserIcon(browser) as any} />
        <Icon icon={getDeviceTypeIcon(deviceType) as any} />
        <Icon icon={getOsIcon(os) as any} />
        {countryCode && (
          <Avatar
            src={`/svg/flags/${countryCode.toLowerCase()}.svg`}
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
        subheader="View and manage visitors in real time"
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
          {visitors.map((visitor) => {
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
                        gap: 2,
                      }}
                    >
                      {renderSummaryIcons(visitor)}
                      <Typography
                        variant="caption"
                        sx={{ flex: 1, wordBreak: 'break-all' }}
                      >
                        {visitor.fingerprint || visitor.id}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: 'text.secondary', mt: { xs: 1, sm: 0 } }}
                      >
                        {visitor.currentPathname}
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
                        {visitor.ip || '—'}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography variant="subtitle2" gutterBottom>
                        Geo
                      </Typography>
                      <Typography variant="body2">
                        {visitor.geo?.city}, {visitor.geo?.region},{' '}
                        {visitor.geo?.country}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography variant="subtitle2" gutterBottom>
                        Device
                      </Typography>
                      {visitor.device?.userAgent && (
                        <Typography variant="body2">
                          {visitor.device.userAgent.browser} on{' '}
                          {visitor.device.userAgent.os} (
                          {visitor.device.userAgent.deviceType})
                        </Typography>
                      )}
                      <Typography variant="caption" color="text.secondary">
                        Platform: {visitor.device?.platform || '—'} | Vendor:{' '}
                        {visitor.device?.vendor || '—'}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography variant="subtitle2" gutterBottom>
                        Current Path
                      </Typography>
                      <Typography variant="body2">
                        {visitor.currentPathname || '—'}
                      </Typography>
                    </Box>
                  </Stack>
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
