'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  IconButton,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Fab,
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
  MainMenu,
  MightyButton,
  ModeSwitch,
} from '../';

export type TNav = {
  title?: string | null;
};

export default function Nav({}: TNav) {
  const dispatch = useDispatch();
  const router = useRouter();
  const slice = useSlice();
  const { modalNav } = slice;
  const isMobile = useIsMobile();

  const closeModalNav = () =>
    dispatch(setUbereduxKey({ key: 'modalNav', value: false }));
  const openModalNav = () =>
    dispatch(setUbereduxKey({ key: 'modalNav', value: true }));

  return (
    <>
      <Fab color="primary" onClick={openModalNav}>
        <Icon icon="blokey" />
      </Fab>

      <Dialog
        fullWidth
        maxWidth="xs"
        fullScreen={isMobile ? true : false}
        open={modalNav}
        onClose={closeModalNav}
      >
        <DialogTitle>
          <ListItemButton
            onClick={() => {
              closeModalNav();
              router.push('/');
            }}
          >
            <ListItemIcon>
              <Icon icon="home" />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>

          
        </DialogTitle>

        <DialogContent>
          <MainMenu onSelect={closeModalNav} />

          {/* <pre style={{fontSize: 10}}>slice: {JSON.stringify(slice, null, 2)}</pre> */}
        </DialogContent>

        <DialogActions>
          <ModeSwitch />
          {isMobile ? (
            <>
              <IconButton onClick={closeModalNav}>
                <Icon icon="close" />
              </IconButton>
            </>
          ) : (
            <>
              <MightyButton
                label="Close"
                icon="close"
                color="secondary"
                onClick={closeModalNav}
              />
            </>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
