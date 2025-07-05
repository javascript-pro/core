// core/gl-core/cartridges/Fallmanager/initialState.tsx

import { TFallmanagerState } from './types';
import { lingua, languages } from './lingua';

export const initialState: TFallmanagerState = {
  memory: null,
  newCase: {
    open: false,
  },
  aiCase: {
    open: false,
  },
  lingua,
  language: 'en',
  languages,
  theme: {
    mode: 'light',
    primary: '#414142',
    secondary: '#305DA5',
    background: '#eee',
    paper: '#FFFFFF',
    text: '#414142',
    border: '#414142',
  },
};
