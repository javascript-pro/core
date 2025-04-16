import Uberedux from './Uberedux';
import UbereduxProvider from './UbereduxProvider';
import { useSlice } from './hooks/useSlice';
import { useDispatch } from './hooks/useDispatch';
import { useKey } from './hooks/useKey';
import { setUbereduxKey, resetUberedux } from './store';

import { RootState, UbereduxDispatch, UbereduxState } from './store';

export {
  UbereduxProvider,
  Uberedux,
  useKey,
  useSlice,
  useDispatch,
  setUbereduxKey,
  resetUberedux,
};

export type { RootState, UbereduxDispatch, UbereduxState };
