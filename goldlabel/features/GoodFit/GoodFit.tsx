'use client';

import * as React from 'react';
import {
  Box,
  Card,
  CardHeader,
  CardContent,
} from '@mui/material';
import {Icon, Featured} from '../../'

export default function GoodFit() {

  return (
    <>
    <Card sx={{ maxWidth: 800, margin: 'auto', mt: 4, p: 2 }}>

      <CardHeader
        avatar={<Icon icon="good-fit"/>}
        title="Good Fit?"
        subheader="Find out in seconds"
      />

      <CardContent>
      
      </CardContent>
    </Card>
    <Featured />
    </>
  );
}
