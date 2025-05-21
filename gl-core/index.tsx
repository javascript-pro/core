import Core from './Core';
import { TCore, TFrontmatter } from './Core';
import { exampleAction } from './actions';
import { Theme } from './theme';
import { TTheme } from './theme';
import { Icon } from './theme';
import { createMUITheme } from './theme';
import { TIcon } from './theme';
import { ModeSwitch } from './theme';
import {
  RenderMarkdown,
  Header,
  Footer,
  Responsive,
} from './components/layout';
import {
  TRenderMarkdown,
  THeader,
  TFooter,
  TResponsive,
} from './components/layout';
import {
  Nav,
  NavItem,
  PageBreadcrumb,
  Share,
  MightyButton,
  Search,
  NextPrevious,
  ShareThis,
} from './components/nav';
import {
  TNav,
  TNavItem,
  TShare,
  TMightyButton,
  TSearch,
  TShareThis,
} from './components/nav';
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

import { Flash, MovieClip, Photo } from './cartridges/Flash';
import { TFlash, TMovieClip, TPhoto } from './cartridges/Flash';

export { Core };

// theme
export { Theme, createMUITheme, Icon, ModeSwitch };

// layout
export { Header, Footer, RenderMarkdown, Responsive };

// nav
export {
  NextPrevious,
  Nav,
  NavItem,
  PageBreadcrumb,
  Share,
  MightyButton,
  Search,
  ShareThis,
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

// CV
export { CV };

// Flash
export { Flash, MovieClip, Photo };

// actions
export { exampleAction };

export type {
  TSearch,
  TCV,
  TFrontmatter,
  TMightyButton,
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
  TResponsive,
  TFlash,
  TMovieClip,
  TPhoto,
  TShareThis,
};
