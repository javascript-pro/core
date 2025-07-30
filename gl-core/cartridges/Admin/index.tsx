// core/gl-core/cartridges/Admin/index.tsx
import Admin from './Admin';
import { initialState as initialStateAdmin } from './initialState';
import { useAdminSlice } from './hooks';
import { album, showFeedback } from './actions';
import {
  Layout,
  FlickrAdmin,
  Header,
  MenuList,
  AuthAdmin,
  ResendAdmin,
  Feedback,
  Shell,
} from './components';

export {
  initialStateAdmin,
  Admin,
  Feedback,
  Shell,
  Header,
  MenuList,
  FlickrAdmin,
  Layout,
  useAdminSlice,
  album,
  AuthAdmin,
  ResendAdmin,
  showFeedback,
};
