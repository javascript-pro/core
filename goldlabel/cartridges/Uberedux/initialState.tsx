import config from '../../config.json';
import { UbereduxState } from '../Uberedux';
import { goodfitState } from '../../products/GoodFit/initialState';

export const initialState: UbereduxState = {
  persisted: Date.now(),
  config,
  goodfitState,
};
