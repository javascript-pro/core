// /Users/goldlabel/GitHub/core/gl-core/cartridges/ContentManager/hooks/useContentManager.tsx
import { useSelector } from 'react-redux';
import { TRootState } from '../../Uberedux/store';

export function useContentManager() {
  return useSelector((state: TRootState) => state.redux.contentManager);
}
