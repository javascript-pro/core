'use client';

import * as React from 'react';
import { useSlice } from '../Uberedux';
import { 
  Button,
  Card, 
  CardHeader, 
  CardContent,
  CardActions,
} from '@mui/material';
import { Icon } from '../../';

export default function Uberedux() {
  const slice = useSlice();

  const onReset = () => {
    /*
      Here we want to call some kind of action which returns the store to it's initial state and then 
    */
  }

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
        <Button
          variant="contained"
        >
          Reset
        </Button>
      </CardActions>
    </Card>
  );
}
