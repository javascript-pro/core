// core/gl-core/cartridges/Fallmanager/actions/index.tsx
import { setzeSprache } from './setzeSprache';
import { setzeAktuellerFall } from './setzeAktuellerFall';
import { zuruecksetzen } from './zuruecksetzen';
import { toggleNewCase } from './toggleNewCase';
import { saveNewCase } from './saveNewCase';
import { deleteCase } from './deleteCase';
import { resetTranslations } from './resetTranslations';
import { seedFirebase } from './seedFirebase';

export {
  seedFirebase,
  deleteCase,
  saveNewCase,
  setzeSprache,
  setzeAktuellerFall,
  zuruecksetzen,
  toggleNewCase,
  resetTranslations,
};
