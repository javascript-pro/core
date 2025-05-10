import CV from './CV';
import { TCV } from './CV';
import Controls from './Controls';
import { TControls } from './Controls';

import TailoredCV from './TailoredCV';
import { TTailoredCV } from './TailoredCV';


import { templatePDF } from './templatePDF';
import { initialState as CVinitialState} from './initialState';
import {updateCVKey} from "./actions/updateCVKey"

export { TailoredCV, updateCVKey, CV, Controls, templatePDF, CVinitialState };

export type { TTailoredCV, TCV, TControls };
