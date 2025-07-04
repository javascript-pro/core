import Fallmanager from './Fallmanager';
import { initialState as initialStateFallmanager } from './initialState';
import { useFallmanagerSlice, useLingua } from './hooks';
import {
  setzeSprache,
  setzeAktuellerFall,
  zuruecksetzen,
  saveNewCase,
  toggleNewCase,
  deleteCase,
  resetTranslations,
} from './actions';
import {
  BearbeitbarText,
  Datei,
  Fall,
  Fallliste,
  Header,
  Sprachauswahl,
  NewCase,
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
  deleteCase,
  saveNewCase,
  resetTranslations,
};

export {
  BearbeitbarText,
  Datei,
  Fall,
  Fallliste,
  Header,
  Sprachauswahl,
  NewCase,
};
