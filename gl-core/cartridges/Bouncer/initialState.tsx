// core/gl-core/cartridges/Bouncer/initialState.tsx
import { TBouncerState } from '../Bouncer';

export const initialState: TBouncerState = {
  cartridge: 'bouncer',
  authed: false,
  user: null,
  feedback: {
    severity: 'success',
    title: 'Intialising Bouncer',
    description: 'Going well so far',
  },
};
