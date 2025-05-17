'use client';

import * as React from 'react';
import {
  IconButton,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Typography,
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
} from '../';

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
          <Typography variant='h2'>
            Hello.
          </Typography>
        </DialogTitle>

        <DialogContent>
            <MainMenu onSelect={closeModalNav} />
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
                variant="contained"
                onClick={closeModalNav}
              />
            </>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
