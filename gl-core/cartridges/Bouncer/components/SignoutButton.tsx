'use client';
// core/gl-core/cartridges/Bouncer/components/SignoutButton.tsx

import * as React from 'react';
import { Button } from '@mui/material';
import { TSignoutButton } from '../../Bouncer/types';
import { useDispatch } from "../../../../gl-core"
import { firebaseAuth } from "../../Bouncer"

export default function SignoutButton({}: TSignoutButton) {
  
  const dispatch = useDispatch()

  const handleSignout = () => {
    dispatch(firebaseAuth("signout"));
  }
  
  return (
    <Button 
      fullWidth
      onClick={handleSignout}
      variant="contained"
    >
      Sign Out
    </Button>
  );
}
