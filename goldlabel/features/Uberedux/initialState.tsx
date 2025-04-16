import { UbereduxState } from '../Uberedux';

export const initialState: UbereduxState = {
  time: Date.now(),
  darkmode: false,
  menuOpen: true,
  goodfit: {
    initted: false,
    random: 'dfakshdlhaskf',
  },
  speakwrite: {
    initted: false,
    random: 'dfak shdlhas   kf',
  },
};
