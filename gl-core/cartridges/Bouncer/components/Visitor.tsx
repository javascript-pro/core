'use client';

import * as React from 'react';
import {
  Box,
  CardHeader,
  CircularProgress,
  Avatar,
  Typography,
  Popover,
} from '@mui/material';
import { TSignoutButton } from '../../Bouncer/types';
import { useDispatch, Icon } from '../../../../gl-core';
import { useVisitor, initFingerprint, ping } from '../../Bouncer';

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
  return isMobile ? 'mobile' : 'desktop';
};

export default function Visitor({}: TSignoutButton) {
  const dispatch = useDispatch();
  const visitor = useVisitor();
  const ICON_SIZE = 40;
  const hasInitAttempted = React.useRef(false);

  // countdown state
  const [secondsLeft, setSecondsLeft] = React.useState(10);

  // popover state
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    if (
      !hasInitAttempted.current &&
      visitor &&
      typeof visitor === 'object' &&
      visitor.fingerprint === undefined &&
      !visitor.inittingFingerprint
    ) {
      hasInitAttempted.current = true;
      dispatch(initFingerprint());
    }
  }, [visitor, dispatch]);

  // ping every 10 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          dispatch(ping());
          return 10;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [dispatch]);

  const fingerprint = visitor?.fingerprint;
  const title = fingerprint?.displayName || 'Loading…';
  const avatarSrc = fingerprint?.avatar;
  const showSpinner = true;

  return (
    <>
      <Box onClick={handleOpen} sx={{ cursor: 'pointer' }}>
        <CardHeader
          avatar={
            showSpinner ? (
              <Box
                sx={{
                  position: 'relative',
                  width: ICON_SIZE,
                  height: ICON_SIZE,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CircularProgress
                  size={ICON_SIZE * 0.9}
                  thickness={5}
                  variant="determinate"
                  value={(secondsLeft / 10) * 100}
                />
                <Typography
                  variant="caption"
                  component="span"
                  sx={{
                    position: 'absolute',
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  {secondsLeft}
                </Typography>
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
          // action is now removed — we don't show icons by default
        />
      </Box>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Box sx={{ p: 2, minWidth: 200 }}>
          <Typography variant="h6" gutterBottom>
            {fingerprint?.displayName || 'No name'}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              mb: 1,
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
        </Box>
      </Popover>
    </>
  );
}
