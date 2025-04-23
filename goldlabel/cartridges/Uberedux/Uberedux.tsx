'use client';

import * as React from 'react';
import { useSlice, useDispatch } from '../Uberedux';
import { Card, CardHeader, CardContent, Typography } from '@mui/material';
import { Icon } from '../../';

export default function Uberedux() {
  const slice = useSlice();
  // const dispatch = useDispatch();

  // const onReset = () => {
  //   // dispatch(resetUberedux());
  //   // window.location.reload();
  // };

  // const {
  //   persisted,
  // } = slice;

  return (
    <Card>
      <CardHeader
        avatar={<Icon icon="uberedux" color="primary" />}
        title="Uberedux"
        subheader="State management gives Core structure and control"
      />
      <CardContent>
        <Typography>store was persisted</Typography>

        <pre>slice: {JSON.stringify(slice, null, 2)}</pre>
      </CardContent>
      {/* <CardActions>
        <Button variant="contained" onClick={onReset}>
          <Icon icon="reset" />
          <Box sx={{ ml: 1, mr: 2 }}>Reset</Box>
        </Button>
      </CardActions> */}
    </Card>
  );
}
