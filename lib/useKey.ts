import { useSelector, useDispatch } from 'react-redux';
import { RootState, setReduxData } from './store';

export function useKey<K extends keyof RootState['redux']>(key: K) {
  const value = useSelector((state: RootState) => state.redux[key]);
  const dispatch = useDispatch();

  function setValue(newValue: RootState['redux'][K]) {
    dispatch(setReduxData({ [key]: newValue }));
  }

  return [value, setValue] as const;
}
