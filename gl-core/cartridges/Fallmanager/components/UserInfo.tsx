'use client';
// core/gl-core/cartridges/Fallmanager/components/UserInfo.tsx
import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { useDispatch, MightyButton } from '../../../../gl-core';

import { useUser, firebaseAuth } from '../../Bouncer';

export type TUserInfo = {
  [key: string]: any;
};

export default function UserInfo() {
  const user = useUser();
  const dispatch = useDispatch();
  const { email } = user;

  const handleSignout = () => {
    dispatch(firebaseAuth('signout'));
  }

  return (
    <>
      <Box>
        <MightyButton 
          label="Sign out"
          icon="signout"
          onClick={handleSignout}
        />
        {/* <Typography variant="caption">{email}</Typography>
        <pre>email : {JSON.stringify(email, null, 2)}</pre> */}

      </Box>
    </>
  );
}
