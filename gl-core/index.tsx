import Core from './Core';
import { TCore } from './Core';

import {Theme} from './theme';
import { TTheme } from './theme';

import {MainMenu} from './nav';
import { TMainMenu } from './nav';
import {Nav} from './nav';
import { TNav } from './nav';
import {Header} from './layout';
import { THeader } from './layout';
import { Icon } from './theme';
import { createMUITheme } from './theme';
import { TIcon } from './theme';
import {
  useConfig,
  useIsMobile,
} from './hooks';
import {
  Uberedux,
  UbereduxProvider,
  useSlice,
  useDispatch,
  useKey,
  setUbereduxKey,
  resetUberedux,
} from './cartridges/Uberedux';

export {
  Core,
  Theme,
  MainMenu,
  createMUITheme,
  Icon,
  Nav,
  Header,
  Uberedux,
  UbereduxProvider,
};

export {
  useConfig,
  useIsMobile,
  useSlice,
  useDispatch,
  useKey,
  setUbereduxKey,
  resetUberedux,
};

export type { TCore, TTheme, TMainMenu, TIcon, TNav, THeader };