// core/gl-core/cartridges/Fallmanager/components/Dashboard.tsx
'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Grid, Card, CardHeader, CardContent, IconButton } from '@mui/material';
import { useDispatch, routeTo } from '../../../../gl-core';
import { Cases, Uploads, Icon } from '../../Fallmanager';
import { useUser } from '../../Bouncer';

export default function Dashboard() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useUser();
  const { email } = user;
  // console.log("email", email);

  const handleAvatarClick = () => {
    dispatch(routeTo('/', router));
  };

  return (
    <Card sx={{ background: 'rgba(0,0,0,0.05)' }}>
      <CardHeader
        title="Fallmanager"
        subheader={`${email}`}
        avatar={
          <IconButton color="secondary" onClick={handleAvatarClick}>
            <Icon icon="home" />
          </IconButton>
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
