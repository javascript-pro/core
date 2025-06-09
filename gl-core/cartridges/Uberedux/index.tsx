import Uberedux from './Uberedux';
import UbereduxProvider from './UbereduxProvider';
import { useSlice } from './hooks/useSlice';
import { useDispatch } from './hooks/useDispatch';
import { useKey } from './hooks/useKey';
import { useVersionCheck } from './hooks/useVersionCheck';
import { setUbereduxKey, resetUberedux } from './store';
import { TRootState, TUbereduxDispatch } from './store';

export {
  UbereduxProvider,
  Uberedux,
  useKey,
  useSlice,
  useDispatch,
  useVersionCheck,
  setUbereduxKey,
  resetUberedux,
};

export type { TRootState, TUbereduxDispatch };
