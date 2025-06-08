import Core from './Core';
import { TCore, TFrontmatter } from './Core';
import { Theme } from './cartridges/Theme';
import { Icon } from './cartridges/Theme';
import { createMUITheme } from './cartridges/Theme';
import { TIcon } from './cartridges/Theme';
import { ModeSwitch } from './cartridges/Theme';

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

import Status from './components/Status';
import { TStatus } from './components/Status';

import {
  Nav,
  NavItem,
  PageBreadcrumb,
  MightyButton,
  CardButton,
  Search,
  NextPrevious,
  ShareThis,
  SideAds,
  TopRightMenu,
  ShareMenu,
} from './components/nav';
import {
  TNav,
  TNavItem,
  TMightyButton,
  TSearch,
  TShareThis,
  TCardButton,
  TShareMenu,
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
import Advert from './components/Advert';
import { Flash, MovieClip, Photo } from './cartridges/Flash';
import { TFlash, TMovieClip, TPhoto } from './cartridges/Flash';
import { navigateTo } from './actions/navigateTo';
import { routeTo } from './actions/routeTo';
import { toggleStatus } from './actions/toggleStatus';
import { toggleAdvert } from './actions/toggleAdvert';
import { forwardEmail } from './actions/forwardEmail';
import { updateStatusLevel } from './actions/updateStatusLevel';
import { updateStatusMessage } from './actions/updateStatusMessage';
export {
  toggleStatus,
  updateStatusLevel,
  updateStatusMessage,
  navigateTo,
  routeTo,
  toggleAdvert,
  forwardEmail,
};

export { Core };
export { Theme, createMUITheme, Icon, ModeSwitch };
export { Status, Header, Footer, RenderMarkdown, Responsive };

export {
  Advert,
  NextPrevious,
  Nav,
  NavItem,
  PageBreadcrumb,
  CardButton,
  MightyButton,
  Search,
  ShareThis,
  SideAds,
  TopRightMenu,
  ShareMenu,
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

export type {
  TSearch,
  TCV,
  TFrontmatter,
  TMightyButton,
  TFooter,
  TCore,
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
  TStatus,
  TCardButton,
  TShareMenu,
};
