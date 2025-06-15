// core/gl-core/cartridges/Fallmanager/components/cases/CaseCreate.tsx

// core/gl-core/cartridges/Fallmanager/components/cases/Cases.tsx

'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Dialog,
  DialogTitle,
  CardHeader,
  IconButton,
  DialogContent,
  DialogActions,
  Typography,
} from '@mui/material';
import { useIsMobile, useDispatch } from '../../../../../gl-core';
import {
  Icon,
  CustomButton,
  useFallmanager,
  toggleNewCaseOpen,
  useNewCaseOpen,
  InputTextField,
} from '../../../Fallmanager';

export default function CaseCreate() {
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const router = useRouter();
  const newCaseOpen = useNewCaseOpen();

  const handleOpenNewCase = () => {
    console.log('handleOpenNewCase');
  };

  const handleClose = () => {
    dispatch(toggleNewCaseOpen(false));
  };

  return (
    <Dialog 
      fullWidth
      maxWidth="xs"
      fullScreen={isMobile}
      open={newCaseOpen}
      onClose={handleClose} 
    >
      <DialogTitle>
        <CardHeader
          title={'New case'}
          avatar={<Icon icon="case" />}
          action={
            <IconButton onClick={handleClose}>
              <Icon icon="close" />
            </IconButton>
          }
        />
      </DialogTitle>

      <DialogContent>
        <Typography>
            What information do we need to open a new case? 
            Start with the
        name of the client, Joe Bloggs
          </Typography>
        <Box sx={{ my: 2 }}>
          
          <InputTextField
            autoFocus
            variant='filled'
            id="create-case-client-name"
            label="Client Name"
            helperText="eg: Peter Schmidt"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <CustomButton
          disabled
          mode="button"
          icon="save"
          onClick={handleOpenNewCase}
          label="Save"
          variant="contained"
        />
      </DialogActions>
    </Dialog>
  );
}
