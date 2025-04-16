import Uberedux from './Uberedux';
import UbereduxProvider from './UbereduxProvider';

import { useSlice } from './hooks/useSlice';
import { useKey } from './hooks/useKey';

import { setReduxKey } from './store';

import { RootState, AppDispatch, UbereduxState } from './store';

export { UbereduxProvider, Uberedux, useKey, useSlice, setReduxKey };

export type { RootState, AppDispatch, UbereduxState };
