'use client';

import * as React from 'react';
import { useSlice, useDispatch, resetUberedux } from '../Uberedux';
import {
  Box,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
} from '@mui/material';
import { Icon } from '../../';

export default function Uberedux() {
  const slice = useSlice();
  const dispatch = useDispatch();

  const onReset = () => {
    // dispatch(resetUberedux());
    // window.location.reload();
  };

  return (
    <Card>
      <CardHeader
        avatar={<Icon icon="uberedux" color="primary" />}
        title="Uberedux"
        subheader="Redux gives Goldlabel Core structure and control"
      />
      <CardContent>
        <pre>uberedux: {JSON.stringify(slice, null, 2)}</pre>
      </CardContent>
      <CardActions>
        <Button variant="contained" onClick={onReset}>
          <Icon icon="reset" />
          <Box sx={{ ml: 1, mr: 2 }}>Reset</Box>
        </Button>
      </CardActions>
    </Card>
  );
}
