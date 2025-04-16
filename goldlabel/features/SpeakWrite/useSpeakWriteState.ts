import { useSelector, useDispatch } from 'react-redux';
import { RootState, setReduxKey } from '../../../goldlabel/features/Uberedux';

export function useSpeakWriteState<K extends keyof RootState['redux']>(key: K) {
  const value = useSelector((state: RootState) => state.redux[key]);
  const dispatch = useDispatch();

  function setValue(newValue: RootState['redux'][K]) {
    dispatch(setReduxKey({ [key]: newValue }));
  }

  return [value, setValue] as const;
}
