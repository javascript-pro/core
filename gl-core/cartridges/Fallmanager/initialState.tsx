// core/gl-core/cartridges/Fallmanager/initialState.tsx
import { TFallmanagerState } from './types';
import {translations} from './translations';

export const initialState: TFallmanagerState = {
  aktuellerFall: null,
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
  translations,
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
