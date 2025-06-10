'use client';
// core/gl-core/cartridges/Fallmanager/components/StickyHeader.tsx
import * as React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  Box,
} from '@mui/material';
import { useUser} from '../../Bouncer';
import { useFallmanager } from '../../Fallmanager';

export default function StickyHeader() {
  
  const slice = useFallmanager();
  const user = useUser();
  const router = useRouter();

  const handleLogoClick = () => {
    router.push('/fallmanager');
  };
  return <>  
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          cursor: 'pointer', 
        }} 
        onClick={handleLogoClick}>
        <Image
          src="/_clients_/fallmanager/jpg/logo.jpg"
          alt="Fallmanager Logo"
          width={236}
          height={50}
          style={{ marginRight: 8 }}
        />
      </Box>
  </>
}
