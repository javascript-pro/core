'use client';
// core/gl-core/cartridges/Fallmanager/components/StickyHeader.tsx
import * as React from 'react';
import config from '../config.json';
import menu from '../menu.json';
import { useRouter } from 'next/navigation';
import {
  Box,
  CardHeader,
  Typography,
  IconButton,
  Button,
  Menu,
  MenuItem,
} from '@mui/material';
import { Icon, useDispatch, navigateTo  } from '../../../../gl-core';

export default function StickyHeader() {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogoClick = () => {
    router.push('/fallmanager');
  };

  const [anchorEls, setAnchorEls] = React.useState<Record<string, HTMLElement | null>>({});

  const handleOpen = (label: string, event: React.MouseEvent<HTMLElement>) => {
    setAnchorEls(prev => ({ ...prev, [label]: event.currentTarget }));
  };

  const handleClose = (label: string) => {
    setAnchorEls(prev => ({ ...prev, [label]: null }));
  };

  const handleClick = (slug: string) => {
    dispatch(navigateTo(slug));
  };

  return (
    <Box>
      <CardHeader
        avatar={
          <IconButton onClick={handleLogoClick}>
            <Icon icon="fallmanager" />
          </IconButton>
        }
        title={<Typography variant="h6">{config.title}</Typography>}
        subheader={<Typography variant="body2">{config.description}</Typography>}
      />
      
      <Box
        sx={{
          display: 'flex',
          gap: 1,
        
        }}
      >
        {menu.map((item) => {
          const hasSubitems = item.subitems && item.subitems.length > 0;
          const label = item.label;

          if (hasSubitems) {
            return (
              <Box key={label}>
                <Button
                  variant="text"
                  onClick={(e) => handleOpen(label, e)}
                >
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
        <Box sx={{flexGrow:1}} />
        <Box sx={{mt: 1}}>
           Sign out
        </Box>
       
      </Box>
      
    </Box>
  );
}
