import CV from './CV';
import { TCV } from './CV';
import Controls from './Controls';
import { TControls } from './Controls';
import { templatePDF } from './templatePDF';
import { initialState as CVinitialState} from './initialState';
import {updateCVSlice} from "./actions/updateCVSlice"

export { updateCVSlice, CV, Controls, templatePDF, CVinitialState };

export type { TCV, TControls };
