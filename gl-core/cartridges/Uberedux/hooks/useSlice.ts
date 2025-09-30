import { useSelector } from 'react-redux';
import { TRootState } from '../';

export function useSlice() {
  const slice = useSelector((state: TRootState) => state.redux);

  return {
    ...slice,
    // setValue,
  };
}
