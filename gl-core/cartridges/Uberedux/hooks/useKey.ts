import { useSelector, useDispatch } from 'react-redux';
import { TRootState, setUbereduxKey } from '../';

export function useKey<K extends keyof TRootState['redux']>(key: K) {
  const value = useSelector((state: TRootState) => state.redux[key]);
  const dispatch = useDispatch();

  function setValue(newValue: TRootState['redux'][K]) {
    // dispatch(setUbereduxKey({ [key]: newValue }));
  }

  return [value, setValue] as const;
}
