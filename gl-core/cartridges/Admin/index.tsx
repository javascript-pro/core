import Admin from './Admin';
import { initialState as initialStateAdmin } from './initialState';
import { useAdminSlice } from './hooks';
import { album } from './actions';
import {
  Layout,
  UsersAdmin,
  FlickrAdmin,
  Header,
  MenuList,
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
  UsersAdmin,
};
