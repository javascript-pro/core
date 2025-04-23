import { UbereduxState } from '../Uberedux';
import {goodfitState} from "../../products/GoodFit/initialState"

export const initialState: UbereduxState = {
  initTime: Date.now(),
  goodfitState,
};
