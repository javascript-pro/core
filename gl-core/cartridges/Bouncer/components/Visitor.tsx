// core/gl-core/cartridges/Bouncer/components/Visitor.tsx
'use client';

import * as React from 'react';
import { Box, CircularProgress, Avatar, Typography } from '@mui/material';
import { useDispatch, Icon } from '../../../../gl-core';
import { useVisitor, initFingerprint, ping, useUid } from '../../Bouncer';

export default function Visitor() {
  const dispatch = useDispatch();
  const visitor = useVisitor();
  const uid = useUid();
  const hasInitAttempted = React.useRef(false);

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

  const ICON_SIZE = 40;
  const AVATAR_SIZE = 32;
  const [secondsLeft, setSecondsLeft] = React.useState(10);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          console.log("ping", visitor)
          // dispatch(ping());
          return 10;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [dispatch]);

  const fingerprintAvatar = visitor?.fingerprint?.avatar;

  return (
    <Box
      sx={{
        width: ICON_SIZE,
        height: ICON_SIZE,
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: uid ? 'pointer' : 'default',
      }}
    >
      {/* Avatar or fallback icon */}
      {/* {fingerprintAvatar ? (
        <Avatar
          src={fingerprintAvatar}
          sx={{
            width: AVATAR_SIZE,
            height: AVATAR_SIZE,
            zIndex: 2,
          }}
        />
      ) : (
        <Avatar
          sx={{
            width: AVATAR_SIZE,
            height: AVATAR_SIZE,
            zIndex: 2,
            bgcolor: 'transparent',
          }}
        >
          <Icon icon="visitor" />
        </Avatar>
      )} */}

      {/* Spinner ring, perfectly centered */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      >
        <CircularProgress
          size={ICON_SIZE}
          thickness={4}
          variant="determinate"
          value={(secondsLeft / 10) * 100}
        />
      </Box>

      {/* Countdown number */}
      <Typography
        variant="caption"
        component="span"
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: 12,
          fontWeight: 600,
          color: 'text.primary',
          zIndex: 3,
          pointerEvents: 'none',
        }}
      >
        {secondsLeft}
      </Typography>
    </Box>
  );
}
