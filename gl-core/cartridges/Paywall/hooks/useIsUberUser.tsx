// /Users/goldlabel/GitHub/core/gl-core/cartridges/Paywall/hooks/useIsUberUser.tsx
'use client';
import { useUser } from '../../Paywall';

/**
 * useIsUberUser
 * Returns true only when:
 * - a user is logged in
 * - their uid matches NEXT_PUBLIC_UBER_USER_ID
 */
export function useIsUberUser() {
  const user = useUser();
  const uberId = process.env.NEXT_PUBLIC_UBER_USER_ID;

  if (!user) return false;
  if (!uberId) return false;

  return user.uid === uberId;
}
