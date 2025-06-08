// core/gl-core/cartridges/NewCartridge/index.tsx
import NewCartridge from './NewCartridge';
import { TNewCartridge, TNewCartridgeState } from './types';
import { initialState as NewCartridgeinitialState } from './initialState';
import { NewComponent } from './components';
import { useNewCartridge } from './hooks';
import { updateKey } from './actions';
export { NewCartridge, NewCartridgeinitialState, NewComponent };
export { useNewCartridge };
export { updateKey };
export type { TNewCartridge, TNewCartridgeState };
