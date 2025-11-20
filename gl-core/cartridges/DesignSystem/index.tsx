// # DesignSystem
// /Users/goldlabel/GitHub/core/gl-core/cartridges/DesignSystem/index.tsx
import { initialState as initialStateDesignSystem } from './initialState';
import DesignSystem from './DesignSystem';
import Icon from './components/Icon';
import SystemDialog from './components/SystemDialog';
import MenuGrid from './components/MenuGrid';
import Feedback from './components/Feedback';

import { setDesignSystemKey } from './actions/setDesignSystemKey';
import { setFeedback } from './actions/setFeedback';

import { useDesignSystem } from './hooks/useDesignSystem';
import { useMUITheme } from './hooks/useMUITheme';
import { useFeedback } from './hooks/useFeedback';

export {
  initialStateDesignSystem,
  DesignSystem,
  Icon,
  MenuGrid,
  SystemDialog,
  Feedback,
  setDesignSystemKey,
  setFeedback,
  useFeedback,
  useDesignSystem,
  useMUITheme,
};
