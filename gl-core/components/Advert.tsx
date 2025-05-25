'use client';
import * as React from 'react';
import { Stack, Typography, Alert, ButtonBase, IconButton } from '@mui/material';
import { Icon, routeTo, useDispatch } from '../../gl-core';
// import { toggleAdvert } from '../';

export type TAdvert = {
  title?: string | null;
  description?: string | null;
  onClick: any;
};

export default function Advert({
  title = "Default Title",
  description = "description",
  onClick = () => {
    // dispatch(routeTo('advert', {}))
    console.log("No onClick for advert")
  }
}: TAdvert) {
  // const dispatch = useDispatch();

  return <>
      <Stack sx={{ width: '100%' }} spacing={2}>
        <ButtonBase
          sx={{textAlign: "left"}}
          onClick={onClick}
        >
          <Alert 
            sx={{ width: '100%' }}
            severity="success"
            variant='filled'
          >
            <Typography>
              {description}
            </Typography>
            
          </Alert>
        </ButtonBase>
      </Stack>
  </>

  return (
    <>
      {/* <pre>Advert: {JSON.stringify(Advert, null, 2)}</pre> */}
      <Alert
        severity={"success"}
        variant="filled"
        // icon={<Icon icon="blokey" />}
        action={
          <IconButton onClick={() => {}} color="inherit" size="small">
            <Icon icon="right" />
          </IconButton>
        }
      >
        { title }
      </Alert>
    </>
  );
}
