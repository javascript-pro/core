'use client';
import * as React from 'react';
import { 
  Box, 
  Button,
  Toolbar,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { Icon, Advert, useSlice, useDispatch, routeTo } from '../../';
import { setAppMode } from '../CV';

export type TCV = {
  mode: 'alert' | 'advert' | 'app' | null;
  title?: string | null;
};

export default function CV({ 
  mode = null,
}: TCV) {
  const dispatch = useDispatch();
  const cvSlice = useSlice().cv;
  const router = useRouter();

  if (mode === 'app') return <>
    <Box id="choice_cv">
      <List sx={{mx: 2}}>
        <ListItemButton 
          onClick={() => {
            dispatch(setAppMode("cv"));
          }}
          color='secondary'>
            <ListItemIcon>
              <Icon icon="doc" />
            </ListItemIcon>
            <ListItemText primary="View and Download our CV" />
        </ListItemButton >
        <ListItemButton
          onClick={() => {
            dispatch(setAppMode("jd"));
          }}
        >
          <ListItemIcon>
              <Icon icon="openai" />
            </ListItemIcon>
          <ListItemText primary="Large Language Model Generated Job Fit AI" />
        </ListItemButton >
      </List>
    </Box>
    <pre>cvSlice: {JSON.stringify(cvSlice, null, 2)}</pre>
  </>
  
  if (mode === 'advert') return <Advert
          title={"C.V."}
          description={"Large Language Model Generated Job Fit AI"}
          onClick={() => {
            dispatch(routeTo('/cv', router));
          }}
        />
  return <pre>cvSlice: {JSON.stringify(cvSlice, null, 2)}</pre>;
}
