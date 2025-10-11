// /Users/goldlabel/GitHub/pro/src/Pr0/components/PingChip.tsx
'use client';
import * as React from 'react';
import { CardHeader, Avatar } from '@mui/material';
import { useBouncer } from '../../Bouncer';


export default function PersonHeader() {
  const { livePing } = useBouncer() || {};

  const displayName =
    livePing?.displayName?.trim() || livePing?.username?.trim() || 'Guest';

  const avatarSrc =
    livePing?.avatar && livePing.avatar.trim() !== ''
      ? livePing.avatar
      : '/svg/guest.svg';

  return (
    <CardHeader 
      avatar={<Avatar src={avatarSrc} alt={displayName}/>}
      title={displayName}
    />
  );
}
