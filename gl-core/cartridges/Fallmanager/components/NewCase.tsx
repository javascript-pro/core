// core/gl-core/cartridges/Fallmanager/components/NewCase.tsx
'use client';

import * as React from 'react';
import { useEffect } from 'react';
// import { usePathname, useRouter } from 'next/navigation';
import { 
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import {
  useFallmanagerSlice,
  useLingua,
  toggleNewCase,
} from '../../Fallmanager';
import {
  useDispatch,
} from '../../../../gl-core';


export default function NewCase() {
  
  const dispatch = useDispatch();  
  const t = useLingua();
  const {newCase} = useFallmanagerSlice();
  
  useEffect(() => {
  }, []);

  if (!newCase.open) return null

  const handleClose = () => {
    dispatch(toggleNewCase(false));
  };

  return <Dialog 
            open
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
          >
            <DialogTitle>
              {t("NEW_CASE")}
            </DialogTitle> 
            <DialogContent>
              {t("NEW_CASE_HELP")}
            </DialogContent>
            {/* <pre>newCase: {JSON.stringify(newCase, null, 2)}</pre> */}
        </Dialog>;
}
