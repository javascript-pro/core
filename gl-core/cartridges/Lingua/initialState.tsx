// core/gl-core/cartridges/Lingua/initialState.tsx
import { TLinguaState } from './types';

export const initialState: TLinguaState = {
  cartridge: 'lingua',
  lang: 'en',
  langs: {
    en: {
      default: 'English',
      local: 'English',
      switch: 'Switch to English',
    },
    de: {
      default: 'German',
      local: 'Deutsch',
      switch: 'Wechseln Sie zu Deutsch',
    },
    cn: {
      default: 'Chinese',
      local: '简体中文',
      switch: '切换语言为中文',
    },
  },
};
