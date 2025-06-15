// core/gl-core/cartridges/Fallmanager/components/Dashboard.tsx
'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Grid, Card, CardHeader, CardContent, IconButton } from '@mui/material';
import { useUser } from '../../Bouncer';
import { useDispatch } from '../../../../gl-core';
import {
  CustomButton,
  Cases,
  Uploads,
  toggleNewCaseOpen,
} from '../../Fallmanager';

export default function Dashboard() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useUser();
  const { email } = user;
  // console.log("email", email);

  const handleNewCase = () => {
    dispatch(toggleNewCaseOpen(true));
  };

  // const handleAvatarClick = () => {
  //   dispatch(routeTo('/', router));
  // };

  return (
    <Card sx={{ background: 'rgba(0,0,0,0.05)' }}>
      <CardHeader
        title="Fallmanager"
        // subheader={`${email}`}
        action={
          <>
            <CustomButton
              sx={{ ml: 1 }}
              mode="button"
              color="secondary"
              label="New Case"
              variant="contained"
              icon="case"
              onClick={handleNewCase}
            />
          </>
        }
      />
      <CardContent>
        <Grid container spacing={1}>
          <Grid
            size={{
              xs: 8,
            }}
          >
            <Cases />
          </Grid>

          <Grid
            size={{
              xs: 4,
            }}
          >
            <Uploads />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
