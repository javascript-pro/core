// core/gl-core/cartridges/DesignSystem/initialState.tsx
import { TDesignSystemState } from './types';

export const initialState: TDesignSystemState = {
  cartridge: 'designsystem',
  dialog: null,
  themeMode: null,
  theme: {
    mode: 'light',
    primary: '#4ed326ff',
    secondary: '#9ff14cff',
    background: '#f5f5f5',
    paper: '#ffffff',
    text: '#212121ff',
    border: '#e0e0e0',
  },
};
