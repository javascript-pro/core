'use client';

import * as React from 'react';
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
          boxShadow: 0,
        }}
        color="default"
        onClick={openModalNav}
      >
        <Icon icon="search" />
      </Fab>

      <Dialog
        fullWidth
        maxWidth="sm"
        fullScreen={false}
        // fullScreen={isMobile ? true : false}
        open={modalNav}
        onClose={closeModalNav}
      >
        <DialogTitle>
          Search
        </DialogTitle>

        <DialogContent>

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