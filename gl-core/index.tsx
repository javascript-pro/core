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
  SideAds,
  TopRightMenu,
  ShareMenu,
  IncludeAll,
  LoadingOverlay,
  FieldUpload,
  IndexNav,
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
import { normalizeError } from './lib';
import {
  switchTheme,
  navigateTo,
  routeTo,
  forwardEmail,
  toggleFeedback,
  toggleLoading,
  uploadToStorage,
} from './actions';

export { Core };
export {
  switchTheme,
  navigateTo,
  routeTo,
  forwardEmail,
  toggleFeedback,
  toggleLoading,
  uploadToStorage,
};
export {
  Advert,
  Header,
  Footer,
  RenderMarkdown,
  Theme,
  Icon,
  ModeSwitch,
  Nav,
  IndexNav,
  NavItem,
  PageBreadcrumb,
  MightyButton,
  Search,
  SideAds,
  TopRightMenu,
  ShareMenu,
  IncludeAll,
  LoadingOverlay,
  FieldUpload,
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
  useThemeMode,
};
export { normalizeError };
