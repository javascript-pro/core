'use client';

import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  Button,
  Alert,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
} from '@mui/material';
import { 
  useIsMobile,
  useSlice,
  useDispatch,
  setUbereduxKey,
  Icon,
  NavItem,
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

  const pathname = usePathname();
  const router = useRouter();
  
  const closeModalNav = () => dispatch (setUbereduxKey({ modalNav: false}))
  const openModalNav = () => dispatch (setUbereduxKey({ modalNav: true}))

  // const onExampleActionClick = () => {
  //   dispatch (exampleAction())
  // } 
  
  return <>
          <IconButton
            color="inherit"
            onClick={openModalNav}
          >
            <Icon icon="menu" />
          </IconButton>

          <Dialog 
            fullWidth
            maxWidth="xs"
            fullScreen={isMobile ? true : false}
            open={modalNav}
            onClose={closeModalNav}
          >
            <DialogTitle>
              <Alert 
                severity="success" 
                icon={<Icon icon="core" />}
              >
                All systems working fine
              </Alert>
              
            </DialogTitle>

            <DialogContent>

              {pathname}
              
              <List>
                <NavItem 
                  icon="home"
                  label="Home"
                  onClick={() => {
                    router.push("/");
                    closeModalNav();
                  }}
                />

                <NavItem 
                  icon="work"
                  label="Work"
                  onClick={() => {
                    router.push("/work");
                    closeModalNav();
                  }}
                />


              </List>
              
            </DialogContent>
            <DialogActions>
              {isMobile ? <><IconButton onClick={closeModalNav}>
                  <Icon icon="close" />
                </IconButton></> 
              : <><Button variant="contained" onClick={closeModalNav}>
                    Close
                  </Button></>}
            </DialogActions>
          </Dialog>
        </>
}


/*
<ListItemButton onClick={onExampleActionClick}>
    <ListItemIcon>
      <Icon icon="right" />
    </ListItemIcon>
    <ListItemText 
      primary="Example"
    />
  </ListItemButton>

  <ListItemButton>
    <ListItemIcon>
      <Icon icon="reset" />
    </ListItemIcon>
    <ListItemText 
      primary="Reset to factory settings"
    />
  </ListItemButton>
*/