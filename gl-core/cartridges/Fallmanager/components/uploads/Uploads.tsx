'use client';
// core/gl-core/cartridges/Fallmanager/components/screens/Uploads.tsx
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { IconButton, Card, CardHeader, CardContent } from '@mui/material';
import { routeTo, useDispatch } from '../../../../../gl-core';
import { Icon, UploadList, UploadNew } from '../../../Fallmanager';

export default function Uploads() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleAvatarClick = () => {
    console.log('AvatarClick');
  };

  return (
    <Card sx={{ background: 'rgba(0,0,0,0.04)' }}>
      <CardHeader
        title="Files"
        // subheader="Last 10 files"
        avatar={
          <IconButton color="secondary" onClick={handleAvatarClick}>
            <Icon icon="uploads" />
          </IconButton>
        }
        action={<UploadNew />}
      />
      <CardContent>
        <UploadList />
      </CardContent>
    </Card>
  );
}

/*
    <Box>
      <CardHeader
        title={<Typography variant="h6">Uploads</Typography>}
        avatar={<UploadNew />}
      />
      
    </Box>
*/
