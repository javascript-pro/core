// core/gl-core/cartridges/Fallmanager/components/Dashboard.tsx
'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { 
  Grid,
  Card,
  CardHeader,
  CardContent,
} from '@mui/material';
import { useDispatch } from '../../../../gl-core';
import {
  Cases,
  Uploads,
} from '../../Fallmanager'

export default function Dashboard() {
  const router = useRouter();
  const dispatch = useDispatch();

  return <Card>
          <CardHeader 
            title="Dashboard"
          />
          <CardContent>
            <Grid container spacing={1}>
              <Grid size={{
                xs: 6,
              }}>
                <Cases />
              </Grid>

              <Grid size={{
                xs: 6,
              }}>
                <Uploads />
              </Grid>

            </Grid>
            
            
          </CardContent>
        </Card>;
}
