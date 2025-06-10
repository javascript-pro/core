import Core from './Core';
import { Theme } from './cartridges/Theme';
import { Icon } from './cartridges/Theme';
import { createMUITheme } from './cartridges/Theme';
import { ModeSwitch } from './cartridges/Theme';
import {
  Advert,
  Status,
  RenderMarkdown,
  Header,
  Footer,
  Nav,
  NavItem,
  PageBreadcrumb,
  MightyButton,
  Search,
  NextPrevious,
  ShareThis,
  SideAds,
  TopRightMenu,
  ShareMenu,
  IncludeAll,
} from './components';
import {
  useLoading,
  useConfig,
  useIsMobile,
  useVersion,
  useFeedback,
} from './hooks';

import {
  Uberedux,
  UbereduxProvider,
  useSlice,
  useDispatch,
  useKey,
  setUbereduxKey,
  useVersionCheck,
  resetUberedux,
} from './cartridges/Uberedux';

import { CV } from './cartridges/CV';
import { Flash, MovieClip, Photo } from './cartridges/Flash';

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
export { Status, Header, Footer, RenderMarkdown };

export {
  Advert,
  NextPrevious,
  Nav,
  NavItem,
  PageBreadcrumb,
  MightyButton,
  Search,
  ShareThis,
  SideAds,
  TopRightMenu,
  ShareMenu,
  IncludeAll,
};
export { Uberedux, UbereduxProvider, setUbereduxKey, resetUberedux };
export {
  useConfig,
  useIsMobile,
  useFeedback,
  useVersion,
  useSlice,
  useDispatch,
  useKey,
  useLoading,
  useVersionCheck,
};
export { CV };
export { Flash, MovieClip, Photo };
