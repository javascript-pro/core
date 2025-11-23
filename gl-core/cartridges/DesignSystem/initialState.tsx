// core/gl-core/cartridges/DesignSystem/initialState.tsx
import { TDesignSystemState } from './types';

export const initialState: TDesignSystemState = {
  cartridge: 'designSystem',
  themeMode: 'dark',
  dialog: null,
  feedback: null,
  feedbackTested: false,
  fullScreen: false,
};
