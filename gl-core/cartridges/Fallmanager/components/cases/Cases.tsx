// core/gl-core/cartridges/Fallmanager/components/cases/Cases.tsx

'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { IconButton, Card, CardHeader, CardContent } from '@mui/material';
import { routeTo, useDispatch } from '../../../../../gl-core';
import { Icon, CaseCreate, toggleNewCaseOpen } from '../../../Fallmanager';

export default function Cases() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleAvatarClick = () => {
    console.log('AvatarClick');
  };

  const handleActionClick = () => {
    console.log('New Case Toggle');
    dispatch(toggleNewCaseOpen(true));
  };

  return (
    <Card>
      <CaseCreate />
      <CardHeader
        title="Cases"
        // subheader="Total open cases"
        avatar={
          <IconButton color="secondary" onClick={handleAvatarClick}>
            <Icon icon="cases" />
          </IconButton>
        }
        action={
          <IconButton color="secondary" onClick={handleActionClick}>
            <Icon icon="new" />
          </IconButton>
        }
      />
      <CardContent>List open cases</CardContent>
    </Card>
  );
}
