'use client';

import * as React from 'react';
import {useSlice} from "../Uberedux"
export default function GoodFit() {

  const slice = useSlice()
  
  return (<>
      <pre>
        uberedux: {JSON.stringify(slice, null, 2)}
      </pre>
    </>
  );
}
