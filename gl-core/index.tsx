import Core from './Core';
import { Theme, Icon, useThemeMode, ModeSwitch } from './cartridges/Theme';
import {
  Advert,
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
import { navigateTo } from './actions/navigateTo';
import { routeTo } from './actions/routeTo';
import { forwardEmail } from './actions/forwardEmail';
import { toggleFeedback } from './actions/toggleFeedback';

export { Core };
export { Theme, Icon, ModeSwitch, useThemeMode };
export { Header, Footer, RenderMarkdown };
export { navigateTo, routeTo, forwardEmail, toggleFeedback };
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
