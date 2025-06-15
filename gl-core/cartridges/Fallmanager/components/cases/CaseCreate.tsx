// core/gl-core/cartridges/Fallmanager/components/cases/CaseCreate.tsx

// core/gl-core/cartridges/Fallmanager/components/cases/Cases.tsx

'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogTitle,
  CardHeader,
  IconButton,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { routeTo, useDispatch } from '../../../../../gl-core';
import {
  Icon,
  CustomButton,
  useFallmanager,
  useNewCaseOpen,
} from '../../../Fallmanager';

export default function CaseCreate() {
  const dispatch = useDispatch();
  const router = useRouter();
  const newCaseOpen = useNewCaseOpen();

  console.log('CaseCreate', newCaseOpen);

  const handleOpenNewCase = () => {
    console.log('handleOpenNewCase');
  };

  return (
    <Dialog open={newCaseOpen}>
      <DialogTitle>
        <CardHeader title={'Open a new case'} action={<>Close</>} />
      </DialogTitle>

      <DialogContent>
        What information do we need to open a new case? let's start with the
        name of the client, Joe Bloggs
      </DialogContent>
      <DialogActions>
        <CustomButton
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
