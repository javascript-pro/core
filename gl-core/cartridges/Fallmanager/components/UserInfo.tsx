'use client';
// core/gl-core/cartridges/Fallmanager/components/UserInfo.tsx
import * as React from 'react';
import { Box } from '@mui/material';
import { useUser} from '../../Bouncer';

export type TUserInfo = {
  [key: string]: any;
};

export default function UserInfo() {
  
  const user = useUser();
  console.log('UserInfo', user);
  return <Box>
          <pre>
            user : {JSON.stringify(user, null, 2)}
          </pre>
        </Box>;
}
