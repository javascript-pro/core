// # DesignSystem
// /Users/goldlabel/GitHub/core/gl-core/cartridges/DesignSystem/index.tsx

import { setDesignSystemKey } from './actions/setDesignSystemKey';
import { useDesignSystem } from './hooks/useDesignSystem';
import SystemDialog from './components/SystemDialog';

import { initialState as initialStateDesignSystem } from './initialState';

export {
  initialStateDesignSystem,
  setDesignSystemKey,
  useDesignSystem,
  SystemDialog,
};
