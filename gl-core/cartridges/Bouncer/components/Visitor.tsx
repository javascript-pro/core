'use client';

import * as React from 'react';
import { Box, Card, CardHeader, CircularProgress, Avatar } from '@mui/material';
import { TSignoutButton } from '../../Bouncer/types';
import { useDispatch, Icon } from '../../../../gl-core';
import { useVisitor, initFingerprint } from '../../Bouncer';

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
  if (o.includes('android')) return 'android';
  if (o.includes('ios')) return 'ios';
  return 'os';
};

const getDeviceTypeIcon = (isMobile?: boolean): string => {
  if (isMobile === true) return 'mobile';
  return 'desktop';
};

export default function Visitor({}: TSignoutButton) {
  const dispatch = useDispatch();
  const visitor = useVisitor();
  const ICON_SIZE = 40;
  const hasInitAttempted = React.useRef(false);

  React.useEffect(() => {
    if (
      !hasInitAttempted.current &&
      visitor &&
      typeof visitor === 'object' &&
      visitor.fingerprint === undefined &&
      !visitor.inittingFingerprint
    ) {
      console.log('initFingerprint');
      hasInitAttempted.current = true;
      dispatch(initFingerprint());
    }
  }, [visitor, dispatch]);

  const fingerprint = visitor?.fingerprint;
  const title = fingerprint?.displayName || 'Loading…';
  const avatarSrc = fingerprint?.avatar;

  return (
    <>
      <CardHeader
        avatar={
          visitor?.ready === false || visitor?.inittingFingerprint ? (
            <Box
              sx={{
                width: ICON_SIZE,
                height: ICON_SIZE,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CircularProgress size={ICON_SIZE * 0.6} />
            </Box>
          ) : avatarSrc ? (
            <Avatar
              src={avatarSrc}
              sx={{ width: ICON_SIZE, height: ICON_SIZE }}
            />
          ) : (
            <Icon icon="visitor" />
          )
        }
        title={title}
        action={
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              mt: 1.5,
              ml: 2,
            }}
          >
            <Icon icon={getBrowserIcon(fingerprint?.browser || '') as any} />
            <Icon icon={getDeviceTypeIcon(fingerprint?.isMobile) as any} />
            <Icon icon={getOsIcon(fingerprint?.os || '') as any} />
            {fingerprint?.country_code && (
              <Avatar
                src={`/svg/flags/${fingerprint.country_code.toLowerCase()}.svg`}
                sx={{ width: 20, height: 20 }}
                variant="square"
              />
            )}
          </Box>
        }
      />
      <pre style={{ fontSize: 10 }}>
        fingerprint: {JSON.stringify(fingerprint, null, 2)}
      </pre>
    </>
  );
}
