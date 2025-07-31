// core/gl-core/cartridges/Admin/initialState.tsx

export type TAdminState = {
  cartridge: string;
  nav: any;
};

export const initialState: TAdminState = {
  cartridge: 'admin',
  nav: [
    {
      label: 'Dashboard',
      icon: 'dashboard',
      route: '/admin',
    },
    {
      label: 'Flickr',
      icon: 'flickr',
      route: '/admin/flickr',
    },
    {
      label: 'Logs',
      icon: 'logs',
      route: '/admin/logs',
    },
  ],
};
