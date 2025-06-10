// core/gl-core/cartridges/Fallmanager/index.tsx
import Fallmanager from './Fallmanager';
import { initialState as initialStateFallmanager } from './initialState';

import { useFallmanager } from './hooks';
import {
  createFall,
  readFall,
  updateFall,
  deleteFall,
  updateKey,
} from './actions';
import { NewComponent, Layout, UploadFile } from './components';

export { Fallmanager, NewComponent, Layout, UploadFile };
export { createFall, readFall, updateFall, deleteFall };
export { updateKey };
export { initialStateFallmanager, useFallmanager };