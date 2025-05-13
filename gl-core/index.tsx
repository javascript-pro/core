import Core from './Core';
import { TCore, TFrontmatter } from './Core';
// actions
import { exampleAction } from './actions';
// theme
import { Theme } from './theme';
import { TTheme } from './theme';
import { Icon } from './theme';
import { createMUITheme } from './theme';
import { TIcon } from './theme';
// layout
import { Header } from './layout';
import { THeader } from './layout';
import { Main } from './layout';
import { TMain } from './layout';
import { Footer } from './layout';
import { TFooter } from './layout';

// nav
import {
  MainMenu,
  Nav,
  NavItem,
  PageBreadcrumb,
  Share,
  MightyButton,
  Search,
} from './nav';

import {
  TNav,
  // TMainMenu,
  TNavItem,
  TShare,
  TMightyButton,
  TSearch,
} from './nav';

import { useConfig, useIsMobile } from './hooks';
import {
  Uberedux,
  UbereduxProvider,
  useSlice,
  useDispatch,
  useKey,
  setUbereduxKey,
  resetUberedux,
} from './cartridges/Uberedux';
import { TUbereduxDispatch } from './cartridges/Uberedux';

import { CV } from './cartridges/CV';
import { TCV } from './cartridges/CV';

export { Core };

// theme
export { Theme, createMUITheme, Icon };

// components
export { Header, Footer, Main };

// nav
export { MainMenu, Nav, NavItem, PageBreadcrumb, Share, MightyButton, Search };

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

// CV
export { CV };

// actions
export { exampleAction };

export type {
  TSearch,
  TCV,
  TFrontmatter,
  TMightyButton,
  TMain,
  TShare,
  TFooter,
  TCore,
  TTheme,
  // TMainMenu,
  TIcon,
  TNav,
  THeader,
  TUbereduxDispatch,
  TNavItem,
};
