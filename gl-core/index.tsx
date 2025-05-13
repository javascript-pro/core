import Core from './Core';
import { TCore, TFrontmatter } from './Core';
import { exampleAction } from './actions';
import { Theme } from './theme';
import { TTheme } from './theme';
import { Icon } from './theme';
import { createMUITheme } from './theme';
import { TIcon } from './theme';
import { RenderMarkdown, Header, Main, Footer } from './layout';
import { TRenderMarkdown, THeader, TMain, TFooter } from './layout';
import {
  MainMenu,
  Nav,
  NavItem,
  PageBreadcrumb,
  Share,
  MightyButton,
  Search,
} from './nav';
import { TNav, TNavItem, TShare, TMightyButton, TSearch } from './nav';
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

// layout
export { Header, Footer, Main, RenderMarkdown };

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
  TRenderMarkdown,
  TIcon,
  TNav,
  THeader,
  TUbereduxDispatch,
  TNavItem,
};
