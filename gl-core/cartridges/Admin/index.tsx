import Admin from './Admin';
import { initialState as initialStateAdmin } from './initialState';
import { useAdminSlice } from './hooks';
import { album } from './actions';
import {
  Layout,
  FlickrAdmin,
  Header,
  MenuList,
  AuthAdmin,
  ResendAdmin,
} from './components';

export {
  Admin,
  Header,
  MenuList,
  FlickrAdmin,
  Layout,
  initialStateAdmin,
  useAdminSlice,
  album,
  AuthAdmin,
  ResendAdmin,
};
