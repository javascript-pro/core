// /Users/goldlabel/GitHub/pro/src/Pr0/components/PingChip.tsx
'use client';
import * as React from 'react';
import { Chip, Avatar, Badge } from '@mui/material';
import { usePings } from '../../Pings';

export type TPingChip = {
  disabled?: boolean;
  unseenCount?: number;
  onClick?: () => void;
};

export default function PingChip({
  disabled = false,
  unseenCount = 0,
  onClick,
}: TPingChip) {
  const { livePing } = usePings() || {};

  // Defensive fallbacks
  const displayName =
    livePing?.displayName?.trim() || livePing?.username?.trim() || 'Guest';

  const avatarSrc =
    livePing?.avatar && livePing.avatar.trim() !== ''
      ? livePing.avatar
      : '/svg/guest.svg';

  return (
    <Badge
      color="primary"
      overlap="circular"
      badgeContent={unseenCount > 0 ? unseenCount : null}
    >
      <Chip
        disabled={disabled}
        variant="filled"
        onClick={onClick}
        avatar={<Avatar alt={displayName} src={avatarSrc} />}
        label={displayName}
        sx={{
          cursor: 'pointer',
          fontWeight: 500,
          '&:hover': { backgroundColor: 'action.hover' },
        }}
      />
    </Badge>
  );
}
