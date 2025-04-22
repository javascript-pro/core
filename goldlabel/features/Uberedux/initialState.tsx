import { UbereduxState } from '../Uberedux';

export const initialState: UbereduxState = {
  time: Date.now(),
  darkmode: false,
  menuOpen: true,
  every: 'time',
  das: 123,
};
