'use client';

import * as React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CardHeader,
  Avatar,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { 
  useIsMobile,
  useSlice,
  useDispatch,
  setUbereduxKey,
  Icon,
} from '../';

export type TNav = {
  title?: string | null;
}

export default function Nav({
}: TNav) {
  const dispatch = useDispatch();
  const slice = useSlice();
  const {modalNav} = slice;
  const isMobile = useIsMobile();
  
  const closeModalNav = () => dispatch (setUbereduxKey({ modalNav: false}))
  const openModalNav = () => dispatch (setUbereduxKey({ modalNav: true}))
  

  return <>
          <IconButton
            color="inherit"
            onClick={openModalNav}
          >
            <Icon icon="menu" />
          </IconButton>

          <Dialog 
            fullWidth
            fullScreen={isMobile ? true : false}
            open={modalNav}
            onClose={closeModalNav}
          >
            <DialogTitle>
              <CardHeader 
                title={"Nav"}
                avatar={<Avatar src={"/svg/favicon_gold.svg"} />}
              />
            </DialogTitle>
            <DialogContent>
              <List>
                <ListItemButton>
                  <ListItemText 
                    primary="Example Action"
                  />
                </ListItemButton>
              </List>
              
            </DialogContent>
            <DialogActions>
              <List>
                <ListItemButton onClick={closeModalNav}>
                  <ListItemText 
                    primary="Close"
                  />
                  <ListItemIcon>
                    <Icon icon="close" />
                  </ListItemIcon>
                </ListItemButton>
              </List>
            </DialogActions>
          </Dialog>
        </>
}
