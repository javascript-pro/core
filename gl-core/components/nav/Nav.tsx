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
} from '@mui/material';
import {
  useIsMobile,
  useSlice,
  useDispatch,
  setUbereduxKey,
  Icon,
  MainMenu,
  MightyButton,
  Search,
} from '../../../gl-core';

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
        <DialogTitle></DialogTitle>

        <DialogContent>
          
          {/* <MightyButton
            sx={{ m: 1, mt: 2 }}
            label="Home"
            icon="home"
            variant='contained'
            onClick={() => {
              console.log('Home clicked');
              closeModalNav();
              router.push('/');
            }}
          /> */}

          <Search onTrigger={(e: any) => {
            console.log("onSearchTrigger", e)
          }} />

          <MainMenu onSelect={closeModalNav} />

          {/* <pre style={{fontSize: 10}}>slice: {JSON.stringify(slice, null, 2)}</pre> */}
        </DialogContent>

        <DialogActions>
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
