// /Users/goldlabel/GitHub/core/gl-core/cartridges/Pings/components/PersonHeader.tsx
'use client';
import * as React from 'react';
import { CardHeader, Avatar } from '@mui/material';
import { usePings } from '../../Pings';

export default function PersonHeader() {
  const { livePing } = usePings() || {};

  const displayName =
    livePing?.displayName?.trim() || livePing?.username?.trim() || 'Guest';

  const avatarSrc =
    livePing?.avatar && livePing.avatar.trim() !== ''
      ? livePing.avatar
      : '/svg/guest.svg';

  return (
    <CardHeader
      avatar={<Avatar src={avatarSrc} alt={displayName} />}
      title={displayName}
    />
  );
}
