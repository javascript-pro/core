import Core from './Core';
import { TCore } from './Core';
// actions
import {exampleAction} from './actions';
// theme
import {Theme} from './theme';
import { TTheme } from './theme';
import { Icon } from './theme';
import { createMUITheme } from './theme';
import { TIcon } from './theme';
// layout
import {Header} from './layout';
import { THeader } from './layout';

import {Footer} from './layout';
import { TFooter } from './layout';

// nav
import {MainMenu} from './nav';
import { TMainMenu } from './nav';
import {Nav} from './nav';
import { TNav } from './nav';
import {NavItem} from './nav';
import { TNavItem } from './nav';


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
import {
  TUbereduxDispatch,
} from './cartridges/Uberedux';

export {
  Core,
};


// theme
export {
  Theme,
  createMUITheme,
  Icon,
};


// components
export {
  Header,
  Footer,
};

// nav
export {
  MainMenu,
  Nav,
  NavItem,
};

// uberedux
export {
  Uberedux,
  UbereduxProvider,
  useConfig,
  useIsMobile,
  useSlice,
  useDispatch,
  useKey,
  setUbereduxKey,
  resetUberedux,
};

// actions
export {
  exampleAction,
};

export type { TFooter, TCore, TTheme, TMainMenu, TIcon, TNav, THeader, TUbereduxDispatch, TNavItem };