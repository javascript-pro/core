import { useSelector, useDispatch } from 'react-redux';
import { RootState, setReduxData } from './store';

export function useSlice() {
  const slice = useSelector((state: RootState) => state.redux);
  const dispatch = useDispatch();

  function setValue<K extends keyof typeof slice>(
    key: K,
    value: (typeof slice)[K],
  ) {
    dispatch(setReduxData({ [key]: value }));
  }

  return {
    ...slice,
    setValue,
  };
}
