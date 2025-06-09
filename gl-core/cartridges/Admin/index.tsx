// core/gl-core/cartridges/Admin/index.tsx
import Admin from './Admin';
import { TAdmin, TAdminState, TLayout } from './types';
import { initialState as AdmininitialState } from './initialState';
import { NewComponent, Layout } from './components';
import { useAdmin } from './hooks';
import {
  createAdmin,
  readAdmin,
  updateAdmin,
  deleteAdmin,
  updateKey,
} from './actions';

export { createAdmin, readAdmin, updateAdmin, deleteAdmin };
export { updateKey };
export { Admin, NewComponent, Layout };
export { AdmininitialState, useAdmin };
export type { TAdmin, TAdminState, TLayout };
