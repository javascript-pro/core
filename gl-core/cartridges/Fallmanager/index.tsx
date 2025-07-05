import Fallmanager from './Fallmanager';
import { initialState as initialStateFallmanager } from './initialState';
import { useFallmanagerSlice, useLingua } from './hooks';
import {
  setzeSprache,
  setzeAktuellerFall,
  zuruecksetzen,
  saveNewCase,
  toggleNewCase,
  toggleAICase,
  deleteCase,
  resetTranslations,
  resetFallmanager,
  seedFirebase,
} from './actions';
import {
  BearbeitbarText,
  Datei,
  Fall,
  Fallliste,
  Header,
  Sprachauswahl,
  NewCase,
  AIAssisted,
} from './components';

export {
  Fallmanager,
  initialStateFallmanager,
  useFallmanagerSlice,
  useLingua,
  setzeSprache,
  setzeAktuellerFall,
  zuruecksetzen,
  toggleNewCase,
  toggleAICase,
  deleteCase,
  saveNewCase,
  resetTranslations,
  resetFallmanager,
  seedFirebase,
};

export {
  BearbeitbarText,
  Datei,
  Fall,
  Fallliste,
  Header,
  Sprachauswahl,
  NewCase,
  AIAssisted,
};
