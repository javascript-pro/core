'use client';
import * as React from 'react';
import {
  Alert,
  Button,
  IconButton,
} from '@mui/material';
import {
  useSlice,
  Icon,
  useDispatch,
} from '../../gl-core';
import {toggleStatus} from "../";

export type TStatus = {
  title?: string | null;
};

export default function Status({}: TStatus) {
  const dispatch = useDispatch();
  const status = useSlice().status;

  const {
    level,
    feedback,
    hidden,
  } = status;
  
  const onHideStatus = () => {
    console.log("onHideStatus")
    dispatch(toggleStatus(true))
  };

  if (hidden) return null;
  
  return (
    <>
    {/* <pre>status: {JSON.stringify(status, null, 2)}</pre> */}
      <Alert
        severity={level}
        variant='filled'
        icon={<Icon icon="blokey" />}
        action={
          <IconButton 
            onClick={onHideStatus}
            color="inherit" 
            size="small">
            <Icon icon="close" />
          </IconButton>
        }
      >
        {feedback}
      </Alert>
    </>
  );
}
