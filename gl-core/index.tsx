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
  LoadingOverlay,
  FieldUpload,
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
