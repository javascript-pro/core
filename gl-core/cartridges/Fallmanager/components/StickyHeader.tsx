'use client';
// core/gl-core/cartridges/Fallmanager/components/StickyHeader.tsx
import * as React from 'react';
import config from '../config.json';
import menu from '../menu.json';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Box,
  CardHeader,
  Typography,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Toolbar,
} from '@mui/material';
import {
  Icon,
  useDispatch,
  navigateTo,
  MightyButton,
} from '../../../../gl-core';
import { firebaseAuth } from '../../Bouncer';

export default function StickyHeader() {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogoClick = () => {
    router.push('/fallmanager');
  };

  const [anchorEls, setAnchorEls] = React.useState<
    Record<string, HTMLElement | null>
  >({});

  const handleOpen = (label: string, event: React.MouseEvent<HTMLElement>) => {
    setAnchorEls((prev) => ({ ...prev, [label]: event.currentTarget }));
  };

  const handleClose = (label: string) => {
    setAnchorEls((prev) => ({ ...prev, [label]: null }));
  };

  const handleClick = (slug: string) => {
    dispatch(navigateTo(slug));
  };

  const handleSignout = () => {
    dispatch(firebaseAuth('signout'));
  };

  return (
    <Box>
      <CardHeader
        avatar={
          <IconButton onClick={handleLogoClick} sx={{ p: 0 }}>
            <Image
              src="/_clients_/fallmanager/jpg/logo.jpg"
              alt="Fallmanager Logo"
              width={236}
              height={60}
              style={{ borderRadius: '4px' }}
            />
          </IconButton>
        }
        action={
          <MightyButton mode="icon" icon="signout" onClick={handleSignout} />
        }
        // title={<Typography variant="h6">{config.title}</Typography>}
        // subheader={
        //   <Typography variant="body2">{config.description}</Typography>
        // }
      />

      <Box
        sx={{
          width: '100%',
          display: 'flex',
          gap: 1,
        }}
      >
        <Toolbar>
          {menu.map((item) => {
            const hasSubitems = item.subitems && item.subitems.length > 0;
            const label = item.label;

            if (hasSubitems) {
              return (
                <Box key={label}>
                  <Button variant="text" onClick={(e) => handleOpen(label, e)}>
                    {label}
                  </Button>
                  <Menu
                    anchorEl={anchorEls[label]}
                    open={Boolean(anchorEls[label])}
                    onClose={() => handleClose(label)}
                  >
                    {item.subitems.map((sub) => (
                      <MenuItem
                        key={sub.label}
                        onClick={() => {
                          handleClose(label);
                          handleClick(sub.slug);
                        }}
                      >
                        {sub.label}
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              );
            }

            return (
              <Button
                key={label}
                variant="text"
                onClick={() => handleClick(item.slug)}
              >
                {label}
              </Button>
            );
          })}
        </Toolbar>
      </Box>
    </Box>
  );
}
