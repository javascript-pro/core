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
      label: 'Logs',
      icon: 'info',
      route: '/admin/logs',
    },
    {
      label: 'Reset',
      icon: 'reset',
      action: 'reset',
    },
  ],
};
