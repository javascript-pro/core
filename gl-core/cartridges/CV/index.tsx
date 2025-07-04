import CV from './CV';
import { TCV } from './CV';
import Completion from './components/Completion';
import LoadingDots from './components/LoadingDots';
import Resume from './components/Resume';
import JD from './components/JD';
import Download from './components/Download';
import { templatePDF } from './templatePDF';
import { initialState as initialStateCV } from './initialState';
import { updateCVKey } from './actions/updateCVKey';
import { resetCV } from './actions/resetCV';
import { setAppMode } from './actions/setAppMode';
import { setCVKey } from './actions/setCVKey';
import { createPrompt } from './actions/createPrompt';

export type { TCV };

export {
  CV,
  setAppMode,
  setCVKey,
  createPrompt,
  Resume,
  JD,
  Download,
  LoadingDots,
  Completion,
  updateCVKey,
  resetCV,
  templatePDF,
  initialStateCV,
};
