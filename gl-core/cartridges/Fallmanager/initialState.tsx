// core/gl-core/cartridges/Fallmanager/initialState.tsx

import { TFallmanagerState } from './types';
import { lingua } from './lingua';

export const initialState: TFallmanagerState = {
  assist: {
    assisting: false,
    step: 0,
  },
  files: null,
  cases: null,
  memory: null,
  newCase: {
    open: false,
  },
  aiCase: {
    open: false,
  },
  lingua,
  language: 'en',
  theme: {
    mode: 'light',
    primary: '#305DA5',
    secondary: '#414142',
    background: '#eee',
    paper: '#FFFFFF',
    text: '#414142',
    border: '#414142',
  },
};
