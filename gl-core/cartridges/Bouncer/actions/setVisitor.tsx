// core/gl-core/cartridges/Bouncer/actions/setVisitor.tsx
import { TUbereduxDispatch } from '../../../../gl-core/types';
import { setUbereduxKey } from '../../../../gl-core';

type TVisitorUpdate = Record<string, any> | null;

export const setVisitor =
  (data?: TVisitorUpdate): any =>
  async (dispatch: TUbereduxDispatch, getState: () => any) => {
    try {
      const currentBouncer = getState().redux.bouncer;
      const currentVisitor = currentBouncer?.visitor || {};

      let updatedVisitor: any;

      if (data === null) {
        // explicit reset
        updatedVisitor = null;
      } else if (typeof data === 'object') {
        // merge new data into existing visitor
        updatedVisitor = {
          ...currentVisitor,
          ...data,
        };
      } else {
        // no data provided means no change
        updatedVisitor = currentVisitor;
      }

      const updated = {
        ...currentBouncer,
        visitor: updatedVisitor,
      };

      dispatch(setUbereduxKey({ key: 'bouncer', value: updated }));
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
  };
