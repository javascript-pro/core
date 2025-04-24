import config from '../../config.json';
import { UbereduxState } from '../Uberedux';
import {initialState as bouncer} from '../Bouncer/initialState'

export const initialState: UbereduxState = {
  persisted: Date.now(),
  cartridge: "core",
  // config,
  bouncer,
};
