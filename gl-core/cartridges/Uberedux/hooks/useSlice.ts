import { useSelector, useDispatch } from 'react-redux';
import { TRootState, setUbereduxKey } from '../';

export function useSlice() {
  const slice = useSelector((state: TRootState) => state.redux);
  const dispatch = useDispatch();

  // function setValue<K extends keyof typeof slice>(
  //   key: K,
  //   value: (typeof slice)[K],
  // ) {
  //   dispatch(setUbereduxKey({ [key]: value }));
  // }

  return {
    ...slice,
    // setValue,
  };
}
