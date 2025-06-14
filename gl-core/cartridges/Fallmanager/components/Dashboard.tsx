// core/gl-core/cartridges/Fallmanager/components/Dashboard.tsx
'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { 
  Box,
} from '@mui/material';
import { useDispatch } from '../../../../gl-core';

export default function Dashboard() {
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <Box>
      Dashboard
    </Box>
  );
}
