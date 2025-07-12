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
  themeMode: 'light',
  themes: {
    dark: {
      mode: 'dark',
      primary: '#34d0f7',
      secondary: '#1b7cbcff',
      background: '#000',
      paper: '#000',
      text: '#fff',
      border: '#FFF',
    },
    light: {
      mode: 'light',
      primary: '#305DA5',
      secondary: '#4bff60',
      background: '#eee',
      paper: '#FFFFFF',
      text: '#414142',
      border: '#414142',
    },
  },
};
