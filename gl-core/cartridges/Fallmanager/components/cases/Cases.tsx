// core/gl-core/cartridges/Fallmanager/components/cases/Cases.tsx

'use client';
import * as React from 'react';
import { IconButton, Card, CardHeader, CardContent } from '@mui/material';
import { useDispatch } from '../../../../../gl-core';
import {
  Icon,
  CaseCreate,
  toggleNewCaseOpen,
  CasesList,
  CustomButton,
} from '../../../Fallmanager';

export default function Cases() {
  const dispatch = useDispatch();

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
        action={
          <CustomButton
            mode="button"
            label="New Case"
            variant="outlined"
            icon="new"
            onClick={handleActionClick}
          />
        }
      />
      <CardContent>
        <CasesList />
      </CardContent>
    </Card>
  );
}
