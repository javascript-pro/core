// core/gl-core/cartridges/Fallmanager/index.tsx
import Fallmanager from './Fallmanager';
import { TFallmanager, TFallmanagerState, TLayout } from './types';
import { initialState as FallmanagerinitialState } from './initialState';
import { NewComponent, Layout } from './components';
import { useFallmanager } from './hooks';
import { 
    createFall,
    readFall,
    updateFall,
    deleteFall,
    updateKey 
} from './actions';

export { createFall, readFall, updateFall, deleteFall };
export { updateKey };
export { Fallmanager, NewComponent, Layout };
export { FallmanagerinitialState, useFallmanager };
export type { TFallmanager, TFallmanagerState, TLayout };
