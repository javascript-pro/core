// core/gl-core/cartridges/Fallmanager/actions/index.tsx
import { setzeSprache } from './setzeSprache';
import { setzeAktuellerFall } from './setzeAktuellerFall';
import { zuruecksetzen } from './zuruecksetzen';
import { toggleNewCase } from './toggleNewCase';
import { saveNewCase } from './saveNewCase';
import { deleteCase } from './deleteCase';
import { resetTranslations } from './resetTranslations';
import { resetFallmanager } from './resetFallmanager';
import { seedFirebase } from './seedFirebase';
import { toggleAICase } from './toggleAICase';
import { updateAICase } from './updateAICase';
import { updateAssist } from './updateAssist';
import { deleteFile } from './deleteFile';
import { analyse } from './analyse';
import {incomingCases} from './incomingCases';
import {incomingFiles} from './incomingFiles';

export {
  incomingCases,
  incomingFiles,
  analyse,
  seedFirebase,
  deleteCase,
  saveNewCase,
  setzeSprache,
  setzeAktuellerFall,
  zuruecksetzen,
  toggleNewCase,
  toggleAICase,
  resetTranslations,
  resetFallmanager,
  updateAICase,
  updateAssist,
  deleteFile,
};
