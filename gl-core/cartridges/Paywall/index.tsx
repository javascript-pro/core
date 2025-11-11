// /Users/goldlabel/GitHub/core/gl-core/cartridges/Paywall/index.tsx
import Paywall from './Paywall';
import { initialState as initialStatePaywall } from './initialState';
import SignInUp from './components/SignInUp';
import Tings from './components/Tings';
import User from './components/User';
import SigninGate from './components/SigninGate';
import DialogPaywall from './components/DialogPaywall';
import { usePaywall } from './hooks/usePaywall';
import { useUser } from './hooks/useUser';
import { setUser } from './actions/setUser';
import { setPaywallKey } from './actions/setPaywallKey';
import { userSignout } from './actions/userSignout';

export {
  Paywall,
  initialStatePaywall,
  usePaywall,
  useUser,
  setPaywallKey,
  setUser,
  SignInUp,
  DialogPaywall,
  SigninGate,
  Tings,
  User,
  userSignout,
};
