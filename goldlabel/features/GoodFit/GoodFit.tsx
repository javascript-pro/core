'use client';

import * as React from 'react';
import {
  Card,
} from '@mui/material';
import {useSlice} from "../Uberedux"

export default function GoodFit() {

  const slice = useSlice()
  
  return <Card>
          <pre>
            uberedux: {JSON.stringify(slice, null, 2)}
          </pre>
        </Card>
}
