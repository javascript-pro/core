'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Icon } from '../';

export type TNavItem = {  
  url: string;
  target?: string;
  label?: string
  title?: string
  icon?: string
}

export type TNav = {
  title?: string | null;
}

export default function Nav({
  title = null,
}: TNav) {

  const router = useRouter();
  // const icon = "settings"
  
  const navClick = (navItem: TNavItem) => {
    const {url, target} = navItem;
    if (target === '_blank') {
      window.open(url, '_blank');
    } else {
      router.push(url);
    }
    return;
  }

  return <List dense>
          {/* <ListItemButton>
            {title}
          </ListItemButton> */}

          <ListItemButton
            onClick={() => {
              navClick({
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

        </List>
}
