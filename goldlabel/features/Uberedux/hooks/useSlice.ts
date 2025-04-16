import { useSelector, useDispatch } from 'react-redux';
import { RootState, setReduxKey } from '../';

export function useSlice() {
  const slice = useSelector((state: RootState) => state.redux);
  const dispatch = useDispatch();

  function setValue<K extends keyof typeof slice>(
    key: K,
    value: (typeof slice)[K],
  ) {
    dispatch(setReduxKey({ [key]: value }));
  }

  return {
    ...slice,
    setValue,
  };
}
