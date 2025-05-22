'use client';

import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
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
      <Fab
        sx={{
          background: 0,
          boxShadow: 0,
        }}
        onClick={openModalNav}
      >
        <Icon icon="blokey" />
      </Fab>

      <Dialog
        fullWidth
        maxWidth="sm"
        fullScreen={false}
        // fullScreen={isMobile ? true : false}
        open={modalNav}
        onClose={closeModalNav}
      >
        <DialogTitle>Nav</DialogTitle>

        <DialogContent>
          <MightyButton 
            sx={{mb: 2}}
            variant="outlined"
            color="secondary"
            label="Home"
            icon="home"
            onClick={() => {
              closeModalNav();
              router.push('/');
            }}
          />
          <Search
            onTrigger={(e: any) => {
              // console.log('onSearchTrigger', e);
            }}
          />
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

/*
  <pre style={{fontSize: 10}}>slice: {JSON.stringify(slice, null, 2)}</pre>
*/
