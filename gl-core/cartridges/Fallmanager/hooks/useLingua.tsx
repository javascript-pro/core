// core/gl-core/cartridges/Fallmanager/hooks/useLingua.ts

import { useSelector } from 'react-redux';
import { TLanguageCode } from '../types';
import { TRootState } from '../../Uberedux/store';

export function useLingua() {
  const { language, lingua } = useSelector(
    (state: TRootState) => state.redux.fallmanager,
  );

  // console.log('language', language);

  return function t(key: string): string {
    return lingua[key]?.[language as TLanguageCode] || key;
  };
}
