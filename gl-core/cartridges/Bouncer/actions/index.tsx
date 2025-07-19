// core/gl-core/cartridges/Bouncer/actions/index.tsx
import { updateUser } from './updateUser';
import { firebaseAuth } from './firebaseAuth';
import { bouncerKey } from './bouncerKey';
import { setUid } from './setUid';
import { createBouncer } from './crud/createBouncer';
import { readBouncer } from './crud/readBouncer';
import { updateBouncer } from './crud/updateBouncer';
import { deleteBouncer } from './crud/deleteBouncer';
import { setVisitor } from './setVisitor';
import { ping } from './ping';
import { makeFingerprint } from './makeFingerprint';

export {
  bouncerKey,
  updateUser,
  makeFingerprint,
  firebaseAuth,
  setUid,
  setVisitor,
  ping,
};
export { createBouncer, readBouncer, updateBouncer, deleteBouncer };
