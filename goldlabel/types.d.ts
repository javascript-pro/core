import { IHeader } from './';
import { UbereduxState } from './cartridges/Uberedux/store';

export { IHeader, UbereduxState };

export type NavItem = {
  title: string;
  slug: string;
  type: 'file' | 'folder';
  order?: number;
  icon?: string;
  excerpt?: string;
  children?: NavItem[];
};
