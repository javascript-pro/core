// core/gl-core/cartridges/Lingua/initialState.tsx
import { TLinguaState } from './types';

export const initialState: TLinguaState = {
  cartridge: 'lingua',
  lang: 'de',
  langs: {
    en: {
      default: 'English',
      local: 'Switch to English'
    },
    de: {
      default: 'German',
      local: 'Wechseln Sie zu Deutsch'
    },
  },
};
