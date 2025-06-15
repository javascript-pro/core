// core/gl-core/cartridges/Fallmanager/components/cases/Cases.tsx

'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { IconButton, Card, CardHeader, CardContent } from '@mui/material';
import { routeTo, useDispatch } from '../../../../../gl-core';
import { Icon, CaseCreate } from '../../../Fallmanager';

export default function Cases() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleAvatarClick = () => {
    console.log('AvatarClick');
  };

  return (
    <Card>
      <CaseCreate />
      <CardHeader
        title="Cases"
        subheader="Total open cases"
        avatar={
          <IconButton color="secondary" onClick={handleAvatarClick}>
            <Icon icon="cases" />
          </IconButton>
        }
      />
      <CardContent>List open cases</CardContent>
    </Card>
  );
}
