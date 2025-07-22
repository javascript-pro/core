// /Users/goldlabel/GitHub/core/gl-core/cartridges/Bouncer/actions/createDisplayName.tsx
import { TUbereduxDispatch } from '../../../../gl-core/types';
import { setUbereduxKey } from '../../../';

// pool of fun names
const names = [
  'Biker',
  'Chix',
  'Dapper',
  'Hippy',
  'Hipster',
  'Mumma',
  'Punk',
  'Rasta',
  'Rocker',
];

export const createDisplayName =
  (country: string, browser: string): any =>
  async (dispatch: TUbereduxDispatch, getState: () => any) => {
    try {
      console.log('createDisplayName');

      // pick random index
      const x = Math.floor(Math.random() * names.length);
      const picked = names[x];

      // build display name and avatar path
      const displayName = `${picked} using ${browser} from ${country}`;
      const avatar = `/svg/characters/${picked.toLowerCase()}.svg`;

      return {
        name: displayName,
        avatar,
      };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
      return {
        name: 'Anonymous',
        avatar: '/svg/characters/default.svg',
      };
    }
  };
