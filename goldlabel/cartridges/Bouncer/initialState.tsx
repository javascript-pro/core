import { UbereduxState } from '../../types';

export interface IBoucerState {

}

export const initialState: IBoucerState = {
  cartridge: 'bouncer',
  modalOpen: true,
  authed: false,
  fingerprint: null
};
