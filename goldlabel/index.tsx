import { Appshell, Header, FolderPage, FilePage } from './components/layout';
import { IHeader, FolderPageProps } from './components/layout';
import { AppBreadcrumb } from './components/layout/AppBreadcrumb';
import FolderNav from './components/nav/FolderNav';

// nav
import HeaderNav from './components/nav/HeaderNav';
import { IHeaderNav } from './components/nav/HeaderNav';
import { INavButton } from './components/nav/NavButton';
import NavButton from './components/nav/NavButton';
import LightDarkToggle from './components/nav/LightDarkToggle';

// theme
import Icon from './components/theme/Icon';
import IconShape from './components/theme/Icon';
import Share from './components/Share';
import PopupMenu from './components/PopupMenu';
import Sitemap from './components/Sitemap';
import ContextNav from './components/ContextNav';
import Advert from './components/Advert';
import Featured from './components/Featured';

import MarkdownPopup from './components/markdown/MarkdownPopup';
import VoiceRecorder from './components/top-secret/VoiceRecorder';

export {
  Header,
  NavButton,
  Share,
  Advert,
  ContextNav,
  Appshell,
  FolderPage,
  FolderNav,
  FilePage,
  Icon,
  AppBreadcrumb,
  Sitemap,
  PopupMenu,
  Featured,
  VoiceRecorder,
  MarkdownPopup,
  LightDarkToggle,
  HeaderNav,
};

export type { IconShape, IHeader, FolderPageProps, INavButton, IHeaderNav };
