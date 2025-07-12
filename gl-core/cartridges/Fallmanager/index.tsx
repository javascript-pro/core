import Fallmanager from './Fallmanager';
import { initialState as initialStateFallmanager } from './initialState';
import { useFallmanagerSlice, useLingua } from './hooks';
import {
  Header,
  TopRightMenu,
  Files,
  FileEdit,
  SwitchLang,
  Upload,
} from './components';
import {
  setzeSprache,
  setzeAktuellerFall,
  zuruecksetzen,
  saveNewCase,
  toggleNewCase,
  toggleAICase,
  deleteCase,
  resetFallmanager,
  seedFirebase,
  updateAICase,
  deleteFile,
  analyse,
  incomingCases,
  incomingFiles,
  updateAssist,
  updateFileMeta,
  setThemeMode,
} from './actions';

export {
  Fallmanager,
  initialStateFallmanager,
  setThemeMode,
  useFallmanagerSlice,
  useLingua,
  setzeSprache,
  setzeAktuellerFall,
  zuruecksetzen,
  toggleNewCase,
  toggleAICase,
  deleteCase,
  saveNewCase,
  resetFallmanager,
  seedFirebase,
  updateAICase,
  deleteFile,
  analyse,
  incomingCases,
  incomingFiles,
  updateAssist,
  updateFileMeta,
};

export { Header, TopRightMenu, Files, FileEdit, Upload, SwitchLang };
