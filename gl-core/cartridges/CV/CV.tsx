'use client';

import * as React from 'react';
import { Container } from '@mui/material';
import { Advert, useSlice, useDispatch } from '../../';
// import { AIResponse, JD, Resume, updateCVKey, CommandBar } from '../CV';

export type TCV = {
  mode: 'alert' | 'advert' | null;
  title?: string | null;
};

export default function CV({ 
  mode = null,
  // title = "Default CV"
}: TCV) {
  const dispatch = useDispatch();
  const slice = useSlice();
  // const { mode } = slice.cv;

  React.useEffect(() => {
    // dispatch(updateCVKey('cv', ''));
  }, [dispatch]);

  if (mode === 'advert')
    return (
      <>
        <Advert
          title={"C.V."}
          description={"New. Large Language Model Generated Job fit"}
          onClick={() => {
            console.log("CV click");
          }}
        />
      </>
    );

  return <pre>slice: {JSON.stringify(slice, null, 2)}</pre>;
}
