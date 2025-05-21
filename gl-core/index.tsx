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
  MightyButton,
  Search,
  NextPrevious,
  ShareThis,
} from './components/nav';
import {
  TNav,
  TNavItem,
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
export { Theme, createMUITheme, Icon, ModeSwitch };
export { Header, Footer, RenderMarkdown, Responsive };
export {
  NextPrevious,
  Nav,
  NavItem,
  PageBreadcrumb,
  MightyButton,
  Search,
  ShareThis,
};
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
export { CV };
export { Flash, MovieClip, Photo };
export { exampleAction };

export type {
  TSearch,
  TCV,
  TFrontmatter,
  TMightyButton,
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
