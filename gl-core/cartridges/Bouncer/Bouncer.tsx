// core/gl-core/cartridges/Bouncer/Bouncer.tsx
'use client';

import * as React from 'react';
import { AuthForm, useUid } from '../Bouncer';

export default function Bouncer({ children = null }: any) {
  const user = useUid();
  
  if (user) return children;
  return <AuthForm />;
}
