// core/gl-core/cartridges/Fallmanager/index.tsx
import Fallmanager from './Fallmanager';
import { TFallmanager, TFallmanagerState } from './types';
import { initialState as FallmanagerinitialState } from './initialState';
import { NewComponent } from './components';
import { useFallmanager } from './hooks';
import { updateKey } from './actions';
export { Fallmanager, FallmanagerinitialState, NewComponent };
export { useFallmanager };
export { updateKey };
export type { TFallmanager, TFallmanagerState };
