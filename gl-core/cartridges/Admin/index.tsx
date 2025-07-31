// core/gl-core/cartridges/Admin/index.tsx
import Admin from './Admin';
import { initialState as initialStateAdmin } from './initialState';
import { useAdminSlice, useNav } from './hooks';
import { init, album, showFeedback, reset } from './actions';
import {
  Layout,
  FlickrAdmin,
  LogsAdmin,
  Header,
  MenuList,
  AuthAdmin,
  ResendAdmin,
  Feedback,
  Shell,
  Dashboard,
} from './components';

export {
  initialStateAdmin,
  init,
  Admin,
  Feedback,
  Shell,
  Header,
  MenuList,
  FlickrAdmin,
  LogsAdmin,
  Layout,
  useAdminSlice,
  useNav,
  album,
  AuthAdmin,
  ResendAdmin,
  showFeedback,
  Dashboard,
  reset,
};
