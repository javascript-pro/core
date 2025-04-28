'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  Button,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Icon } from '../';

export type THeader = {
  title?: string | null;
  description?: string | null;
  action?: React.ReactNode | null;
  avatar?: React.ReactNode | null;
}

export default function Header({
  title = null,
  description = null,
  action = null,
  avatar= null,
}: THeader) {

  const router = useRouter();
  // const icon = "settings"
  
  const headerClick = (hay) => {
    console.log("headerClick", hay)
    return;
  }

  return <>
            <Button
                variant='contained'
            >
            Button
            </Button>
          <ListItemButton
            onClick={() => {
                headerClick({
                url: "/previous",
                target: "_self",

              })
            }}
          >
            <ListItemIcon>
              <Icon icon={"left"}/>
            </ListItemIcon>
            <ListItemText 
              primary="404"
            />
          </ListItemButton>

          </>
}
