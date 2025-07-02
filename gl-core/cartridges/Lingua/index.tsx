// core/gl-core/cartridges/Lingua/index.tsx
import Lingua from './Lingua';
import { initialState as initialStateLingua } from './initialState';
import { SelectLang } from './components';
import { useLingua } from './hooks';
import { setLang } from './actions';

export { Lingua, initialStateLingua, SelectLang };
export { useLingua };
export { setLang };
