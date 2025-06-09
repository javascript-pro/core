'use client';

import * as React from 'react';
import { Admin } from '../../../gl-core/cartridges/Admin';
import { Bouncer } from '../../../gl-core/cartridges/Bouncer';

export default function AdminCatchallPage() {
  return (
    <Bouncer slug="admin">
      <Admin />
    </Bouncer>
  );
}
