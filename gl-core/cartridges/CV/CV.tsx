'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Advert, useSlice, useDispatch, routeTo } from '../../';
// import { AIResponse, JD, Resume, updateCVKey, CommandBar } from '../CV';

export type TCV = {
  mode: 'alert' | 'advert' | null;
  title?: string | null;
};

export default function CV({ 
  mode = null,
}: TCV) {
  const dispatch = useDispatch();
  const slice = useSlice();
  const router = useRouter();
  
  if (mode === 'advert') return <Advert
          title={"C.V."}
          description={"Large Language Model Generated Job Fit AI"}
          onClick={() => {
            dispatch(routeTo('/cv', router));
          }}
        />
  return <pre>slice: {JSON.stringify(slice, null, 2)}</pre>;
}
