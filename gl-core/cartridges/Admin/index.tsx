// core/gl-core/cartridges/Doc/index.tsx
import Admin from './Admin';
import { initialState as initialStateAdmin } from './initialState';
import { NewComponent, Layout, StickyHeader } from './components';
import { useAdmin } from './hooks';
import {
  createDoc,
  readDoc,
  updateDoc,
  deleteDoc,
  setSliceKey,
} from './actions';

export { createDoc, readDoc, updateDoc, deleteDoc };
export { setSliceKey };
export { Admin, NewComponent, Layout, StickyHeader };
export { initialStateAdmin, useAdmin };
