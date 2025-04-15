'use client';

import * as React from 'react';
import {useSlice} from "../../../lib/useSlice"
export default function Uberedux() {

  const slice = useSlice()
  return (
    <pre>
      {JSON.stringify(slice, null, 2)}
    </pre>
  );
}
