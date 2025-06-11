'use client';
// core/gl-core/cartridges/Fallmanager/components/UserInfo.tsx
import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { useUser } from '../../Bouncer';

export type TUserInfo = {
  [key: string]: any;
};

export default function UserInfo() {
  const user = useUser();
  // console.log('UserInfo', user);
  const { email } = user;
  return (
    <>
      <Box>
        <Typography variant="caption">{email}</Typography>
        {/* <pre>email : {JSON.stringify(email, null, 2)}</pre> */}
      </Box>
    </>
  );
}
