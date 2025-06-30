// core/gl-core/cartridges/Fallmanager/initialState.tsx
import { TFallmanagerState } from './types';

export const initialState: TFallmanagerState = {
  language: 'de',
  languages: {
    en: {
      title: 'English',
      description: 'Switch to English',
    },
    de: {
      title: 'Deutsch',
      description: 'Wechseln Sie zu Deutsch',
    },
  },
  theme: {
    mode: 'light',
    primary: '#414142',
    secondary: '#305DA5',
    background: '#FFFFFF',
    paper: '#FFFFFF',
    text: '#414142',
    border: '#414142',
  },
};
