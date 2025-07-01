// core/gl-core/cartridges/Fallmanager/hooks/useTranslation.ts

import { useSelector } from 'react-redux';
import { TLanguageCode } from '../types';
import { TRootState } from '../../Uberedux/store';

export function useTranslation() {
  const { language, translations } = useSelector(
    (state: TRootState) => state.redux.fallmanager
  );

  return function t(key: string): string {
    return translations[key]?.[language as TLanguageCode] || key;
  };
}
