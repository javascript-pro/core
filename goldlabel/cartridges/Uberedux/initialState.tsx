import config from '../../config.json';
import { UbereduxState } from '../Uberedux';

export const initialState: UbereduxState = {
  persisted: Date.now(),
  config,
  darkmode: false,
  authModalOpen: false,
  authModalMode: 'login',
};
